import pytest
from unittest.mock import MagicMock, patch
from datetime import datetime, timezone
from fastapi.testclient import TestClient

# Import app after conftest has set up env vars + mock supabase
from server import app
from auth import get_current_user


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def override_get_current_user():
    def _override(user_id="u1", name="Alice", role="user"):
        mock_user = MagicMock()
        mock_user.id = user_id
        app.dependency_overrides[get_current_user] = lambda: mock_user
        return mock_user
    yield _override
    app.dependency_overrides.clear()


class TestRoot:
    def test_hello_world(self, client):
        resp = client.get("/api/")
        assert resp.status_code == 200
        assert resp.json() == {"message": "Hello World"}


class TestRegister:
    def test_success(self, client, mock_supabase):
        mock_user = MagicMock()
        mock_user.model_dump.return_value = {"id": "u1", "email": "a@b.com"}
        mock_session = MagicMock()
        mock_session.access_token = "token-123"
        mock_resp = MagicMock()
        mock_resp.session = mock_session
        mock_resp.user = mock_user
        mock_supabase.auth.sign_up.return_value = mock_resp

        resp = client.post("/api/auth/register", json={
            "name": "Alice",
            "email": "a@b.com",
            "password": "pw",
        })

        assert resp.status_code == 200
        body = resp.json()
        assert body["access_token"] == "token-123"
        assert body["user"] == {"id": "u1", "email": "a@b.com"}

    def test_failure_returns_400(self, client, mock_supabase):
        mock_supabase.auth.sign_up.side_effect = Exception("email taken")

        resp = client.post("/api/auth/register", json={
            "name": "Alice",
            "email": "a@b.com",
            "password": "pw",
        })

        assert resp.status_code == 400
        assert "email taken" in resp.json()["detail"]


class TestLogin:
    def test_success(self, client, mock_supabase):
        mock_user = MagicMock()
        mock_user.model_dump.return_value = {"id": "u1", "email": "a@b.com"}
        mock_session = MagicMock()
        mock_session.access_token = "token-456"
        mock_resp = MagicMock()
        mock_resp.session = mock_session
        mock_resp.user = mock_user
        mock_supabase.auth.sign_in_with_password.return_value = mock_resp

        resp = client.post("/api/auth/login", json={
            "email": "a@b.com",
            "password": "pw",
        })

        assert resp.status_code == 200
        body = resp.json()
        assert body["access_token"] == "token-456"
        assert body["user"] == {"id": "u1", "email": "a@b.com"}

    def test_failure_returns_401(self, client, mock_supabase):
        mock_supabase.auth.sign_in_with_password.side_effect = Exception("bad creds")

        resp = client.post("/api/auth/login", json={
            "email": "a@b.com",
            "password": "pw",
        })

        assert resp.status_code == 401
        assert "bad creds" in resp.json()["detail"]


class TestMe:
    def test_success(self, client, mock_supabase, override_get_current_user):
        override_get_current_user(user_id="u1")
        mock_resp = MagicMock()
        mock_resp.data = {
            "id": "u1",
            "name": "Alice",
            "email": "a@b.com",
            "phone": "555",
            "role": "user",
            "created_at": datetime(2024, 1, 1, tzinfo=timezone.utc),
        }
        chain = (
            mock_supabase.table.return_value
            .select.return_value
            .eq.return_value
            .single.return_value
        )
        chain.execute.return_value = mock_resp

        resp = client.get("/api/auth/me")

        assert resp.status_code == 200
        body = resp.json()
        assert body["id"] == "u1"
        assert body["name"] == "Alice"
        assert body["email"] == "a@b.com"
        assert body["phone"] == "555"
        assert body["role"] == "user"
        assert body["created_at"] == "2024-01-01T00:00:00+00:00"

    def test_no_profile_returns_404(self, client, mock_supabase, override_get_current_user):
        override_get_current_user(user_id="missing")
        mock_resp = MagicMock()
        mock_resp.data = None
        chain = (
            mock_supabase.table.return_value
            .select.return_value
            .eq.return_value
            .single.return_value
        )
        chain.execute.return_value = mock_resp

        resp = client.get("/api/auth/me")
        assert resp.status_code == 404
        assert "Profile not found" in resp.json()["detail"]

    def test_handles_string_timestamp(self, client, mock_supabase, override_get_current_user):
        override_get_current_user(user_id="u1")
        mock_resp = MagicMock()
        mock_resp.data = {
            "id": "u1",
            "name": "Alice",
            "email": "a@b.com",
            "role": "user",
            "created_at": "2024-06-15T10:30:00+00:00",
        }
        chain = (
            mock_supabase.table.return_value
            .select.return_value
            .eq.return_value
            .single.return_value
        )
        chain.execute.return_value = mock_resp

        resp = client.get("/api/auth/me")
        assert resp.status_code == 200
        assert resp.json()["created_at"] == "2024-06-15T10:30:00+00:00"


class TestStatus:
    def test_create_status_check(self, client, mock_supabase):
        resp = client.post("/api/status", json={"client_name": "test-client"})

        assert resp.status_code == 200
        body = resp.json()
        assert body["client_name"] == "test-client"
        assert "id" in body
        assert "timestamp" in body

    def test_get_status_checks(self, client, mock_supabase):
        mock_resp = MagicMock()
        mock_resp.data = [
            {"id": "s1", "client_name": "client-a", "timestamp": "2024-01-01T00:00:00+00:00"},
        ]
        mock_supabase.table.return_value.select.return_value.execute.return_value = mock_resp

        resp = client.get("/api/status")

        assert resp.status_code == 200
        body = resp.json()
        assert len(body) == 1
        assert body[0]["id"] == "s1"
        assert body[0]["client_name"] == "client-a"
        assert body[0]["timestamp"] is not None

    def test_get_status_checks_empty(self, client, mock_supabase):
        mock_resp = MagicMock()
        mock_resp.data = []
        mock_supabase.table.return_value.select.return_value.execute.return_value = mock_resp

        resp = client.get("/api/status")
        assert resp.status_code == 200
        assert resp.json() == []

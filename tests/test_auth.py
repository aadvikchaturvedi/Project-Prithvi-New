import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from auth import register_user, login_user, get_current_user, get_profile


class TestRegisterUser:
    def test_success(self, mock_supabase):
        mock_resp = MagicMock()
        mock_supabase.auth.sign_up.return_value = mock_resp

        result = register_user("a@b.com", "pw", "Alice", "555")

        mock_supabase.auth.sign_up.assert_called_once_with({
            "email": "a@b.com",
            "password": "pw",
            "options": {"data": {"name": "Alice", "phone": "555"}},
        })
        assert result is mock_resp

    def test_failure_raises_400(self, mock_supabase):
        mock_supabase.auth.sign_up.side_effect = Exception("email taken")

        with pytest.raises(HTTPException) as exc:
            register_user("a@b.com", "pw", "Alice")

        assert exc.value.status_code == 400
        assert "email taken" in exc.value.detail

    def test_phone_defaults_to_empty(self, mock_supabase):
        mock_resp = MagicMock()
        mock_supabase.auth.sign_up.return_value = mock_resp

        register_user("a@b.com", "pw", "Alice")

        call_kwargs = mock_supabase.auth.sign_up.call_args[0][0]
        assert call_kwargs["options"]["data"]["phone"] == ""


class TestLoginUser:
    def test_success(self, mock_supabase):
        mock_resp = MagicMock()
        mock_supabase.auth.sign_in_with_password.return_value = mock_resp

        result = login_user("a@b.com", "pw")

        mock_supabase.auth.sign_in_with_password.assert_called_once_with({
            "email": "a@b.com",
            "password": "pw",
        })
        assert result is mock_resp

    def test_failure_raises_401(self, mock_supabase):
        mock_supabase.auth.sign_in_with_password.side_effect = Exception("bad creds")

        with pytest.raises(HTTPException) as exc:
            login_user("a@b.com", "pw")

        assert exc.value.status_code == 401
        assert "bad creds" in exc.value.detail


class TestGetCurrentUser:
    def test_success(self, mock_supabase):
        mock_user = MagicMock()
        mock_resp = MagicMock()
        mock_resp.user = mock_user
        mock_supabase.auth.get_user.return_value = mock_resp

        result = get_current_user(authorization="Bearer test-token")

        mock_supabase.auth.get_user.assert_called_once_with("test-token")
        assert result is mock_user

    def test_no_bearer_prefix(self, mock_supabase):
        mock_user = MagicMock()
        mock_resp = MagicMock()
        mock_resp.user = mock_user
        mock_supabase.auth.get_user.return_value = mock_resp

        result = get_current_user(authorization="test-token")

        assert result is mock_user

    def test_failure_raises_401(self, mock_supabase):
        mock_supabase.auth.get_user.side_effect = Exception("invalid")

        with pytest.raises(HTTPException) as exc:
            get_current_user(authorization="Bearer bad-token")

        assert exc.value.status_code == 401
        assert "Invalid or missing token" in exc.value.detail


class TestGetProfile:
    def test_success(self, mock_supabase):
        mock_data = {"id": "u1", "name": "Alice", "role": "user"}
        mock_resp = MagicMock()
        mock_resp.data = mock_data

        chain = (
            mock_supabase.table.return_value
            .select.return_value
            .eq.return_value
            .single.return_value
        )
        chain.execute.return_value = mock_resp

        result = get_profile("u1")

        mock_supabase.table.assert_called_once_with("users")
        assert result == mock_data

    def test_returns_none_when_missing(self, mock_supabase):
        mock_resp = MagicMock()
        mock_resp.data = None

        chain = (
            mock_supabase.table.return_value
            .select.return_value
            .eq.return_value
            .single.return_value
        )
        chain.execute.return_value = mock_resp

        result = get_profile("nonexistent")
        assert result is None

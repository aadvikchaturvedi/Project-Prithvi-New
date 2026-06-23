import os
import sys
from unittest.mock import MagicMock

os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
os.environ.setdefault("SUPABASE_KEY", "test-key")
os.environ.setdefault("CORS_ORIGINS", "*")

_mock_supabase = MagicMock()
_mock_client = MagicMock()
_mock_supabase.client = _mock_client

sys.modules["db.supabase"] = _mock_supabase

if "db" not in sys.modules:
    sys.modules["db"] = MagicMock()

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)


import pytest


@pytest.fixture
def mock_supabase():
    new_mock = MagicMock()
    sys.modules["db.supabase"].client = new_mock
    import auth as _auth
    _auth.client = new_mock
    try:
        import server as _server
        _server.supabase = new_mock
    except ImportError:
        pass
    yield new_mock

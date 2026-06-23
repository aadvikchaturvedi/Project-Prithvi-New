from fastapi import Header, HTTPException
from typing import Any, cast
from db.supabase import client


def register_user(email: str, password: str, name: str, phone: str | None = None) -> Any:
    try:
        response = client.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "name": name,
                    "phone": phone or "",
                }
            }
        })
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def login_user(email: str, password: str) -> Any:
    try:
        response = client.auth.sign_in_with_password({
            "email": email,
            "password": password,
        })
        return response
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


def get_current_user(authorization: str = Header(...))->Any:
    try:
        token = authorization.removeprefix("Bearer ")
        response = client.auth.get_user(token)
        return response.user  # type: ignore[union-attr]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or missing token")


def get_profile(user_id: str) -> dict[str, Any] | None:
    response = client.table("users").select("*").eq("id", user_id).single().execute()
    return cast(dict[str, Any] | None, response.data)


def get_oauth_url(provider: str, redirect_to: str | None = None, scopes: str | None = None) -> str:
    try:
        options: dict[str, Any] = {}
        if redirect_to:
            options["redirect_to"] = redirect_to
        if scopes:
            options["scopes"] = scopes
        response = client.auth.sign_in_with_oauth({
            "provider": provider,
            "options": options,
        })
        return response.url
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def exchange_code_for_session(auth_code: str) -> Any:
    try:
        response = client.auth.exchange_code_for_session({
            "auth_code": auth_code,
        })
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def sign_in_with_id_token(provider: str, token: str, nonce: str | None = None) -> Any:
    try:
        options: dict[str, Any] = {"provider": provider, "token": token}
        if nonce:
            options["nonce"] = nonce
        response = client.auth.sign_in_with_id_token(options)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

import pytest
from fastapi.testclient import TestClient
from webapp.app import app

client = TestClient(app)


def test_get_home():
    response = client.get("/")
    assert response.status_code == 200
    assert "<title>raspby website</title>" in response.text
    assert "/static/dist/main.bundle.js" in response.text


def test_get_favicon():
    response = client.get("/favicon.ico")
    assert response.status_code == 200


def test_get_info():
    response = client.get("/info")
    assert response.status_code == 200

    data = response.json()
    keys = data.keys()
    assert "uptime" in keys
    assert "cpu" in keys
    assert "disk" in keys
    assert "net" in keys
    assert "swap" in keys
    assert "temperatures" in keys
    assert "users" in keys


def test_get_dist_styles():
    response = client.get("/static/dist/styles.css")
    assert response.status_code == 200


def test_get_dist_js():
    response = client.get("/static/dist/main.bundle.js")
    assert response.status_code == 200

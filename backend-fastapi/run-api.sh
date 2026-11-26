#!/bin/bash
set -e
cd "/Users/gaye/Desktop/sep2026/portfolio/backend-fastapi"
set -a
source "/Users/gaye/Desktop/sep2026/portfolio/backend-fastapi/.env.production"
set +a
exec "/Users/gaye/Desktop/sep2026/portfolio/backend-fastapi/.venv/bin/uvicorn" main:app --host "127.0.0.1" --port "8001"

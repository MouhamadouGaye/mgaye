
#!/bin/bash
set -Eeuo pipefail

# ==========================================
# CONFIGURATION
# ==========================================

API_DOMAIN="api.mouhamadougaye.com"
FRONTEND_DOMAIN="mouhamadougaye.com"
API_HOST="127.0.0.1"
API_PORT="8001"

APP_NAME="portfolio-api"
LABEL="com.mouhamadougaye.portfolio-api"
CADDY_LABEL="com.mouhamadougaye.portfolio-caddy"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR"
ENV_FILE="$APP_DIR/.env.production"
RUN_SCRIPT="$APP_DIR/run-api.sh"

LAUNCH_AGENTS="$HOME/Library/LaunchAgents"
API_PLIST="$LAUNCH_AGENTS/$LABEL.plist"
CADDY_PLIST="/Library/LaunchDaemons/$CADDY_LABEL.plist"

# ==========================================
# COULEURS ET FONCTIONS
# ==========================================

green() { printf "\033[32m[OK]\033[0m %s\n" "$1"; }
red()   { printf "\033[31m[ERROR]\033[0m %s\n" "$1"; }
blue()  { printf "\033[34m[INFO]\033[0m %s\n" "$1"; }

fail() {
  red "$1"
  exit 1
}

# ==========================================
# VERIFICATIONS
# ==========================================

if [[ "$EUID" -eq 0 ]]; then
  fail "Ne lance pas ce script avec sudo. Utilise : ./deploy.sh"
fi

[[ "$(uname -s)" == "Darwin" ]] || fail "Ce script est réservé à macOS."

ARCH="$(uname -m)"
[[ "$ARCH" == "arm64" ]] || fail "Ce script est destiné aux Mac Apple Silicon."

[[ -f "$APP_DIR/main.py" ]] || fail "main.py introuvable dans $APP_DIR"
[[ -f "$APP_DIR/requirements.txt" ]] || fail "requirements.txt introuvable."

command -v brew >/dev/null 2>&1 || fail "Homebrew absent. Installe-le depuis https://brew.sh puis relance le script."

# # BREW_PREFIX="$(brew --prefix)"
# # PYTHON_BIN="$BREW_PREFIX/opt/python@3.12/bin/python3"
# # CADDY_BIN="$BREW_PREFIX/bin/caddy"

# BREW_PREFIX="$(brew --prefix)"
# PYTHON_PREFIX="$(brew --prefix python@3.12)"

BREW_PREFIX="$(brew --prefix)"
PYTHON_PREFIX="$(brew --prefix python@3.12)"
PYTHON_BIN="$PYTHON_PREFIX/bin/python3.12"

PYTHON_BIN="$PYTHON_PREFIX/bin/python3.12"
CADDY_BIN="$BREW_PREFIX/bin/caddy"

blue "Installation de l'environnement pour $API_DOMAIN"

# ==========================================
# PORTS
# ==========================================

for port in 3000 8000; do
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    green "Port $port déjà utilisé : service existant conservé."
  else
    blue "Port $port actuellement libre."
  fi
done

if lsof -nP -iTCP:"$API_PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  fail "Le port $API_PORT est déjà utilisé. Libère-le ou modifie API_PORT dans le script."
fi

# ==========================================
# INSTALLATION DES DEPENDANCES
# ==========================================

blue "Installation de Python et Caddy..."

brew install python@3.12 caddy

[[ -x "$PYTHON_BIN" ]] || fail "Python 3.12 introuvable après installation."
[[ -x "$CADDY_BIN" ]] || fail "Caddy introuvable après installation."

green "Python et Caddy installés."

# ==========================================
# CONFIGURATION DES SECRETS
# ==========================================

if [[ -f "$ENV_FILE" ]]; then
  EXISTING_SECRET="$(sed -n 's/^API_SECRET=//p' "$ENV_FILE" | head -n 1)"
else
  EXISTING_SECRET=""
fi

if [[ -n "$EXISTING_SECRET" ]]; then
  API_SECRET="$EXISTING_SECRET"
  green "Clé API existante conservée."
else
  API_SECRET="$(openssl rand -hex 32)"
  green "Nouvelle clé API générée."
fi

echo
read -r -p "Adresse e-mail pour les certificats HTTPS Let's Encrypt : " ADMIN_EMAIL
[[ "$ADMIN_EMAIL" == *@* ]] || fail "Adresse e-mail invalide."

# echo
# read -r -s -p "DATABASE_URL de ta base PostgreSQL : " DATABASE_URL
# echo

echo
read -r -p "DATABASE_URL de ta base PostgreSQL : " DATABASE_URL
echo
[[ -n "$DATABASE_URL" ]] || fail "DATABASE_URL obligatoire."

# if [[ "$DATABASE_URL" != postgres://* && "$DATABASE_URL" != postgresql://* ]]; then
#   fail "DATABASE_URL doit commencer par postgres:// ou postgresql://."
# fi

if [[ "$DATABASE_URL" != postgres://* \
   && "$DATABASE_URL" != postgresql://* \
   && "$DATABASE_URL" != postgresql+psycopg://* ]]; then
  echo "[ERROR] Format DATABASE_URL invalide."
  exit 1
fi

# Écrit les valeurs en échappant correctement les caractères shell.
umask 077
{
  printf 'API_SECRET=%q\n' "$API_SECRET"
  printf 'DATABASE_URL=%q\n' "$DATABASE_URL"
  printf 'CORS_ORIGINS=%q\n' "https://$FRONTEND_DOMAIN,https://www.$FRONTEND_DOMAIN"
} > "$ENV_FILE"

chmod 600 "$ENV_FILE"
green "Variables secrètes enregistrées."

# ==========================================
# ENVIRONNEMENT PYTHON
# ==========================================

cd "$APP_DIR"

if [[ ! -d "$APP_DIR/.venv" ]]; then
  "$PYTHON_BIN" -m venv "$APP_DIR/.venv"
fi

"$APP_DIR/.venv/bin/python" -m pip install --upgrade pip
"$APP_DIR/.venv/bin/pip" install -r "$APP_DIR/requirements.txt"

green "Dépendances Python installées."

# ==========================================
# SCRIPT DE DEMARRAGE FASTAPI
# ==========================================

cat > "$RUN_SCRIPT" <<EOF
#!/bin/bash
set -e
cd "$APP_DIR"
set -a
source "$ENV_FILE"
set +a
exec "$APP_DIR/.venv/bin/uvicorn" main:app --host "$API_HOST" --port "$API_PORT"
EOF

chmod 700 "$RUN_SCRIPT"

# ==========================================
# SERVICE MACOS : FASTAPI
# ==========================================

mkdir -p "$LAUNCH_AGENTS"

"$PYTHON_BIN" - "$API_PLIST" "$RUN_SCRIPT" "$APP_DIR" <<'PY'
import plistlib
import sys

plist_path, script_path, working_dir = sys.argv[1:]

data = {
    "Label": "com.mouhamadougaye.portfolio-api",
    "ProgramArguments": ["/bin/bash", script_path],
    "WorkingDirectory": working_dir,
    "RunAtLoad": True,
    "KeepAlive": True,
    "StandardOutPath": working_dir + "/api.log",
    "StandardErrorPath": working_dir + "/api-error.log",
}

with open(plist_path, "wb") as f:
    plistlib.dump(data, f)
PY

chmod 600 "$API_PLIST"

# Recharge le service dans la session utilisateur.
launchctl bootout "gui/$UID/$LABEL" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$UID" "$API_PLIST"
launchctl kickstart -k "gui/$UID/$LABEL"

green "Service FastAPI configuré avec launchd."

# ==========================================
# CONFIGURATION CADDY
# ==========================================

CADDY_DIR="$BREW_PREFIX/etc/caddy-portfolio"
CADDY_FILE="$CADDY_DIR/Caddyfile"

sudo mkdir -p "$CADDY_DIR"
sudo chown root:wheel "$CADDY_DIR"

sudo tee "$CADDY_FILE" >/dev/null <<EOF
{
    email $ADMIN_EMAIL
}

$API_DOMAIN {
    encode zstd gzip
    reverse_proxy $API_HOST:$API_PORT
}
EOF

sudo chown root:wheel "$CADDY_FILE"
sudo chmod 644 "$CADDY_FILE"

# Vérification de la configuration Caddy.
sudo "$CADDY_BIN" validate \
  --config "$CADDY_FILE" \
  --adapter caddyfile

green "Configuration Caddy validée."

# ==========================================
# SERVICE MACOS : CADDY
# ==========================================

sudo mkdir -p /var/log/caddy-portfolio
sudo touch /var/log/caddy-portfolio/output.log
sudo touch /var/log/caddy-portfolio/error.log
sudo chown -R root:wheel /var/log/caddy-portfolio

"$PYTHON_BIN" - "$CADDY_PLIST" "$CADDY_BIN" "$CADDY_FILE" <<'PY'
import plistlib
import sys

plist_path, caddy_bin, caddy_file = sys.argv[1:]

data = {
    "Label": "com.mouhamadougaye.portfolio-caddy",
    "ProgramArguments": [
        caddy_bin,
        "run",
        "--config",
        caddy_file,
        "--adapter",
        "caddyfile",
    ],
    "RunAtLoad": True,
    "KeepAlive": True,
    "EnvironmentVariables": {
        "HOME": "/var/root",
    },
    "StandardOutPath": "/var/log/caddy-portfolio/output.log",
    "StandardErrorPath": "/var/log/caddy-portfolio/error.log",
}

with open(plist_path, "wb") as f:
    plistlib.dump(data, f)
PY

sudo chown root:wheel "$CADDY_PLIST"
sudo chmod 644 "$CADDY_PLIST"

sudo launchctl bootout "system/$CADDY_LABEL" >/dev/null 2>&1 || true
sudo launchctl bootstrap system "$CADDY_PLIST"
sudo launchctl kickstart -k "system/$CADDY_LABEL"

green "Service Caddy configuré."

# ==========================================
# VERIFICATION LOCALE
# ==========================================

echo
blue "Attente du démarrage de FastAPI..."
sleep 3

if curl -fsS "http://$API_HOST:$API_PORT/docs" >/dev/null; then
  green "FastAPI répond sur http://$API_HOST:$API_PORT"
else
  red "FastAPI ne répond pas. Consulte api-error.log."
fi

echo
green "Installation terminée."

echo
echo "=========================================="
echo " INFORMATIONS IMPORTANTES"
echo "=========================================="
echo "Frontend : https://$FRONTEND_DOMAIN"
echo "API      : https://$API_DOMAIN"
echo "API local: http://$API_HOST:$API_PORT"
echo
echo "Clé API à copier dans Vercel :"
echo "API_SECRET=$API_SECRET"
echo
echo "URL à configurer dans Vercel :"
echo "API_URL=https://$API_DOMAIN"
echo
echo "Logs FastAPI :"
echo "tail -f \"$APP_DIR/api.log\" \"$APP_DIR/api-error.log\""
echo
echo "Logs Caddy :"
echo "sudo tail -f /var/log/caddy-portfolio/error.log"
echo
echo "Redémarrer FastAPI :"
echo "launchctl kickstart -k gui/$UID/$LABEL"
echo
echo "Redémarrer Caddy :"
echo "sudo launchctl kickstart -k system/$CADDY_LABEL"
echo "=========================================="

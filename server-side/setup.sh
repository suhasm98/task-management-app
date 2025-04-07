#!/bin/bash

echo "🚀 Starting full project setup..."

# 1. Generate JWT secret
JWT_SECRET=$(openssl rand -hex 64)

# 2. Set environment variables
MONGO_DB_NAME="crudApp"
MONGO_URI="mongodb://localhost:27017/$MONGO_DB_NAME"
PORT=3000

# 3. Create .env file
echo "🔐 Creating .env..."
cat <<EOL > .env
MONGO_URI=$MONGO_URI
JWT_SECRET=$JWT_SECRET
PORT=$PORT
EOL
echo ".env created ✅"

# 4. Create MongoDB database
echo "🧱 Initializing MongoDB database \"$MONGO_DB_NAME\"..."
mongosh <<EOF
use $MONGO_DB_NAME
db.init.insertOne({ status: "initialized" })
EOF
echo "MongoDB initialized ✅"

# 5. Install Node.js dependencies
echo "📦 Installing dependencies..."
npm install
echo "Dependencies installed ✅"

# 6. Start server in background
echo "🟢 Starting server..."
nohup node server.js > server.log 2>&1 &
SERVER_PID=$!
echo "Server running in background (PID $SERVER_PID) ✅"

# 7. Wait for server to initialize
echo "⏳ Waiting for server to start..."
sleep 5

# 8. Create initial users
echo "👤 Creating test user..."
curl -s -X POST http://localhost:$PORT/api/signup \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "password": "test123"}' > /dev/null

echo "👮 Creating admin user..."
curl -s -X POST http://localhost:$PORT/api/signup \
    -H "Content-Type: application/json" \
    -d '{"email": "admin@example.com", "password": "admin123", "role": "admin"}' > /dev/null

# 9. Log in test user
echo "🔐 Logging in test user..."
USER_TOKEN=$(curl -s -X POST http://localhost:$PORT/api/login \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "password": "test123"}' | jq -r .token)

# 10. Log in admin user
echo "🔐 Logging in admin user..."
ADMIN_TOKEN=$(curl -s -X POST http://localhost:$PORT/api/login \
    -H "Content-Type: application/json" \
    -d '{"email": "admin@example.com", "password": "admin123"}' | jq -r .token)

# 11. Create test task for test user
if [ "$USER_TOKEN" == "null" ]; then
    echo "❌ Failed to login test user. Check server or script logs."
    exit 1
fi

echo "📝 Creating a test task (user)..."
curl -s -X POST http://localhost:$PORT/api/tasks \
    -H "Authorization: Bearer $USER_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"title": "First Task from Script"}' > /dev/null

echo "🎉 Setup complete!"
echo "==============================="
echo "👤 Test User:"
echo "  Email:    test@example.com"
echo "  Password: test123"
echo "  Token:    $USER_TOKEN"
echo ""
echo "👮 Admin User:"
echo "  Email:    admin@example.com"
echo "  Password: admin123"
echo "  Token:    $ADMIN_TOKEN"
echo "==============================="

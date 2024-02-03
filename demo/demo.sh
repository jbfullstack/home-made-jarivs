#!/bin/bash

# Endpoint and User-Agent
ENDPOINT="http://localhost:3000/ai-speaker"
USER_AGENT="jarvis-home-made-demo v1.0"

# Start a new session and capture the sessionId
response=$(curl -s -X POST "$ENDPOINT/start-session" \
    -H "Content-Type: application/json" \
    -H "User-Agent: $USER_AGENT" \
    -d '{ "username": "jeremy", "sessionName": "serious-session", "personality": "Serious" }')

sessionId=$(echo $response | grep -o '"sessionId":"[^"]*' | grep -o '[^"]*$')

# Check if sessionId is captured
if [ -z "$sessionId" ]; then
    echo "Failed to get sessionId"
    exit 1
fi

echo "Session ID: $sessionId"
echo

# Perform text chatting with the captured sessionId
curl -X POST "$ENDPOINT/user/jeremy/text-chatting/$sessionId" \
    -H "Content-Type: application/json" \
    -H "User-Agent: $USER_AGENT" \
    -d '{ "message": "Hello ! What is the meaning of your name ?" }'

echo
echo 

# Perform verbal chatting and save the output to speakerAnswer.mp3
curl -X POST "$ENDPOINT/user/jeremy/verbal-chatting/$sessionId" \
    -H "Content-Type: application/json" \
    -H "User-Agent: $USER_AGENT" \
    -d '{ "message": "Hello ! What is the meaning of your name  again ? ", "voice": "onyx" }' --output speakerAnswer.mp3

echo "Verbal response saved to speakerAnswer.mp3"

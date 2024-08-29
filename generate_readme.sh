#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Please install it first."
    exit 1
fi

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo ".env file not found. Please create one with your ANTHROPIC_API_KEY."
    exit 1
fi

# Check if API key is set
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "ANTHROPIC_API_KEY is not set in the .env file."
    exit 1
fi

# Create a temporary file for ignore patterns
IGNORE_FILE=$(mktemp)

# Add common ignore patterns
echo ".git" >> "$IGNORE_FILE"
echo "node_modules" >> "$IGNORE_FILE"
echo "build" >> "$IGNORE_FILE"
echo "dist" >> "$IGNORE_FILE"
echo ".next" >> "$IGNORE_FILE"

# If .gitignore exists, append its contents to the ignore file
if [ -f .gitignore ]; then
    cat .gitignore >> "$IGNORE_FILE"
fi

# Get a limited list of files, excluding those matched by ignore patterns
FILE_LIST=$(find . -type f \
    | sed 's|^./||' \
    | grep -v -f "$IGNORE_FILE" \
    | grep -E '\.(js|ts|tsx|json|md|html|css|scss)$' \
    | sort \
    | head -n 50)

# Remove the temporary ignore file
rm "$IGNORE_FILE"

# Prepare the message content
MESSAGE_CONTENT="Here's a list of some key files in my project (limited to 50 entries, excluding ignored files):

$FILE_LIST

Repo is called Pi Dashboard, git url is https://github.com/chasecee/pi-dashboard
include basic instructions on how to run the next js dev.
mention its hosted on vercel at https://pi-dashboard-one.vercel.app/
Based on this information, generate a clean, well-formatted README.md file for my project. Use proper Markdown syntax for headings, lists, and code blocks. Include the following sections:

1. Project Title with fun decorations (top level heading)
2. Project Overview (brief description)
3. Features (use a bullet list)
4. File Structure (use a code block for the file tree)
5. Installation (if applicable)
6. Usage (if applicable)
7. Contributing (brief guidelines)
8. License (if known)

Also, add a warning at the top of the README stating that it's automatically generated and may be overwritten.

Keep it concise and ensure proper Markdown formatting throughout."

# Create a temporary file for the API request payload
TEMP_FILE=$(mktemp)

# Prepare the API request payload without using jq for the content
cat > "$TEMP_FILE" << EOF
{
  "model": "claude-3-haiku-20240307",
  "max_tokens": 1000,
  "messages": [
    {
      "role": "user",
      "content": $(printf '%s' "$MESSAGE_CONTENT" | jq -Rs .)
    }
  ]
}
EOF

# Make the API call
RESPONSE=$(curl -s -w "\n%{http_code}" https://api.anthropic.com/v1/messages \
    -H "Content-Type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d @"$TEMP_FILE")

# Remove the temporary file
rm "$TEMP_FILE"

# Separate the response body and status code
HTTP_BODY=$(echo "$RESPONSE" | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)

# Check if the API call was successful
if [ "$HTTP_STATUS" -ne 200 ]; then
    echo "Error: API call failed with status $HTTP_STATUS"
    echo "Response: $HTTP_BODY"
    exit 1
fi

# Extract the README content from the response
README_CONTENT=$(echo "$HTTP_BODY" | jq -r '.content[0].text')

# Check if README_CONTENT is empty or null
if [ -z "$README_CONTENT" ] || [ "$README_CONTENT" = "null" ]; then
    echo "Error: Failed to extract README content from API response"
    echo "Response: $HTTP_BODY"
    exit 1
fi

# Clean up the content
README_CONTENT=$(echo "$README_CONTENT" | sed 's/^```markdown//; s/```$//')

# Write to README.md
echo "$README_CONTENT" > README.md

# Verify the content of README.md
if [ -s README.md ]; then
    echo "README.md has been generated successfully."
    echo "First few lines of README.md:"
    head -n 5 README.md
else
    echo "Error: README.md is empty after generation"
    exit 1
fi
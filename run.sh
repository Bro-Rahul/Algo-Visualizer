#!/bin/sh

# Read code from STDIN
CODE=$(cat)

if [ -z "$CODE" ]; then
  echo "No code provided"
  exit 1
fi

echo "$CODE" > user.ts

bun run user.ts

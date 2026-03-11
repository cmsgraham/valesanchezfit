#!/bin/sh
set -e

echo "Running database migrations..."
pnpm migrate

echo "Starting server..."
exec pnpm start

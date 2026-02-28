#!/bin/sh
set -e

# SSH configuration
mkdir -p ~/.ssh
cp -r ~/.ssh-host/. ~/.ssh/ 2>/dev/null || true
chmod 700 ~/.ssh

# Git configuration
git config --global --add safe.directory /var/www/html
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
if [ -z "$(git config --get user.name)" ]; then
    git config --global user.name "salsafavor container"
fi
if [ -z "$(git config --get user.email)" ]; then
    git config --global user.email "sail@salsafavor.com"
fi

# Composer and Laravel
XDEBUG_MODE=off composer install
if [ ! -f .env ]; then
    cp .env.example .env
    XDEBUG_MODE=off php artisan key:generate
fi

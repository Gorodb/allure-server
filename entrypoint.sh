#!/bin/bash
cd $HOME

rm -rf .config .local .pki .cache .dbus .gconf .mozilla
# Set the file access permissions (read, write and access) recursively for the result folders
chmod -Rf 777 allure-reports uploads

yarn start
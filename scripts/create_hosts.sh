#!/usr/bin/env bash

sed -i '/[.]*\.example\.com\.br/d' /etc/hosts
echo '127.0.0.1	webapp.example.com.br' >> /etc/hosts
echo '127.0.0.1	graphql.example.com.br' >> /etc/hosts

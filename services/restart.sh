#!/bin/bash
set -x #echo on

sudo systemctl stop raspbyweb
sudo systemctl start raspbyweb

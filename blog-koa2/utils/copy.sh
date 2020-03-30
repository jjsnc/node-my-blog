#!/bin/sh
 cd /Users/damon_care/Project/github/node-my-blog/logs
 cp access.log $(date +%Y-%m-%d).access.log
 echo "" > access.log
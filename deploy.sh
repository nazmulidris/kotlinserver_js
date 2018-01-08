#!/usr/bin/env bash
# https://devcenter.heroku.com/articles/deploying-gradle-apps-on-heroku
# heroku config:set GRADLE_TASK="build"
heroku config:set GRADLE_TASK="stage"
git push heroku master

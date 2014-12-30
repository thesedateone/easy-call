easy-call
=========


### Notes to self

Need to run this command to make sure Heroku sets up a Python environment, not a NodeJS environment.

```
heroku config:set BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-python
```
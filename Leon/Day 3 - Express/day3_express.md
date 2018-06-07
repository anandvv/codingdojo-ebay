# Express JS

### Express Middleware

When using middleware in express, you need to explicitly call next to go to the
next middleware.
```javascript
app.use((req, res, next) => {
  // do some middle ware stuff
  next();
})
```

### Session

To get the session, you can call req.session object. The object is json, so
it is possible to add new properties to the session.

```javascript
app.get('/', (req, res) => {
  req.session.newprop = 'Hello!';
  // A new property on req session object
})
```

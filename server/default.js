function defaultApp(app, server){
  const handle = app.getRequestHandler();
  server.get('*', (req, res) => {
    return handle(req, res)
  });
  server.listen(process.env.PORT || 80, () => {
    console.log('Server is running on port 80');
  });
}

module.exports = defaultApp;
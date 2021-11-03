var restify = require('restify');
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'oreo123456',
    database : 'student'
});

connection.connect();

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/getstudent', function (req, res, next) {
    connection.query('desc student', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
      return next();
    });
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
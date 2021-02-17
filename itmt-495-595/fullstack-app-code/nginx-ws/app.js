const http = require('http');
const host = require('os');
// get the client
const configReader = require('yml-config-reader')

const config = configReader.getByFiles('config.default.yml')
//console.log(config.db.userpass)

const mysql = require('mysql2');
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello World' + host.hostname());
});

// create the connection to database
 const connection = mysql.createConnection({
   host: '192.168.33.205',
     user: 'worker',
     password: config.db.userpass,
     database: 'posts'
     });

connection.connect((err) => {
   if(err){
      console.log('Error connecting to Db');
       return;
    }
  console.log('Connection established');
});


// simple query
 connection.query(
   'SELECT * FROM `comment`;',
     function(err, results, fields) {
         console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
         console.log(err); // return the error
     }
            );


server.listen(port, hostname, () => {
          console.log(`Server running at http://${hostname}:${port}/`);
});
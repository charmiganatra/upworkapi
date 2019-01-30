var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
  userName: 'upwork', // update me
     password: 'psspl1!@', // update me
     server: 'upwork.database.windows.net', // update me
     options: 
        {
           database: 'upwork' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase(function(error, result){
                 console.log("out1");
                 console.log("result1");
              if(!error) socket.emit("serverSent", result);
            });
       }
   }
 );

function queryDatabase(res,callback)
   { 
 if (connection.state !== connection.STATE.LOGGED_IN) {
                    // Put the request back on the dispatcher if connection is not in LoggedIn state
                    setTimeout(queryDatabase, 0, callback);
                    return;
                }
                console.log('Reading rows from the Table...');
       // Read all rows from table
     request = new Request(
          "SELECT name from criteria",
             function(err, rowCount, rows) 
                {
                   //console.log(err);
                    console.log(rowCount + ' row(s) returned');
                   // process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            res = column.value;
            console.log("return");
            return res;
         });
             });

    //  request.on('doneInProc', function (rowCount, more, rows) {  
    //                  console.log("%s\t%s", column.metadata.colName, column.value);
    //                 callback(null);
    //             });   
     connection.execSql(request);
   }
var serverModel = function() {};
  
serverModel.prototype.queryDatabases = function(res) {
   debug('running request');
              queryDatabase(function(error, result){
                 console.log("out");
                 console.log("result");
              if(!error) socket.emit("serverSent", result);
            });
}
   module.exports = new serverModel();
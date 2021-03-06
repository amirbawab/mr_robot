var express = require('express');
var socket_io = require("socket.io");

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var music = require('./routes/music');

var app = express();

var io = socket_io();
app.io = io;

var exec = require('child_process').exec;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/music', music);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// socket.io events
io.on( "connection", function( socket ) {
    console.log( "Control connected" );

    socket.on("car-navigation", function(value) {
        var direction = value.direction;
        var speedLeft = value.speedLeft;
        var speedRight = value.speedRight;

        // Exec for all directions
        var cmd = "/home/debian/mr_robot/tools/control/write " + speedLeft + "," + speedRight + "#";
        console.log("Executing: " + cmd);
        exec(cmd,{silent:true});

       console.log("Recieved:");
       console.log(value);
       console.log("-------------");
    });

    socket.on("car-ocv", function(value) {
        var stat = value.status;
        var device = value.device;
        var color = value.color;

        if(stat == "start") {
            var cmd = "/home/debian/mr_robot/host/cv/OCV " + device + " " + color;
            console.log("Executing: " + cmd);
            exec(cmd,{silent:true});
        } else if(stat == "stop") {
            var cmd = "kill -9 $(ps -edf | grep 'OCV " + device + " " + color + "' | grep -v grep | awk '{print$2}');";
			cmd += " /home/debian/mr_robot/tools/control/write 0,0#";
            console.log("Executing: " + cmd);
            exec(cmd,{silent:true});
        }

       console.log("Recieved:");
       console.log(value);
       console.log("-------------");
    });

    socket.on("disconnect", function(){
        console.log("Control disconnected");
    });
});

module.exports = app;

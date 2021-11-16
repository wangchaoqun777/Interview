var exec = require("child_process").exec;
// queryString = require("querystring")
var fs = require('fs')
    formidable = require("formidable");
function start(res, req){
  var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(body);
    res.end();
  // exec("find /",
  //   { timeout:10000, maxBuffer:20000*1024},
  //   function(error, stdout, stderr){
  //     res.writeHead(200,{"Content-Type":"text/plain"});
  //     res.write(stdout);
  //     res.end();
  //   });
}

function upload(res, req){
  var form = new formidable.IncomingForm();
  form.parse(req,function(error, fields, files){
    console.log("parsing done", files, files.upload.filepath);

    fs.renameSync(files.upload.filepath,"img/kobe.png");
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    res.end();
  });
}

function show (res) {
  fs.readFile('img/kobe.png', 'binary', (error, file)=> {
    if(error) {
      res.writeHead(500, {"Content-Type":"text/plain"})
      res.write(error)
      res.end()
    } else {
      res.writeHead(200,{"Content-Type":"image/png"});
      res.write(file,'binary')
      res.end()
    }
  })
  // fs.readFile('img/kobe.png', 'binary',(error, file)=> {
  //   console.log('tag', error, file)
  // })
}

exports.start = start;
exports.upload = upload;
exports.show = show
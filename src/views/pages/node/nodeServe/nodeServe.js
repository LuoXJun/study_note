var http = require('http');
var fs = require('fs'); //引入文件读取模块

var documentRoot = 'D:/nodeServe';
//需要访问的文件的存放目录

var server = http
  .createServer(function (req, res) {
    var url = req.url;

    var file = documentRoot + url;
    console.log(url);

    fs.readFile(file, function (err, data) {
      if (err) {
        res.writeHeader(404, {
          'content-type': 'text/html;charset="utf-8"'
        });
        res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
        res.end();
      } else {
        res.writeHeader(200, {
          'content-type': 'text/html;charset="utf-8"'
        });
        res.end(data);
      }
    });
  })
  .listen(8888);
console.log('服务启动成功');

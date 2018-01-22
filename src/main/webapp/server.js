let express = require("express"),
  app = express(),
  fs = require('fs'),
  port = parseInt(process.env.PORT, 10) || 8030;

app.use(express.static(__dirname + '/dist'));

app.route('/*').get(function(req,res){
  let str = fs.readFileSync('./dist/index.html','utf-8');
  res.send(str);
});

app.listen(port, () => {
  console.log("listening...");
});

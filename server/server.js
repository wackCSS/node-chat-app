const path = require('path');
const publicPath = path.join(__dirname, '../public'); // this will remove the unnecessary ../ from the path.
const express = require('express');
var app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`started on port ${port}`);
});

app.use(express.static(publicPath));

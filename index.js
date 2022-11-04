const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate.js`);
//
const isValidProduct = (product) => dataObj.some((ele) => ele.href === product);
// GET DATA
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
);
const dataObj = data.map((ele) => {
  ele.href = slugify(ele.productName, { lower: true });
  return ele;
});
// GET TEMPLATES
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
// SERVER
const server = http.createServer((req, res) => {
  const { pathname: pathName, query } = url.parse(req.url);
  // Home
  if (pathName === '/') {
    const cards = dataObj
      .map((product) => replaceTemplate(tempCard, product))
      .join('');
    const output = tempOverview.replace('{%CARDS%}', cards);
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  }
  // Product
  else if (isValidProduct(pathName.slice(1))) {
    const output = replaceTemplate(
      tempProduct,
      dataObj.find((ele) => ele.href === pathName.slice(1))
    );
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>The URL you requested was not found on the server</h1>');
  }
});

server.listen('8080', '127.0.0.1', () => {
  console.log('Listening to requests on port 8080!');
});

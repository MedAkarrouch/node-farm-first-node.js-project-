const slugify = require('slugify');
module.exports = (temp, product) => {
  console.log(product);
  let output = temp.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(
    '{%HREF%}',
    slugify(product.productName, { lower: true })
  );
  output = product.organic
    ? output.replace(`{%NOT__ORGANIC%}`, ' ')
    : output.replace(`{%NOT__ORGANIC%}`, 'not-organic');
  // console.log(output);
  return output;
};

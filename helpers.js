const path = require('path');

// to dump any object
exports.dump = (obj) => {
  JSON.stringify(obj, null, 2);
};

// use moment to handle date
exports.moment = require('moment');

// custom validator to validate image type
exports.imageType = (value, fileName) => {
  const extension = (path.extname(fileName)).toLowerCase();
  switch (extension) {
    case '.jpg':
      return '.jpg';
    case '.jpeg':
      return '.jpeg';
    case '.png':
      return '.png';
    default:
      return false;
  }
};


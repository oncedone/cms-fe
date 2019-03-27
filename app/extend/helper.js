/**
 * nunjuck filter
 */
'use strict';
const mapJson = require('../../config/manifest.json');
const path = require('path');
module.exports = {
  manifestMap(filename) {
    let result = '';
    const extname = path.extname(filename)
    if (!mapJson[filename]) return;
    switch (extname) {
      case '.css':
        result = `<link type="text/css" href="public/dist/${mapJson[filename]}" rel="stylesheet">`;
        break;
      case '.js':
        result = `<script type="text/javascript" src="public/dist/${mapJson[filename]}"></script>`;
        break;
      default:
        break;
    }
    return result;
  }
};

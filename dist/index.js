"use strict";

var MoalaClient = require('./MoalaClient');
module.exports = {
  createClient: function createClient(baseUrl, appKey, secretKey) {
    return new MoalaClient(baseUrl, appKey, secretKey);
  }
};
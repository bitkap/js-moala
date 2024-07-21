const MoalaClient = require('./MoalaClient');

module.exports = {
    createClient: (baseUrl, appKey, secretKey) => new MoalaClient(baseUrl, appKey, secretKey)
};

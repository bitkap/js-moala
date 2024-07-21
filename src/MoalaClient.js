const axios = require('axios');
const crypto = require('crypto');

class MoalaClient {
    constructor(baseUrl, appKey, secretKey) {
        this.baseUri = baseUrl;
        this.appKey = appKey;
        this.secretKey = secretKey;
        this.httpClient = axios.create({
            baseURL: this.baseUri
        });
    }

    generateHmacSha256Hex(data, secret) {
        return crypto.createHmac('sha256', secret).update(data).digest('hex');
    }

    async balance() {
        try {
            const timestamp = Date.now();
            const sign = this.generateHmacSha256Hex(`${timestamp}GET/v1/api/balance`, this.secretKey);
            const response = await this.httpClient.get('/v1/api/balance', {
                headers: {
                    'LP-ACCESS-SIGN': sign,
                    'LP-ACCESS-KEY': this.appKey,
                    'Content-Type': 'application/json',
                    'LP-ACCESS-TIMESTAMP': `${timestamp}`
                }
            });
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }

    async checkTransaction(partnerId) {
        try {
            const timestamp = Date.now();
            const sign = this.generateHmacSha256Hex(`${timestamp}GET/v1/api/transaction/check/${partnerId}`, this.secretKey);
            const response = await this.httpClient.get(`/v1/api/transaction/check/${partnerId}`, {
                headers: {
                    'LP-ACCESS-SIGN': sign,
                    'LP-ACCESS-KEY': this.appKey,
                    'Content-Type': 'application/json',
                    'LP-ACCESS-TIMESTAMP': `${timestamp}`
                }
            });
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }

    async kyc(phoneNumber, serviceCode) {
        try {
            const timestamp = Date.now();
            const sign = this.generateHmacSha256Hex(`${timestamp}GET/v1/api/kyc/${serviceCode}/${phoneNumber}`, this.secretKey);
            const response = await this.httpClient.get(`/v1/api/kyc/${serviceCode}/${phoneNumber}`, {
                headers: {
                    'LP-ACCESS-SIGN': sign,
                    'LP-ACCESS-KEY': this.appKey,
                    'Content-Type': 'application/json',
                    'LP-ACCESS-TIMESTAMP': `${timestamp}`
                }
            });
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }

    async cashout(phoneNumber, serviceCode, amount, partnerId) {
        try {
            const data = {
                amount: amount,
                transactionType: "deposit",
                serviceCode: serviceCode,
                phoneNumber: phoneNumber,
                partnerId: partnerId
            };
            const timestamp = Date.now();
            const sign = this.generateHmacSha256Hex(`${timestamp}POST/v1/api/transaction/payment${JSON.stringify(data)}`, this.secretKey);
            const response = await this.httpClient.post('/v1/api/transaction/payment', data, {
                headers: {
                    'LP-ACCESS-SIGN': sign,
                    'LP-ACCESS-KEY': this.appKey,
                    'Content-Type': 'application/json',
                    'LP-ACCESS-TIMESTAMP': `${timestamp}`
                }
            });
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }

    async cashin(phoneNumber, serviceCode, amount, partnerId) {
        try {
            const data = {
                amount: amount,
                transactionType: "withdrawal",
                serviceCode: serviceCode,
                phoneNumber: phoneNumber,
                partnerId: partnerId
            };
            const timestamp = Date.now();
            const sign = this.generateHmacSha256Hex(`${timestamp}POST/v1/api/transaction/withdrawal${JSON.stringify(data)}`, this.secretKey);
            const response = await this.httpClient.post('/v1/api/transaction/withdrawal', data, {
                headers: {
                    'LP-ACCESS-SIGN': sign,
                    'LP-ACCESS-KEY': this.appKey,
                    'Content-Type': 'application/json',
                    'LP-ACCESS-TIMESTAMP': `${timestamp}`
                }
            });
            return response.data;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = MoalaClient;

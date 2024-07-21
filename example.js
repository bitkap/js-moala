const { createClient } = require('./src');

const baseUrl = 'https://api.moala.africa';
const appKey = 'cfa3a138-47c3-4f86-9fda';
const secretKey = 'cfa3a138-47c3-4f86-9fda-d4dds3434';

const client = createClient(baseUrl, appKey, secretKey);

(async () => {
    try {
        const balance = await client.balance();
        console.log('Balance:', balance);

        const transaction = await client.checkTransaction('partnerId123');
        console.log('Transaction:', transaction);

        const kycResult = await client.kyc('1234567890', 'serviceCode123');
        console.log('KYC:', kycResult);

        const cashoutResult = await client.cashout('1234567890', 'serviceCode123', 1000, 'partnerId123');
        console.log('Cashout:', cashoutResult);

        const cashinResult = await client.cashin('1234567890', 'serviceCode123', 1000, 'partnerId123');
        console.log('Cashin:', cashinResult);
    } catch (error) {
        console.error('Error:', error);
    }
})();

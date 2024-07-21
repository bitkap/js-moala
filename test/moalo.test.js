const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { createClient } = require('../src');

describe('MoalaClient', () => {
  let mock;
  let client;

  const baseUrl = 'https://api.moala.africa';
  const appKey = 'cfa3a138-47c3-4f86-9fda';
  const secretKey = 'cfa3a138-47c3-4f86-9fda-d4dds3434';

  beforeEach(() => {
    mock = new MockAdapter(axios);
    client = createClient(baseUrl, appKey, secretKey);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should get balance', async () => {
    const responseData = { balance: 1000 };
    mock.onGet('/v1/api/balance').reply(200, responseData);

    const balance = await client.balance();
    expect(balance).toEqual(responseData);
  });

  it('should check transaction', async () => {
    const responseData = { transaction: 'details' };
    const partnerId = 'partnerId123';
    mock.onGet(`/v1/api/transaction/check/${partnerId}`).reply(200, responseData);

    const transaction = await client.checkTransaction(partnerId);
    expect(transaction).toEqual(responseData);
  });

  it('should get KYC details', async () => {
    const responseData = { kyc: 'details' };
    const phoneNumber = '1234567890';
    const serviceCode = 'serviceCode123';
    mock.onGet(`/v1/api/kyc/${serviceCode}/${phoneNumber}`).reply(200, responseData);

    const kycResult = await client.kyc(phoneNumber, serviceCode);
    expect(kycResult).toEqual(responseData);
  });

  it('should perform cashout', async () => {
    const responseData = { success: true };
    const phoneNumber = '1234567890';
    const serviceCode = 'serviceCode123';
    const amount = 1000;
    const partnerId = 'partnerId123';
    mock.onPost('/v1/api/transaction/payment').reply(200, responseData);

    const cashoutResult = await client.cashout(phoneNumber, serviceCode, amount, partnerId);
    expect(cashoutResult).toEqual(responseData);
  });

  it('should perform cashin', async () => {
    const responseData = { success: true };
    const phoneNumber = '1234567890';
    const serviceCode = 'serviceCode123';
    const amount = 1000;
    const partnerId = 'partnerId123';
    mock.onPost('/v1/api/transaction/withdrawal').reply(200, responseData);

    const cashinResult = await client.cashin(phoneNumber, serviceCode, amount, partnerId);
    expect(cashinResult).toEqual(responseData);
  });
});

# Moala SDK for JS

The Moala SDK for JS enables developers to easily integrate Moala API functionality into their JS applications. This SDK supports several operations such as balance checks, transactions checks, KYC checks, cashout, and cash-in.

## Prerequisites

- node js 18 or higher
- npm to manage dependencies

## Installation

You can install the SDK via npm. Add the SDK to your project using the following command:

bash
```
npm install js-moala 
```

## Configuration
To use the SDK, you need an API key and a secret key supplied by Moala. Here's how to configure and initialize the SDK:

```
const { createClient } = require('js-moala');

const baseUrl = 'https://api.moala.africa';
const appKey = 'your_app_key';
const secretKey = 'your_secret_key';

const client = createClient(baseUrl, appKey, secretKey);
```

# Use

## Checking the scale
```
    (async () => {
        try {
            const balance = await client.balance();
            console.log('Balance:', balance);
        } catch (error) {
            console.error('Error:', error);
        }
    })();
```

## Transaction verification
```
(async () => {
    try {
        const transaction = await client.checkTransaction('partnerId123');
        console.log('Transaction:', transaction);
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

## KYC verification
```
(async () => {
    try {
        const kycResult = await client.kyc('1234567890', 'serviceCode123');
        console.log('KYC:', kycResult);
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

## Make a cashin
```
(async () => {
    try {
        const cashinResult = await client.cashin('1234567890', 'serviceCode123', 1000, 'partnerId123');
        console.log('Cashin:', cashinResult);
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

## Make a cashout
```
(async () => {
    try {
        const cashoutResult = await client.cashout('1234567890', 'serviceCode123', 1000, 'partnerId123');
        console.log('Cashout:', cashoutResult);
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

# Error handling
Each method can raise an exception in the event of a query error. Errors are returned as an array containing the error message.

# Support
If you have any questions or problems, please open an issue in our [GitHub repository](https://github.com/bitkap/js-moala/issues).

# Contribution
Contributions to this project are welcome. You can contribute by improving the code, documentation or reporting bugs.

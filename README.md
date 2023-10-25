This repository contains scripts for fetching data from web3endpoints using `ethers.js` v6.

It's a work in progress so scripts will be added as they are needed.

### How to use

You must have Node.js installed on your machine before running the scripts.

To install dependencies, run

```
npm i
```

Create a `.env` file and add your ENDPOINT and PRIVATE_KEY in the .env file

```
ENDPOINT=YOUR_ENDPOINT
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

To run the scripts, run

```
node .\scripts\SCRIPT_NAME.js PARAMETERS
```

eg:

```
node .\scripts\checkBalance.js "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
```

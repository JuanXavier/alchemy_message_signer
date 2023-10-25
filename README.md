This repository contains scripts for fetching data from web3endpoints using `ethers.js` v6.

The scripts are intended to work sending notifications via email and telegram when the balance of an address is below certain threshold. The libraries used for this are `nodemailer` and `node-telegram-bot-api`

It's a work in progress so scripts will be added as they are needed.

### How to use

You must have Node.js installed on your machine before running the scripts.

To install dependencies, run

```
npm i
```

Create a `.env` file and add your ENDPOINT and PRIVATE_KEY in the .env file. You can find an `.env.example` as a guide:

-   **ENDPOINT:** RPC endpoint for the blockchain you want to fetch data from.

-   **PRIVATE_KEY:** Private key of the address you will be sending transactions from (not needed for `balance.js`).

-   **EMAIL_USER:** Email address from which you will send emails.

-   **EMAIL_PASS:** Password of the email address from which you will send emails.

-   **EMAIL_RECIPIENT:** Recipient of the notification emails.

-   **TELEGRAM_TOKEN:** Telegram bot token to access API, obtained from Telegram's BotFather when creating a bot.

-   **TELEGRAM_CHAT_ID:** ID of the chat between bot and user that will be notified.

To run the scripts, run

```
node .\scripts\<YOUR_SCRIPT_NAME>.js YOUR_PARAMETERS
```

eg:

```
node .\scripts\balance.js "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
```

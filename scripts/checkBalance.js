require('dotenv').config()

const nodemailer = require('nodemailer')
const TelegramBot = require('node-telegram-bot-api')
const { ENDPOINT, EMAIL_USER, EMAIL_PASS, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env
const { ethers } = require('ethers')

/* ****************************************************** */
/*                      CHECK BALANCE                     */
/* ****************************************************** */

// const sliceAddr = (address) => {
// 	return address.slice(0, 4) + '...' + address.slice(-4)
// }

// const main = async (targetAddress) => {
// 	const provider = new ethers.JsonRpcProvider(ENDPOINT)

// 	try {
// 		const balance = ethers.formatEther(await provider.getBalance(targetAddress))
// 		const formattedBalance = parseFloat(balance).toFixed(6)
// 		console.log(`BALANCE OF ${sliceAddr(targetAddress)} is ${balance} ETH (SEPOLIA TESTNET)`)
// 	} catch (err) {
// 		console.error('SOMETHING WENT WRONG ' + err)
// 	}
// }

// // Process command-line arguments
// // Assuming the first argument is the target address
// const args = process.argv.slice(2)
// const targetAddress = args[0]

// main(targetAddress)
/* ****************************************************** */
/*                           NEW                          */
/* ****************************************************** */

const TARGET_ADDRESS = '0x1f7972a40f8129a311e6c6a089f87347adc0e244'
const THRESHOLD = 10000

const sliceAddr = (address) => {
	return address.slice(0, 4) + '...' + address.slice(-4)
}

const main = async () => {
	const provider = new ethers.JsonRpcProvider(ENDPOINT)

	try {
		const balanceWei = await provider.getBalance(TARGET_ADDRESS)
		const balanceEther = ethers.formatUnits(balanceWei, 18)
		const formattedBalance = parseFloat(balanceEther).toFixed(6)

		console.log(`BALANCE OF ${sliceAddr(TARGET_ADDRESS)} is ${formattedBalance} ETH`)

		if (formattedBalance < THRESHOLD) {
			// Send an email notification
			const transporter = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					user: EMAIL_USER,
					pass: EMAIL_PASS,
				},
			})

			const mailOptions = {
				from: EMAIL_USER,
				to: 'recipientEmail@example.com', // Replace with recipient's email
				subject: 'Balance Alert',
				text: `Balance of ${sliceAddr(TARGET_ADDRESS)} is below threshold.`,
			}

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.error('Error sending email:', error)
				} else {
					console.log('Email notification sent:', info.response)
				}
			})

			// Send a Telegram notification
			const bot = new TelegramBot(TELEGRAM_TOKEN)
			bot.sendMessage(TELEGRAM_CHAT_ID, `Balance of ${sliceAddr(TARGET_ADDRESS)} is below 10 ETH.`)
		}
	} catch (err) {
		console.error('SOMETHING WENT WRONG ' + err)
	}
}

main()

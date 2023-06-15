require('dotenv').config()
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const { API_URL, PRIVATE_KEY } = process.env

const main = () => {
	const web3 = createAlchemyWeb3(API_URL)
	const message = 'GM'
	const signMessage = web3.eth.accounts.sign(message, PRIVATE_KEY)
	const signer = web3.eth.accounts.recover(message, signMessage.signature)

	try {
		console.log(`Success! Message: ${message}. \nSignature: ${signMessage.signature} \n Signer ${signer}`)
	} catch (err) {
		console.log('Something went wrong while verifying your message signature: ' + err)
	}
}

main()

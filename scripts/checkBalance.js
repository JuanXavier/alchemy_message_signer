require('dotenv').config()
const { ethers } = require('ethers')
const { ENDPOINT } = process.env

const sliceAddr = (address) => {
	return address.slice(0, 4) + '...' + address.slice(-4)
}

const main = async (targetAddress) => {
	const provider = new ethers.JsonRpcProvider(ENDPOINT)

	try {
		const balance = ethers.formatEther(await provider.getBalance(targetAddress))
		const formattedBalance = parseFloat(balance).toFixed(6)
		console.log(`BALANCE OF ${sliceAddr(targetAddress)} is ${formattedBalance} ETH (SEPOLIA TESTNET)`)
	} catch (err) {
		console.error('SOMETHING WENT WRONG ' + err)
	}
}

// Process command-line arguments
const args = process.argv.slice(2)
const targetAddress = args[0] // Assuming the first argument is the target address

main(targetAddress)

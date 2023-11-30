require("dotenv").config();
const { ethers } = require("ethers");
const { ENDPOINT, PRIVATE_KEY } = process.env;

async function transferETH(recipient) {
    const provider = new ethers.providers.JsonRpcProvider(ENDPOINT);
    let sender = new ethers.Wallet(PRIVATE_KEY, provider);

    const tx = await sender.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther("0.01"),
    });
    await tx.wait();
}

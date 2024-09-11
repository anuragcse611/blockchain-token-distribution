const { ethers } = require("ethers");
const fs = require("fs");

async function generateAndSaveAddresses() {
  const mnemonic =
    "test test test test test test test test test test test junk";

  function generateAddresses(mnemonic, count) {
    const addresses = [];
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);

    for (let i = 0; i < count; i++) {
      const wallet = hdNode.deriveChild(i);
      addresses.push(wallet.address);
    }
    return addresses;
  }

  try {
    const addresses = generateAddresses(mnemonic, 10000);

    fs.writeFileSync("addresses.json", JSON.stringify(addresses, null, 2));
    console.log(`Generated and saved ${addresses.length} unique addresses`);

    console.log("Sample of first 5 addresses:");
    addresses.slice(0, 5).forEach((address, index) => {
      console.log(`${index + 1}: ${address}`);
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

generateAndSaveAddresses().catch((error) => {
  console.error(error);
  process.exit(1);
});

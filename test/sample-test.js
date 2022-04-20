const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GSToken", function () {
  it("Mint an NFT", async function () {
    const GSToken = await ethers.getContractFactory("GSToken");
    const gstoken = await GSToken.deploy();
    await gstoken.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await gstoken.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await gstoken.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('1') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await gstoken.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await gstoken.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await gstoken.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});
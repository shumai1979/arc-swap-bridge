const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SwapContract", function () {
  let swapContract;
  let owner;

  beforeEach(async function () {
    // Obtém o contrato
    const SwapContract = await ethers.getContractFactory("SwapContract");
    [owner] = await ethers.getSigners();

    // Implementa o contrato
    swapContract = await SwapContract.deploy();
    await swapContract.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(swapContract.address).to.not.equal(0);
    });
  });

  describe("Swap", function () {
    it("Should emit Swap event when swapping tokens", async function () {
      const fromToken = "0x0000000000000000000000000000000000000000";
      const toToken = "0x0000000000000000000000000000000000000001";
      const amount = ethers.utils.parseEther("1.0");

      await expect(swapContract.swapTokens(fromToken, toToken, amount))
        .to.emit(swapContract, "Swap")
        .withArgs(fromToken, toToken, amount, owner.address);
    });
  });
});
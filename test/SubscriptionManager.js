const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("SubscriptionManager", () => {
  async function deployContracts() {
    const [owner, otherAccount] = await ethers.getSigners();
    const SubManager = await ethers.getContractFactory("SubscriptionManager");
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("Test", "TST");
    const subManager = await SubManager.deploy();
    return { token, subManager, owner, otherAccount };
  }

  describe("Deployment", () => {
    it("Should deploy sub manager and token", async () => {
      const { token, subManager } = await loadFixture(deployContracts);
      const tokenSupply = 1_000_000_000_000;
      expect(await token.totalSupply()).to.equal(tokenSupply);
      expect(await token.name()).to.equal("Test");
    });
  });
});

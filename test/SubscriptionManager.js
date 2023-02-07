const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
// const { BigNumber, ethers } = require("ethers");

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
    it("Can create subscription", async () => {
      const { token, subManager } = await loadFixture(deployContracts);
      const [owner, second, third] = await ethers.getSigners();
      ONE_MONTH_IN_SECS = 30 * 24 * 60 * 60;
      await subManager
        .connect(second)
        .createSubscription(
          third.address,
          ethers.utils.parseEther("5"),
          ONE_MONTH_IN_SECS,
          token.address,
        );
      const newSubscription = await subManager.subscriptions(0);
      expect(newSubscription.payer).to.equal(second.address);
      expect(newSubscription.token).to.equal(token.address);
    });
    it("should emit event", async () => {
      const { token, subManager } = await loadFixture(deployContracts);
      const [, second, third] = await ethers.getSigners();
      const amount = ethers.utils.parseEther("5");
      await expect(
        subManager
          .connect(second)
          .createSubscription(
            third.address,
            amount,
            ONE_MONTH_IN_SECS,
            token.address,
          ),
      )
        .to.emit(subManager, "SubscriptionCreated")
        .withArgs(second.address, third.address, 0, [
          second.address,
          third.address,
          amount,
          token.address,
        ]);
    });
  });
});

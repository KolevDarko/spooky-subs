# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


classDiagram
    class SubscriptionManager {
        + createSubscription(address subscriber, uint256 amount, uint256 duration) external
        + getSubscription(address subscriber) external view returns (uint256, uint256, uint256, uint256)
        + isSubscriber(address addr) external view returns (bool)
        + addSubscriber(address addr) internal
        + removeSubscriber(address addr) internal
        + getSubscriptionFee(uint256 duration) external view returns (uint256)
        - _subscriptionFee(uint256 duration) internal view returns (uint256)
        - _isSubscriptionActive(uint256 startTime, uint256 duration) internal view returns (bool)
        - _addTime(uint256 timestamp, uint256 duration) internal pure returns (uint256)
        - _subscriptions (mapping(address => Subscription))
        - _subscribers (address[])
        - _subscriptionFeeMultiplier (uint256)
        - _minSubscriptionDuration (uint256)
        - _maxSubscriptionDuration (uint256)
        - _owner (address)
    }
    class Subscription {
        uint256 startTime
        uint256 duration
        uint256 amount
        uint256 reward
    }
    SubscriptionManager --> Subscription

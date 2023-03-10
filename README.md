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

```mermaid
sequenceDiagram
    participant Subscriber
    participant SubscriptionManager
    participant Vendor

    Subscriber->>SubscriptionManager: createSubscription(amount, duration)
    SubscriptionManager->>SubscriptionManager: calculate fee and reward
    SubscriptionManager->>Subscriber: sendApprovalRequest(amount + fee)
    Subscriber->>SubscriptionManager: approvePayment()
    SubscriptionManager->>SubscriptionManager: addSubscriber(subscriber)
    SubscriptionManager->>Vendor: sendPaymentRequest(amount + fee - reward)
    Vendor->>SubscriptionManager: payoutSubscription(subscriber)
    SubscriptionManager->>Subscriber: sendReward(reward)
    Subscriber->>SubscriptionManager: cancelSubscription()
    SubscriptionManager->>SubscriptionManager: removeSubscriber(subscriber)

```

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SubscriptionManager {

    struct Subscription {
        address payer;
        address receiver;
        uint256 amount;
        address token;
        uint256 payoutPeriod;
        bool active;
        uint256 lastPayout;
    }
    mapping(uint256 => Subscription) public subscriptions;
    uint256 public subscriptionCounter;

    event SubscriptionCreated(address indexed from, address indexed to, uint256 subscriptionId, Subscription subscription);
    event SubscriptionCanceled(uint256 indexed subscriptionId);
    event Payout(uint256 indexed subscriptionId, uint256 amount, address token);

    function createSubscription(address receiver, uint256 amount, uint256 payoutPeriod, address token) external {
        Subscription memory newSub = Subscription(
            msg.sender,
            receiver,
            amount,
            token,
            payoutPeriod,
            true,
            0
        );
        subscriptions[subscriptionCounter] = newSub;
        subscriptionCounter += 1;
        emit SubscriptionCreated(newSub.payer, newSub.receiver, subscriptionCounter - 1, newSub);
    }

    modifier onlyCreator(uint256 subscriptionId) {
        require(msg.sender == subscriptions[subscriptionId].payer, 'not allowed');
        _;
    }

    function cancelSubscription(uint256 subscriptionId) onlyCreator(subscriptionId) public {
        subscriptions[subscriptionCounter].active = false;
        emit SubscriptionCanceled(subscriptionId);
    }

    function payoutSubscription(uint256 subscriptionId) public {
        Subscription memory sub = subscriptions[subscriptionId];
        require(sub.active, 'subscription inactive');
        require((block.timestamp - sub.lastPayout) >= sub.payoutPeriod, 'Too soon');
        subscriptions[subscriptionId].lastPayout = block.timestamp;
        require(IERC20(sub.token).transferFrom(sub.payer, sub.receiver, sub.amount), 'transfer from failed');
        emit Payout(subscriptionId, sub.amount, sub.token);
    }
    
    function batchPayout(uint256[] memory subscriptionIds) public {
        for(uint256 i; i < subscriptionIds.length; i++) {
            payoutSubscription(subscriptionIds[i]);
        }
    }
}
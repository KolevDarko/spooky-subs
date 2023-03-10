//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract Token is ERC20PresetMinterPauser {
     constructor(string memory name, string memory symbol) ERC20PresetMinterPauser(name, symbol) {
         mint(msg.sender, 1000000000000);
     }
}
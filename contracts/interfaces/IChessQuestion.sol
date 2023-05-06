// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import { Chess } from "../libraries/Chess.sol";
interface IChessQuestion {

    function description() external pure returns (string memory);

    function solve(Chess.chess[] memory) external returns (uint256);

    function check(Chess.chess[] memory, uint) external returns (bool);
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../interfaces/IChessQuestion.sol";
import { Chess } from "../libraries/Chess.sol";
contract Question3 is IChessQuestion {

    function description() external pure returns (string memory) {
        return "Solving question by calculate sum of (index ^ position) * i (i is increased by 1) of pieces. .";
    }

    function solve(Chess.chess[] memory answer) public pure returns (uint256) {
        uint256 answerLength = answer.length;
        uint256 result = 0;
        for (uint256 i=0; i < answerLength; i++) {
            result += (answer[i].piece ** answer[i].index) * (i+1);
        }
        return result;
    }

    function check(Chess.chess[] memory trueAnswer, uint256 answer) external pure returns (bool) {
        return solve(trueAnswer) == answer;
    }
}

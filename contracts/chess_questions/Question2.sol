// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../interfaces/IChessQuestion.sol";
import { Chess } from "../libraries/Chess.sol";
contract Question2 is IChessQuestion {

    function description() external pure returns (string memory) {
        return "Solving question by calculate sum of (piece^2 + position^2) of pieces. .";
    }

    function solve(Chess.chess[] memory answer) public pure returns (uint256) {
        uint256 answerLength = answer.length;
        uint256 result = 0;
        for (uint256 i=0; i < answerLength; i++) {
            result += answer[i].piece ** 2 + answer[i].index ** 2;
        }
        return result;
    }

    function check(Chess.chess[] memory trueAnswer, uint256 answer) external pure returns (bool) {
        return solve(trueAnswer) == answer;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

library Chess {

    struct chess {
        
        /// @notice The pieces are numbered from 0 to 5: pawn=0, rock=1, house=2, bishop=3, queen=4, king=5
        uint8 piece; 
        /// @notice The squares on the chessboard are numbered from 1 to 64 
        uint8 index; 
    }
    


}
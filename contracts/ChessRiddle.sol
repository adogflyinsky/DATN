// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "openzeppelin-solidity/contracts/utils/Context.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/access/AccessControlEnumerable.sol";
import "./libraries/Chess.sol";


contract ChessRiddle is ERC721Enumerable, Ownable, AccessControlEnumerable {

    string private _url;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event Mint(address to,uint256 riddleId);

    constructor(string memory url) ERC721("Chess Riddle", "CR") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _url = url;
    }

    function _baseURI()
        internal
        view
        override
        returns (string memory _newBaseURI)
    {
        return _url;
    }

    function mint(address to, uint256 riddleId) external returns (uint256) {
        require(owner() == _msgSender()||hasRole(MINTER_ROLE,_msgSender()), "Caller is not a minter");
        _mint(to, riddleId);

        emit Mint(to,riddleId);
        return riddleId;
    }

    function listRiddleIds(address owner)external view returns (uint256[] memory riddleIds){
        uint balance = balanceOf(owner);
        uint256[] memory ids = new uint256[](balance);
       
        for( uint i = 0;i<balance;i++)
        {
            ids[i]=tokenOfOwnerByIndex(owner,i);
        }
        return (ids);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

   
   

}

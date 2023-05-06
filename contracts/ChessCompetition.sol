// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./interfaces/IChessQuestion.sol";
import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/security/ReentrancyGuard.sol";
import "./ChessRiddle.sol";

contract ChessCompetition is Ownable, ReentrancyGuard {
    ChessRiddle private chessRiddle;
    IERC20 private token;
    uint256 public totalPrize;

    uint256 public constant QUESTION_NUMBER = 3;
    mapping(address => uint256) public funding;
    mapping(address => uint256) public spendness;
    mapping(address => uint256) public prizeOfParticipant;
    // riddleId -> index in competition.
    mapping(uint256 => uint256) competitionIndex;

    constructor(IERC20 _token, ChessRiddle _chessRiddle) {
        token = _token;
        chessRiddle = _chessRiddle;
    }

    struct CompetitionInfo {
        address owner;
        uint256 riddleId;
        bytes32 hashValue;
        uint256 prize;
        
        address[] participants;
        IChessQuestion[QUESTION_NUMBER] questions;
        uint256[QUESTION_NUMBER] answers;

        uint256 seed;

        uint256 startTime;
        uint256 endTime;
    }
    CompetitionInfo[] public competitions;

    event SetHashAnswer(uint256 riddleId, bytes32 hashValue);
    event SetQuestions(uint256 riddleId, uint256 numOfQuestions);
    event Funding(address investor, uint256 amount);

    error isNotParticipant(address);

    function fund(uint256 _amount) external {

        require(token.balanceOf(msg.sender) >= _amount, "Insufficient amount token to fund.");
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
        funding[msg.sender] += _amount;
        totalPrize += _amount;
    }
    
    function isParticipant(uint256 _riddleId) public view returns(bool) {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        address[] memory participants = competitions[index].participants;
        for (uint256 i=0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                return true;
            }       
        }
        return false;
    }

    function getQuestion(uint256 _riddleId, address _addr) public view returns (uint256) {
        CompetitionInfo memory competition = getCompetition(_riddleId);
        address[] memory participants = competition.participants;
        for (uint256 i=0; i < participants.length; i++) {
            if (participants[i] == _addr) {
                return (competition.seed + i) % competition.questions.length;
            }
        }
        revert isNotParticipant(_addr);
    }

    function fillAnswer(uint256 _riddleId, uint256 answer) external {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 questionIndex = getQuestion(_riddleId, msg.sender);
        uint256 index = competitionIndex[_riddleId];
        competitions[index].answers[questionIndex] = answer;
    }
    


    function createCompetition(uint256 _riddleId, bytes32 _hashValue, uint256 _prize,
                                IChessQuestion[3] memory _questions) public onlyOwner {

        require(!riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        require(competitionIndex[_riddleId] == 0, "This riddle is existing.");
        require(chessRiddle.getApproved(_riddleId) == address(this), "This contract must be approved to transfer the token");
        address owner = chessRiddle.ownerOf(_riddleId);
        require(funding[owner] - spendness[owner] >= _prize, "Insufficient fund to give prize to the competition.");

        chessRiddle.safeTransferFrom(owner, address(this), _riddleId);
        spendness[owner] += _prize;

        CompetitionInfo memory _competition; 
        _competition.owner = owner;
        _competition.riddleId = _riddleId;
        _competition.hashValue = _hashValue;
        _competition.prize = _prize;
        _competition.questions = _questions;

        competitions.push(_competition);

    }



    function joinCompetition(uint256 _riddleId, address _participant) external onlyOwner {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        require(QUESTION_NUMBER > competitions[index].participants.length, "Have enough participants.");
        require(!isParticipant(_riddleId), "This address is attend the competition.");
        competitions[index].participants.push(_participant);


    }


    function startCompetition(uint256 _riddleId, uint256 _startTime, uint256 _endTime) external onlyOwner {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        require(block.timestamp <= _startTime, "Auction can not start");
        require(_startTime < _endTime, "Auction can not end before it starts");
        uint256 index = competitionIndex[_riddleId];
        competitions[index].startTime = _startTime;
        competitions[index].endTime = _endTime;

        // Use VRF to get random value for seed.
        competitions[index].seed = 0;

    }

   
    function finishCompetition(uint256 _riddleId, Chess.chess[] memory trueAnswers) external {
        CompetitionInfo memory competition = getCompetition(_riddleId);
        require(competition.endTime > getTimestamp(), "You can not finish yet.");
        require(competition.hashValue == calculateHashValue(trueAnswers), "It's not right answer.");
        chessRiddle.safeTransferFrom(address(this), competition.owner, _riddleId);

        for (uint i=0; i < competition.participants.length; i++) {
            uint256 index = getQuestion(_riddleId, competition.participants[i]);   
            if (competition.questions[index].check(trueAnswers, competition.answers[index])) {
                prizeOfParticipant[competition.participants[i]] += competition.prize / competition.participants.length;
            }
        }

        _removeCompetition(_riddleId);
    }

    
    function removeCompetition(uint256 _riddleId) external {
        CompetitionInfo memory competition = getCompetition(_riddleId);
        require(competition.endTime > getTimestamp(), "You cannot remove yet.");
        require(competition.owner == msg.sender, "You are not the owner of the riddle");
        _removeCompetition(_riddleId);
        
    }

    function _removeCompetition(uint256 _riddleId) private nonReentrant {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        CompetitionInfo memory lastCompetition = competitions[competitions.length - 1];
        uint256 lastRiddleId = lastCompetition.riddleId;
        competitions[index] = lastCompetition;
        competitionIndex[lastRiddleId] = index;
        competitions.pop();
    }

    function getCompetition(uint256 _riddleId) public view returns (CompetitionInfo memory) {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        CompetitionInfo memory competition = competitions[index];
        return competition;
    }

    // participants, questions, seed, answers

    function calculateHashValue(Chess.chess[] memory trueAnswers) public pure returns(bytes32) {
        return keccak256(abi.encode(trueAnswers));
    }

    function getTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
    
    function riddleIsInCompetitions(uint256 _riddleId) public view returns (bool) {
        if (competitions.length == 0) {
            return false;
        }
        if (competitionIndex[_riddleId] != 0) {
            return true;
        }

        if (competitions[0].riddleId == _riddleId) {
            return true;
        }

        return false;

    }



}

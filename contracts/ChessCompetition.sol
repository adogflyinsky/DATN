// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
import "./interfaces/IChessQuestion.sol";
import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/security/ReentrancyGuard.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";
import "./ChessRiddle.sol";
import "hardhat/console.sol";

contract ChessCompetition is IERC721Receiver, Ownable, ReentrancyGuard {
    ChessRiddle private chessRiddle;
    IERC20 private token;
    uint256 public totalPrize;

    mapping(address => uint256) public funding;
    mapping(address => uint256) public spendness;
    mapping(address => uint256) public prizeOfParticipant;
    
    // riddleId -> index in competition.
    mapping(uint256 => uint256) public competitionIndex;

    
    constructor(IERC20 _token, ChessRiddle _chessRiddle) {

        token = _token;
        chessRiddle = _chessRiddle;
    }

    struct ParticipantToQuestion{
        address participant;
        uint256 questionIndex;
    }

    struct CompetitionInfo {
        address owner;
        uint256 riddleId;
        bytes32 hashValue;
        uint256 prize;
        uint256[] prizeRate; 
        address[] participants;
    
        IChessQuestion[] questions;
        bytes[] answers;

        uint256 answeredNumber;
        uint256 seed;

        uint256 startTime;
        uint256 endTime;
    }
    CompetitionInfo[] public competitions;

    event SetHashAnswer(uint256 riddleId, bytes32 hashValue);
    event SetQuestions(uint256 riddleId, uint256 numOfQuestions);
    event Funding(address investor, uint256 amount);

    error isNotParticipant(address);
    error wasJoinedCompetition(address);

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external override pure returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    // function prize() external view returns(uint256) {
    //     return prizeOfParticipant[msg.sender];
    // }

    function fund(uint256 _amount) external {
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient amount token to fund.");
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
        funding[msg.sender] += _amount;
    }

    function createCompetition(uint256 _riddleId, bytes32 _hashValue, uint256 _prize,uint256[] memory _prizeRate,
                                IChessQuestion[] memory _questions) public onlyOwner {

        require(!riddleIsInCompetitions(_riddleId), "Riddle is in the competition");
        require(_prizeRate.length <= _questions.length, "Not enough questions for participants.");
        require(chessRiddle.getApproved(_riddleId) == address(this), "This contract must be approved to transfer the token");
        address owner = chessRiddle.ownerOf(_riddleId);
        require(funding[owner] - spendness[owner] >= _prize, "Insufficient fund to give prize to the competition.");

        chessRiddle.safeTransferFrom(owner, address(this), _riddleId);
        spendness[owner] += _prize;
        totalPrize += _prize;

        CompetitionInfo memory _competition; 
        _competition.owner = owner;
        _competition.riddleId = _riddleId;
        _competition.hashValue = _hashValue;
        _competition.prize = _prize;
        _competition.prizeRate = _prizeRate;
        _competition.questions = _questions;
        _competition.answers = new bytes[](_questions.length);

        competitionIndex[_riddleId] = competitions.length;
        competitions.push(_competition);
    }



    function joinCompetition(uint256 _riddleId, address _participant) external onlyOwner {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        require(competitions[index].prizeRate.length > competitions[index].participants.length, "Have enough participants.");
        require(!isParticipant(_riddleId, _participant), "This address is attend the competition.");
        competitions[index].participants.push(_participant);
    }


    function startCompetition(uint256 _riddleId, uint256 _startTime, uint256 _endTime) external onlyOwner {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        require(block.timestamp <= _startTime, "Riddle can not start");
        require(_startTime < _endTime, "Riddle can not end before it starts");
        uint256 index = competitionIndex[_riddleId];
        require(competitions[index].startTime == 0, "Competition is started.");
        competitions[index].startTime = _startTime;
        competitions[index].endTime = _endTime;
        
        // Use VRF to get random value for seed.
        competitions[index].seed = 0;
    }

    function isParticipant(uint256 _riddleId, address _addr) public view returns(bool) {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        address[] memory participants = competitions[index].participants;
        for (uint256 i=0; i < participants.length; i++) {
            if (participants[i] == _addr) {
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

    function _sumOfArray(uint256[] memory arr) private pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i=0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
    

    function fillAnswer(uint256 _riddleId, uint256 answer) external {
        //CompetitionInfo memory competition = getCompetition(_riddleId);
        // require(
        //     block.timestamp >= competition.startTime,
        //    // && block.timestamp <= competition.endTime, 
        // "Out of competition time.");
        require(isParticipant(_riddleId, msg.sender), "You need to join the competition first.");
        uint256 index = competitionIndex[_riddleId];
        uint256 questionIndex = getQuestion(_riddleId, msg.sender);
        if (competitions[index].answers[questionIndex].length == 0) {
            competitions[index].answers[questionIndex] = abi.encode(competitions[index].answeredNumber, questionIndex, answer);
            competitions[index].answeredNumber ++;
        } else {
            revert wasJoinedCompetition(msg.sender);
        }
    }
    
    function questionToParticipant(uint256 _riddle, uint256 _questionIndex) public returns (address) {

    }
    
    function finishCompetition(uint256 _riddleId, Chess.chess[] memory trueAnswers) public {
        CompetitionInfo memory competition = getCompetition(_riddleId);
        require(competition.endTime <= getTimestamp(), "You cannot finish yet.");
        require(competition.hashValue == calculateHashValue(trueAnswers), "It's not right answer.");

        chessRiddle.safeTransferFrom(address(this), competition.owner, _riddleId);

        uint256 totalRate = _sumOfArray(competition.prizeRate);
        uint256 rightAnswerCount = 0;
        address[] memory winParticipants = new address[](competition.questions.length);
        
        for (uint256 i = 0; i < competition.answers.length; i++) {
            if (competition.answers[i].length == 0) {
                continue;
            }
            (uint256 order, uint256 questionIndex, uint256 answer) = abi.decode(competition.answers[i],(uint256, uint256, uint256));
            uint256 participantIndex = (questionIndex - competition.seed) % competition.questions.length;

            if (competition.questions[questionIndex].check(trueAnswers, answer)){
                winParticipants[order] = competition.participants[participantIndex];
            } 
       }

       for (uint256 i = 0; i < winParticipants.length; i++) {
            if (winParticipants[i] != address(0)) {
                prizeOfParticipant[winParticipants[i]] += competition.prize * competition.prizeRate[rightAnswerCount] / totalRate ;
                rightAnswerCount ++;
            }
       }
        
        _removeCompetition(_riddleId);   
    }
    
    function removeCompetition(uint256 _riddleId) external {
        CompetitionInfo memory competition = getCompetition(_riddleId);
        require(competition.endTime <= getTimestamp(), "You cannot remove yet.");
        require(owner() == msg.sender, "You are not the owner of the competition.");
        _removeCompetition(_riddleId);
        
    }

    function _removeCompetition(uint256 _riddleId) private nonReentrant {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        CompetitionInfo memory lastCompetition = competitions[competitions.length - 1];
        uint256 lastRiddleId = lastCompetition.riddleId;
        competitions[index] = lastCompetition;
        competitionIndex[lastRiddleId] = index;
        competitionIndex[_riddleId] = 0;
        competitions.pop();
    }

    function getCompetition(uint256 _riddleId) public view returns (CompetitionInfo memory) {
        require(riddleIsInCompetitions(_riddleId), "Riddle is not in the competition");
        uint256 index = competitionIndex[_riddleId];
        CompetitionInfo memory competition = competitions[index];
        return competition;
    }

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

        if (competitionIndex[_riddleId] == 0) {
            if (competitions[0].riddleId == _riddleId) {
                return true;
            } else {
                return false;
            }

        }


        return true;
    }
}

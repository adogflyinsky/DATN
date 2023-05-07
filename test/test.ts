import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { time } from "@nomicfoundation/hardhat-network-helpers";
import * as chai from "chai";
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
import { keccak256 } from 'ethers/lib/utils';

function parseEther(amount: Number) {
  return ethers.utils.parseUnits(amount.toString(), 18);
}

describe("Chess Competition", function () {
  let owner: SignerWithAddress,
    alice: SignerWithAddress,
    bob: SignerWithAddress,
    carol: SignerWithAddress;

  let chessRiddle: Contract;
  let token: Contract;
  let question1: Contract;
  let question2: Contract;
  let question3: Contract;
  let chessCompetition: Contract;

  beforeEach(async () => {
    await ethers.provider.send("hardhat_reset", []);
    [owner, alice, bob, carol] = await ethers.getSigners();
    const provider = new ethers.providers.JsonRpcProvider();

    const Token = await ethers.getContractFactory("VToken", owner);
    token = await Token.deploy();

    const ChessRiddle = await ethers.getContractFactory("ChessRiddle", owner);
    chessRiddle = await ChessRiddle.deploy("https://old.chesstempo.com/chess-problems/");

    const Question1 = await ethers.getContractFactory("Question1", owner);
    question1 = await Question1.deploy();

    const Question2 = await ethers.getContractFactory("Question2", owner);
    question2 = await Question2.deploy();

    const Question3 = await ethers.getContractFactory("Question3", owner);
    question3 = await Question3.deploy();

    const ChessCompetition = await ethers.getContractFactory("ChessCompetition", owner);
    chessCompetition = await ChessCompetition.deploy(token.address, chessRiddle.address);

})
  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
      expect(await chessRiddle.owner()).to.equal(owner.address);
      expect(await chessCompetition.owner()).to.equal(owner.address);
    })
  })

  describe.skip("Test fund function", () => {
    it("Should send correct amount to contract", async () => {
      const amount = parseEther(100);
      await token.approve(chessCompetition.address, amount);
      await chessCompetition.fund(amount);
      expect(await token.balanceOf(chessCompetition.address)).to.equal(amount);
    })

  })
  describe.skip("Test mint a riddle", () => {
    
    it("Should mint to owner", async () => {
      await chessRiddle.mint(owner.address, 1);
      expect(await chessRiddle.ownerOf(1)).to.equal(owner.address);
    })
    it("Shouldn't mint same riddle", async () => {
      await chessRiddle.mint(owner.address, 1);
      await expect(chessRiddle.mint(owner.address, 1)).revertedWith("ERC721: token already minted");
    })
    
  })
  it.skip("test question", async () => {
    console.log(await question1.solve([[1,1], [2,2], [3,3]]));
  })

  it.skip("Test handling multiple competitions", async () => {
    
  })

  it("Test process of chess competition", async () => {
    const amount = parseEther(100);
    await token.approve(chessCompetition.address, amount);
    await chessCompetition.fund(amount);

    await chessRiddle.mint(owner.address, 1);
  
    await chessRiddle.approve(chessCompetition.address, 1);
    // riddleId:1  answer: [[1,1], [2,2], [3,3]] hashValue: 0xb5672d6fe0207c1087edf51a6e4e0ef81074588064c998d54dcb6712b4bb69a6


    const hashValue = '0xb5672d6fe0207c1087edf51a6e4e0ef81074588064c998d54dcb6712b4bb69a6';
    const byteArr = ethers.utils.arrayify(hashValue);

    //createCompetition(uint256 _riddleId, bytes32 _hashValue, uint256 _prize,uint256[] memory _prizeRate, IChessQuestion[QUESTION_NUMBER] memory _questions)
    await chessCompetition.createCompetition(1, byteArr, parseEther(100),[2,2,1], [question1.address, question2.address, question3.address])

    // function joinCompetition(uint256 _riddleId, address _participant) external onlyOwner
    await chessCompetition.joinCompetition(1, owner.address);
    await chessCompetition.joinCompetition(1, carol.address);

    const currentTime = BigInt(await chessCompetition.getTimestamp());
    const startTime = (currentTime/100n + 30n) * 100n;
    const endTime = (currentTime/100n + 60n) * 100n;
    await chessCompetition.startCompetition(1, startTime, endTime);

    await time.increaseTo(endTime);
    await chessCompetition.fillAnswer(1, 14);
    //await chessCompetition.connect(alice.address).fillAnswer(1, 28)
    
    // console.log(await chessCompetition.getCompetition(1));

    //function finishCompetition(uint256 _riddleId, Chess.chess[] memory trueAnswers) external
    await chessCompetition.finishCompetition(1, [[1,1], [2,2], [3,3]])
    console.log(await chessCompetition.prize())







  })


});

import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
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

    
    const Token = await ethers.getContractFactory("VToken", owner);
    token = await Token.deploy();
    // await token.deployed();
    const ChessRiddle = await ethers.getContractFactory("ChessRiddle", owner);
    chessRiddle = await ChessRiddle.deploy("https://old.chesstempo.com/chess-problems/");
    // await chessRiddle.deployed();
    const Question1 = await ethers.getContractFactory("Question1", owner);
    question1 = await Question1.deploy();
    // await question1.deployed();
    const Question2 = await ethers.getContractFactory("Question2", owner);
    question2 = await Question2.deploy();
    // await question2.deployed();
    const Question3 = await ethers.getContractFactory("Question3", owner);
    question3 = await Question3.deploy();
    // await question3.deployed();
    const ChessCompetition = await ethers.getContractFactory("ChessCompetition", owner);
    chessCompetition = await ChessCompetition.deploy(token.address, chessRiddle.address);
    // await chessCompetition.deployed();
})
  describe.skip("Deployment", () => {
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
  describe("Test mint a riddle", async () => {
    
    it("Should mint to owner", async () => {
      await chessRiddle.mint(owner.address, 1);
      expect(await chessRiddle.ownerOf(1)).to.equal(owner.address);
    })
    it("Shouldn't mint same riddle", async () => {
      await chessRiddle.mint(owner.address, 1);
      await expect(chessRiddle.mint(owner.address, 1)).revertedWith("ERC721: token already minted");
    })
    
  })

  it("Test chess competition", async () => {
    const amount = parseEther(100);
    await token.approve(chessCompetition.address, amount);
    await chessCompetition.fund(amount);

    await chessRiddle.mint(owner.address, 1);
    await chessRiddle.approve(chessCompetition.address, 1);
    // riddleId:1  answer: [[1,1], [2,2], [3,3]] hashValue: 0xb5672d6fe0207c1087edf51a6e4e0ef81074588064c998d54dcb6712b4bb69a6

    // createCompetition(uint256 _riddleId, bytes32 _hashValue, uint256 _prize,IChessQuestion[3] memory _questions)
    const hashValue = '0xb5672d6fe0207c1087edf51a6e4e0ef81074588064c998d54dcb6712b4bb69a6';
    const byteArr = ethers.utils.arrayify(hashValue);

    await chessCompetition.createCompetition(1, byteArr, parseEther(100), [question1.address, question2.address, question3.address])
  })


});

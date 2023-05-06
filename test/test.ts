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

describe("Chess Riddle", function () {
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
    const ChessRiddle = await ethers.getContractFactory("ChessRiddle", owner);
    chessRiddle = await ChessRiddle.deploy("https://old.chesstempo.com/chess-problems/");
    const Question1 = await ethers.getContractFactory("Question1", owner);
    question1 = await Question1.deploy();
    const Question2 = await ethers.getContractFactory("Question2", owner);
    question2 = await Question2.deploy();
    const Question3 = await ethers.getContractFactory("Question3", owner);
    question3 = await Question3.deploy();
    const ChessCompetition = await ethers.getContractFactory("ChessCompetition", owner);
    chessCompetition = await ChessCompetition.deploy(token.address);
    
})

  ////// Happy Path
  it("Create a competition", async () => {
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(500*10**3));
    expect(await token.balanceOf(vault.address)).equal(parseEther(500 * 10**3));
  });
  it("Start a competition", async () => {
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(1*10**6));

    // alice deposit into the vault
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(500*10**3));

    // bob withdraw into alice address
    await vault.connect(bob).withdraw(parseEther(300*10**3),alice.address);
    
    expect(await token.balanceOf(vault.address)).equal(parseEther(200 * 10**3));
    expect(await token.balanceOf(alice.address)).equal(parseEther(800 * 10**3));
  });
  it("Join a competition", async () => {
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await expect (vault.connect(alice).deposit(parseEther(2 * 10**6))).revertedWith('Insufficient account balance');
  });
  it("Answer the questions", async () => {
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(false);
    await vault.setMaxWithdrawAmount(parseEther(1*10**6));

    // alice deposit into the vault
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(500*10**3));

    // bob withdraw into alice address
    await expect (vault.connect(bob).withdraw(parseEther(300*10**3),alice.address)).revertedWith('Withdraw is not available');
   
  });
  it("Finish the qestions ", async () => {
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(1*10**3));

    // alice deposit into the vault
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(500*10**3));

    // bob withdraw into alice address
    await expect (vault.connect(bob).withdraw(parseEther(2*10**3),alice.address)).revertedWith('Exceed maximum amount');
   
  });
  it("Check prize", async () => {
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(1*10**3));

    // alice deposit into the vault
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(500*10**3));

    // bob withdraw into alice address
    await expect (vault.connect(carol).withdraw(parseEther(1*10**3),alice.address)).revertedWith('Caller is not a withdrawer');
   
  })
  it("Should not withdraw, ERC20: transfer amount exceeds balance", async () => {
    //grant withdrawer role to Bob
    let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
    await vault.grantRole(WITHDRAWER_ROLE, bob.address);

    // setter vault functions

    await vault.setWithdrawEnable(true);
    await vault.setMaxWithdrawAmount(parseEther(5*10**3));

    // alice deposit into the vault
    await token.transfer(alice.address,parseEther(1 * 10**6));
    await token.connect(alice).approve(vault.address,token.balanceOf(alice.address));
    await vault.connect(alice).deposit(parseEther(2*10**3));

    // bob withdraw into alice address
    await expect (vault.connect(bob).withdraw(parseEther(3*10**3),alice.address)).revertedWith('ERC20: transfer amount exceeds balance');
   
  })
});

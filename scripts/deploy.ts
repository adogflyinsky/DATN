import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [owner] = await ethers.getSigners();
    console.log('deploy from address: ', owner.address);


    const Token = await ethers.getContractFactory("VToken", owner);
    const token = await Token.deploy();
    console.log('VTken address: ', token.address);
    Config.setConfig(network + '.VToken', token.address);

    const ChessRiddle = await ethers.getContractFactory("ChessRiddle", owner);
    const chessRiddle = await ChessRiddle.deploy("https://old.chesstempo.com/chess-problems/");
    console.log('chessRiddle address: ', chessRiddle.address);
    Config.setConfig(network + '.chessRiddle', chessRiddle.address);

    const Question1 = await ethers.getContractFactory("Question1", owner);
    const question1 = await Question1.deploy();
    console.log('question1 address: ', question1.address);
    Config.setConfig(network + '.question1', question1.address);

    const Question2 = await ethers.getContractFactory("Question2", owner);
    const question2 = await Question2.deploy();
    console.log('question2 address: ', question2.address);
    Config.setConfig(network + '.question2', question2.address);

    const Question3 = await ethers.getContractFactory("Question3", owner);
    const  question3 = await Question3.deploy();
    console.log('question3 address: ', question3.address);
    Config.setConfig(network + '.question3', question3.address);

    const ChessCompetition = await ethers.getContractFactory("ChessCompetition", owner);
    const chessCompetition = await ChessCompetition.deploy(token.address, chessRiddle.address);
    console.log('chessCompetition address: ', chessCompetition.address);
    Config.setConfig(network + '.chessCompetition', chessCompetition.address);

    await Config.updateConfig();
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});

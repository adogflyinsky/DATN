import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);

    const VToken = await ethers.getContractFactory("VToken");
    const vToken = await VToken.deploy();
    console.log('VTken address: ', vToken.address);
    Config.setConfig(network + '.VToken', vToken.address);


    await Config.updateConfig();
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});

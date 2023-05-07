/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Question3,
  Question3Interface,
} from "../../../contracts/chess_questions/Question3";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "piece",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8",
          },
        ],
        internalType: "struct Chess.chess[]",
        name: "trueAnswer",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "answer",
        type: "uint256",
      },
    ],
    name: "check",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "piece",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8",
          },
        ],
        internalType: "struct Chess.chess[]",
        name: "answer",
        type: "tuple[]",
      },
    ],
    name: "solve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061096d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637284e41614610046578063b0db5c5014610064578063e75e440914610094575b600080fd5b61004e6100c4565b60405161005b919061027b565b60405180910390f35b61007e60048036038101906100799190610487565b6100e4565b60405161008b91906104e9565b60405180910390f35b6100ae60048036038101906100a99190610530565b6101d6565b6040516100bb91906105a7565b60405180910390f35b60606040518060800160405280605e81526020016108da605e9139905090565b600080825190506000806002836100fb91906105f1565b1461013b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101329061066e565b60405180910390fd5b60005b828110156101cb5760018161015391906106bd565b85600081518110610167576101666106f1565b5b60200260200101516020015186600081518110610187576101866106f1565b5b60200260200101516000015161019d9190610853565b60ff166101aa919061087f565b826101b591906106bd565b91506002816101c491906106bd565b905061013e565b508092505050919050565b6000816101e2846100e4565b14905092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561022557808201518184015260208101905061020a565b60008484015250505050565b6000601f19601f8301169050919050565b600061024d826101eb565b61025781856101f6565b9350610267818560208601610207565b61027081610231565b840191505092915050565b600060208201905081810360008301526102958184610242565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6102ee82610231565b810181811067ffffffffffffffff8211171561030d5761030c6102b6565b5b80604052505050565b600061032061029d565b905061032c82826102e5565b919050565b600067ffffffffffffffff82111561034c5761034b6102b6565b5b602082029050602081019050919050565b600080fd5b600080fd5b600060ff82169050919050565b61037d81610367565b811461038857600080fd5b50565b60008135905061039a81610374565b92915050565b6000604082840312156103b6576103b5610362565b5b6103c06040610316565b905060006103d08482850161038b565b60008301525060206103e48482850161038b565b60208301525092915050565b60006104036103fe84610331565b610316565b905080838252602082019050604084028301858111156104265761042561035d565b5b835b8181101561044f578061043b88826103a0565b845260208401935050604081019050610428565b5050509392505050565b600082601f83011261046e5761046d6102b1565b5b813561047e8482602086016103f0565b91505092915050565b60006020828403121561049d5761049c6102a7565b5b600082013567ffffffffffffffff8111156104bb576104ba6102ac565b5b6104c784828501610459565b91505092915050565b6000819050919050565b6104e3816104d0565b82525050565b60006020820190506104fe60008301846104da565b92915050565b61050d816104d0565b811461051857600080fd5b50565b60008135905061052a81610504565b92915050565b60008060408385031215610547576105466102a7565b5b600083013567ffffffffffffffff811115610565576105646102ac565b5b61057185828601610459565b92505060206105828582860161051b565b9150509250929050565b60008115159050919050565b6105a18161058c565b82525050565b60006020820190506105bc6000830184610598565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006105fc826104d0565b9150610607836104d0565b925082610617576106166105c2565b5b828206905092915050565b7f57726f6e6720616e737765720000000000000000000000000000000000000000600082015250565b6000610658600c836101f6565b915061066382610622565b602082019050919050565b600060208201905081810360008301526106878161064b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006106c8826104d0565b91506106d3836104d0565b92508282019050808211156106eb576106ea61068e565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115610777578086048111156107535761075261068e565b5b60018516156107625780820291505b808102905061077085610720565b9450610737565b94509492505050565b600082610790576001905061084c565b8161079e576000905061084c565b81600181146107b457600281146107be576107ed565b600191505061084c565b60ff8411156107d0576107cf61068e565b5b8360020a9150848211156107e7576107e661068e565b5b5061084c565b5060208310610133831016604e8410600b84101617156108225782820a90508381111561081d5761081c61068e565b5b61084c565b61082f848484600161072d565b925090508184048111156108465761084561068e565b5b81810290505b9392505050565b600061085e82610367565b915061086983610367565b925061087760ff8484610780565b905092915050565b600061088a826104d0565b9150610895836104d0565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156108ce576108cd61068e565b5b82820290509291505056fe536f6c76696e67207175657374696f6e2062792063616c63756c6174652073756d206f662028696e646578205e20706f736974696f6e29202a206920286920697320696e63726561736564206279203129206f66207069656365732e202ea264697066735822122039caf4f557f28134141128d1f4af04a839bb28e57ec1c85ab2cb9c3f6f40ca9f64736f6c63430008100033";

type Question3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Question3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Question3__factory extends ContractFactory {
  constructor(...args: Question3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Question3> {
    return super.deploy(overrides || {}) as Promise<Question3>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Question3 {
    return super.attach(address) as Question3;
  }
  override connect(signer: Signer): Question3__factory {
    return super.connect(signer) as Question3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Question3Interface {
    return new utils.Interface(_abi) as Question3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Question3 {
    return new Contract(address, _abi, signerOrProvider) as Question3;
  }
}

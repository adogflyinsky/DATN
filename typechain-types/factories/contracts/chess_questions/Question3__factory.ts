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
  "0x608060405234801561001057600080fd5b50610897806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80637284e41614610046578063b0db5c5014610064578063e75e440914610094575b600080fd5b61004e6100c4565b60405161005b9190610229565b60405180910390f35b61007e60048036038101906100799190610435565b6100e4565b60405161008b9190610497565b60405180910390f35b6100ae60048036038101906100a991906104de565b610184565b6040516100bb9190610555565b60405180910390f35b60606040518060800160405280605e8152602001610804605e9139905090565b600080825190506000805b8281101561017957600181610104919061059f565b858281518110610117576101166105d3565b5b602002602001015160200151868381518110610136576101356105d3565b5b60200260200101516000015161014c9190610735565b60ff166101599190610761565b82610164919061059f565b91508080610171906107bb565b9150506100ef565b508092505050919050565b600081610190846100e4565b14905092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156101d35780820151818401526020810190506101b8565b60008484015250505050565b6000601f19601f8301169050919050565b60006101fb82610199565b61020581856101a4565b93506102158185602086016101b5565b61021e816101df565b840191505092915050565b6000602082019050818103600083015261024381846101f0565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61029c826101df565b810181811067ffffffffffffffff821117156102bb576102ba610264565b5b80604052505050565b60006102ce61024b565b90506102da8282610293565b919050565b600067ffffffffffffffff8211156102fa576102f9610264565b5b602082029050602081019050919050565b600080fd5b600080fd5b600060ff82169050919050565b61032b81610315565b811461033657600080fd5b50565b60008135905061034881610322565b92915050565b60006040828403121561036457610363610310565b5b61036e60406102c4565b9050600061037e84828501610339565b600083015250602061039284828501610339565b60208301525092915050565b60006103b16103ac846102df565b6102c4565b905080838252602082019050604084028301858111156103d4576103d361030b565b5b835b818110156103fd57806103e9888261034e565b8452602084019350506040810190506103d6565b5050509392505050565b600082601f83011261041c5761041b61025f565b5b813561042c84826020860161039e565b91505092915050565b60006020828403121561044b5761044a610255565b5b600082013567ffffffffffffffff8111156104695761046861025a565b5b61047584828501610407565b91505092915050565b6000819050919050565b6104918161047e565b82525050565b60006020820190506104ac6000830184610488565b92915050565b6104bb8161047e565b81146104c657600080fd5b50565b6000813590506104d8816104b2565b92915050565b600080604083850312156104f5576104f4610255565b5b600083013567ffffffffffffffff8111156105135761051261025a565b5b61051f85828601610407565b9250506020610530858286016104c9565b9150509250929050565b60008115159050919050565b61054f8161053a565b82525050565b600060208201905061056a6000830184610546565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105aa8261047e565b91506105b58361047e565b92508282019050808211156105cd576105cc610570565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008160011c9050919050565b6000808291508390505b60018511156106595780860481111561063557610634610570565b5b60018516156106445780820291505b808102905061065285610602565b9450610619565b94509492505050565b600082610672576001905061072e565b81610680576000905061072e565b816001811461069657600281146106a0576106cf565b600191505061072e565b60ff8411156106b2576106b1610570565b5b8360020a9150848211156106c9576106c8610570565b5b5061072e565b5060208310610133831016604e8410600b84101617156107045782820a9050838111156106ff576106fe610570565b5b61072e565b610711848484600161060f565b9250905081840481111561072857610727610570565b5b81810290505b9392505050565b600061074082610315565b915061074b83610315565b925061075960ff8484610662565b905092915050565b600061076c8261047e565b91506107778361047e565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156107b0576107af610570565b5b828202905092915050565b60006107c68261047e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036107f8576107f7610570565b5b60018201905091905056fe536f6c76696e67207175657374696f6e2062792063616c63756c6174652073756d206f662028696e646578205e20706f736974696f6e29202a206920286920697320696e63726561736564206279203129206f66207069656365732e202ea2646970667358221220eb7efaa3c77beecf5656da268f342468bc69fcf30168e4b4555185e211ffef4764736f6c63430008100033";

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

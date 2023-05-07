/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace Chess {
  export type ChessStruct = {
    piece: PromiseOrValue<BigNumberish>;
    index: PromiseOrValue<BigNumberish>;
  };

  export type ChessStructOutput = [number, number] & {
    piece: number;
    index: number;
  };
}

export interface Question3Interface extends utils.Interface {
  functions: {
    "check((uint8,uint8)[],uint256)": FunctionFragment;
    "description()": FunctionFragment;
    "solve((uint8,uint8)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "check" | "description" | "solve"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "check",
    values: [Chess.ChessStruct[], PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "description",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "solve",
    values: [Chess.ChessStruct[]]
  ): string;

  decodeFunctionResult(functionFragment: "check", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "description",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "solve", data: BytesLike): Result;

  events: {};
}

export interface Question3 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: Question3Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    check(
      trueAnswer: Chess.ChessStruct[],
      answer: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    description(overrides?: CallOverrides): Promise<[string]>;

    solve(
      answer: Chess.ChessStruct[],
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  check(
    trueAnswer: Chess.ChessStruct[],
    answer: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  description(overrides?: CallOverrides): Promise<string>;

  solve(
    answer: Chess.ChessStruct[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    check(
      trueAnswer: Chess.ChessStruct[],
      answer: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    description(overrides?: CallOverrides): Promise<string>;

    solve(
      answer: Chess.ChessStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    check(
      trueAnswer: Chess.ChessStruct[],
      answer: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    description(overrides?: CallOverrides): Promise<BigNumber>;

    solve(
      answer: Chess.ChessStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    check(
      trueAnswer: Chess.ChessStruct[],
      answer: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    description(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    solve(
      answer: Chess.ChessStruct[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

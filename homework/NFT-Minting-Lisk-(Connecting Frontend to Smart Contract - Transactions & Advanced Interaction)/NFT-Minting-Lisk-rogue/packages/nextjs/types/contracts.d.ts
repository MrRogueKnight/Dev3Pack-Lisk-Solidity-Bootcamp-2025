import type { Abi, Address as ViemAddress, AbiParameter } from 'viem';

declare module "~~/utils/scaffold-eth/contract" {
  // Base contract type
  export interface Contract<TAbi = Abi> {
    address: ViemAddress;
    abi: TAbi;
  }

  // Contract name type
  export type ContractName = string;

  // Contract deployment status
  export enum ContractCodeStatus {
    "LOADING",
    "DEPLOYED",
    "NOT_FOUND"
  }

  // Generic contracts declaration (by chainId -> contractName -> declaration)
  export type GenericContractsDeclaration = Record<number, Record<string, { address: ViemAddress; abi: Abi }>>;

  // Merged contracts constant exported by module
  export const contracts: GenericContractsDeclaration;

  // Tuple helper expected by debug components
  export type AbiParameterTuple = readonly AbiParameter[];

  // GenericContract and InheritedFunctions helpers
  export type GenericContract = Contract<Abi>;
  export type InheritedFunctions = Record<string, string>;

  // Scaffold contract read config (generic)
  export interface UseScaffoldReadConfig<TContract extends ContractName = ContractName, TFunctionName extends string = string> {
    contractName: TContract;
    functionName: TFunctionName;
    args?: unknown[];
    watch?: boolean;
    enabled?: boolean;
  }

  // Scaffold contract write config (generic)
  export interface UseScaffoldWriteConfig<TContract extends ContractName = ContractName, TFunctionName extends string = string> {
    contractName: TContract;
    functionName: TFunctionName;
    args?: unknown[];
    onBlockConfirmation?: (txnReceipt: any) => void;
    blockConfirmations?: number;
    value?: bigint;
  }

  // Event filters alias
  export type ContractEventFilters = Record<string, any>;

  // Event history config (generic)
  export interface UseScaffoldEventHistoryConfig<TContract extends ContractName = ContractName, TEventName extends string = string> {
    contractName: TContract;
    eventName: TEventName;
    fromBlock: bigint;
    filters?: ContractEventFilters;
    blockData?: boolean;
    transactionData?: boolean;
    receipt?: boolean;
    watch?: boolean;
    enabled?: boolean;
  }

  // Event subscriber config (generic)
  export interface UseScaffoldEventConfig<TContract extends ContractName = ContractName, TEventName extends string = string> {
    contractName: TContract;
    eventName: TEventName;
    listener: (...args: any[]) => void;
    once?: boolean;
  }

  // ABI type for YourContract (non-duplicated, consumable alias)
  export type YourContractAbi = [
    // ERC721 Standard Functions
    { type: "function"; name: "balanceOf"; inputs: [{ name: "owner"; type: "address" }]; outputs: [{ type: "uint256" }]; stateMutability: "view" },
    { type: "function"; name: "ownerOf"; inputs: [{ name: "tokenId"; type: "uint256" }]; outputs: [{ type: "address" }]; stateMutability: "view" },
    { type: "function"; name: "safeTransferFrom"; inputs: [{ name: "from"; type: "address" }, { name: "to"; type: "address" }, { name: "tokenId"; type: "uint256" }]; outputs: []; stateMutability: "nonpayable" },
    { type: "function"; name: "transferFrom"; inputs: [{ name: "from"; type: "address" }, { name: "to"; type: "address" }, { name: "tokenId"; type: "uint256" }]; outputs: []; stateMutability: "nonpayable" },
    { type: "function"; name: "approve"; inputs: [{ name: "to"; type: "address" }, { name: "tokenId"; type: "uint256" }]; outputs: []; stateMutability: "nonpayable" },
    { type: "function"; name: "getApproved"; inputs: [{ name: "tokenId"; type: "uint256" }]; outputs: [{ type: "address" }]; stateMutability: "view" },
    { type: "function"; name: "setApprovalForAll"; inputs: [{ name: "operator"; type: "address" }, { name: "approved"; type: "bool" }]; outputs: []; stateMutability: "nonpayable" },
    { type: "function"; name: "isApprovedForAll"; inputs: [{ name: "owner"; type: "address" }, { name: "operator"; type: "address" }]; outputs: [{ type: "bool" }]; stateMutability: "view" },
    { type: "function"; name: "safeTransferFrom"; inputs: [{ name: "from"; type: "address" }, { name: "to"; type: "address" }, { name: "tokenId"; type: "uint256" }, { name: "data"; type: "bytes" }]; outputs: []; stateMutability: "nonpayable" },

    // ERC721 Metadata
    { type: "function"; name: "name"; inputs: []; outputs: [{ type: "string" }]; stateMutability: "view" },
    { type: "function"; name: "symbol"; inputs: []; outputs: [{ type: "string" }]; stateMutability: "view" },
    { type: "function"; name: "tokenURI"; inputs: [{ name: "tokenId"; type: "uint256" }]; outputs: [{ type: "string" }]; stateMutability: "view" },

    // Custom Functions
    { type: "function"; name: "maxSupply"; inputs: []; outputs: [{ type: "uint256" }]; stateMutability: "view" },
    { type: "function"; name: "totalCounter"; inputs: []; outputs: [{ type: "uint256" }]; stateMutability: "view" },
    { type: "function"; name: "hasMinted"; inputs: [{ name: "address"; type: "address" }]; outputs: [{ type: "bool" }]; stateMutability: "view" },
    { type: "function"; name: "mintNFT"; inputs: []; outputs: []; stateMutability: "nonpayable" },

    // Ownable Functions
    { type: "function"; name: "owner"; inputs: []; outputs: [{ type: "address" }]; stateMutability: "view" },
    { type: "function"; name: "renounceOwnership"; inputs: []; outputs: []; stateMutability: "nonpayable" },
    { type: "function"; name: "transferOwnership"; inputs: [{ name: "newOwner"; type: "address" }]; outputs: []; stateMutability: "nonpayable" },

    // Events
    { type: "event"; name: "Approval"; inputs: [{ name: "owner"; type: "address"; indexed: true }, { name: "approved"; type: "address"; indexed: true }, { name: "tokenId"; type: "uint256"; indexed: true }]; anonymous: false },
    { type: "event"; name: "ApprovalForAll"; inputs: [{ name: "owner"; type: "address"; indexed: true }, { name: "operator"; type: "address"; indexed: true }, { name: "approved"; type: "bool"; indexed: false }]; anonymous: false },
    { type: "event"; name: "OwnershipTransferred"; inputs: [{ name: "previousOwner"; type: "address"; indexed: true }, { name: "newOwner"; type: "address"; indexed: true }]; anonymous: false },
    { type: "event"; name: "Transfer"; inputs: [{ name: "from"; type: "address"; indexed: true }, { name: "to"; type: "address"; indexed: true }, { name: "tokenId"; type: "uint256"; indexed: true }]; anonymous: false }
  ];
}

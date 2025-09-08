import type { 
  Abi,
  AbiParameter,
  ExtractAbiEvent,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  AbiParametersToPrimitiveTypes,
  AbiParameterToPrimitiveType,
} from "abitype";
import type {
  GetEventArgs,
  GetFunctionArgs,
  Log,
  TransactionReceipt,
  Block,
  GetTransactionReturnType,
  GetTransactionReceiptReturnType
} from "viem";
import deployedContractsData from "~~/contracts/deployedContracts";
import externalContractsData from "~~/contracts/externalContracts";

// Import from wagmi directly to avoid version conflicts
import type { 
  UseContractEventConfig as WagmiUseContractEventConfig,
  UseContractReadConfig as WagmiUseContractReadConfig,
  UseContractWriteConfig as WagmiUseContractWriteConfig
} from "wagmi";

// Re-export types for backward compatibility
export type {
  Abi as AbiType,
  ExtractAbiEvent,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  GetEventArgs,
  GetFunctionArgs,
  Log,
  TransactionReceipt,
  AbiParameter,
  AbiParametersToPrimitiveTypes,
  AbiParameterToPrimitiveType,
  Block,
  GetTransactionReturnType,
  GetTransactionReceiptReturnType
};

// Additional exported helper types
export type AbiParameterTuple = readonly AbiParameter[];

// Core contract types
type ContractName = keyof typeof deployedContractsData & keyof typeof externalContractsData & string;

type ContractConfig = {
  address: string;
  abi: Abi;
  inheritedFunctions?: Record<string, string>;
};

type Contract<TContractName extends ContractName = ContractName> = 
  TContractName extends keyof typeof deployedContractsData
    ? typeof deployedContractsData[TContractName][keyof typeof deployedContractsData[TContractName]]
    : TContractName extends keyof typeof externalContractsData
    ? typeof externalContractsData[TContractName][keyof typeof externalContractsData[TContractName]]
    : never;

// Single source of truth for ContractAbi type
type ContractAbi<TContractName extends ContractName = ContractName> = 
  Contract<TContractName>['abi'];

// Helper type for contract address
type ContractAddress<TContractName extends ContractName> = 
  Contract<TContractName>['address'];

// Helper type for contract function names
type ContractFunctionNames<TAbi extends Abi> = 
  TAbi[number] extends { type: 'function'; name: infer TName } 
    ? TName & string 
    : never;

// Helper type for contract event names
type ContractEventNames<TAbi extends Abi> = 
  TAbi[number] extends { type: 'event'; name: infer TName } 
    ? TName & string 
    : never;

// Re-export wagmi types with our own names to avoid conflicts
export type UseContractEventConfig<TAbi extends Abi> = WagmiUseContractEventConfig<TAbi>;
export type UseContractReadConfig<TAbi extends Abi> = WagmiUseContractReadConfig<TAbi>;
export type UseContractWriteConfig<TAbi extends Abi> = WagmiUseContractWriteConfig<TAbi>;

// Type for adding external flag to contracts
type AddExternalFlag<T> = T & { isExternal?: boolean };

// Type for contract function parameters
type ContractFunctionParameters<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<
  Extract<
    TAbi[number],
    { type: 'function'; name: TFunctionName }
  >['inputs']
>;

// Type for contract function return type
type ContractFunctionReturnType<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionNames<TAbi>
> = AbiParametersToPrimitiveTypes<
  Extract<
    TAbi[number],
    { type: 'function'; name: TFunctionName }
  >['outputs']
>;

// Type for contract event filters
type ContractEventFilters<
  TAbi extends Abi,
> = {
  [K in ContractEventNames<TAbi>]?: any;
};

// Type for contract event data
type ContractEventData<
  TAbi extends Abi,
  TEventName extends ContractEventNames<TAbi>
> = {
  eventName: TEventName;
  args: AbiParametersToPrimitiveTypes<
    Extract<
      TAbi[number],
      { type: 'event'; name: TEventName }
    >['inputs']
  >;
  log: Log;
  block: Block;
  transaction: GetTransactionReturnType;
  receipt: GetTransactionReceiptReturnType;
};

// Type for scaffold contract read config
type UseScaffoldReadConfig<
  TContractName extends ContractName,
  TFunctionName extends ContractFunctionNames<ContractAbi<TContractName>>
> = Omit<
  UseContractReadConfig<ContractAbi<TContractName>>,
  'address' | 'abi' | 'functionName' | 'args'
> & {
  contractName: TContractName;
  functionName: TFunctionName;
  args?: ContractFunctionParameters<ContractAbi<TContractName>, TFunctionName>;
};

// Type for scaffold contract write config
type UseScaffoldWriteConfig<
  TContractName extends ContractName,
  TFunctionName extends ContractFunctionNames<ContractAbi<TContractName>>
> = Omit<
  UseContractWriteConfig<ContractAbi<TContractName>>,
  'address' | 'abi' | 'functionName' | 'args' | 'mode'
> & {
  contractName: TContractName;
  functionName: TFunctionName;
  args?: ContractFunctionParameters<ContractAbi<TContractName>, TFunctionName>;
  onBlockConfirmation?: (txnReceipt: TransactionReceipt) => void;
  blockConfirmations?: number;
};

// Type for scaffold event config
type UseScaffoldEventConfig<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>
> = Omit<
  UseContractEventConfig<ContractAbi<TContractName>>,
  'address' | 'abi' | 'eventName' | 'listener'
> & {
  contractName: TContractName;
  eventName: TEventName;
  listener: (event: ContractEventData<ContractAbi<TContractName>, TEventName>) => void;
};

// Type for scaffold event history config
type UseScaffoldEventHistoryConfig<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false
> = {
  contractName: TContractName;
  eventName: TEventName;
  fromBlock: bigint;
  filters?: ContractEventFilters<ContractAbi<TContractName>>;
  blockData?: TBlockData;
  transactionData?: TTransactionData;
  receiptData?: TReceiptData;
  watch?: boolean;
  enabled?: boolean;
  select?: (data: ContractEventData<ContractAbi<TContractName>, TEventName>[]) => any;
};

// Type for scaffold event history data
type UseScaffoldEventHistoryData<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false
> = {
  events: Array<{
    eventName: TEventName;
    args: AbiParametersToPrimitiveTypes<
      Extract<
        ContractAbi<TContractName>[number],
        { type: 'event'; name: TEventName }
      >['inputs']
    >;
    log: Log;
    block: TBlockData extends true ? Block : null;
    transaction: TTransactionData extends true ? GetTransactionReturnType : null;
    receipt: TReceiptData extends true ? GetTransactionReceiptReturnType : null;
  }>;
  isLoading: boolean;
  error: Error | null;
};

// Type for scaffold event history return type
type UseScaffoldEventHistoryReturn<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false
> = UseScaffoldEventHistoryData<
  TContractName,
  TEventName,
  TBlockData,
  TTransactionData,
  TReceiptData
> & {
  refetch: () => void;
};

// Helper function to merge contracts
const deepMergeContracts = <L, E>(
  local: L,
  external: E,
): L & E & { isExternal?: boolean } => ({
  ...local,
  ...external,
  isExternal: true,
});

// Merge deployed and external contracts
const contractsData = deepMergeContracts(deployedContractsData, externalContractsData);

// Export the contracts with the correct type
export const contracts = contractsData as Record<number, Record<string, ContractConfig>> & { isExternal?: boolean };

// Export all types
export type {
  ContractName,
  ContractConfig,
  Contract,
  ContractAbi,
  ContractAddress,
  ContractFunctionNames,
  ContractEventNames,
  AddExternalFlag,
  ContractFunctionParameters,
  ContractFunctionReturnType,
  ContractEventFilters,
  ContractEventData,
  UseScaffoldReadConfig,
  UseScaffoldWriteConfig,
  UseScaffoldEventConfig,
  UseScaffoldEventHistoryConfig,
  UseScaffoldEventHistoryData,
  UseScaffoldEventHistoryReturn,
};

import type { 
  Abi,
  AbiParameter,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  AbiParametersToPrimitiveTypes,
  AbiParameterToPrimitiveType,
} from "abitype";
import type {
  Address as ViemAddress,
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
import scaffoldConfig from "~~/scaffold.config";

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

// Additional exported helper types expected by debug components
// Represents a single tuple parameter (not an array of params)
export type AbiParameterTuple = AbiParameter & {
  type: 'tuple' | `tuple${string}`; // tuple or tuple[]/tuple[][]...
  components: readonly AbiParameter[];
  name?: string;
  internalType?: string;
};

// Core contract types
export type ContractName = keyof typeof deployedContractsData & keyof typeof externalContractsData & string;

export type ContractDeclaration = {
  address: ViemAddress;
  abi: Abi;
  isExternal?: boolean;
} | null;

export type GenericContractsDeclaration = Record<number, Record<string, ContractDeclaration>> & {
  externalContracts?: Record<string, ContractDeclaration>;
};

const deepMergeContracts = <L extends Record<string, any>, E extends Record<string, any>>(
  local: L,
  external: E,
): GenericContractsDeclaration => {
  const result: Record<PropertyKey, any> = {};
  const allKeys = Array.from(new Set([...Object.keys(external), ...Object.keys(local)]));

  for (const key of allKeys) {
    if (!external[key]) {
      result[key] = local[key];
      continue;
    }

    const amendedExternal = Object.fromEntries(
      Object.entries(external[key] as Record<string, ContractDeclaration>)
        .map(([contractName, declaration]) => {
          if (declaration && typeof declaration === "object") {
            if (!declaration.address) {
              console.warn(`External contract ${contractName} is missing required 'address' field`);
            }
            if (!declaration.abi) {
              console.warn(`External contract ${contractName} is missing required 'abi' field`);
            }
            return [contractName, { ...declaration, isExternal: true }];
          }
          return [contractName, declaration];
        }),
    );

    result[key] = { ...local[key], ...amendedExternal };
  }

  return result as GenericContractsDeclaration;
};

// Types used by debug components and utils that expect these names
export type GenericContract = Contract<ContractName>;
export type InheritedFunctions = Record<string, string>;

// Merge deployed and external contracts
const contractsData = deepMergeContracts(deployedContractsData as any, externalContractsData as any);

// Export the contracts with the correct type
export const contracts = contractsData;

type ConfiguredChainId = (typeof scaffoldConfig.targetNetworks)[0]["id"];

export type Contract<TContractName extends ContractName = ContractName> = 
  typeof deployedContractsData[TContractName][ConfiguredChainId];

export type ContractAbi<TContractName extends ContractName = ContractName> = 
  NonNullable<Contract<TContractName>>['abi'];

export type ContractFunctionNames<TAbi extends Abi> = 
  ExtractAbiFunctionNames<TAbi>;

export type ContractEventNames<TAbi extends Abi> = 
  ExtractAbiEventNames<TAbi>;

export type AbiFunctionInputs<
  TAbi extends Abi,
  TFunctionName extends string
> = TAbi extends readonly any[] ? TAbi[number] extends { type: 'function'; name: TFunctionName; inputs: infer TInputs extends readonly AbiParameter[] } ? TInputs : never : never;

export type AbiFunctionArguments<
  TAbi extends Abi,
  TFunctionName extends string
> = AbiParametersToPrimitiveTypes<AbiFunctionInputs<TAbi, TFunctionName>>;

// Event filters mapping by event name
export type ContractEventFilters<TAbi extends Abi> = {
  [K in ContractEventNames<TAbi>]?: any;
};

export enum ContractCodeStatus {
  "LOADING",
  "DEPLOYED",
  "NOT_FOUND",
}

// Re-export wagmi types with our own names to avoid conflicts
export type UseContractEventConfig<TAbi extends Abi> = WagmiUseContractEventConfig<TAbi>;
export type UseContractReadConfig<TAbi extends Abi> = WagmiUseContractReadConfig<TAbi>;
export type UseContractWriteConfig<TAbi extends Abi> = WagmiUseContractWriteConfig<TAbi>;

export type UseScaffoldReadConfig<
  TContractName extends ContractName,
  TFunctionName extends ContractFunctionNames<ContractAbi<TContractName>>
> = {
  contractName: TContractName;
  functionName: TFunctionName;
  args?: AbiFunctionArguments<ContractAbi<TContractName>, TFunctionName>;
} & Omit<UseContractReadConfig<ContractAbi<TContractName>>, 'address' | 'abi' | 'functionName'>;

export type UseScaffoldWriteConfig<
  TContractName extends ContractName,
  TFunctionName extends ContractFunctionNames<ContractAbi<TContractName>>
> = {
  contractName: TContractName;
  functionName: TFunctionName;
  args?: AbiFunctionArguments<ContractAbi<TContractName>, TFunctionName>;
  onBlockConfirmation?: (txnReceipt: TransactionReceipt) => void;
  blockConfirmations?: number;
} & Omit<UseContractWriteConfig<ContractAbi<TContractName>>, 'functionName' | 'address' | 'abi' | 'args' | 'mode'>;

export type UseScaffoldEventConfig<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>
> = {
  contractName: TContractName;
  eventName: TEventName;
} & Omit<UseContractEventConfig<ContractAbi<TContractName>>, 'eventName' | 'address' | 'abi'>;

export type UseScaffoldEventHistoryConfig<
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
} & Omit<UseContractEventConfig<ContractAbi<TContractName>>, 'eventName' | 'address' | 'abi'>;

export type UseScaffoldEventHistoryData<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false
> = {
  events: Array<{
    log: Log<bigint, number, false, ExtractAbiEvent<ContractAbi<TContractName>, TEventName>, false, 
      [ExtractAbiEvent<ContractAbi<TContractName>, TEventName>], TEventName>;
    args: AbiParametersToPrimitiveTypes<
      Extract<ContractAbi<TContractName>[number], { type: 'event'; name: TEventName }>['inputs']
    >;
    block: TBlockData extends true ? Block<bigint, true> : null;
    receipt: TReceiptData extends true ? GetTransactionReceiptReturnType : null;
    transaction: TTransactionData extends true ? GetTransactionReturnType : null;
  }>;
  isLoading: boolean;
  error: Error | null;
};

export type UseScaffoldEventHistoryReturn<
  TContractName extends ContractName,
  TEventName extends ContractEventNames<ContractAbi<TContractName>>,
  TBlockData extends boolean = false,
  TTransactionData extends boolean = false,
  TReceiptData extends boolean = false
> = [
  UseScaffoldEventHistoryData<TContractName, TEventName, TBlockData, TTransactionData, TReceiptData>,
  { refetch: () => void }
];
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAccount, useNetwork } from 'wagmi';
import { Address } from '~~/components/scaffold-eth';
import { useScaffoldContractRead, useScaffoldContractWrite } from '~~/hooks/scaffold-eth';
import { useTargetNetwork } from '~~/hooks/scaffold-eth/useTargetNetwork';

// Custom hook to handle the hasMinted contract read with proper types
function useHasMinted(address: string | undefined) {
  return useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'hasMinted',
    args: address ? [address] : undefined,
    watch: true,
  });
}

// List of all available NFTs
const nftCollection = [
  { id: 1, name: 'Mr. Rogue Knight', image: '/images/mr-rogue-knight-nft.png' },
  { id: 2, name: 'Cute Bear', image: '/images/Cute-Bear.png' },
  { id: 3, name: 'Cute Camel', image: '/images/Cute-Camel.png' },
  { id: 4, name: 'Cute Cat', image: '/images/Cute-Cat.png' },
  { id: 5, name: 'Cute Chicken', image: '/images/Cute-Chicken.png' },
  { id: 6, name: 'Cute Cow', image: '/images/Cute-Cow.png' },
  { id: 7, name: 'Cute Crocodile', image: '/images/Cute-Crocodile.png' },
  { id: 8, name: 'Cute Dog', image: '/images/Cute-Dog.png' },
  { id: 9, name: 'Cute Dolphin', image: '/images/Cute-Dolphin.png' },
  { id: 10, name: 'Cute Elephant', image: '/images/Cute-Elephant.png' },
];

// Define a type for the NFT
interface NFT {
  id: number;
  name: string;
  image: string;
}

export default function NFTPage() {
  const { address: connectedAddress } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const { chain } = useNetwork();
  const [selectedNFT, setSelectedNFT] = useState<NFT>(nftCollection[0]);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user has already minted an NFT using our custom hook
  const { data: hasMinted } = useHasMinted(connectedAddress);

  // Get total supply
  const { data: totalSupply } = useScaffoldContractRead({
    contractName: 'YourContract',
    functionName: 'totalCounter',
    watch: true,
  });

  const totalMinted = totalSupply ? Number(totalSupply) : 0;
  
  // Mint function
  const { writeAsync: mintNFT, isMining } = useScaffoldContractWrite({
    contractName: 'YourContract',
    functionName: 'mintNFT',
  });

  const handleMint = async () => {
    if (!connectedAddress) {
      setError('Please connect your wallet first!');
      return;
    }

    if (hasMinted) {
      setError('You have already minted your NFT!');
      return;
    }

    setIsMinting(true);
    setError(null);
    
    try {
      await mintNFT();
      alert('NFT minting initiated!');
    } catch (err) {
      console.error('Minting error:', err);
      setError('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  if (chain?.id !== targetNetwork.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-base-200 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Wrong Network</h2>
          <p>Please connect to {targetNetwork.name} to mint NFTs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Mint Your NFT</h1>
        
        <div className="bg-base-200 p-8 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3">
              <div className="bg-base-100 p-4 rounded-lg shadow-md">
                <div className="relative w-full h-64 mb-4">
                  <Image 
                    src={selectedNFT.image} 
                    alt={selectedNFT.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-center">{selectedNFT.name}</h2>
              </div>
              
              <div className="mt-6 bg-base-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Collection Stats</h3>
                <div className="space-y-2">
                  <p className="text-md">
                    <span className="font-semibold">Price:</span> Free
                  </p>
                  <p className="text-md">
                    <span className="font-semibold">Total Minted:</span> {totalMinted}
                  </p>
                  
                  {error && (
                    <div className="alert alert-error mt-2">
                      <div className="flex-1">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                          />
                        </svg>
                        <label>{error}</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button 
                  className={`btn btn-primary mt-6 w-full ${isMining ? 'loading' : ''} ${hasMinted ? 'btn-disabled' : ''}`}
                  onClick={handleMint}
                  disabled={isMinting || hasMinted}
                >
                  {hasMinted ? 'Already Minted' : isMining ? 'Minting...' : 'Mint Your NFT'}
                </button>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <h3 className="text-xl font-semibold mb-4">Select an NFT to Mint</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto p-2">
                {nftCollection.map((nft) => (
                  <div 
                    key={nft.id}
                    onClick={() => setSelectedNFT(nft)}
                    className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedNFT.id === nft.id ? 'border-primary shadow-lg scale-105' : 'border-base-300 hover:border-primary/50'
                    }`}
                  >
                    <div className="relative w-full h-32">
                      <Image 
                        src={nft.image} 
                        alt={nft.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <p className="text-sm font-medium truncate">{nft.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {connectedAddress && (
          <div className="text-center text-sm text-gray-500">
            Connected as: <Address address={connectedAddress} />
          </div>
        )}
      </div>
    </div>
  );
}
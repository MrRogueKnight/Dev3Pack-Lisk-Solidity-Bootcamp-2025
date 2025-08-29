"use client";

import Link from "next/link";
import Image from "next/image";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

// Featured NFTs to display on the home page
const featuredNFTs = [
  { id: 1, name: "Mr. Rogue Knight", image: "/images/mr-rogue-knight-nft.png" },
  { id: 2, name: "Cute Bear", image: "/images/Cute-Bear.png" },
  { id: 3, name: "Cute Camel", image: "/images/Cute-Camel.png" },
  { id: 4, name: "Cute Cat", image: "/images/Cute-Cat.png" },
];

// Home page component
export default function Home() {
  const { address: connectedAddress } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { targetNetwork } = useTargetNetwork();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-base-200 to-base-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover & Collect
            <br />
            <span className="text-primary">Unique Digital Art</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our exclusive collection of hand-crafted NFTs. Each piece is unique and stored securely on the blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nft-mint" className="btn btn-primary btn-lg">
              Mint Your NFT Now
            </Link>
            <Link href="#collection" className="btn btn-outline btn-lg">
              View Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Network Status */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 bg-base-200 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className={`badge ${chain?.id === targetNetwork.id ? "badge-success" : "badge-warning"}`}>
              {chain?.id === targetNetwork.id ? `Connected to ${chain?.name}` : `Wrong network: ${chain?.name || "N/A"}`}
            </span>
            {chain?.id !== targetNetwork.id && (
              <button className="btn btn-sm" onClick={() => switchNetwork?.(targetNetwork.id)}>
                {`Switch to ${targetNetwork.name}`}
              </button>
            )}
          </div>
          {connectedAddress && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Your wallet:</span>
              <Address address={connectedAddress} />
            </div>
          )}
          {!connectedAddress && (
            <div className="text-warning">
              Connect your wallet to start minting NFTs!
            </div>
          )}
        </div>
      </div>

      {/* Featured Collection */}
      <section id="collection" className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNFTs.map((nft) => (
              <div key={nft.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                <figure className="px-4 pt-4">
                  <Image 
                    src={nft.image} 
                    alt={nft.name} 
                    width={300}
                    height={300}
                    className="rounded-xl h-48 w-full object-contain"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{nft.name}</h3>
                  <div className="card-actions mt-4">
                    <Link href="/nft-mint" className="btn btn-primary btn-sm">
                      Mint Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/nft-mint" className="btn btn-outline">
              View All NFTs
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
              <p>Connect your wallet to the {targetNetwork.name} network</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your NFT</h3>
              <p>Browse our collection and select your favorite NFT</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mint & Own</h3>
              <p>Mint your NFT and own a unique digital collectible</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Collecting?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of collectors and own a piece of digital history.
          </p>
          <Link href="/nft-mint" className="btn btn-primary btn-lg">
            Mint Your First NFT
          </Link>
        </div>
      </section>
    </div>
  );
}
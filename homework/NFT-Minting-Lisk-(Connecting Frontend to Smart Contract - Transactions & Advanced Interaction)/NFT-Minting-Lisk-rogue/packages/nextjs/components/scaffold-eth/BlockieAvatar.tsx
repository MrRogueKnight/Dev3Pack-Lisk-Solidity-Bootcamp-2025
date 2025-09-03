"use client";

import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { blo } from "blo";
import Image from "next/image";

// Custom Avatar for RainbowKit
export const BlockieAvatar: AvatarComponent = ({ address, ensImage, size }) => (
  <Image
    className="rounded-full"
    src={ensImage || (blo(address as `0x${string}`) as string)}
    width={size}
    height={size}
    alt={`${address} avatar`}
    unoptimized
  />
);

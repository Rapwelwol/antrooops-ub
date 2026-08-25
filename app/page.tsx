"use client";

import { motion } from "motion/react";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { InteractiveHoverLinks } from "@/components/ui/interactive-hover-links";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black overflow-x-hidden">
      <FluidParticlesBackground particleCount={1600} noiseIntensity={0.0025}>
        <div className="w-full max-w-6xl py-12 px-4 flex flex-col justify-center items-center">
          
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 space-y-3"
          >
            <span className="inline-block text-xs uppercase tracking-widest text-white/60 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
              Interactive Experience
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
              Fluid Motion Studio
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="w-full"
          >
            <InteractiveHoverLinks />
          </motion.div>

        </div>
      </FluidParticlesBackground>
    </main>
  );
}

"use client";

import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";

export const INTERACTIVE_LINKS = [
  {
    heading: "Services",
    subheading: "Discover custom software solutions & high-end design",
    imgSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    href: "#",
  },
  {
    heading: "Team",
    subheading: "Meet the engineers, creative directors & architects",
    imgSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    href: "#",
  },
  {
    heading: "Projects",
    subheading: "Explore interactive experiences & web applications",
    imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    href: "#",
  },
  {
    heading: "Careers",
    subheading: "Join our fast-growing engineering team globally",
    imgSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    href: "#",
  },
  {
    heading: "Playground",
    subheading: "Experimental UI concepts, motion graphics & WebGL",
    imgSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    href: "#",
  },
];

interface InteractiveHoverLinksProps {
  links?: typeof INTERACTIVE_LINKS;
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
}: InteractiveHoverLinksProps) {
  return (
    <section className="bg-transparent p-4 md:px-8 md:py-12 w-full max-w-5xl mx-auto">
      <div className="mx-auto max-w-5xl backdrop-blur-xs rounded-2xl p-2 md:p-6">
        {links.map((link) => (
          <Link key={link.heading} {...link} />
        ))}
      </div>
    </section>
  );
}

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

function Link({ heading, imgSrc, subheading, href }: LinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["35%", "65%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["65%", "35%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/20 py-6 transition-colors duration-500 hover:border-white md:py-10"
    >
      <div className="z-10">
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.03,
            delayChildren: 0.05,
          }}
          className="relative block text-4xl font-extrabold text-white/40 uppercase tracking-tighter transition-colors duration-500 group-hover:text-white md:text-7xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-sm md:text-base text-white/60 transition-colors duration-500 group-hover:text-white/90">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
          whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        src={imgSrc}
        className="pointer-events-none absolute z-20 h-28 w-40 rounded-xl object-cover shadow-2xl md:h-52 md:w-72 border border-white/20"
        alt={`Visual preview ${heading}`}
      />

      <div className="overflow-hidden z-10">
        <motion.div
          variants={{
            initial: { x: "100%", opacity: 0 },
            whileHover: { x: "0%", opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative p-2"
        >
          <ArrowRight className="size-8 text-white md:size-12" />
        </motion.div>
      </div>
    </motion.a>
  );
}

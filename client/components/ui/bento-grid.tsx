"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowRight, FileText, FlaskConical, Coins, ArrowLeftRight, Landmark, Gavel } from "lucide-react"
import type { ReactNode } from "react"

interface BentoGridItemProps {
  title: string
  description: string
  icon: ReactNode
  className?: string
  size?: "small" | "medium" | "large"
}

const iconVariants = {
  initial: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 1.5,
      ease: [0.42, 0, 0.58, 1],
    } as const,
  },
} as const

const BentoGridItem = ({ title, description, icon, className, size = "small" }: BentoGridItemProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 25 },
    },
  } as const

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card px-6 pt-6 pb-8 shadow-md transition-all duration-500 hover:shadow-xl",
        className,
      )}
    >
      {/* Background grid effect */}
      <div className="absolute top-0 -right-1/2 z-0 size-full bg-[linear-gradient(to_right,#3d16165e_1px,transparent_1px),linear-gradient(to_bottom,#3d16165e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Big background icon */}
      <div className="absolute right-2 bottom-3 text-primary/5 group-hover:text-primary/10 z-0 scale-[6] transition-all duration-700 group-hover:scale-[6.5]">
        <motion.div variants={iconVariants} initial="initial" animate="animate">
          {icon}
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow transition-all duration-500 group-hover:bg-primary/20">
            <motion.div variants={iconVariants} initial="initial" animate="animate">
              {icon}
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm leading-snug">{description}</p>
        </div>
        <div className="mt-4 flex items-center text-sm font-medium text-primary">
          <span>Learn more</span>
          <ArrowRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/30 blur-2xl transition-all duration-500 group-hover:blur-lg" />
    </motion.div>
  )
}

const items = [
  {
    title: "Trade IP as NFTs",
    description:
      "Turn patents, inventions, and ideas into digital assets — trade them securely with full history and royalties baked in.",
    icon: <FileText className="size-6" />,
    size: "large" as const,
  },
  {
    title: "Fund Research, Not Bureaucracy",
    description:
      "Back real scientists and creators directly. Funds release only when milestones are verified, so progress is guaranteed.",
    icon: <FlaskConical className="size-6" />,
    size: "small" as const,
  },
  {
    title: "Earn by Staking NEBL",
    description: "Lock your tokens, earn up to 20% APR, and get a direct vote in NebulaDAO decisions.",
    icon: <Coins className="size-6" />,
    size: "medium" as const,
  },
  {
    title: "Swap Instantly",
    description:
      "Swap AVAX for NEBL in seconds with real-time Chainlink price feeds — no middlemen, no delays.",
    icon: <ArrowLeftRight className="size-6" />,
    size: "medium" as const,
  },
  {
    title: "Govern the Platform",
    description:
      "Own NEBL, shape rules. Propose, vote, and execute changes that affect Nebula’s fees, grants, and upgrades.",
    icon: <Landmark className="size-6" />,
    size: "small" as const,
  },
  {
    title: "Resolve Disputes Fairly",
    description:
      "Community and experts together handle disputes with transparent, automated resolution flows.",
    icon: <Gavel className="size-6" />,
    size: "large" as const,
  },
]

export function BentoGrid1() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <section className="w-full px-4 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => (
            <BentoGridItem
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              size={item.size}
              className={cn(
                item.size === "large"
                  ? "col-span-6 md:col-span-4"
                  : item.size === "medium"
                    ? "col-span-6 sm:col-span-3"
                    : "col-span-6 sm:col-span-2",
              )}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

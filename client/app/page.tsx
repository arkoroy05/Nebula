"use client"
import { ArrowRight } from "lucide-react"
import { Home, Cpu, Shield, FileText, Users } from "lucide-react"
// Import the BentoGrid component
import { BentoGrid1 } from "@/components/ui/bento-grid"
import Features from "@/components/ui/features-new"
import FooterSection from "@/components/ui/footer"
import { NavBar } from "@/components/ui/tubelight-navbar"

const navItems = [
  { name: "Home", url: "#", icon: Home },
  { name: "Platform", url: "#platform", icon: Cpu },
  { name: "Security", url: "#security", icon: Shield },
  { name: "Docs", url: "#docs", icon: FileText },
  { name: "About", url: "#about", icon: Users },
]

export default function TuringLanding() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* Subtle blue background gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,132,255,0.15)] via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(0,132,255,0.1)] via-transparent to-transparent opacity-50" />
      </div>

      <NavBar items={navItems} />

      {/* Main Content */}
      <main className="main min-h-screen pt-[300px] pb-20 relative">
        {/* Hero Video Background */}
        <video
          className="hero-video absolute -top-[20%] left-0 w-full h-[120%] object-cover z-0 bg-[#111]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://mybycketvercelprojecttest.s3.sa-east-1.amazonaws.com/animation-bg.mp4"
            type="video/mp4"
          />
        </video>

        <div className="content-wrapper max-w-[1400px] mx-auto px-[60px] flex justify-between items-end relative z-[2]">
          {/* Left Content */}
          <div className="max-w-[800px]">
            <h1 className="text-[80px] font-light leading-[1.1] mb-8 tracking-[-2px]">
              Accelerate your
              <br />
              AGI deployment
            </h1>
            <p className="text-lg leading-relaxed text-[#b8b8b8] mb-12 font-normal">
              Trusted by global enterprises, we solve business challenges and
              <br />
              boost productivity through intelligent systems.
            </p>
            <div className="flex gap-5 items-center">
              <button className="flex items-center gap-2.5 bg-[#0084ff] text-white py-3.5 px-7 rounded-md text-base font-medium hover:bg-[#0066cc] hover:translate-x-0.5 transition-all duration-200">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-transparent text-[#b8b8b8] py-3.5 px-7 text-base font-medium hover:text-white transition-colors duration-200">
                Learn more
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex gap-20 items-end">
            <div className="text-center">
              <div className="text-[64px] font-light leading-none mb-3">40+</div>
              <div className="text-base text-[#b8b8b8] font-normal">Industries innovated</div>
            </div>
            <div className="text-center">
              <div className="text-[64px] font-light leading-none mb-3">3M+</div>
              <div className="text-base text-[#b8b8b8] font-normal">Professionals available</div>
            </div>
          </div>
        </div>
      </main>

      {/* Capabilities Section with Bento Grid */}
      <section className="relative z-10 py-20 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-[60px]">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-light leading-[1.1] mb-6 tracking-[-1px]">
              Enterprise-grade AI capabilities
            </h2>
            <p className="text-lg text-[#b8b8b8] max-w-2xl mx-auto">
              From neural processing to global deployment, our platform provides everything you need to build and scale
              intelligent systems.
            </p>
          </div>
          <BentoGrid1 />
        </div>
      </section>

      <Features />

      <FooterSection />
    </div>
  )
}

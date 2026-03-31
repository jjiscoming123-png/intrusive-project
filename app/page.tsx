"use client"

import { useEffect, useRef, useState } from "react"
import Logo from "@/components/Logo"

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// The intrusive thought that keeps appearing
function IntrusiveTag({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span
      className="inline-block text-[var(--color-accent)] text-[11px] font-bold tracking-widest uppercase border border-[var(--color-accent)]/30 px-2 py-0.5 mx-1 animate-intrude"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[var(--color-background)]/90 backdrop-blur-xl border-b border-[var(--color-accent)]/10 py-4" : "py-7"}`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2 group">
          <Logo size={28} className="group-hover:scale-105 transition-transform duration-300" />
          <span className="text-[13px] font-black tracking-[0.18em] uppercase text-[var(--color-accent)]">INTRUSIVE</span>
        </a>
        <div className="hidden md:flex items-center gap-10 text-[12px] text-[var(--color-muted)] font-semibold tracking-widest uppercase">
          <a href="#thought" className="hover:text-white transition-colors duration-300">Thought</a>
          <a href="#nature" className="hover:text-white transition-colors duration-300">Nature</a>
          <a href="#live" className="hover:text-white transition-colors duration-300">Live With It</a>
        </div>
        <a href="https://x.com/INTRUSIVE_sol" target="_blank" rel="noopener noreferrer"
          className="text-[12px] font-bold tracking-[0.15em] uppercase text-[var(--color-background)] bg-[var(--color-accent)] px-5 py-2 hover:bg-[var(--color-accent-dim)] transition-colors duration-300">
          Follow
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full bg-[var(--color-accent)] blur-[350px] animate-glow pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        <div className="label animate-fade-up delay-1 mb-6">The Uninvited Guest</div>

        {/* Main headline with intrusive tags bleeding in */}
        <div className="animate-fade-up delay-2 mb-8">
          <h1 className="display-xl">
            <span className="block">WHAT IF</span>
            <span className="block text-[var(--color-accent)]">I HAD</span>
            <span className="block flex flex-wrap items-end gap-2">
              BOUGHT
              <IntrusiveTag delay={1.2}>10x more</IntrusiveTag>
            </span>
            <span className="block flex flex-wrap items-end gap-2">
              MORE<span className="animate-blink text-[var(--color-accent)]">_</span>
            </span>
          </h1>
        </div>

        <div className="max-w-lg animate-fade-up delay-3">
          <p className="body-lg">
            You weren&apos;t thinking about it. Then you were.
            You can&apos;t stop. It arrives at the wrong time,
            in the wrong meeting, at 3am.
            <IntrusiveTag delay={2}>what if</IntrusiveTag>
            It just shows up.
          </p>
        </div>

        <div className="mt-10 animate-fade-up delay-4 flex items-center gap-6">
          <a href="#thought" className="text-sm font-bold text-[var(--color-background)] bg-[var(--color-accent)] px-7 py-3.5 hover:bg-[var(--color-accent-dim)] transition-colors duration-300">The thought →</a>
          <a href="#nature" className="text-sm text-[var(--color-muted)] hover:text-white transition-colors duration-300">Why it persists</a>
        </div>
      </div>
    </section>
  )
}

function Thought() {
  const { ref, visible } = useInView()
  return (
    <section id="thought" ref={ref} className="py-28 md:py-40">
      <div className="section-divider mb-28 md:mb-40" />
      <div className={`max-w-[1200px] mx-auto px-6 lg:px-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="label mb-4">The Thought</div>
            <h2 className="display-lg">
              It arrives<br />
              <span className="text-[var(--color-accent)]">uninvited.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-8 pt-2">
            <p className="body-lg">
              You sold before the pump. The sell was logical, justified, technically correct.
              And yet. The thought lives in the space between correct and
              <IntrusiveTag>what if</IntrusiveTag>
              optimal.
            </p>
            <p className="body-lg">
              INTRUSIVE is the token of the thought that won&apos;t leave. Not because
              you&apos;re stupid or irrational, but because the human brain is very good
              at noticing the gap between what happened and what could have happened.
              It&apos;s a feature. A painful, relentless feature.
            </p>
            <p className="body-lg">
              What if I had bought more. What if I had held. What if I had seen it
              three days earlier.
              <IntrusiveTag delay={0.3}>what if</IntrusiveTag>
              What if.
            </p>
            <div className="accent-line mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Nature() {
  const { ref, visible } = useInView()
  const items = [
    { num: "01", title: "It Arrives at Rest", text: "When your guard is down. When you're not thinking about the market. The thought slips in through the gap. It doesn't knock." },
    { num: "02", title: "It Uses Real Data", text: "Unlike fantasy, intrusive thoughts are grounded in fact. You did sell. It did pump. The gap is real. That's what makes it stick." },
    { num: "03", title: "Suppression Makes It Louder", text: "Every time you tell yourself to stop thinking about it, the thought increases in frequency. The only way out is through." },
    { num: "04", title: "It Eventually Fades", text: "Not through willpower. Through time, through new data, through new positions. The next trade rewrites the intrusive loop. Eventually." },
  ]
  return (
    <section id="nature" ref={ref} className="py-28 md:py-40 bg-[var(--color-surface)]">
      <div className={`max-w-[1200px] mx-auto px-6 lg:px-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="label mb-4">The Nature</div>
        <h2 className="display-lg mb-20">Why it<br /><span className="text-[var(--color-accent)]">persists.</span></h2>
        <div>
          {items.map((item, i) => (
            <div key={i} className="group border-t border-[var(--color-accent)]/10 py-10 md:py-14">
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-1 text-[var(--color-accent)] text-xs font-bold tracking-widest pt-1">{item.num}</div>
                <h3 className="md:col-span-4 display-md group-hover:text-[var(--color-accent)] transition-colors duration-500">{item.title}</h3>
                <p className="md:col-span-5 md:col-start-7 body-lg">{item.text}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-[var(--color-accent)]/10" />
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const thoughts = ["what if i had bought more.", "what if i hadn't sold.", "what if i had waited.", "what if i had seen it.", "what if i had bought more."]
  return (
    <div className="py-14 overflow-hidden select-none">
      <div className="flex whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 animate-[marquee_25s_linear_infinite] items-center gap-12 pr-12">
            {thoughts.concat(thoughts).map((t, i) => (
              <span key={i} className="text-2xl md:text-4xl font-semibold tracking-tight text-[var(--color-accent)]/10 italic">{t}</span>
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

function LiveWith() {
  const { ref, visible } = useInView()
  return (
    <section id="live" ref={ref} className="py-28 md:py-40">
      <div className="section-divider mb-28 md:mb-40" />
      <div className={`max-w-[1200px] mx-auto px-6 lg:px-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-3xl">
          <div className="label mb-4">Living With It</div>
          <h2 className="display-lg mb-10">You can&apos;t<br />think it <span className="text-[var(--color-accent)]">away.</span></h2>
          <div className="space-y-8">
            <p className="body-lg">INTRUSIVE doesn&apos;t offer a cure. It offers company. The thought you&apos;re carrying is the same thought everyone in this space is carrying in some form. Different chart. Same loop.</p>
            <p className="body-lg">The next entry point is out there. The next opportunity is already forming. The intrusive thought about last time will be replaced by a new one. Until then — you are not alone in the loop.</p>
          </div>
          <div className="accent-line mt-12" />
        </div>
      </div>
    </section>
  )
}

function Join() {
  const { ref, visible } = useInView()
  return (
    <section ref={ref} className="py-28 md:py-40 bg-[var(--color-surface)]">
      <div className={`max-w-[1200px] mx-auto px-6 lg:px-8 text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="display-lg mb-4">Still<br /><span className="text-[var(--color-accent)]">thinking about it?</span></h2>
        <p className="body-lg max-w-md mx-auto mb-12">Good. Come find the others in the loop. We can think about it together until it fades.</p>
        <a href="https://x.com/INTRUSIVE_sol" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.15em] uppercase text-[var(--color-background)] bg-[var(--color-accent)] px-8 py-4 hover:bg-[var(--color-accent-dim)] transition-colors duration-300">
          <span>𝕏</span><span>Follow on X</span>
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-accent)]/10 py-8 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[var(--color-accent)]">INTRUSIVE</span>
        </div>
        <p className="text-xs text-[var(--color-muted)]">© 2026 INTRUSIVE. The thought will pass. Eventually.</p>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <main className="noise">
      <Nav /><Hero /><Thought /><Nature /><Marquee /><LiveWith /><Join /><Footer />
    </main>
  )
}

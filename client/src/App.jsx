import { useEffect, useRef, useState } from 'react'

/* ---------------- helpers ---------------- */

function useReveal() {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, inView]
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[600ms] ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

const BTN_BASE =
  'inline-flex items-center gap-2.5 font-head font-bold text-[14.5px] px-[26px] py-[15px] rounded-[3px] border-2 border-transparent cursor-pointer whitespace-nowrap transition-all duration-200 ease-out hover:-translate-y-0.5'

const BTN_VARIANTS = {
  primary: 'bg-clay text-bone-2 hover:bg-clay-deep',
  secondary: 'bg-transparent text-ink border-ink hover:bg-ink hover:text-bone-2',
  onink:
    'bg-transparent text-bone-2 border-[rgba(247,244,238,0.5)] hover:bg-bone-2 hover:text-ink hover:border-bone-2',
  clayInverse: 'bg-ink text-bone-2 hover:bg-[#0f1311]',
  onclay: 'bg-transparent text-bone-2 border-[rgba(247,244,238,0.6)] hover:bg-bone-2 hover:text-clay',
}

function Btn({ as: Tag = 'a', variant = 'primary', nav = false, className = '', children, ...rest }) {
  const sizing = nav ? 'px-5 py-[11px] text-[13.5px]' : ''
  return (
    <Tag className={`${BTN_BASE} ${sizing} ${BTN_VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

function Eyebrow({ children, className = 'text-teal-deep' }) {
  return (
    <div className={`font-mono text-[12.5px] tracking-[0.14em] uppercase flex items-center gap-2.5 mb-[18px] ${className}`}>
      <span className="w-[22px] h-0.5 bg-clay inline-block shrink-0" />
      {children}
    </div>
  )
}

function PaverRule({ onDark = false }) {
  return (
    <div className="flex gap-1.5 mb-10">
      <span className="w-[26px] h-1.5 rounded-[2px] bg-clay" />
      <span className="w-[26px] h-1.5 rounded-[2px] bg-teal" />
      <span className="w-[26px] h-1.5 rounded-[2px] bg-flake" />
      <span className={`w-[26px] h-1.5 rounded-[2px] ${onDark ? 'bg-bone-2' : 'bg-ink'}`} />
    </div>
  )
}

function Logo({ className = '' }) {
  return (
    <a href="#top" className={`font-display text-[19px] text-bone-2 flex items-center gap-2.5 ${className}`}>
      <span className="w-3.5 h-3.5 bg-teal inline-block rounded-[2px] relative overflow-hidden shrink-0">
        <span
          className="absolute inset-0 bg-flake"
          style={{ clipPath: 'polygon(0 0,60% 0,60% 60%,0 60%)' }}
        />
      </span>
      CIC Bond
    </a>
  )
}

/* ---------------- data ---------------- */

const navLinks = [
  { href: '#who', label: 'About' },
  { href: '#work', label: 'Our Work' },
  { href: '#products', label: 'Products' },
  { href: '#programs', label: 'Programs' },
  { href: '#involved', label: 'Get Involved' },
  { href: '#impact', label: 'Impact' },
]

const impactAreas = [
  {
    color: 'bg-clay',
    title: 'Plastic Waste Collection',
    desc: 'We recover plastic waste before it reaches rivers, drains, farms, and natural ecosystems, giving discarded materials a second life through recycling.',
  },
  {
    color: 'bg-teal',
    title: 'Recycling Innovation',
    desc: 'Collected plastics are processed into raw materials that can be transformed into durable, practical, and environmentally friendly construction products.',
  },
  {
    color: 'bg-flake',
    title: 'Sustainable Construction Materials',
    desc: 'Our flagship products — eco-friendly paving stones and tiles — provide practical alternatives while reducing plastic pollution, with more solutions on the way.',
  },
  {
    color: 'bg-ink',
    title: 'Environmental Education',
    desc: 'Lasting change starts with informed communities. Through awareness campaigns and youth engagement, we encourage responsible waste management.',
  },
  {
    color: 'bg-clay',
    title: 'Community Engagement',
    desc: 'We work with volunteers, schools, local communities, institutions, and partners to build collective action toward cleaner environments.',
  },
]

const whyItems = [
  'Reduces plastic pollution',
  'Promotes sustainable construction',
  'Encourages responsible waste management',
  'Supports environmental education',
  'Creates opportunities for youth engagement',
  'Advances the circular economy',
]

const products = [
  {
    title: 'Eco-Friendly Paving Stones',
    desc: 'Durable paving solutions manufactured using recycled plastic materials.',
    swatch: 'swatch-paving',
    tags: ['Walkways', 'Residential compounds', 'Schools', 'Public spaces', 'Commercial'],
  },
  {
    title: 'Eco-Friendly Tiles',
    desc: 'Sustainable flooring solutions that combine durability with environmental responsibility, for both indoor and outdoor applications.',
    swatch: 'swatch-tile',
    tags: ['Indoor', 'Outdoor', 'Durable', 'Low-impact'],
  },
]

const programTags = [
  'Environmental awareness',
  'Community clean-up initiatives',
  'Youth engagement',
  'School outreach',
  'Sustainability education',
  'Climate action',
]

const involveCards = [
  {
    kicker: 'Individuals',
    title: 'Volunteer',
    desc: 'Support environmental initiatives while gaining valuable experience and contributing to meaningful community impact.',
    cta: 'Become a Volunteer',
    href: '#involved',
  },
  {
    kicker: 'Organizations',
    title: 'Partner',
    desc: 'Collaborate with us to develop sustainable environmental solutions and create measurable social impact.',
    cta: 'Partner With Us',
    href: '#partner',
  },
  {
    kicker: 'Everyone',
    title: 'Support Our Mission',
    desc: 'Help accelerate our work toward building cleaner communities and advancing the circular economy.',
    cta: 'Support Us',
    href: '#involved',
  },
]

const metrics = [
  { value: '— t', label: 'Plastic waste collected' },
  { value: '— t', label: 'Plastic recycled' },
  { value: '—', label: 'Eco-friendly products produced' },
  { value: '—', label: 'Communities reached' },
  { value: '—', label: 'Environmental campaigns conducted' },
  { value: '—', label: 'Volunteers engaged' },
  { value: '—', label: 'Youth trained' },
  { value: '—', label: 'Partnerships established' },
]

const partnerTags = ['Businesses', 'Schools', 'Government Agencies', 'NGOs', 'Development Orgs', 'Individuals']

/* ---------------- app ---------------- */

function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div id="top">
      <header className="sticky top-0 z-50 bg-ink/92 backdrop-blur-[8px] border-b border-bone-2/10">
        <nav className="max-w-[1160px] mx-auto px-8 flex items-center justify-between h-[76px] relative">
          <Logo />

          <div className="hidden md:flex gap-[34px] text-sm text-bone-2/75">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-bone-2 transition-colors duration-150">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex gap-3">
            <Btn variant="onink" nav href="#partner">
              Partner With Us
            </Btn>
            <Btn variant="primary" nav href="#involved">
              Join Our Mission
            </Btn>
          </div>

          <button
            className="md:hidden bg-transparent border-none text-bone-2 text-[22px] cursor-pointer"
            aria-label="Menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            ☰
          </button>

          {navOpen && (
            <div className="md:hidden flex flex-col fixed top-[76px] left-0 right-0 bg-ink p-6 gap-[18px] z-[60] border-b border-bone-2/10">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setNavOpen(false)}
                  className="text-bone-2/85 text-sm"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <Btn variant="onink" nav href="#partner" onClick={() => setNavOpen(false)}>
                  Partner With Us
                </Btn>
                <Btn variant="primary" nav href="#involved" onClick={() => setNavOpen(false)}>
                  Join Our Mission
                </Btn>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* HERO */}
      <section className="bg-ink text-bone-2 pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-8">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
            <div>
              <Eyebrow className="text-flake">Youth-Led · Cameroon</Eyebrow>
              <h1 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(34px,5.2vw,58px)] mb-[22px]">
                Turning plastic waste into <span className="text-flake">sustainable infrastructure</span>
              </h1>
              <p className="text-lg max-w-[640px] text-[rgba(247,244,238,0.78)] mb-[34px]">
                Every year, thousands of tonnes of plastic waste clog our drains, contaminate our ecosystems,
                and threaten public health. We collect it, recycle it, and press it into the paving stones and
                tiles that build cleaner communities.
              </p>
              <div className="flex gap-3.5 flex-wrap">
                <Btn variant="primary" href="#partner">
                  Partner With Us
                </Btn>
                <Btn variant="onink" href="#involved">
                  Join Our Mission
                </Btn>
              </div>
            </div>

            <div className="relative rounded-md overflow-hidden animate-rise-in" aria-hidden="true">
              <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" className="block w-full h-auto">
                <defs>
                  <linearGradient id="vign" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1C2321" stopOpacity="0" />
                    <stop offset="100%" stopColor="#1C2321" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                <rect width="480" height="480" fill="#1E4A41" />
                <g>
                  <g transform="translate(0,0)">
                    <rect x="-20" y="0" width="140" height="46" fill="#2E6F62" />
                    <rect x="130" y="0" width="140" height="46" fill="#25594D" />
                    <rect x="280" y="0" width="140" height="46" fill="#2E6F62" />
                    <rect x="430" y="0" width="140" height="46" fill="#25594D" />
                  </g>
                  <g transform="translate(0,50)">
                    <rect x="-64" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="-18" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="28" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="74" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="120" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="166" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="212" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="258" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="304" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="350" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="396" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="442" y="0" width="46" height="140" fill="#8F3A26" />
                  </g>
                  <g transform="translate(0,196)">
                    <rect x="-20" y="0" width="140" height="46" fill="#25594D" />
                    <rect x="130" y="0" width="140" height="46" fill="#2E6F62" />
                    <rect x="280" y="0" width="140" height="46" fill="#25594D" />
                    <rect x="430" y="0" width="140" height="46" fill="#2E6F62" />
                  </g>
                  <g transform="translate(0,246)">
                    <rect x="-64" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="-18" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="28" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="74" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="120" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="166" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="212" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="258" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="304" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="350" y="0" width="46" height="140" fill="#A8462F" />
                    <rect x="396" y="0" width="46" height="140" fill="#8F3A26" />
                    <rect x="442" y="0" width="46" height="140" fill="#A8462F" />
                  </g>
                  <g transform="translate(0,392)">
                    <rect x="-20" y="0" width="140" height="46" fill="#2E6F62" />
                    <rect x="130" y="0" width="140" height="46" fill="#25594D" />
                    <rect x="280" y="0" width="140" height="46" fill="#2E6F62" />
                    <rect x="430" y="0" width="140" height="46" fill="#25594D" />
                  </g>
                  <rect x="212" y="196" width="46" height="46" fill="#D9A441" />
                </g>
                <rect width="480" height="480" fill="url(#vign)" />
              </svg>
              <div className="absolute left-5 bottom-[18px] font-mono text-[11.5px] tracking-[0.06em] text-bone-2/75 uppercase">
                Recycled HDPE → Paving Stone
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-bone-2/16 grid grid-cols-3 max-[640px]:grid-cols-2 gap-6">
            {[
              ['01', 'Collect the waste'],
              ['02', 'Recycle into raw material'],
              ['03', 'Build with it'],
            ].map(([num, label]) => (
              <div key={num}>
                <div className="font-mono text-[26px] text-flake">{num}</div>
                <div className="text-[12.5px] text-bone-2/60 uppercase tracking-[0.08em] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24" id="who">
        <Reveal className="max-w-[1160px] mx-auto px-8 grid md:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-5">
              More than a recycling company
            </h2>
            <PaverRule />
            <blockquote className="bg-ink text-bone-2 p-[34px] rounded font-head font-semibold text-lg border-l-4 border-flake">
              "We're building a circular economy where discarded plastics become valuable construction
              materials — and communities become active participants in cleaner, healthier cities."
            </blockquote>
          </div>
          <div>
            <p className="text-lg max-w-[640px] text-ink-soft mb-5">
              CIC Bond is a youth-led environmental startup dedicated to addressing plastic pollution through
              innovative recycling solutions and community-driven action.
            </p>
            <p className="text-ink-soft mb-4">
              Our work goes beyond waste management. We're building a circular economy where discarded
              plastics become valuable construction materials, environmental awareness inspires behavioural
              change, and communities actively participate in creating cleaner, healthier, and more
              sustainable cities.
            </p>
            <p className="text-ink-soft mb-7">
              By combining innovation, environmental stewardship, and youth leadership, we aim to show that
              protecting the planet and driving economic development can go hand in hand.
            </p>
            <Btn variant="secondary" href="#work">
              Learn More About Us
            </Btn>
          </div>
        </Reveal>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-bone">
        <Reveal className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-px bg-line">
          <div className="bg-bone-2 p-11">
            <div className="font-mono text-xs tracking-[0.1em] uppercase text-clay">Our Mission</div>
            <h3 className="font-display text-[26px] mt-3.5 mb-3.5">
              Creating sustainable solutions for a cleaner tomorrow
            </h3>
            <p className="text-ink-soft">
              To reduce plastic pollution by transforming plastic waste into high-quality, environmentally
              responsible construction materials — while promoting environmental education, empowering young
              people, and contributing to sustainable development across Cameroon and beyond.
            </p>
          </div>
          <div className="bg-bone-2 p-11">
            <div className="font-mono text-xs tracking-[0.1em] uppercase text-clay">Our Vision</div>
            <h3 className="font-display text-[26px] mt-3.5 mb-3.5">A future without plastic pollution</h3>
            <p className="text-ink-soft">
              Communities where plastic waste is no longer viewed as garbage but as a valuable resource —
              supporting cleaner environments, stronger infrastructure, and a thriving circular economy that
              benefits both people and the planet.
            </p>
          </div>
        </Reveal>
      </section>

      {/* AREAS OF IMPACT */}
      <section className="py-24" id="work">
        <Reveal className="max-w-[1160px] mx-auto px-8">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-2">
            Our areas of impact
          </h2>
          <p className="text-lg max-w-[640px] text-ink-soft mb-11">
            Five connected efforts, each feeding the next — from the street to the structure.
          </p>
          <div className="grid grid-cols-3 max-[860px]:grid-cols-2 max-[600px]:grid-cols-1 gap-px bg-line border border-line">
            {impactAreas.map((area) => (
              <div key={area.title} className="bg-bone-2 py-9 px-[30px] hover:bg-bone transition-colors duration-200">
                <div className={`w-[38px] h-[38px] mb-5 rounded-[3px] ${area.color}`} />
                <h3 className="font-head font-extrabold text-lg mb-3">{area.title}</h3>
                <p className="text-[14.5px] text-ink-soft">{area.desc}</p>
              </div>
            ))}
            <div className="bg-ink flex items-center justify-center py-9 px-[30px]">
              <Btn variant="onink" href="#partner">
                See how to get involved →
              </Btn>
            </div>
          </div>
        </Reveal>
      </section>

      {/* WHY CIC BOND */}
      <section className="py-24 bg-bone">
        <Reveal className="max-w-[1160px] mx-auto px-8 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow>Why CIC Bond?</Eyebrow>
            <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)]">
              Creating impact beyond recycling
            </h2>
            <p className="text-lg max-w-[640px] text-ink-soft mt-3">
              Every piece of plastic collected represents more than waste removed from the environment — it's
              an opportunity to build stronger communities and a healthier planet. Our approach combines
              environmental responsibility, innovation, education, and community participation into solutions
              with long-term impact.
            </p>
          </div>
          <ul className="list-none">
            {whyItems.map((item, i) => (
              <li
                key={item}
                className={`flex gap-3.5 py-4 border-b border-line font-head font-semibold text-[15.5px] ${
                  i === 0 ? 'border-t' : ''
                }`}
              >
                <span className="shrink-0 w-2 h-2 mt-[7px] bg-teal rounded-[1px]" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* PRODUCTS */}
      <section className="py-24" id="products">
        <Reveal className="max-w-[1160px] mx-auto px-8">
          <Eyebrow>Our Products</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-2">
            Sustainable solutions built from recycled plastic
          </h2>
          <p className="text-lg max-w-[640px] text-ink-soft mb-11">
            Practical alternatives, engineered to hold up — and to keep plastic out of the environment.
          </p>
          <div className="grid md:grid-cols-2 gap-7">
            {products.map((p) => (
              <div key={p.title} className="bg-bone-2 border border-line rounded overflow-hidden">
                <div className={`h-[150px] relative overflow-hidden ${p.swatch}`} />
                <div className="pt-7 px-[30px] pb-[30px]">
                  <h3 className="font-head font-extrabold text-lg mb-3">{p.title}</h3>
                  <p className="text-[14.5px] text-ink-soft mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11.5px] tracking-[0.03em] px-2.5 py-[5px] border border-line rounded-full text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-7 text-[14.5px] text-ink-soft">
            As our technology evolves, we'll expand into more environmentally friendly construction products
            to meet growing sustainability needs.
          </p>
          <Btn variant="secondary" href="#partner" className="mt-5">
            Explore Our Products
          </Btn>
        </Reveal>
      </section>

      {/* PROGRAMS */}
      <section className="bg-ink text-bone-2 py-24" id="programs">
        <Reveal className="max-w-[1160px] mx-auto px-8">
          <Eyebrow className="text-flake">Our Programs</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-2 text-bone-2">
            Driving environmental action beyond recycling
          </h2>
          <p className="text-lg max-w-[640px] text-bone-2/72 mb-9">
            Our initiatives extend beyond recycling — engaging communities, empowering young people, and
            promoting environmental responsibility.
          </p>
          <div className="flex flex-wrap gap-3.5">
            {programTags.map((tag) => (
              <div
                key={tag}
                className="font-head font-semibold text-[15px] px-[22px] py-4 border border-bone-2/25 rounded-full text-bone-2 flex items-center gap-2.5"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-flake" />
                {tag}
              </div>
            ))}
          </div>
          <Btn variant="onink" href="#involved" className="mt-9">
            Explore Our Programs
          </Btn>
        </Reveal>
      </section>

      {/* GET INVOLVED */}
      <section className="py-24" id="involved">
        <Reveal className="max-w-[1160px] mx-auto px-8">
          <Eyebrow>Get Involved</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-2">
            Be part of the solution
          </h2>
          <p className="text-lg max-w-[640px] text-ink-soft mb-11">
            Creating lasting environmental change takes collective action. Whether you're an individual,
            business, school, organization, or institution — there's a place for you here.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {involveCards.map((c) => (
              <div key={c.title} className="py-[38px] px-[30px] bg-bone-2 border border-line rounded flex flex-col gap-4">
                <div className="font-mono text-clay text-[13px]">{c.kicker}</div>
                <h3 className="font-head font-extrabold text-lg">{c.title}</h3>
                <p className="text-[14.5px] text-ink-soft grow">{c.desc}</p>
                <Btn variant="secondary" href={c.href} className="self-start">
                  {c.cta}
                </Btn> 
              </div>
            ))}
          </div>
        </Reveal> 
      </section>

      {/* IMPACT METRICS */}
      <section className="py-24 bg-bone" id="impact">
        <Reveal className="max-w-[1160px] mx-auto px-8">
          <Eyebrow>Impact</Eyebrow>
          <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-2">
            Every action creates change
          </h2>
          <p className="text-lg max-w-[640px] text-ink-soft mb-9">
            CIC Bond is committed to delivering measurable environmental and social impact, with a focus on
            transparency, accountability, and continuous improvement.
          </p>
          <div className="grid grid-cols-4 max-[760px]:grid-cols-2 gap-px bg-line border border-line">
            {metrics.map((m) => (
              <div key={m.label} className="bg-bone-2 py-[30px] px-6">
                <div className="font-mono text-[15px] text-teal-deep mb-1.5">{m.value}</div>
                <div className="text-[13.5px] font-head font-semibold">{m.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-[22px] text-[13.5px] text-ink-soft">
            Impact indicators will be updated regularly as our work expands.
          </p>
        </Reveal>
      </section>

      {/* NEWS */}
      <section className="py-[72px]">
        <Reveal className="max-w-[1160px] mx-auto px-8 flex items-center justify-between gap-10 flex-wrap">
          <div>
            <Eyebrow>News &amp; Insights</Eyebrow>
            <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] mb-2.5">
              Stay updated
            </h2>
            <p className="text-lg max-w-[640px] text-ink-soft">
              Follow our journey as we develop new recycling solutions, launch community initiatives, and
              celebrate milestones with our growing network of partners and supporters.
            </p>
          </div>
          <Btn as="button" type="button" variant="primary">
            Read Our Stories
          </Btn>
        </Reveal>
      </section>

      {/* PARTNER */}
      <section className="bg-ink text-bone-2 py-24" id="partner">
        <Reveal className="max-w-[1160px] mx-auto px-8 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow className="text-flake">Partner With Us</Eyebrow>
            <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] text-bone-2 mb-5">
              Together, we can build sustainable communities
            </h2>
            <p className="text-bone-2/72">
              Real environmental transformation requires collaboration. We welcome partnerships with
              businesses, educational institutions, government agencies, development organizations, NGOs, and
              individuals who share our commitment to sustainability and innovation. Together, we can create
              scalable solutions that reduce plastic pollution while strengthening communities.
            </p>
            <Btn variant="primary" href="#contact" className="mt-[26px]">
              Become a Partner
            </Btn>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-0 md:mt-0">
            {partnerTags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3.5 py-2 border border-bone-2/25 rounded-[3px] text-bone-2/85"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="bg-clay text-bone-2 py-[88px] text-center">
        <Reveal className="max-w-[1160px] mx-auto px-8">
          <h2 className="font-display leading-[1.05] tracking-[-0.01em] text-[clamp(28px,4vw,44px)] text-bone-2 max-w-[720px] mx-auto mb-[18px]">
            Join the movement.
          </h2>
          <p className="text-bone-2/88 max-w-[600px] mx-auto mb-9">
            Plastic pollution is one of the defining environmental challenges of our time — but together, we
            can turn this challenge into opportunity. Whether you volunteer, partner with us, support our
            initiatives, or simply learn more, your involvement builds cleaner communities and a more
            sustainable future.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center">
            <Btn variant="clayInverse" href="#involved">
              Join Our Mission
            </Btn>
            <Btn variant="onclay" href="#contact">
              Contact Us
            </Btn>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-bone-2/70 pt-16 pb-8 text-sm" id="contact">
        <div className="max-w-[1160px] mx-auto px-8">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] max-[760px]:grid-cols-2 gap-10 pb-11 border-b border-bone-2/12">
            <div>
              <Logo className="mb-4" />
              <p className="max-w-[260px] text-sm">
                Turning plastic waste into sustainable infrastructure through innovation, environmental
                responsibility, and community action.
              </p>
            </div>
            <div>
              <h4 className="font-head text-[13px] tracking-[0.06em] uppercase text-bone-2 mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#who" className="hover:text-bone-2 transition-colors">About Us</a></li>
                <li><a href="#work" className="hover:text-bone-2 transition-colors">Our Work</a></li>
                <li><a href="#products" className="hover:text-bone-2 transition-colors">Products</a></li>
                <li><a href="#programs" className="hover:text-bone-2 transition-colors">Programs</a></li>
                <li><span>News</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-head text-[13px] tracking-[0.06em] uppercase text-bone-2 mb-4">Get Involved</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#involved" className="hover:text-bone-2 transition-colors">Become a Volunteer</a></li>
                <li><a href="#partner" className="hover:text-bone-2 transition-colors">Partner With Us</a></li>
                <li><a href="#involved" className="hover:text-bone-2 transition-colors">Support Our Mission</a></li>
                <li><a href="#contact" className="hover:text-bone-2 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-head text-[13px] tracking-[0.06em] uppercase text-bone-2 mb-4">Connect With Us</h4>
              <ul className="flex flex-col gap-2.5">
                <li><span>Email</span></li>
                <li><span>Phone</span></li>
                <li><span>Location</span></li>
                <li><span>LinkedIn · Instagram · Facebook · WhatsApp</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-[26px] flex justify-between flex-wrap gap-3 text-[12.5px]">
            <div>© 2026 CIC Bond. All rights reserved.</div>
            <div>Building a cleaner future through sustainable innovation.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

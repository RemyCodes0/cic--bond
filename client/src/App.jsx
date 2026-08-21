import { useEffect, useRef, useState } from 'react'
import heroImg from './assets/hero.jpeg'
import aboutHeroImg from './assets/about-hero.jpeg'
import recyclingImg from './assets/recycling.jpeg'
import educationImg from './assets/education.jpeg'
import productsImg from './assets/products.jpeg'
import logoIcon from './assets/cic-bond-icon.png'
import logoIconLight from './assets/cic-bond-icon-light.png'
import youthProgram1 from './assets/youth-program-1.jpeg'
import youthProgram2 from './assets/youth-program-2.jpeg'
import youthProgram3 from './assets/youth-program-3.jpeg'
import youthProgram4 from './assets/youth-program-4.jpeg'
import youthProgram5 from './assets/youth-program-5.jpeg'
import youthProgram6 from './assets/youth-program-6.jpeg'
import youthProgramVideo from './assets/youth-program-video.mp4'

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

function Eyebrow({ children, dotClassName = 'bg-leaf', className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
      {children}
    </span>
  )
}

function Logo({ textClassName = 'text-foreground', onDark = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img
        src={onDark ? logoIconLight : logoIcon}
        alt=""
        aria-hidden="true"
        width="34"
        height="34"
        className="shrink-0"
      />
      <span className={`font-display text-lg font-bold tracking-tight ${textClassName}`}>
        CIC <span className={onDark ? 'text-accent' : 'text-leaf'}>BOND</span>
      </span>
    </span>
  )
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="opacity-60">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={direction === 'left' ? 'rotate-180' : ''}
    >
      <path
        d="M6 3.5L10.5 8L6 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ImageGlider({ images, interval = 4000, className = '' }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [paused, images.length, interval])

  const goTo = (i) => setIndex((i + images.length) % images.length)

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-accent/30 shadow-2xl ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="aspect-[4/3] w-full flex-none object-cover"
            loading="lazy"
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 hover:bg-black/60"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 hover:bg-black/60"
          >
            <ArrowIcon direction="right" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-5 bg-accent' : 'w-1.5 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ---------------- data ---------------- */

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#intro' },
  { label: 'Our Work', href: '#what-we-do' },
  {
    label: 'Initiatives',
    href: '#initiatives',
    dropdown: [
      { label: 'CIC Bond Ambassador Program', href: '#init-ambassador' },
      { label: 'Green Schools Initiative', href: '#init-green-schools' },
      { label: 'Youth Recycling Awareness Program', href: '#init-youth-program' },
    ],
  },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
  {
    label: 'Get Involved',
    href: '#get-involved',
    dropdown: [
      { label: 'Become an Ambassador', href: '#ambassador-apply' },
      { label: 'Volunteer', href: '#volunteer' },
      { label: 'Work With Your School', href: '#school' },
      { label: 'Partner With CIC Bond', href: '#partner' },
    ],
  },
  { label: 'Resources', href: '#stories' },
  { label: 'Contact', href: '#contact' },
]

const whatWeDo = [
  {
    icon: '♻️',
    title: 'Recycling & Sustainable Construction',
    desc: 'We are developing solutions for transforming plastic waste into eco-friendly construction materials, including paving stones and tiles. Our ambition is to demonstrate how plastic waste can be recovered and transformed into useful materials while contributing to more sustainable construction.',
    cta: 'Learn About Our Solution',
    href: '#products',
  },
  {
    icon: '🌱',
    title: 'Environmental Education',
    desc: 'Environmental change starts with awareness. We work with young people and communities to promote understanding of plastic pollution, recycling, responsible waste management, and sustainability — and have expanded into the educational sector.',
    cta: 'Explore Our Education Work',
    href: '#education',
  },
  {
    icon: '👥',
    title: 'Youth & Community Engagement',
    desc: 'Young people are at the heart of CIC Bond. Through programs, awareness activities, volunteering, community initiatives, and our Ambassador Program, we create opportunities for young people to participate in environmental action.',
    cta: 'Get Involved',
    href: '#get-involved',
  },
]

const approachPills = ['Recycling', 'Sustainable Construction', 'Education', 'Youth Engagement', 'Community Action']

const initiatives = [
  {
    id: 'init-ambassador',
    num: '01',
    title: 'CIC Bond Ambassador Program',
    desc: "A youth engagement initiative that creates a network of young people who support and promote CIC Bond's environmental mission. Ambassadors help amplify conversations around recycling, environmental responsibility, sustainability, and community action while representing the values of CIC Bond within their communities.",
    cta: 'Become a CIC Bond Ambassador',
    href: '#ambassador-apply',
  },
  {
    id: 'init-green-schools',
    num: '02',
    title: 'Green Schools Initiative',
    desc: 'Schools are powerful spaces for shaping lifelong habits. CIC Bond is working to bring environmental awareness and sustainability into educational spaces — helping students and school communities better understand waste management, recycling, and practical action for cleaner learning environments.',
    cta: 'Explore Green Schools',
    href: '#school',
  },
  {
    id: 'init-youth-program',
    num: '03',
    title: 'Youth Recycling Awareness Program',
    desc: 'CIC Bond organized the Youth Recycling Awareness Program to engage young people around recycling, plastic waste, and environmental responsibility — bringing together more than 50 young people for learning, discussion, awareness, and engagement around responsible waste management.',
    badge: '50+ youth impacted',
    cta: 'Discover the Program',
    href: '#featured-program',
  },
]

const youthProgramPhotos = [
  { src: youthProgram1, alt: 'Youth Recycling Awareness Program participants holding up their certificates' },
  { src: youthProgram2, alt: 'CIC Bond team and participants celebrating with certificates at the program' },
  { src: youthProgram3, alt: 'CIC Bond team members at the Youth Recycling Awareness Program' },
  { src: youthProgram4, alt: 'CIC Bond team members representing the organization at the event' },
  { src: youthProgram5, alt: 'CIC Bond team wearing "Recycling for Sustainable Construction" shirts' },
  { src: youthProgram6, alt: 'CIC Bond team at the Youth Recycling Awareness Program event' },
]

const impactStats = [
  { value: '50+', desc: 'Youth impacted through the Youth Recycling Awareness Program' },
  { value: 'Growing', desc: 'Our work in environmental education and the educational sector' },
  { value: 'Youth-led', desc: 'A growing community of young people engaging with our environmental mission' },
  { value: 'Community-focused', desc: 'Programs designed to turn environmental awareness into practical action' },
]

const products = [
  {
    title: 'Paving Stones',
    desc: 'Exploring the transformation of recycled plastic into practical paving solutions for walkways, compounds, schools, and other spaces.',
  },
  {
    title: 'Tiles',
    desc: 'Developing sustainable tile solutions that combine practical construction applications with environmental responsibility.',
  },
  {
    title: 'More to Come',
    desc: 'As CIC Bond grows, we aim to explore additional construction applications for recycled plastic.',
    span: true,
  },
]

const principles = [
  { num: '01', title: 'Recover', desc: 'We see discarded plastic as a resource that can be recovered and given another purpose.' },
  { num: '02', title: 'Transform', desc: 'We explore ways to turn recovered plastic into useful construction materials.' },
  { num: '03', title: 'Educate', desc: 'We create awareness that encourages people to understand and act on environmental challenges.' },
  { num: '04', title: 'Empower', desc: 'We create opportunities for young people to participate, lead, and contribute.' },
  {
    num: '05',
    title: 'Collaborate',
    desc: 'We believe lasting environmental change requires partnerships between communities, organizations, institutions, businesses, and young people.',
  },
]

const involveCards = [
  {
    id: 'ambassador-apply',
    title: 'Become an Ambassador',
    desc: "Represent CIC Bond's mission and help promote environmental awareness in your community.",
    cta: 'Apply to Become an Ambassador',
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    desc: 'Give your time, skills, and ideas to environmental activities and community initiatives.',
    cta: 'Become a Volunteer',
  },
  {
    id: 'school',
    title: 'Work With Your School',
    desc: 'Bring environmental awareness and sustainability activities to your school community.',
    cta: 'Partner With Us',
  },
  {
    id: 'partner',
    title: 'Partner With CIC Bond',
    desc: 'Collaborate with us on environmental, educational, youth, and sustainability initiatives.',
    cta: 'Become a Partner',
  },
]

const partnerTypes = [
  'Educational institutions',
  'NGOs and civil society organizations',
  'Businesses',
  'Government institutions',
  'Development organizations',
  'Youth organizations',
  'Communities',
  'Environmental initiatives',
]

const storyTags = ['Recycling', 'Education', 'Youth', 'Sustainability', 'Programs', 'Events', 'Community']

const stories = [
  { tag: 'Programs', desc: 'Stories from our initiatives, coming soon.' },
  { tag: 'Youth', desc: 'Voices from young people in our programs.' },
  { tag: 'Recycling', desc: 'Updates on our sustainable construction work.' },
]

const footerLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#intro' },
  { label: 'Our Work', href: '#what-we-do' },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Ambassador Program', href: '#init-ambassador' },
  { label: 'Green Schools Initiative', href: '#init-green-schools' },
  { label: 'Youth Recycling Awareness Program', href: '#init-youth-program' },
  { label: 'Volunteer', href: '#volunteer' },
  { label: 'Partner With Us', href: '#get-involved' },
  { label: 'Resources', href: '#stories' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cic-bond/' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cic_bond?igsh=dXF1cWZ0dm15dG12&igsi=dXF1cWZ0dm15dG12&utm_source=qr',
  },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1Hr8eDSTK7/?mibextid=wwXIfr' },
  { label: 'WhatsApp', href: '#top' },
]

/* ---------------- app ---------------- */

function App() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div id="top" className="flex min-h-screen flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-tight flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center" aria-label="CIC Bond home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <div className="group relative" key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-primary"
                >
                  {link.label}
                  {link.dropdown && <Chevron />}
                </a>
                {link.dropdown && (
                  <div className="invisible absolute left-0 top-full min-w-64 translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="card-surface overflow-hidden p-1 shadow-xl shadow-primary/10">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a href="#get-involved" className="btn btn-primary hidden lg:inline-flex">
            Partner With Us
          </a>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {navOpen && (
          <div className="border-t border-border/70 bg-background lg:hidden">
            <div className="container-tight flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted/60 hover:text-primary"
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setNavOpen(false)}
                          className="rounded-lg px-3 py-1.5 text-sm text-foreground/60 hover:text-primary"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="#get-involved"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-2 justify-center"
              >
                Partner With Us
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Young volunteers collecting and sorting plastic waste for recycling"
              className="h-full w-full object-cover opacity-40"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />
          </div>
          <div className="container-tight relative">
            <div className="max-w-2xl py-24 md:py-36">
              <Eyebrow className="text-accent" dotClassName="bg-accent">
                Recycling for sustainable construction
              </Eyebrow>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-balance text-primary-foreground md:text-6xl lg:text-7xl">
                Turning Plastic Waste Into Sustainable Possibilities
              </h1>
              <p className="mt-5 max-w-xl text-lg text-pretty text-primary-foreground/85 md:text-xl">
                CIC Bond is a youth-led environmental startup tackling plastic pollution through recycling,
                sustainable construction, environmental education, and youth engagement — giving plastic waste a
                second life while creating opportunities for young people and communities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#what-we-do" className="btn btn-accent">
                  Explore Our Work
                </a>
                <a
                  href="#get-involved"
                  className="btn btn-outline border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Partner With Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section id="intro" className="py-20 md:py-28">
          <Reveal className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="max-w-3xl">
                <Eyebrow>Introduction</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                  We See Waste Differently.
                </h2>
              </div>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Plastic waste is one of the environmental challenges facing communities today. At CIC Bond, we
                  believe part of the solution lies in changing how we see and manage that waste.
                </p>
                <p>
                  Instead of allowing plastic to remain a burden on our communities and ecosystems, we are working
                  to recover it and explore ways of transforming it into useful, sustainable construction
                  materials.
                </p>
                <p>
                  But our work does not stop at recycling. We are also investing in people — especially young
                  people — through environmental education, awareness programs, community engagement, and
                  initiatives that encourage practical action.
                </p>
              </div>
              <a href="#top" className="btn btn-primary mt-7">
                About CIC Bond
              </a>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-primary/10">
                <img
                  src={recyclingImg}
                  alt="Recycled plastic flakes being transformed into construction material"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-accent px-5 py-4 text-accent-foreground shadow-lg md:block">
                <p className="font-display text-2xl font-bold">2nd life</p>
                <p className="text-sm">for plastic waste</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHAT WE DO */}
        <section id="what-we-do" className="bg-muted/40 py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>What We Do</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                Our Work
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                CIC Bond brings together environmental innovation, education, and youth participation to create
                practical responses to plastic pollution.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {whatWeDo.map((item) => (
                <article
                  key={item.title}
                  className="card-surface flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{item.desc}</p>
                  <a
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-1 font-semibold text-primary transition-all hover:gap-2"
                  >
                    {item.cta}
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* OUR APPROACH */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
          <div className="absolute inset-0">
            <img
              src={aboutHeroImg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-[0.16]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
          </div>
          <Reveal className="container-tight relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="text-accent" dotClassName="bg-accent">
                Our Approach
              </Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-primary-foreground md:text-4xl lg:text-5xl">
                We Don't Just Recycle. We Build Awareness Around It.
              </h2>
              <p className="mt-4 text-lg text-pretty text-primary-foreground/80">
                Plastic pollution cannot be addressed through recycling alone. It requires informed communities,
                responsible choices, innovation, and people who are willing to take action. That is why CIC Bond
                connects:
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {approachPills.map((pill, i) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-primary-foreground/5 px-4 py-2 font-display text-sm font-semibold text-accent"
                >
                  <span className="font-bold text-primary-foreground/40">{String(i + 1).padStart(2, '0')}</span>
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>
          <p className="container-tight relative mt-10 max-w-2xl border-l-2 border-accent pl-4 text-lg italic text-primary-foreground/80">
            We believe these elements can work together to create lasting environmental impact.
          </p>
        </section>

        {/* INITIATIVES */}
        <section id="initiatives" className="py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>Our Initiatives</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                Turning Ideas Into Action
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                Our initiatives allow us to take our mission beyond our core recycling ambitions and directly
                engage with young people, schools, and communities.
              </p>
            </div>
            <div className="mt-12 space-y-6">
              {initiatives.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="card-surface grid gap-6 p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:p-9"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 font-display text-xl font-bold text-primary">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground md:text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">{item.desc}</p>
                  </div>
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    {item.badge && (
                      <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                        {item.badge}
                      </span>
                    )}
                    <a href={item.href} className="btn btn-primary">
                      {item.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* EDUCATION */}
        <section id="education" className="bg-muted/40 py-20 md:py-28">
          <Reveal className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <Eyebrow>Education</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl">
                Building Environmental Awareness Through Education
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  We believe that environmental sustainability should not only be discussed — it should be taught,
                  experienced, and practiced.
                </p>
                <p>
                  CIC Bond is expanding its work within the educational sector by creating opportunities for
                  students and young people to learn about environmental challenges and participate in practical
                  solutions. From environmental awareness activities to school-based initiatives, we want to help
                  create a generation that understands the value of responsible waste management and sees
                  sustainability as part of everyday life.
                </p>
              </div>
              <a href="#school" className="btn btn-primary mt-7">
                Bring CIC Bond to Your School
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-primary/10">
                <img
                  src={educationImg}
                  alt="Young people in an environmental education session"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* IMPACT */}
        <section id="impact" className="py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>Impact</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                Our Impact Starts With People
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                At CIC Bond, impact is not only about the amount of waste we eventually recover or the products we
                develop. It is also about the people we reach, the knowledge we share, and the action we inspire.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((stat) => (
                <div
                  key={stat.value}
                  className="card-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                >
                  <p className="font-display text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{stat.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-muted-foreground/70">
              Note: additional numerical statistics will be shared once verified and provided by CIC Bond.
            </p>
          </Reveal>
        </section>

        {/* FEATURED PROGRAM */}
        <section id="featured-program" className="relative overflow-hidden bg-primary text-primary-foreground">
          <Reveal className="container-tight grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <ImageGlider images={youthProgramPhotos} />
              <div className="absolute -top-5 -right-5 rounded-2xl bg-accent px-5 py-4 text-accent-foreground shadow-lg">
                <p className="font-display text-3xl font-bold">50+</p>
                <p className="text-xs">youth impacted</p>
              </div>
            </div>
            <div>
              <Eyebrow className="text-accent" dotClassName="bg-accent">
                Featured Program
              </Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-primary-foreground md:text-4xl">
                Youth Recycling Awareness Program
              </h2>
              <p className="mt-2 text-lg font-medium text-accent">
                More than 50 young people. One important conversation about our environment.
              </p>
              <p className="mt-5 text-primary-foreground/80">
                The Youth Recycling Awareness Program brought young people together to learn about recycling,
                engage, and think more deeply about plastic waste and the role each of us can play in creating
                more sustainable communities. For CIC Bond, it was an opportunity to move beyond simply talking
                about recycling and create a space where young people could engage directly with the issue.
              </p>
              <a href="#get-involved" className="btn btn-accent mt-7">
                Read More
              </a>
            </div>
          </Reveal>

          <Reveal className="container-tight pb-20 md:pb-28">
            <div className="mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-[2rem] border border-accent/30 shadow-2xl">
                <video
                  src={youthProgramVideo}
                  poster={youthProgramPhotos[0].src}
                  controls
                  playsInline
                  preload="none"
                  className="aspect-video w-full bg-black"
                >
                  Your browser does not support embedded video.
                </video>
              </div>
              <p className="mt-4 text-center text-sm text-primary-foreground/70">
                Watch highlights from the Youth Recycling Awareness Program.
              </p>
            </div>
          </Reveal>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>Products</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                Sustainable Construction Starts With Better Choices
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                CIC Bond is developing eco-friendly construction materials using recycled plastic. Our work
                currently focuses on solutions such as:
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="order-2 grid gap-5 sm:grid-cols-2">
                {products.map((p) => (
                  <article
                    key={p.title}
                    className={`card-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
                      p.span ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <h3 className="font-display text-lg font-bold text-primary">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  </article>
                ))}
                <a href="#get-involved" className="btn btn-primary sm:col-span-2">
                  Explore Our Products
                </a>
              </div>
              <div className="order-1">
                <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-primary/10">
                  <img
                    src={productsImg}
                    alt="Eco-friendly paving stones and tiles made from recycled plastic"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/70">
              Product specifications, dimensions, strength ratings, prices, and availability will be added once
              officially confirmed by CIC Bond.
            </p>
          </Reveal>
        </section>

        {/* WHY CIC BOND */}
        <section className="bg-muted/40 py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>Why CIC Bond?</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                Because Environmental Action Should Create Value.
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                Our approach is built around five principles.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {principles.map((p) => (
                <div
                  key={p.num}
                  className="card-surface relative p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                >
                  <span className="font-display text-sm font-bold text-accent">{p.num}</span>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* GET INVOLVED */}
        <section id="get-involved" className="py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>Get Involved</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                You Can Be Part of the Solution
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                Environmental change is a collective effort. Whether you are a young person, school, organization,
                business, institution, or individual, there is a way to engage with CIC Bond.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {involveCards.map((c) => (
                <article
                  key={c.id}
                  id={c.id}
                  className="card-surface flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                  <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.desc}</p>
                  <a href="#contact" className="btn btn-outline mt-6 w-full">
                    {c.cta}
                  </a>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* PARTNERS */}
        <section className="bg-muted/40 py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>Partners</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                Building Impact Through Collaboration
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                We believe meaningful environmental change happens when people and organizations work together.
                CIC Bond is open to collaborations with:
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {partnerTypes.map((type) => (
                <span key={type} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80">
                  {type}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
              Officially confirmed partners and logos will be displayed here.
            </div>
            <a href="#get-involved" className="btn btn-primary mt-6">
              Partner With Us
            </a>
          </Reveal>
        </section>

        {/* STORIES */}
        <section id="stories" className="py-20 md:py-28">
          <Reveal className="container-tight">
            <div className="max-w-3xl">
              <Eyebrow>News &amp; Stories</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold text-balance text-foreground md:text-4xl lg:text-5xl">
                What's Happening at CIC Bond
              </h2>
              <p className="mt-4 text-lg text-pretty text-muted-foreground">
                Follow our journey as we continue to develop our work in recycling, sustainable construction,
                environmental education, youth engagement, and community action.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {storyTags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {stories.map((story) => (
                <article key={story.tag} className="card-surface overflow-hidden">
                  <div className="leaf-veil flex h-40 items-center justify-center bg-secondary">
                    <span className="font-display text-sm font-semibold uppercase tracking-widest text-secondary-foreground">
                      {story.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-foreground/80">{story.desc}</p>
                    <a href="#stories" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Read more <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <a href="#stories" className="btn btn-outline mt-8">
              View All Stories
            </a>
          </Reveal>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="leaf-veil absolute inset-0 opacity-60" />
          <Reveal className="container-tight relative py-20 text-center md:py-28">
            <Eyebrow className="text-accent" dotClassName="bg-accent">
              Join Us
            </Eyebrow>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold text-balance text-primary-foreground md:text-5xl">
              Let's Build a More Sustainable Future.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-primary-foreground/85">
              Plastic pollution is a challenge, but it is also an opportunity to rethink how we use, recover, and
              value our resources. At CIC Bond, we are working to turn plastic waste into sustainable construction
              possibilities, bring environmental education into more communities, and empower young people to take
              action. The change starts with what we choose to do with the waste around us.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#get-involved" className="btn btn-accent">
                Join Our Mission
              </a>
              <a
                href="#get-involved"
                className="btn btn-outline border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Partner With Us
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-border bg-primary text-primary-foreground">
        <div className="container-tight grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo textClassName="text-primary-foreground" onDark />
            <p className="mt-3 font-display text-sm uppercase tracking-[0.18em] text-accent">
              Recycling for sustainable construction.
            </p>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/80">
              CIC Bond works at the intersection of recycling, sustainable construction, environmental education,
              youth engagement, and community action to contribute to cleaner, more sustainable communities.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-primary-foreground/80 transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Connect With Us
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#get-involved" className="btn btn-accent mt-5">
              Partner With Us
            </a>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="container-tight flex flex-col items-center justify-between gap-2 py-5 text-xs text-primary-foreground/70 sm:flex-row">
            <p>© 2026 CIC Bond. All Rights Reserved.</p>
            <p>Recycling for Sustainable Construction.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

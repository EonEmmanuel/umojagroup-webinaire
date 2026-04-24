import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroSpeaker from "@/assets/hero-speaker.jpg";
import stadium from "@/assets/stadium.jpg";
import umojaLogo from "@/assets/umoja-logo.png";
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  Mail,
  Scale,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Check,
  Trophy,
  Sparkles,
  Handshake,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UMOJA Sports Agency — Comprendre la Représentation des Joueurs" },
      { name: "description", content: "Conférence professionnelle le 16 mai 2026 à Douala. Une immersion dans le monde du football avec des experts certifiés FIFA." },
      { property: "og:title", content: "UMOJA Sports Agency — Conférence 16 Mai 2026" },
      { property: "og:description", content: "Une immersion professionnelle dans le monde du football. Présentiel & en ligne." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

/* ---------- Reusable hooks & components ---------- */

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="group flex items-center gap-3">
      <img
        src={umojaLogo}
        alt="UMOJA Sports Agency"
        width={44}
        height={44}
        className="h-11 w-11 object-contain transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
      />
      <div className="leading-tight">
        <div className="font-display text-lg font-bold tracking-wide text-gold">UMOJA</div>
        <div className="text-[10px] tracking-[0.3em] text-muted-foreground">SPORTS AGENCY</div>
      </div>
    </a>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold">{icon}{label}</div>
      <div className="mt-2 font-display text-lg font-bold">{value}</div>
    </div>
  );
}

/* ---------- Page ---------- */

function Index() {
  // Parallax for the hero
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse tracker for hero
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onHeroMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const partners = ["Kasmen Law", "Teripik", "One Dibass", "FIFA Agents", "MANOU Hôtel", "Ecobank"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/30">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Logo />
          <div className="hidden items-center gap-8 text-sm md:flex">
            <a href="#about" className="text-muted-foreground transition hover:text-gold">À propos</a>
            <a href="#program" className="text-muted-foreground transition hover:text-gold">Programme</a>
            <a href="#speakers" className="text-muted-foreground transition hover:text-gold">Intervenants</a>
            <a href="#register" className="text-muted-foreground transition hover:text-gold">Tarifs</a>
          </div>
          <a href="#register" className="hidden rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold transition hover:scale-105 hover:shadow-[0_15px_40px_-10px_oklch(0.78_0.12_82_/_0.6)] sm:inline-flex">
            S'inscrire
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative overflow-hidden bg-gradient-hero pt-36 pb-20 lg:pt-44 lg:pb-32"
      >
        <div
          className="absolute inset-0 opacity-20 will-change-transform"
          style={{
            backgroundImage: `url(${stadium})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-overlay" aria-hidden />

        {/* Floating gold blobs that follow mouse */}
        <div
          className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
            transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
          }}
          aria-hidden
        />
        <div
          className="absolute -left-32 bottom-10 h-[400px] w-[400px] rounded-full opacity-20 blur-3xl transition-transform duration-700 ease-out"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
            transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
          }}
          aria-hidden
        />

        {/* Floating decorative icons */}
        <Trophy className="absolute left-[10%] top-[25%] h-8 w-8 text-gold/30 animate-float" aria-hidden />
        <Sparkles className="absolute right-[8%] bottom-[20%] h-6 w-6 text-gold/40 animate-float-rev" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold animate-pulse-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Conférence — 16 Mai 2026
            </div>
            <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-balance md:text-6xl lg:text-7xl">
              Comprendre <br />
              <span className="text-shimmer italic">la représentation</span> <br />
              des joueurs
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Une immersion professionnelle dans le monde du football. Découvrez les coulisses du métier d'agent aux côtés d'experts certifiés FIFA.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#register" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold transition hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Réserver ma place
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a href="#program" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-gold hover:text-gold hover:bg-gold/5">
                Voir le programme
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat icon={<Calendar className="h-4 w-4" />} label="Date" value="16 Mai 2026" />
              <Stat icon={<Clock className="h-4 w-4" />} label="Horaires" value="10H — 16H" />
              <Stat icon={<MapPin className="h-4 w-4" />} label="Lieu" value="Douala" />
            </div>
          </div>

          <div
            className="relative animate-fade-up [animation-delay:200ms] transition-transform duration-500 ease-out"
            style={{ transform: `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${mouse.y * -4}deg)` }}
          >
            <div className="absolute -left-6 -top-6 h-full w-full rounded-3xl border border-gold/30" aria-hidden />
            <div className="absolute -right-6 -bottom-6 h-full w-full rounded-3xl border border-gold/20" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl shadow-elegant">
              <img
                src={heroSpeaker}
                alt="Christelle Essoka, Agent de football certifié FIFA"
                width={1080}
                height={1620}
                className="h-[560px] w-full object-cover transition-transform duration-[1.2s] hover:scale-105 lg:h-[640px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-gold/20 bg-deep/70 p-5 backdrop-blur-md">
                <div className="text-xs uppercase tracking-[0.25em] text-gold">Intervenante principale</div>
                <div className="mt-1 font-display text-xl font-bold">Christelle Essoka</div>
                <div className="text-sm text-muted-foreground">Agent de football certifié FIFA</div>
              </div>
            </div>
            {/* Date tag */}
            <div className="absolute -right-4 top-10 rotate-12 rounded-lg bg-gradient-gold px-5 py-3 text-center shadow-gold animate-float">
              <div className="text-xs font-bold tracking-widest text-gold-foreground">16 MAI</div>
              <div className="text-2xl font-black text-gold-foreground">2026</div>
            </div>
            {/* Floating logo badge */}
            <div className="absolute -left-4 bottom-32 rounded-full bg-deep/80 backdrop-blur-md p-3 shadow-gold border border-gold/30 animate-float-rev">
              <img src={umojaLogo} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-border/50 bg-deep py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">L'événement</div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
                Une journée pour <span className="text-gold italic">maîtriser</span> le métier d'agent.
              </h2>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-muted-foreground">
                UMOJA Sports Agency vous invite à une conférence exceptionnelle dédiée à la représentation des joueurs de football. Cadre juridique, business, parcours pour devenir agent : tout ce qu'il faut savoir, transmis par des professionnels reconnus du secteur.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Networking de haut niveau", "Experts certifiés FIFA", "Sessions interactives", "Certificat de participation"].map((f, i) => (
                  <li key={f} className="reveal in-view flex items-center gap-3 text-sm transition-transform hover:translate-x-1 hover:text-gold" style={{ transitionDelay: `${i * 80}ms` }}>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-gold-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Au programme</div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Trois axes essentiels</h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: Scale, title: "Le cadre juridique", desc: "Contrats, réglementation FIFA, droits et obligations dans la représentation des joueurs.", num: "01" },
              { icon: Briefcase, title: "Devenir agent", desc: "Le parcours complet : formation, examen FIFA, certification et premiers pas dans le métier.", num: "02" },
              { icon: TrendingUp, title: "Le business", desc: "Modèles économiques, négociation, marketing personnel et développement du portefeuille.", num: "03" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="group card-tilt gold-border-glow relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 hover:border-gold/50 hover:shadow-gold">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/0 blur-2xl transition-all duration-700 group-hover:bg-gold/20" aria-hidden />
                  <div className="absolute right-6 top-6 font-display text-6xl font-black text-gold/10 transition-all duration-500 group-hover:text-gold/30 group-hover:scale-110">
                    {c.num}
                  </div>
                  <div className="relative">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gradient-gold group-hover:text-gold-foreground group-hover:rotate-[10deg] group-hover:scale-110">
                      <c.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold transition-colors group-hover:text-gold">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1">
                      En savoir plus <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Les intervenants</div>
                <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Une expertise <span className="italic text-gold">d'exception</span></h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Quatre figures du sport et du droit camerounais réunies pour partager leur expérience.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Christelle Essoka", role: "Agent de football certifié FIFA", tag: "Intervenante" },
              { name: "Rosalie Guessele Ayissi", role: "Modératrice de la conférence", tag: "Modératrice" },
              { name: "Yessa Ndem", role: "Administrateur", tag: "Formateur" },
              { name: "Houajié Nkouonkam", role: "Consultant marketing — Fondateur The Sports Club", tag: "Formateur" },
            ].map((s, i) => (
              <Reveal key={s.name} delay={i * 100}>
                <div className="group card-tilt rounded-3xl border border-border bg-card p-6 hover:border-gold/60">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-deep">
                    <div className="absolute inset-0 flex items-center justify-center font-display text-6xl font-black text-gold/40 transition-all duration-700 group-hover:scale-125 group-hover:text-gold/60">
                      {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-foreground">
                        <Sparkles className="h-3 w-3" /> Expert
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{s.tag}</div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-tight transition-colors group-hover:text-gold">{s.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{s.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="relative overflow-hidden border-y border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
                <Handshake className="h-4 w-4" /> Nos partenaires
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Ils nous font <span className="italic text-gold">confiance</span></h2>
            </div>
          </Reveal>
        </div>

        {/* Infinite marquee */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-6">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p}-${i}`}
                className="group flex h-24 w-56 shrink-0 items-center justify-center gap-3 rounded-2xl border border-border bg-card/50 px-6 transition hover:border-gold/50 hover:bg-card hover:shadow-gold"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/5 transition group-hover:rotate-12 group-hover:border-gold">
                  <span className="font-display text-base font-bold text-gold">
                    {p.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <span className="font-display text-base font-semibold tracking-wide transition group-hover:text-gold">{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-6 text-center text-xs text-muted-foreground">
          Vous souhaitez devenir partenaire ?{" "}
          <a href="#contact" className="text-gold underline-offset-4 hover:underline">Contactez-nous</a>
        </div>
      </section>

      {/* Pricing / Register */}
      <section id="register" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-gold">Inscription</div>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Choisissez votre formule</h2>
              <p className="mt-4 text-muted-foreground">Places limitées. Réservez la vôtre dès maintenant.</p>
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Online */}
            <Reveal>
              <div className="group card-tilt gold-border-glow relative h-full rounded-3xl border border-border bg-card p-8">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">En ligne</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black transition-colors group-hover:text-gold">15.000</span>
                  <span className="text-sm text-muted-foreground">FCFA</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Plateforme de visioconférence</p>
                <ul className="mt-8 space-y-3 text-sm">
                  {["Accès aux 3 sessions live", "Replay disponible 7 jours", "Q&A interactive", "Certificat numérique"].map((f) => (
                    <li key={f} className="flex items-center gap-3 transition hover:translate-x-1 hover:text-gold">
                      <Check className="h-4 w-4 text-gold" />{f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold/10 hover:scale-[1.02]">
                  S'inscrire en ligne
                </a>
              </div>
            </Reveal>

            {/* Présentiel */}
            <Reveal delay={150}>
              <div className="group card-tilt relative h-full rounded-3xl border-2 border-gold bg-gradient-to-br from-card to-deep p-8 shadow-gold">
                <div className="absolute -top-3 left-8 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-foreground animate-pulse-glow">
                  Recommandé
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Présentiel</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black text-gold">25.000</span>
                  <span className="text-sm text-muted-foreground">FCFA</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">MANOU Hôtel — Ecobank Bonamoussadi</p>
                <ul className="mt-8 space-y-3 text-sm">
                  {["Tout le pack en ligne", "Networking sur place", "Pause-café & déjeuner", "Certificat officiel signé", "Rencontre avec les agents"].map((f) => (
                    <li key={f} className="flex items-center gap-3 transition hover:translate-x-1">
                      <Check className="h-4 w-4 text-gold" />{f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="group/btn relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:scale-[1.02]">
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Réserver en présentiel <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover/btn:translate-x-full" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-deep py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-hero p-10 text-center shadow-elegant md:p-16">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl animate-float" aria-hidden />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl animate-float-rev" aria-hidden />
              <div className="relative">
                <img src={umojaLogo} alt="" width={64} height={64} className="mx-auto mb-4 h-16 w-16 object-contain animate-float" />
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Places limitées</div>
                <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Inscrivez-vous <span className="italic text-gold">dès maintenant</span></h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  Notre équipe vous accompagne pour finaliser votre inscription et répondre à toutes vos questions.
                </p>
                <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
                  <a href="tel:+237677809375" className="inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-6 py-3 text-sm transition hover:border-gold hover:scale-105">
                    <Phone className="h-4 w-4 text-gold" />+237 677 809 375
                  </a>
                  <a href="mailto:Info@umojagroup-elite.com" className="inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-6 py-3 text-sm transition hover:border-gold hover:scale-105">
                    <Mail className="h-4 w-4 text-gold" />Info@umojagroup-elite.com
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-12">
          <Logo />
          <div className="text-xs text-muted-foreground">
            © 2026 UMOJA Sports Agency. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Partenaires :</span>
            <span className="text-gold">Kasmen Law</span>
            <span>·</span>
            <span className="text-gold">Teripik</span>
            <span>·</span>
            <span className="text-gold">One Dibass</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

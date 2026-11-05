import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  Columns3,
  FileText,
  MessageSquareText,
  RefreshCw,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingCopy } from "./_data/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTable } from "@clerk/nextjs";

const PRICING_TAB =
  "rounded-full px-5 py-1.5 data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground";

const featureIcons = {
  canvas: Workflow,
  docs: FileText,
  board: Columns3,
};

const howItWorksIcons = [MessageSquareText, Sparkles, RefreshCw];

function CanvasMockup() {
  return (
    <div className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-xl border border-white/8 bg-[#111113] p-5 sm:min-h-80">
      <div className="flex items-center justify-between border-b border-white/8 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Workflow className="size-4 text-primary" />
          <span>Workspace flow</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/60">
          CANVAS
        </span>
      </div>
      <div
        aria-label="New workspace branches into project definition and team invitation, then becomes ready to build"
        className="relative flex flex-1 flex-col items-center justify-center py-6"
      >
        <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs text-primary">
          New workspace
        </div>
        <div aria-hidden="true" className="relative h-9 w-full max-w-sm">
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-primary/50" />
          <span className="absolute top-4 right-1/4 left-1/4 h-px bg-primary/50" />
          <ArrowDown className="absolute top-4 left-1/4 size-3 -translate-x-1/2 text-primary" />
          <ArrowDown className="absolute top-4 left-3/4 size-3 -translate-x-1/2 text-primary" />
        </div>
        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/3 px-3 py-3 text-center text-[11px] text-foreground/80">
            Define project
          </div>
          <div className="rounded-lg border border-white/10 bg-white/3 px-3 py-3 text-center text-[11px] text-foreground/80">
            Invite team
          </div>
        </div>
        <div aria-hidden="true" className="relative h-9 w-full max-w-sm">
          <span className="absolute top-0 left-1/4 h-4 w-px bg-primary/50" />
          <span className="absolute top-0 left-3/4 h-4 w-px bg-primary/50" />
          <span className="absolute top-4 right-1/4 left-1/4 h-px bg-primary/50" />
          <ArrowDown className="absolute top-4 left-1/2 size-3 -translate-x-1/2 text-primary" />
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-foreground/80">
          Ready to build
        </div>
      </div>
      <div className="absolute bottom-5 right-5 rounded-full border border-primary/20 bg-background/90 px-3 py-1.5 text-[10px] text-primary shadow-lg">
        Outpost agent
      </div>
    </div>
  );
}

function DocsMockup() {
  return (
    <div className="flex min-h-72 items-center justify-center rounded-xl border border-white/8 bg-[#111113] p-5 sm:min-h-80">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-[#19191c] p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="size-4 text-primary" />
            <span>Project spec</span>
          </div>
          <span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mb-2 h-4 w-3/4 rounded-sm bg-foreground/80" />
        <div className="mb-6 h-2 w-1/2 rounded-sm bg-muted-foreground/20" />
        <div className="mb-2 h-2 w-full rounded-sm bg-muted-foreground/25" />
        <div className="mb-2 h-2 w-[92%] rounded-sm bg-muted-foreground/25" />
        <div className="mb-5 h-2 w-4/5 rounded-sm bg-muted-foreground/25" />
        <div className="mb-3 h-3 w-2/5 rounded-sm bg-foreground/60" />
        <div className="mb-2 h-2 w-full rounded-sm bg-muted-foreground/25" />
        <div className="h-2 w-[70%] rounded-sm bg-muted-foreground/25" />
        <div className="mt-5 rounded-md border-l-2 border-primary/70 bg-primary/5 px-3 py-2 text-[10px] leading-relaxed text-muted-foreground">
          Generated from your workspace canvas
        </div>
      </div>
    </div>
  );
}

function BoardMockup() {
  const columns = [
    {
      title: "To do",
      count: "3",
      cards: ["Map onboarding flow", "Review data model"],
    },
    {
      title: "In progress",
      count: "2",
      cards: ["Build workspace setup", "Draft product spec"],
    },
    { title: "Done", count: "4", cards: ["Kickoff", "Define milestones"] },
  ];

  return (
    <div className="min-h-72 overflow-hidden rounded-xl border border-white/8 bg-[#111113] p-4 sm:min-h-80 sm:p-5">
      <div className="mb-5 flex items-center justify-between border-b border-white/8 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Columns3 className="size-4 text-primary" />
          <span>Team workspace</span>
        </div>
        <div className="flex -space-x-1.5">
          <span className="size-5 rounded-full border-2 border-[#111113] bg-amber-300/80" />
          <span className="size-5 rounded-full border-2 border-[#111113] bg-sky-300/80" />
          <span className="size-5 rounded-full border-2 border-[#111113] bg-violet-300/80" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {columns.map((column) => (
          <div key={column.title} className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-1 text-[9px] text-muted-foreground sm:text-[10px]">
              <span className="truncate">{column.title}</span>
              <span>{column.count}</span>
            </div>
            <div className="space-y-2">
              {column.cards.map((card, index) => (
                <div
                  key={card}
                  className="rounded-md border border-white/8 bg-white/4 p-2 sm:p-3"
                >
                  <p className="min-h-8 text-[9px] leading-relaxed text-foreground/80 sm:text-[10px]">
                    {card}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`h-1 w-6 rounded-full ${
                        index === 0 ? "bg-primary/70" : "bg-sky-300/50"
                      }`}
                    />
                    <span className="size-4 rounded-full bg-white/15" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const featureMockups = [CanvasMockup, DocsMockup, BoardMockup];

export default function Home() {
  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="topo-bg flex min-h-[calc(100svh-4.5rem)] items-center justify-center px-6 py-24 text-center md:px-10"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
          <p className="mb-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-primary uppercase">
            <span
              aria-hidden="true"
              className="size-1.5 rotate-45 bg-primary"
            />
            {landingCopy.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="text-5xl leading-[1.05] font-semibold tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {landingCopy.hero.headline.before}
            <span className="text-primary">
              {landingCopy.hero.headline.accent}
            </span>
            {landingCopy.hero.headline.after}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {landingCopy.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            {landingCopy.hero.actions.map((action) => (
              <Button
                key={action.label}
                asChild
                size="lg"
                variant={action.primary ? "default" : "outline"}
                className="h-11 px-6 text-sm"
              >
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>

          <div className="survey-frame scroll-tilt mt-16 w-[min(72rem,calc(100vw-3rem))] rounded-2xl">
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-poster.jpg"
                aria-label={landingCopy.hero.videoAlt}
                className="size-full object-cover"
              >
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Who it's for"
        className="border-y border-white/6 bg-white/[0.02] px-6 py-6 md:px-10"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground sm:gap-x-12">
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60 uppercase">
            Built for
          </span>
          {landingCopy.audiences.map((audience) => (
            <span key={audience}>{audience}</span>
          ))}
        </div>
      </section>

      <section
        id="product"
        aria-labelledby="features-heading"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
            <p className="mb-4 font-mono text-xs tracking-[0.16em] text-primary uppercase">
              {landingCopy.features.eyebrow}
            </p>
            <h2
              id="features-heading"
              className="text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl"
            >
              {landingCopy.features.heading}
            </h2>
          </header>

          <div className="space-y-20 md:space-y-28">
            {landingCopy.features.items.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              const Mockup = featureMockups[index];

              return (
                <article
                  key={feature.title}
                  className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                    index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="max-w-xl">
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <h3 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {feature.title}
                    </h3>
                    <p className="text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-6 text-foreground/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rotate-45 bg-primary"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="survey-frame rounded-2xl">
                    <Mockup />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="border-y border-white/6 bg-white/[0.02] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 font-mono text-xs tracking-[0.16em] text-primary uppercase">
              {landingCopy.howItWorks.eyebrow}
            </p>
            <h2
              id="how-it-works-heading"
              className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            >
              {landingCopy.howItWorks.heading}
            </h2>
          </header>

          <ol className="relative grid grid-cols-1 gap-8 before:absolute before:top-5 before:bottom-5 before:left-5 before:border-l before:border-dashed before:border-primary/40 md:grid-cols-3 md:gap-8 md:before:top-5 md:before:right-[16.666%] md:before:bottom-auto md:before:left-[16.666%] md:before:border-t md:before:border-l-0">
            {landingCopy.howItWorks.steps.map((step, index) => {
              const Icon = howItWorksIcons[index];

              return (
                <li
                  key={step.title}
                  className="relative flex gap-4 md:flex-col md:items-center md:gap-0 md:px-6 md:text-center"
                >
                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-primary">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="pt-1 md:pt-5">
                    <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-primary uppercase">
                      Waypoint 0{index + 1}
                    </p>
                    <h3 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="max-w-sm text-sm leading-6 text-muted-foreground md:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <p className="mb-4 font-mono text-xs tracking-[0.16em] text-primary uppercase">
            {landingCopy.pricing.eyebrow}
          </p>
          <h2
            id="pricing-heading"
            className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            {landingCopy.pricing.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground mb-12">
            {landingCopy.pricing.description}
          </p>
          <Tabs
            defaultValue="user"
            className="mx-auto max-w-5xl items-center gap-10"
          >
            <TabsList className="h-auto rounded-full border border-white/10 bg-white/3 p-1">
              <TabsTrigger value="user" className={PRICING_TAB}>
                Personal
              </TabsTrigger>
              <TabsTrigger value="organization" className={PRICING_TAB}>
                Team
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user" className="w-full">
              <PricingTable for="user" />
            </TabsContent>
            <TabsContent value="organization" className="w-full">
              <PricingTable for="organization" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section
        aria-labelledby="closing-cta-heading"
        className="topo-bg relative isolate overflow-hidden border-y border-white/6 px-6 py-20 md:px-10 md:py-22"
      >
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <Image
            src="/brand/mascot-dark.png"
            alt=""
            width={220}
            height={220}
            className="mb-6 size-28 object-contain sm:size-36"
          />
          <p className="mb-4 font-mono text-xs tracking-[0.16em] text-primary uppercase">
            {landingCopy.closingCta.eyebrow}
          </p>
          <h2
            id="closing-cta-heading"
            className="max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl"
          >
            {landingCopy.closingCta.heading}
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            {landingCopy.closingCta.description}
          </p>
          <Button asChild size="lg" className="mt-8 h-11 px-6 text-sm">
            <Link href="/sign-up">{landingCopy.closingCta.action}</Link>
          </Button>
        </div>
      </section>

      <footer className="px-6 py-6 text-center text-xs text-muted-foreground md:px-10">
        {landingCopy.footer}
      </footer>
    </main>
  );
}

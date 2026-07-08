/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { causesData } from '../data';
import { Cause } from '../types';
import CauseCard from './CauseCard';
import CurrencyConverter from './CurrencyConverter';
import { 
  ArrowRight, ShieldCheck, HelpCircle, ChevronDown, 
  ChevronUp, Heart, Mail, ExternalLink, Calendar,
  ArrowUpRight, Info
} from 'lucide-react';

interface HomeTabProps {
  progressIndex: number;
  setActiveTab: (tab: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail') => void;
  setSelectedCauseId: (id: number) => void;
}

export default function HomeTab({
  progressIndex,
  setActiveTab,
  setSelectedCauseId,
}: HomeTabProps) {
  // We manage accordion active indexes in home state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const formatFraction = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Get first 6 featured causes
  const featuredCauses = causesData.slice(0, 6);

  // FAQ Data from brand copy Guidelines Section 8
  const faqs = [
    {
      q: "Why give it away instead of investing it?",
      a: "Because the problems on this list compound faster than money does. Evidence-backed giving today saves lives today — and I'm betting I can earn the next crore too."
    },
    {
      q: "Why do this publicly? Isn't quiet giving better?",
      a: "Accountability and replication. A private commitment is easy to quietly drop; fifty public ones aren't. And a documented method is one other people can copy at any scale — that's the point."
    },
    {
      q: "How were the fifty causes chosen?",
      a: "From the research of independent evaluators — GiveWell, Animal Charity Evaluators, Giving Green, The Life You Can Save — balanced across four pillars, with about half focused on or operating in India. The full reasoning is in the ledger."
    },
    {
      q: "Can I donate through this site?",
      a: "Not to me — ever. Every cause page links directly to the organisation's own donation page. If an episode moves you, give to them. Indian orgs with 80G status are marked, so your donation may be tax-deductible."
    },
    {
      q: "What does \"lives impacted\" mean?",
      a: "An estimate, not a boast — calculated from each organisation's own published cost-effectiveness data, every source linked in the ledger. Where the evidence is uncertain, the page says so."
    }
  ];

  const handleCauseClick = (id: number) => {
    setSelectedCauseId(id);
    setActiveTab('cause-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput('');
    }
  };

  // Calculations for pill states
  const pillarStats = {
    human: { total: 32, funds: 6400000, color: 'bg-pillar-human', text: 'text-pillar-human' },
    animal: { total: 6, funds: 1200000, color: 'bg-pillar-animal', text: 'text-pillar-animal' },
    environment: { total: 8, funds: 1600000, color: 'bg-pillar-environment', text: 'text-pillar-environment' },
    resilience: { total: 4, funds: 800000, color: 'bg-pillar-resilience', text: 'text-[#7B5EA7]' }
  };

  // How many of each pillar are current funded based on timeline
  const getPillarProgress = (pillar: 'human' | 'animal' | 'environment' | 'resilience') => {
    return causesData.filter(c => c.pillar === pillar && c.id <= progressIndex).length;
  };

  return (
    <div className="space-y-24 pb-24 overflow-x-hidden" id="home-landing-page">
      
      {/* ================= SECTION 2: HERO ================= */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-start bg-banyan text-white overflow-hidden py-16"
        id="home-section-2-hero"
      >
        {/* Editorial organic background look with large decorative leaf veins gradient overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_bottom_right] from-leaf/30 via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(22,58,44,0.95),rgba(22,58,44,0.90))]"></div>
        
        {/* Subtle dynamic grid patterns for a ledger layout */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Dynamic Ghost Watermark Fraction (Bottom Right, 12% opacity) */}
        <div className="absolute bottom-4 right-4 md:bottom-12 md:right-12 select-none pointer-events-none text-white/[0.07] font-mono text-[140px] sm:text-[220px] md:text-[280px] lg:text-[340px] font-extrabold leading-none tracking-tighter">
          {formatFraction(progressIndex)}/50
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 space-y-8 text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="font-mono text-[11px] font-bold text-marigold tracking-widest uppercase">
              ACTUAL SEEDING PROJECT
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Fifty causes.<br />One crore.<br />
              <span className="text-marigold font-bold italic relative">
                Every rupee on camera.
                <span className="absolute left-0 bottom-0.5 h-[3px] w-full bg-marigold/30"></span>
              </span>
            </h1>
          </div>

          <p className="font-sans text-base sm:text-lg md:text-xl text-mint/80 max-w-2xl leading-relaxed font-normal">
            A finite documented experiment: ₹1,00,00,000 deployed across fifty of the world&apos;s most solvable problems — ₹2 lakh at a time, every fortnight, chosen with evidence, proven with receipts. Half of it for India.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => {
                document.getElementById('ledger-progress-strip')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-marigold text-banyan rounded-full font-sans text-sm font-extrabold uppercase tracking-widest shadow-lg hover:shadow-marigold/10 transition-all duration-200 hover:-translate-y-0.5"
              id="hero-cta-ledger-btn"
            >
              See the ledger ↓
            </button>
            <button
              onClick={() => {
                setActiveTab('causes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-sans text-sm font-extrabold uppercase tracking-widest hover:border-white transition-all duration-200"
              id="hero-cta-causes-btn"
            >
              Examine Causes
            </button>
          </div>
        </div>
      </section>


      {/* ================= SECTION 4: WHAT THIS IS ================= */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6" id="home-section-4-explanation">
        <div className="space-y-8">
          <div className="text-center md:text-left space-y-2">
            <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
              01 · Vision Definition
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-banyan">
              What The Fifty Project is
            </h2>
          </div>

          <div className="font-sans text-[16px] sm:text-[17px] leading-relaxed text-ink space-y-6">
            <p>
              One crore rupees. Fifty problems — malaria, TB, kids out of school, dirty air, the next pandemic. One problem every fortnight, for fifty fortnights. For each one, the money goes to the single most effective organisation the evidence points to, guided by independent evaluators like <strong className="text-leaf">GiveWell</strong>, <strong className="text-[#C46A2B]">Animal Charity Evaluators</strong> and <strong className="text-[#3E7CA6]">Giving Green</strong>.
            </p>
            <p>
              Every transfer happens on camera. Every receipt is published in the open ledger. Every episode includes the strongest criticism of the organisation that was just funded.
            </p>
          </div>

          {/* Three Commitments Accent Box */}
          <div className="bg-mint border-l-4 border-marigold p-6 sm:p-8 rounded-r-xl space-y-4">
            <span className="font-mono text-xs text-banyan tracking-widest uppercase font-extrabold block">
              The Three Iron Commitments
            </span>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-sm text-banyan">
              <div className="space-y-1">
                <h5 className="font-bold uppercase tracking-wider text-xs">01 / REGARDLESS OF VIEWS</h5>
                <p className="text-receipt-grey leading-relaxed text-xs">The money goes regardless of views — all fifty transfers happen even if nobody watches.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold uppercase tracking-wider text-xs">02 / 100% TRANSPARENCY</h5>
                <p className="text-receipt-grey leading-relaxed text-xs">Every rupee is public — no secret transfers, no deductions, open receipts on every page.</p>
              </div>
              <div className="space-y-1">
                <h5 className="font-bold uppercase tracking-wider text-xs">03 / HONESTY OVER HYPE</h5>
                <p className="text-receipt-grey leading-relaxed text-xs">When something is uncertain or I get it wrong, it is admitted and stated clearly on camera.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SECTION 5: HOW IT WORKS ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="home-section-5-how-it-works">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs text-marigold tracking-widest uppercase font-bold block">
            02 · Operational Protocol
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-banyan">
            How it works
          </h2>
          <p className="font-sans text-sm text-receipt-grey max-w-xl mx-auto">
            A continuous, fortnightly loop designed to convert capital directly into verified impact.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-mint/60 border border-hairline p-8 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-leaf bg-white px-2.5 py-1 rounded-md border border-hairline">
                STEP 01
              </span>
              <h4 className="font-display text-xl font-bold text-banyan">One problem per week</h4>
            </div>
            <p className="font-sans text-xs sm:text-sm text-receipt-grey leading-relaxed">
              Fifty problems, no repeats, spanning human health, animals, climate and global resilience. Each gets two weeks of research and one episode.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-mint/60 border border-hairline p-8 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-leaf bg-white px-2.5 py-1 rounded-md border border-hairline">
                STEP 02
              </span>
              <h4 className="font-display text-xl font-bold text-banyan">The single best org</h4>
            </div>
            <p className="font-sans text-xs sm:text-sm text-receipt-grey leading-relaxed">
              Not the most famous charity — the most effective one, according to the most rigorous independent evaluators in the world. ₹2,00,000 each.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-mint/60 border border-hairline p-8 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-leaf bg-white px-2.5 py-1 rounded-md border border-hairline">
                STEP 03
              </span>
              <h4 className="font-display text-xl font-bold text-banyan">On camera, receipt published</h4>
            </div>
            <p className="font-sans text-xs sm:text-sm text-receipt-grey leading-relaxed">
              The transfer is filmed. The receipt goes in the public ledger. The episode names what could go wrong, not just what went right.
            </p>
          </div>
        </div>
      </section>


      {/* ================= SECTION 6: THE FOUR PILLARS ================= */}
      <section className="bg-white border-y border-hairline py-16" id="home-section-6-pillars">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
                03 · Financial Architecture
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-banyan">
                One crore, four pillars
              </h2>
              <p className="font-sans text-xs sm:text-sm text-receipt-grey">
                Our strategic capital is strictly partitioned into four critical buckets to balance rapid relief with long-term biosystem safeguarding.
              </p>
            </div>
            <div className="shrink-0 bg-mint text-banyan border border-hairline px-4 py-2 rounded-lg font-mono text-xs font-semibold">
              🇮🇳 ~50% of Crore goes to India-focused programs
            </div>
          </div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Pillar 1: Human */}
            <div className="border border-hairline rounded-2xl p-6 hover:shadow-md transition-shadow bg-paper/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-pillar-human font-mono text-[11px] font-extrabold uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                  Human wellbeing
                </span>
                <span className="font-mono text-xs text-receipt-grey font-semibold">
                  32 Causes
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-display text-banyan">₹64,00,000</div>
                <p className="text-xs text-receipt-grey leading-relaxed font-sans">
                  Health, hunger, education, dignity. Standard transfers range from malaria nets to free midday school meals.
                </p>
              </div>
              {/* Progress visual */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-receipt-grey">
                  <span>FUNDED PROGRESS:</span>
                  <span>{getPillarProgress('human')} / 32</span>
                </div>
                <div className="w-full h-1.5 bg-hairline rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-pillar-human"
                    initial={{ width: 0 }}
                    animate={{ width: `${(getPillarProgress('human') / 32) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Pillar 2: Animal */}
            <div className="border border-hairline rounded-2xl p-6 hover:shadow-md transition-shadow bg-paper/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-pillar-animal font-mono text-[11px] font-extrabold uppercase tracking-widest bg-orange-50 px-2 py-1 rounded border border-orange-100">
                  Animal wellbeing
                </span>
                <span className="font-mono text-xs text-receipt-grey font-semibold">
                  6 Causes
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-display text-banyan">₹12,00,000</div>
                <p className="text-xs text-receipt-grey leading-relaxed font-sans">
                  Targeting the welfare standards of billions of farming animals living inside crowded industrial factory layouts.
                </p>
              </div>
              {/* Progress visual */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-receipt-grey">
                  <span>FUNDED PROGRESS:</span>
                  <span>{getPillarProgress('animal')} / 6</span>
                </div>
                <div className="w-full h-1.5 bg-hairline rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-pillar-animal"
                    initial={{ width: 0 }}
                    animate={{ width: `${(getPillarProgress('animal') / 6) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Pillar 3: Environment */}
            <div className="border border-hairline rounded-2xl p-6 hover:shadow-md transition-shadow bg-paper/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-pillar-environment font-mono text-[11px] font-extrabold uppercase tracking-widest bg-blue-50 px-2 py-1 rounded border border-blue-100">
                  Environment &amp; Climate
                </span>
                <span className="font-mono text-xs text-receipt-grey font-semibold">
                  8 Causes
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-display text-banyan">₹16,00,000</div>
                <p className="text-xs text-receipt-grey leading-relaxed font-sans">
                  Mitigating regional greenhouse leaks and standing forest canopy logging. Focused heavily on high-leverage clean air policies.
                </p>
              </div>
              {/* Progress visual */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-receipt-grey">
                  <span>FUNDED PROGRESS:</span>
                  <span>{getPillarProgress('environment')} / 8</span>
                </div>
                <div className="w-full h-1.5 bg-hairline rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-pillar-environment"
                    initial={{ width: 0 }}
                    animate={{ width: `${(getPillarProgress('environment') / 8) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

            {/* Pillar 4: Resilience */}
            <div className="border border-hairline rounded-2xl p-6 hover:shadow-md transition-shadow bg-paper/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-pillar-resilience font-mono text-[11px] font-extrabold uppercase tracking-widest bg-purple-50 px-2 py-1 rounded border border-purple-100">
                  Global resilience
                </span>
                <span className="font-mono text-xs text-receipt-grey font-semibold">
                  4 Causes
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold font-display text-banyan">₹8,00,000</div>
                <p className="text-xs text-receipt-grey leading-relaxed font-sans">
                  Shoring biosecurity sensors or sewage scanning. Hedging global risks with robust, evidence-backed fail-safe designs.
                </p>
              </div>
              {/* Progress visual */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-receipt-grey">
                  <span>FUNDED PROGRESS:</span>
                  <span>{getPillarProgress('resilience')} / 4</span>
                </div>
                <div className="w-full h-1.5 bg-hairline rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#7B5EA7]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(getPillarProgress('resilience') / 4) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION: INTERACTIVE CURRENCY CONVERTER ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-currency-calc-section">
        <CurrencyConverter />
      </section>


      {/* ================= SECTION 7: THE CAUSES (PREVIEW GRID) ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12" id="home-section-7-grid">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
              04 · The Causes Preview
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-banyan">
              The fifty
            </h2>
            <p className="font-sans text-xs sm:text-sm text-receipt-grey max-w-xl">
              From a ₹170 mosquito net to the lab scanning sewage for the next pandemic — each chosen on evidence, each funded with ₹2,00,000.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('causes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-banyan px-6 py-3 font-sans text-xs font-extrabold uppercase tracking-wide text-banyan hover:bg-mint/35 transition-colors self-start md:self-auto"
            id="all-fifty-causes-nav-btn"
          >
            All fifty causes →
          </button>
        </div>

        {/* Featured 6 Causes Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCauses.map((cause) => {
            const isFunded = cause.id <= progressIndex;
            const isUpNext = cause.id === progressIndex + 1;
            const cardStatus = isFunded ? 'funded' : isUpNext ? 'up_next' : 'queued';

            return (
              <CauseCard
                key={cause.id}
                cause={cause}
                onClick={() => handleCauseClick(cause.id)}
                relativeStatus={cardStatus}
              />
            );
          })}
        </div>
      </section>


      {/* ================= SECTION 8: ABOUT ME ================= */}
      <section className="bg-mint/40 border-y border-hairline py-16" id="home-section-8-bio">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-5 items-center">
            
            {/* Visual Portrait Card */}
            <div className="md:col-span-2 relative aspect-[3/4] bg-banyan rounded-2xl overflow-hidden shadow-lg border border-hairline shrink-0">
              {/* Photorealistic simulation of Kevin */}
              <div className="absolute inset-0 bg-banyan flex flex-col justify-between p-6 select-none leading-none">
                <span className="font-mono text-[10px] text-marigold tracking-widest font-extrabold block">
                  PROJECT DIRECT ENVOY
                </span>
                
                <div className="space-y-4">
                  <div className="h-10 w-10 shrink-0 bg-white/10 rounded-full border border-white/15 flex items-center justify-center font-mono text-sm text-marigold font-bold text-center">
                    KV
                  </div>
                  <div>
                    <h5 className="font-display text-2xl font-bold text-white">Kevin</h5>
                    <span className="font-mono text-[10px] text-mint/80 mt-1 uppercase tracking-wide block">
                      Mechanical Engineer &amp; Marketer
                    </span>
                  </div>
                </div>
              </div>
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-radial-[circle_at_bottom] from-banyan/70 via-transparent to-transparent"></div>
            </div>

            {/* Bio Write-up */}
            <div className="md:col-span-3 space-y-6 text-left">
              <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
                05 · Project Origin
              </span>
              <h2 className="font-display text-3xl font-bold text-banyan leading-tight">
                Who&apos;s behind this
              </h2>
              <div className="font-sans text-[15px] sm:text-[15.5px] leading-relaxed text-ink space-y-4">
                <p>
                  I&apos;m Kevin — 28, from Chennai. Mechanical engineer by degree, performance marketer by trade: a few e-commerce ventures, remote work for US companies, five years buying Meta ads. That&apos;s where the crore came from.
                </p>
                <p>
                  The short version of why: my parents grew up without money, and I grew up on their stories. At 20 I decided the first crore I earned would be deployed like this. The Fifty Project is that decision, executed — in public, because public commitments don&apos;t get quietly dropped, and because giving shouldn&apos;t be something you postpone to retirement.
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-banyan text-white px-6 py-3 font-mono text-xs tracking-wider uppercase font-bold hover:bg-leaf transition-colors mt-2"
                  id="full-story-bio-btn"
                >
                  The full story →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= SECTION 9: LATEST EPISODE ================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6" id="home-section-9-episode">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-marigold tracking-widest uppercase font-bold block">
              06 · Video Diaries
            </span>
            <h2 className="font-display text-3xl font-bold text-banyan">
              The episodes
            </h2>
            <p className="font-sans text-xs sm:text-sm text-receipt-grey max-w-xl mx-auto">
              We film the entire process—including research debates, wire confirmations, and honest trade-offs.
            </p>
          </div>

          <div className="border border-hairline rounded-2xl overflow-hidden bg-white shadow-sm grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* YouTube Embed Frame (placeholder link for now) */}
            <div className="md:col-span-7 bg-[#1C1B17] aspect-video relative">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/@kevinmarkdrozario"
                title="Episode 00/50 — The Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Video description card */}
            <div className="md:col-span-5 p-8 space-y-4">
              <span className="font-mono text-[10px] text-leaf tracking-wider uppercase font-bold block">
                Active Broadcast
              </span>
              <h4 className="font-display text-lg font-bold text-banyan leading-tight">
                Episode 00/50. The first transfer happens July 2026.
              </h4>
              <p className="font-sans text-xs text-receipt-grey leading-relaxed">
                We release a new episode every single fortnight corresponding to each numbered ledger transfer. Subscribe directly on YouTube to examine transfer wire confirmation frames.
              </p>
              <a
                href="https://www.youtube.com/@kevinmarkdrozario"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-extrabold uppercase tracking-wide text-marigold hover:text-banyan transition-colors mt-2"
                id="youtube-channel-redirect-btn"
              >
                Go to channel <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* ================= SECTION 10: FAQ ================= */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6" id="home-section-10-faq">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
              07 · Public Inquiries
            </span>
            <h2 className="font-display text-3xl font-bold text-banyan">
              Questions people actually ask
            </h2>
          </div>

          {/* Interactive Accordion */}
          <div className="border border-hairline rounded-xl overflow-hidden bg-white divide-y divide-hairline">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="transition-colors hover:bg-mint/10">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-sans text-[15px] font-extrabold text-banyan"
                    id={`faq-btn-${idx}`}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-marigold" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-receipt-grey" />
                    )}
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 font-sans text-xs sm:text-sm text-receipt-grey leading-relaxed whitespace-pre-line border-t border-hairline/40 pt-4 bg-[#FBFAF6]">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

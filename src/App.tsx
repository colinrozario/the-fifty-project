/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import LedgerStrip from './components/LedgerStrip';
import HomeTab from './components/HomeTab';
import CausesTab from './components/CausesTab';
import AboutTab from './components/AboutTab';
import LedgerTab from './components/LedgerTab';
import CauseDetail from './components/CauseDetail';
import { Mail, CheckCircle, ExternalLink, ArrowUpRight, Shield } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail'
  const [activeTab, setActiveTab] = useState<'home' | 'causes' | 'about' | 'ledger' | 'cause-detail'>('home');
  
  // Simulation level: 0 to 50 (1st cause funded - Malaria Nets)
  const [progressIndex, setProgressIndex] = useState<number>(1);
  
  // Selected cause for the detailed view (defaults to Malaria - ID 1)
  const [selectedCauseId, setSelectedCauseId] = useState<number>(1);

  // Email subscribing state for the footer
  const [emailInput, setEmailInput] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const formatFraction = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput('');
      setTimeout(() => {
        setEmailSubscribed(false);
      }, 5000);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeTab
            progressIndex={progressIndex}
            setActiveTab={setActiveTab}
            setSelectedCauseId={setSelectedCauseId}
          />
        );
      case 'causes':
        return (
          <CausesTab
            progressIndex={progressIndex}
            setActiveTab={setActiveTab}
            setSelectedCauseId={setSelectedCauseId}
          />
        );
      case 'about':
        return <AboutTab />;
      case 'ledger':
        return (
          <LedgerTab
            progressIndex={progressIndex}
            setActiveTab={setActiveTab}
            setSelectedCauseId={setSelectedCauseId}
          />
        );
      case 'cause-detail':
        return (
          <CauseDetail
            causeId={selectedCauseId}
            setSelectedCauseId={setSelectedCauseId}
            setActiveTab={setActiveTab}
            progressIndex={progressIndex}
          />
        );
      default:
        return (
          <HomeTab
            progressIndex={progressIndex}
            setActiveTab={setActiveTab}
            setSelectedCauseId={setSelectedCauseId}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-marigold selection:text-banyan font-sans" id="app-shell">
      
      {/* Dynamic Nav-header with Timeline Simulator */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progressIndex={progressIndex}
        setProgressIndex={setProgressIndex}
        setSelectedCauseId={setSelectedCauseId}
      />

      {/* Global Ticker Band - Show on all core tabs, hide only on Cause Detail to let narrative breath */}
      {activeTab !== 'cause-detail' && (
        <LedgerStrip
          progressIndex={progressIndex}
          setActiveTab={setActiveTab}
        />
      )}

      {/* Main Container Viewport with subtle transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-' + selectedCauseId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ================= SECTION 11: DESIGN-COMPLIANT BRAND FOOTER ================= */}
      <footer className="bg-banyan text-[#FBFAF6] border-t border-marigold/20" id="brand-footer">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Left Box: Logo & Mission Statement */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-3">
                {/* Monospace signature numerator/denominator */}
                <div className="flex h-9 w-9 items-center justify-center rounded bg-white/10 overflow-hidden font-mono text-xs select-none">
                  <div className="flex flex-col items-center">
                    <span className="text-marigold font-bold -mb-0.5">{formatFraction(progressIndex)}</span>
                    <div className="w-4 h-[1px] bg-white/30"></div>
                    <span className="text-white/70 text-[10px] mt-0.5">50</span>
                  </div>
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  The Fifty Project
                </span>
              </div>
              
              <p className="font-sans text-xs sm:text-sm text-mint/80 max-w-sm leading-relaxed">
                The Fifty Project — one crore, fifty causes, every rupee on camera. A personal initiative in the engineering sense to deploy ₹1,00,00,000 across targeted global obstacles.
              </p>
              <div className="text-[11px] font-mono text-mint/65 uppercase tracking-wider">
                A giving project by Kevin
              </div>
            </div>

            {/* Middle Box: Navigation & External Links */}
            <div className="md:col-span-3 text-left space-y-4">
              <h5 className="font-mono text-xs tracking-widest text-[#9CC4B0] uppercase font-bold">
                Navigation Indices
              </h5>
              <ul className="space-y-2.5 font-sans text-xs font-semibold text-mint/80">
                <li>
                  <button 
                    onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-marigold transition-colors"
                  >
                    Home Ledger Overview
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('causes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-marigold transition-colors"
                  >
                    All Fifty Causes Directory
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-marigold transition-colors"
                  >
                    Philosophy &amp; Biography
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('ledger'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-marigold transition-colors"
                  >
                    Spreadsheet audit index
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Box: Fortnightly Subscription Sign-up */}
            <div className="md:col-span-4 text-left space-y-4">
              <h5 className="font-mono text-xs tracking-widest text-[#9CC4B0] uppercase font-bold">
                Fortnightly Audit Dispatch
              </h5>
              <p className="font-sans text-xs text-mint/85 leading-relaxed">
                One email per fortnight. You receive the official bank confirmation receipt and the direct impact audit.
              </p>

              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email index..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-marigold focus:border-marigold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bg-marigold text-banyan font-sans text-[10px] font-extrabold uppercase px-3.5 py-1.5 rounded-full hover:scale-105 transition-transform"
                  >
                    SUBSCRIBE
                  </button>
                </div>
                {emailSubscribed && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-mono text-marigold flex items-center gap-1"
                  >
                    <CheckCircle className="h-3 w-3 shrink-0" />
                    Subscription registered. Welcome to the ledger.
                  </motion.p>
                )}
              </form>
            </div>

          </div>

          {/* Bottom regulatory advisory panel */}
          <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-mint/60">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <Shield className="h-4 w-4 text-marigold shrink-0" />
              <p className="max-w-2xl leading-normal">
                Donations marked <strong>80G</strong> may be tax-deductible in India — verify with each organisation on their direct portal. This is a personal giving project, not a registered charity. © 2026 The Fifty Project.
              </p>
            </div>
            
            <div className="flex gap-4 shrink-0 font-mono text-[10px]">
              <a href="https://www.youtube.com/@kevinmarkdrozario" className="hover:text-white transition-colors">YOUTUBE</a>
              <span>·</span>
              <a href="https://www.instagram.com/kevin.mark.d.rozario" className="hover:text-white transition-colors">INSTAGRAM</a>
              <span>·</span>
              <a href="https://x.com/KevinMarkDRoza1" className="hover:text-white transition-colors">X</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

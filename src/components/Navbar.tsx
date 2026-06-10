/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Pause, ChevronRight, Menu, X, ArrowUpRight, HelpCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail';
  setActiveTab: (tab: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail') => void;
  progressIndex: number;
  setProgressIndex: (index: number) => void;
  setSelectedCauseId: (id: number) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  progressIndex,
  setProgressIndex,
  setSelectedCauseId,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSimulatorTip, setShowSimulatorTip] = useState(true);

  const formatFraction = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const handleLinkClick = (tab: 'home' | 'causes' | 'about' | 'ledger') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="nav-header" className="sticky top-0 z-50 w-full border-b border-hairline bg-paper/95 backdrop-blur-md">
      {/* Top Banner: Progress Timeline Simulator */}
      <div className="w-full bg-mint px-4 py-2 text-xs border-b border-hairline text-banyan">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-1.5 font-sans font-medium text-[11px] sm:text-xs text-center sm:text-left">
            <span className="flex h-2 w-2 rounded-full bg-marigold animate-pulse"></span>
            <span className="font-mono bg-banyan text-white px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase font-semibold">
              Live Milestone Simulator
            </span>
            <span>Drag the slider to preview the 50 causes and watch the ledger grow:</span>
          </div>
          
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <span className="font-mono font-bold text-banyan shrink-0">
              {formatFraction(progressIndex)}/50
            </span>
            <input
              type="range"
              min="0"
              max="50"
              value={progressIndex}
              onChange={(e) => {
                setProgressIndex(parseInt(e.target.value, 10));
                setShowSimulatorTip(false);
              }}
              className="h-1.5 w-full cursor-pointer rounded-lg bg-hairline accent-marigold sm:w-48"
              id="milestone-timeline-slider"
            />
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => setProgressIndex(Math.max(0, progressIndex - 1))}
                disabled={progressIndex === 0}
                className="flex h-5 w-5 items-center justify-center rounded border border-banyan/20 font-bold bg-white/50 text-[10px] hover:bg-white disabled:opacity-30"
                id="milestone-decrement-btn"
              >
                -
              </button>
              <button
                onClick={() => setProgressIndex(Math.min(50, progressIndex + 1))}
                disabled={progressIndex === 50}
                className="flex h-5 w-5 items-center justify-center rounded border border-banyan/20 font-bold bg-white/50 text-[10px] hover:bg-white disabled:opacity-30"
                id="milestone-increment-btn"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Lockup */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
          id="navbar-logo-lockup"
        >
          {/* Custom Avatar Symbol */}
          <div className="flex h-10 w-10 items-center justify-center rounded bg-banyan overflow-hidden shrink-0">
            <div className="font-mono text-sm leading-none flex flex-col items-center">
              <span className="text-marigold font-bold -mb-0.5">{formatFraction(progressIndex)}</span>
              <div className="w-5 h-[1px] bg-white/40"></div>
              <span className="text-white/80 text-[11px] font-medium mt-0.5">50</span>
            </div>
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-tight text-banyan sm:text-xl">
              The Fifty Project
            </span>
            <div className="hidden font-mono text-[10px] text-leaf leading-none sm:block">
              FIFTY CAUSES · ONE CRORE · ON CAMERA
            </div>
          </div>
        </div>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav-menu">
          {[
            { id: 'home', label: 'Home' },
            { id: 'causes', label: 'Causes' },
            { id: 'about', label: 'About' },
            { id: 'ledger', label: 'Ledger' }
          ].map((link) => {
            const isActive = activeTab === link.id || (link.id === 'causes' && activeTab === 'cause-detail');
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id as any)}
                className={`relative py-2 font-sans text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-banyan' : 'text-receipt-grey hover:text-banyan'
                }`}
                id={`nav-${link.id}-btn`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-leaf"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://youtube.com/@thefiftyproject"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-marigold px-5 py-2 font-sans text-xs font-extrabold uppercase tracking-wider text-banyan transition-transform hover:scale-105 active:scale-95 shadow-sm"
            id="watch-youtube-nav-btn"
          >
            Watch on YouTube
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-banyan hover:text-leaf"
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-hairline bg-paper"
            id="mobile-drawer-menu"
          >
            <div className="space-y-2 px-4 py-4 pb-6">
              {[
                { id: 'home', label: 'Home' },
                { id: 'causes', label: 'Causes' },
                { id: 'about', label: 'About' },
                { id: 'ledger', label: 'Ledger' }
              ].map((link) => {
                const isActive = activeTab === link.id || (link.id === 'causes' && activeTab === 'cause-detail');
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id as any)}
                    className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide ${
                      isActive ? 'bg-mint text-banyan font-bold' : 'text-receipt-grey hover:bg-mint/50'
                    }`}
                    id={`mobile-nav-${link.id}-btn`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-hairline">
                <a
                  href="https://youtube.com/@thefiftyproject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-marigold px-4 py-3 font-sans text-center text-xs font-extrabold uppercase tracking-wider text-banyan"
                  id="mobile-watch-youtube-btn"
                >
                  Watch on YouTube
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

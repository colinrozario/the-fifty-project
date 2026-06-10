/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { causesData } from '../data';
import { Cause } from '../types';
import CauseCard from './CauseCard';
import { Search, Filter, HelpCircle } from 'lucide-react';

interface CausesTabProps {
  progressIndex: number;
  setActiveTab: (tab: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail') => void;
  setSelectedCauseId: (id: number) => void;
}

export default function CausesTab({
  progressIndex,
  setActiveTab,
  setSelectedCauseId,
}: CausesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const handleCauseSelect = (id: number) => {
    setSelectedCauseId(id);
    setActiveTab('cause-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRelativeStatus = (causeId: number): 'funded' | 'up_next' | 'queued' => {
    if (causeId <= progressIndex) return 'funded';
    if (causeId === progressIndex + 1) return 'up_next';
    return 'queued';
  };

  const filteredCauses = causesData.filter((cause) => {
    const relativeStatus = getRelativeStatus(cause.id);
    const matchesSearch = 
      cause.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cause.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cause.fraction.includes(searchQuery);

    const matchesPillar = selectedPillar === 'all' || cause.pillar === selectedPillar;
    const matchesLocation = selectedLocation === 'all' || cause.location === selectedLocation;

    return matchesSearch && matchesPillar && matchesLocation;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 bg-paper" id="causes-explorer-page">
      
      {/* Page header */}
      <div className="border-b border-banyan pb-6 text-left space-y-2">
        <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
          10 · Scoped Content Directory
        </span>
        <h1 className="font-display font-medium text-4xl text-banyan leading-none">
          The Fifty Causes
        </h1>
        <p className="font-sans text-xs sm:text-sm text-receipt-grey max-w-2xl leading-relaxed">
          Filter through our continuous ledger of Fifty solvable causes. Clicking on any project card summons full details, cost-multiplier formulas, and direct non-profit wire donation lines.
        </p>
      </div>

      {/* Advanced Filter Interface */}
      <div className="flex flex-col gap-4 bg-white border border-hairline rounded-xl p-5 md:flex-row md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-receipt-grey" />
          <input
            type="text"
            placeholder="Search by cause name, keyword, or NGO operator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper pl-10 pr-4 py-2 text-sm text-banyan border border-hairline rounded-md focus:outline-none focus:ring-1 focus:ring-leaf"
            id="causes-directory-search-input"
          />
        </div>

        {/* Categories selector */}
        <div className="flex flex-wrap gap-3">
          {/* Pillar Selector */}
          <div className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-receipt-grey" />
            <select
              value={selectedPillar}
              onChange={(e) => setSelectedPillar(e.target.value)}
              className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-banyan focus:outline-none"
              id="causes-pillar-dropdown"
            >
              <option value="all">All Pillars</option>
              <option value="human">Human Wellbeing</option>
              <option value="animal">Animal Wellbeing</option>
              <option value="environment">Environment &amp; Climate</option>
              <option value="resilience">Global Resilience</option>
            </select>
          </div>

          {/* Location Selector */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-banyan focus:outline-none"
            id="causes-location-dropdown"
          >
            <option value="all">All Locations</option>
            <option value="India">🇮🇳 Focused on India</option>
            <option value="Global">🌐 Global Impact Focus</option>
          </select>
        </div>
      </div>

      {/* Grid listing */}
      {filteredCauses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="causes-explorer-grid-wrapper">
          {filteredCauses.map((cause) => {
            const cardRelativeStatus = getRelativeStatus(cause.id);
            return (
              <CauseCard
                key={cause.id}
                cause={cause}
                onClick={() => handleCauseSelect(cause.id)}
                relativeStatus={cardRelativeStatus}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 font-sans border border-dashed border-hairline rounded-2xl bg-white space-y-2">
          <HelpCircle className="h-8 w-8 text-receipt-grey mx-auto" />
          <p className="text-sm text-receipt-black font-semibold">No causes detected matching those boundaries.</p>
          <p className="text-xs text-receipt-grey">Try resetting your pillar or location filters to see more results.</p>
        </div>
      )}

    </div>
  );
}

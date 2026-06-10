/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cause } from '../types';
import { CheckCircle, ArrowRight, CornerDownRight } from 'lucide-react';

interface CauseCardProps {
  key?: any;
  cause: Cause;
  onClick: () => void;
  relativeStatus: 'funded' | 'up_next' | 'queued';
}

export default function CauseCard({ cause, onClick, relativeStatus }: CauseCardProps) {
  // Map our pillars to custom styles specified in the Brand Guidelines
  const getPillarStyles = (pillar: string) => {
    switch (pillar) {
      case 'human':
        return {
          bg: 'bg-leaf/10',
          text: 'text-pillar-human',
          border: 'border-pillar-human/20',
          dot: 'bg-pillar-human',
          label: 'Human Wellbeing',
        };
      case 'animal':
        return {
          bg: 'bg-[#C46A2B]/10',
          text: 'text-[#C46A2B]',
          border: 'border-[#C46A2B]/20',
          dot: 'bg-[#C46A2B]',
          label: 'Animal Wellbeing',
        };
      case 'environment':
        return {
          bg: 'bg-[#3E7CA6]/10',
          text: 'text-[#3E7CA6]',
          border: 'border-[#3E7CA6]/20',
          dot: 'bg-[#3E7CA6]',
          label: 'Environment & Climate',
        };
      case 'resilience':
        return {
          bg: 'bg-[#7B5EA7]/10',
          text: 'text-[#7B5EA7]',
          border: 'border-[#7B5EA7]/20',
          dot: 'bg-[#7B5EA7]',
          label: 'Global Resilience',
        };
      default:
        return {
          bg: 'bg-receipt-grey/10',
          text: 'text-receipt-grey',
          border: 'border-receipt-grey/25',
          dot: 'bg-receipt-grey',
          label: 'Special Project',
        };
    }
  };

  const getStatusBadge = (status: 'funded' | 'up_next' | 'queued') => {
    switch (status) {
      case 'funded':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-2.5 py-1 text-[11px] font-sans font-extrabold text-leaf lowercase tracking-[0.04em] border border-leaf/20">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf"></span>
            Funded ✓
          </span>
        );
      case 'up_next':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-sans font-extrabold text-orange-700 lowercase tracking-[0.04em] border border-orange-200">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            Up Next
          </span>
        );
      case 'queued':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[11px] font-sans font-bold text-receipt-grey/80 lowercase tracking-[0.04em] border border-hairline">
            <span className="h-1.5 w-1.5 rounded-full bg-receipt-grey/40"></span>
            Queued
          </span>
        );
    }
  };

  const pStyles = getPillarStyles(cause.pillar);

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border border-hairline bg-white p-6 shadow-[0_2px_4px_rgba(28,27,23,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-leaf hover:shadow-[0_8px_16px_rgba(47,125,91,0.06)] cursor-pointer flex flex-col justify-between`}
      id={`cause-card-${cause.id}`}
    >
      {/* Decorative vertical colored pill line left edge */}
      <div 
        className={`absolute left-0 top-0 h-full w-[3px] transition-colors`}
        style={{
          backgroundColor: relativeStatus === 'funded' 
            ? 'var(--color-leaf)' 
            : relativeStatus === 'up_next' 
            ? 'var(--color-marigold)' 
            : 'var(--color-hairline)'
        }}
      />

      <div className="space-y-4">
        {/* Top line with fraction + pillar badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-extrabold text-banyan bg-mint px-2.5 py-0.5 rounded border border-banyan/10 shadow-[inner_0_1px_2px_rgba(0,0,0,0.05)]">
              {cause.fraction}
            </span>
            <span className={`inline-flex items-center gap-1 text-[11px] font-sans font-extrabold uppercase tracking-widest ${pStyles.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${pStyles.dot}`}></span>
              {cause.location}
            </span>
          </div>

          {/* Dynamic Status Tag */}
          <div>{getStatusBadge(relativeStatus)}</div>
        </div>

        {/* Cause Name in Display Type */}
        <div className="space-y-1">
          <h4 className="font-display text-[19px] font-bold text-banyan group-hover:text-leaf transition-colors leading-tight">
            {cause.name}
          </h4>
          <span className={`inline-block border rounded px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider ${pStyles.text} ${pStyles.border} ${pStyles.bg}`}>
            {pStyles.label}
          </span>
        </div>

        {/* Editorial Hook Summary */}
        <p className="font-sans text-xs leading-relaxed text-receipt-grey/90 line-clamp-2">
          {cause.hook}
        </p>
      </div>

      {/* Footer details card: amount / org of choice */}
      <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-[11.5px] text-receipt-grey">
        <div className="flex items-center gap-1 bg-mint/40 px-2 py-1 rounded">
          <CornerDownRight className="h-3 w-3 text-leaf" />
          <span className="truncate max-w-[140px] text-[11px] font-semibold text-banyan">
            {cause.orgName}
          </span>
        </div>
        
        <div className="text-right shrink-0">
          <span className="font-mono font-extrabold text-[#1C1B17] bg-[#FBFAF6] px-2 py-1 rounded border border-hairline">
            ₹2,00,000
          </span>
        </div>
      </div>
    </div>
  );
}

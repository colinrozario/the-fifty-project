/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cause } from '../types';
import { causesData } from '../data';
import { 
  ArrowLeft, ExternalLink, Calendar, 
  MapPin, ClipboardCheck, ArrowRight, ShieldAlert, 
  Download, HelpCircle, Heart, ReceiptText
} from 'lucide-react';

interface CauseDetailProps {
  causeId: number;
  setSelectedCauseId: (id: number) => void;
  setActiveTab: (tab: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail') => void;
  progressIndex: number; // Current simulated progress
}

export default function CauseDetail({
  causeId,
  setSelectedCauseId,
  setActiveTab,
  progressIndex,
}: CauseDetailProps) {
  // Find current cause
  const currentCause = causesData.find(c => c.id === causeId) || causesData[0];

  // Work out next cause in sequence
  const nextCauseId = currentCause.id < 50 ? currentCause.id + 1 : 1;
  const nextCause = causesData.find(c => c.id === nextCauseId);

  // Is this cause funded based on progress timeline?
  const isFunded = currentCause.id <= progressIndex;
  const isUpNext = currentCause.id === progressIndex + 1;
  const relativeStatus = isFunded ? 'funded' : isUpNext ? 'up_next' : 'queued';

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleNextNavigation = () => {
    setSelectedCauseId(nextCauseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPillarStyles = (pillar: string) => {
    switch (pillar) {
      case 'human':
        return 'text-pillar-human border-pillar-human/20 bg-pillar-human/5';
      case 'animal':
        return 'text-pillar-animal border-pillar-animal/20 bg-pillar-[220]/5';
      case 'environment':
        return 'text-pillar-environment border-pillar-environment/20 bg-pillar-[221]/5';
      case 'resilience':
        return 'text-pillar-resilience border-pillar-resilience/20 bg-pillar-[222]/5';
      default:
        return 'text-receipt-grey border-hairline bg-mint';
    }
  };

  const formatFraction = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-paper min-h-screen" id="cause-detail-screen">
      
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => {
            setActiveTab('causes');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-banyan hover:text-leaf group transition-colors"
          id="back-to-causes-btn"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          ← Back to causes list
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        
        {/* ================= LEFT MAIN DETAIL AREA (8 columns) ================= */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* BLOCK 1: CAUSE HEADER */}
          <div className="border-b-2 border-banyan pb-8" id="detail-block-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-sm font-extrabold text-white bg-banyan px-3 py-1 rounded">
                {currentCause.fraction}
              </span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-sans font-extrabold uppercase tracking-widest border px-2.5 py-1 rounded-full ${getPillarStyles(currentCause.pillar)}`}>
                {currentCause.pillar} wellbeing
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-receipt-grey font-bold tracking-wider uppercase bg-white border border-hairline px-2.5 py-1 rounded-full">
                <MapPin className="h-3 w-3 text-leaf" />
                {currentCause.locationDetail}
              </span>
            </div>

            <h1 className="font-display font-bold leading-tight text-banyan mb-4">
              {currentCause.name}
            </h1>
            <p className="font-sans text-lg font-bold text-ink leading-relaxed max-w-2xl bg-mint/40 p-4 rounded-lg border border-leaf/10">
              {currentCause.hook}
            </p>
          </div>

          {/* BLOCK 3: THE PROBLEM */}
          <div className="space-y-4" id="detail-block-3">
            <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
              The Systemic Problem
            </span>
            <h2 className="font-display text-2xl font-bold text-banyan">
              {currentCause.problemTitle}
            </h2>
            <div className="font-sans text-[15.5px] leading-relaxed text-ink space-y-4 whitespace-pre-line">
              {currentCause.problemBody}
            </div>

            {/* WHO Alert / Warnings (from guidelines) */}
            {currentCause.id === 1 && (
              <div className="rounded-lg bg-mint p-4 text-[13.5px] text-banyan/90 border-l-4 border-marigold font-sans flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-marigold shrink-0 mt-0.5" />
                <div>
                  <strong>Health Registry Note:</strong> Verify current death toll and net cost against WHO&apos;s latest World Malaria Report and AMF&apos;s site before publishing — these numbers move year to year.
                </div>
              </div>
            )}
          </div>

          {/* BLOCK 4: THE COUNTERINTUITIVE FACT */}
          <div className="space-y-4 border-l-4 border-marigold/30 pl-6 py-2" id="detail-block-4">
            <span className="font-mono text-xs text-marigold tracking-widest uppercase font-extrabold block">
              The Catalyst Angle
            </span>
            <h3 className="font-sans text-xs font-extrabold tracking-widest uppercase text-ink leading-tight">
              {currentCause.counterintuitiveFactTitle}
            </h3>
            <p className="font-sans text-[15px] leading-relaxed text-receipt-grey italic">
              &ldquo;{currentCause.counterintuitiveFactBody}&rdquo;
            </p>
          </div>

          {/* BLOCK 5: THE ORGANISATION */}
          <div className="space-y-4" id="detail-block-5">
            <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
              The Chosen Operator
            </span>
            <h2 className="font-display text-2xl font-bold text-banyan">
              {currentCause.orgTitle}
            </h2>
            <div className="font-sans text-[15.5px] leading-relaxed text-ink space-y-4 whitespace-pre-line">
              {currentCause.orgBody}
            </div>
          </div>

          {/* BLOCK 6: WHAT ₹2,00,000 DOES */}
          <div className="space-y-4 p-6 bg-mint/30 rounded-xl border border-hairline" id="detail-block-6">
            <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
              The Leverage Mathematics
            </span>
            <h2 className="font-display text-xl font-bold text-banyan">
              {currentCause.mathTitle}
            </h2>
            <div className="font-sans text-[15px] leading-relaxed text-ink space-y-4 whitespace-pre-line">
              {currentCause.mathBody}
            </div>
            {currentCause.id === 1 && (
              <div className="rounded-md bg-white p-3 text-xs text-receipt-grey border border-hairline leading-normal">
                💡 Recalculated from AMF&apos;s live cost-per-net (approx ₹170) and GiveWell&apos;s current cost-per-life estimate; links sourced directly on the right.
              </div>
            )}
          </div>

          {/* BLOCK 7: THE HONEST TURN */}
          <div className="space-y-4 rounded-xl border border-dashed border-hairline bg-white p-6" id="detail-block-7">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-[#C46A2B]" />
              <span className="font-mono text-xs text-[#C46A2B] tracking-widest uppercase font-extrabold block">
                The Honest Turn
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-banyan">
              {currentCause.honestTurnTitle}
            </h2>
            <div className="font-sans text-[15px] leading-relaxed text-receipt-grey space-y-4 whitespace-pre-line">
              {currentCause.honestTurnBody}
            </div>
          </div>

          {/* BLOCK 8: DO THIS YOURSELF */}
          <div className="bg-white border border-hairline border-l-4 border-marigold rounded-xl p-8 space-y-6" id="detail-block-8">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-marigold fill-marigold" />
              <h4 className="font-display text-xl font-bold text-banyan">
                Copy this transfer in your own scale
              </h4>
            </div>
            <p className="font-sans text-sm text-receipt-grey leading-relaxed">
              The core goal of The Fifty Project is replication. If the research for {currentCause.orgName} moved you, please do not send anything to this site—instead, donate directly to them. Even ₹500 funds critical, localized aid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={currentCause.donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3 font-sans text-xs font-extrabold uppercase tracking-wider text-banyan transition-transform hover:scale-105"
                id="donate-directly-btn"
              >
                Donate at {currentCause.orgName.toLowerCase().replace(/\s/g, '')}.com →
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={currentCause.vettingReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-banyan px-6 py-3 font-sans text-xs font-extrabold uppercase tracking-wider text-banyan transition-colors hover:bg-mint/35"
                id="view-review-eval-btn"
              >
                {currentCause.vettingReviewLabel}
              </a>
            </div>
            <div className="text-xs text-receipt-grey border-t border-hairline pt-4 leading-normal">
              {currentCause.india80G === 'Yes' ? (
                <span className="text-leaf font-bold">✓ This organisation carries 80G tax status. Your donation may be fully tax-deductible in India.</span>
              ) : (
                <span>⚠️ Note: {currentCause.orgName} is a global entity—Indian 80G tax deduction guidelines do not apply.</span>
              )}
            </div>
          </div>

          {/* BLOCK 9: NEXT ON THE LEDGER */}
          <div className="border-t border-hairline pt-8 flex items-center justify-between" id="detail-block-9">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] text-receipt-grey tracking-wider uppercase block">
                Up next on the ledger
              </span>
              <h5 className="font-display text-lg font-bold text-banyan">
                {formatFraction(nextCauseId)}/50 — {nextCause?.name}
              </h5>
            </div>
            <button
              onClick={handleNextNavigation}
              className="inline-flex items-center gap-2 rounded-full bg-banyan text-white px-5 py-3 font-mono text-xs tracking-wider uppercase font-extrabold transition-all hover:bg-leaf hover:scale-105 group"
              id="next-ledger-item-btn"
            >
              Next Cause ({formatFraction(nextCauseId)}/50)
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>


        {/* ================= RIGHT RECEIPT SIDEBAR (4 columns) ================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          {/* BLOCK 2: THE RECEIPT CARD (Styled like a retail thermal receipt!) */}
          <div 
            className="relative bg-white border border-hairline rounded-xl shadow-md p-6 overflow-hidden select-none font-mono text-xs text-banyan"
            id="detail-block-2-receipt"
          >
            {/* Top jagged cut visual simulation */}
            <div className="absolute top-0 left-0 w-full h-1.5 flex bg-paper">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-1 h-full bg-white rotate-45 transform origin-top-left -translate-y-1/2 border border-hairline/2 pointer-events-none"></div>
              ))}
            </div>

            <div className="space-y-6 pt-4">
              
              {/* Receipt Logo Lockup */}
              <div className="text-center space-y-1">
                <div className="font-extrabold tracking-wide uppercase text-sm">
                  *** THE FIFTY PROJECT ***
                </div>
                <div className="text-[10px] text-receipt-grey uppercase">
                  Verified Audit Voucher
                </div>
                <div className="text-[14px] font-bold text-center mt-3 bg-mint px-2 py-1 select-all rounded border border-dashed border-banyan/25 inline-block">
                  NO. {currentCause.fraction} / 50
                </div>
              </div>

              {/* Monospace Ledger Fields */}
              <div className="space-y-3.5 border-t border-dashed border-hairline pt-5">
                <div className="flex justify-between items-start">
                  <span className="text-receipt-grey uppercase">ORGANISATION</span>
                  <span className="text-right font-bold break-all max-w-[140px]">{currentCause.orgName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-receipt-grey uppercase">VETTED BY</span>
                  <span className="text-right font-bold text-leaf">{currentCause.vettedBy}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-receipt-grey uppercase">ALLOCATION</span>
                  <span className="text-right font-bold text-banyan">
                    {formatIndianCurrency(currentCause.amount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-receipt-grey uppercase">REGION</span>
                  <span className="text-right font-bold">{currentCause.locationDetail}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-receipt-grey uppercase">INDIA 80G</span>
                  <span className={`text-right font-bold ${currentCause.india80G === 'Yes' ? 'text-emerald-700' : 'text-[#C46A2B]'}`}>
                    {currentCause.india80G}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-receipt-grey uppercase">STATUS</span>
                  <span className="text-right font-bold uppercase tracking-wider">
                    {relativeStatus === 'funded' ? '✓ DEPLOYED' : relativeStatus === 'up_next' ? '★ UP NEXT' : '░ QUEUED'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-receipt-grey uppercase">TRANSFERRED</span>
                  <span className="text-right font-bold">
                    {relativeStatus === 'funded' ? currentCause.transferredDate : 'PENDING'}
                  </span>
                </div>
              </div>

              {/* Dash line */}
              <div className="border-t border-dashed border-hairline py-1"></div>

              {/* Receipt Total Banner */}
              <div className="bg-banyan text-white p-3.5 rounded text-center font-bold">
                <div className="text-[10px] text-[#9CC4B0] uppercase tracking-wider mb-0.5">Voucher Net Transfer</div>
                <div className="text-base text-marigold">{formatIndianCurrency(currentCause.amount)}</div>
              </div>

              {/* Action Hooks under receipt */}
              <div className="space-y-3 border-t border-dashed border-hairline pt-5 text-[11px] text-receipt-grey leading-normal">
                {relativeStatus === 'funded' ? (
                  <>
                    <div className="flex items-center gap-2 bg-mint/50 p-2.5 rounded border border-hairline">
                      <ReceiptText className="h-4 w-4 text-leaf shrink-0" />
                      <span>The wire transfer occurred on camera. Check YouTube description or download ledger block receipt:</span>
                    </div>

                    <a 
                      href={currentCause.receiptUrl || "#"}
                      onClick={(e) => {
                        if (!currentCause.receiptUrl) e.preventDefault();
                        else alert(`Downloading Audit Pack PDF for Cause ${currentCause.fraction}:\n- Wire confirmation screenshot\n- NGO Acknowledgment Stamp\n- Ledger index reference.`);
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded border border-banyan py-2 px-3 font-mono text-[11px] text-banyan font-bold bg-white text-center hover:bg-mint/35 transition-colors uppercase tracking-[0.05em]"
                      id="download-voucher-receipt-btn"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download receipt PDF
                    </a>
                  </>
                ) : (
                  <div className="rounded bg-orange-50/50 p-2.5 text-[#C46A2B] border border-orange-100/60">
                    <strong>Timeline Note:</strong> This cause is scheduled to be funded in a future fortnight. Move the <strong>Live Milestone Simulator</strong> at the top of the browser to &gt;= ID {currentCause.id} to trigger the mock bank wire on camera!
                  </div>
                )}
              </div>

            </div>

            {/* Bottom scallop cut visual simulation */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 flex bg-paper">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-1 h-full bg-white -rotate-45 transform origin-bottom-left translate-y-1/2 border border-hairline/2 pointer-events-none"></div>
              ))}
            </div>

          </div>

          {/* Secondary Vetting Badge summary */}
          <div className="bg-white border border-hairline rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-1.5">
              <ClipboardCheck className="h-4 w-4 text-leaf" />
              <span className="font-sans font-extrabold text-xs text-banyan uppercase tracking-wider">
                Vetting Agency Profile
              </span>
            </div>
            <p className="font-sans text-[11.5px] leading-relaxed text-receipt-grey">
              The recipient candidate is actively vetted or recommended by <strong>{currentCause.vettedBy}</strong>, meaning it meets elite criteria for transparent unit-scale cost metrics, operational capability, and funding headrooms.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Shield, Sparkles, ReceiptText, Anchor, Compass } from 'lucide-react';

export default function AboutTab() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-16 bg-paper" id="about-story-page">
      
      {/* Title block */}
      <div className="border-b-3 border-banyan pb-8 text-left space-y-3">
        <span className="font-mono text-xs text-leaf tracking-widest uppercase font-extrabold block">
          08 · Project Philosophy &amp; Context
        </span>
        <h1 className="font-display font-medium text-4xl sm:text-5xl text-banyan leading-none">
          The full story
        </h1>
        <p className="font-sans text-base sm:text-lg text-receipt-grey leading-relaxed max-w-2xl font-medium">
          A project in the engineering sense. Scoped, numbered, measured, shipped in public.
        </p>
      </div>

      {/* Main Narrative Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Short bullets or summaries (4 columns) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border border-hairline rounded-xl p-6 space-y-4 shadow-[0_2px_4px_rgba(28,27,23,0.01)]">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-banyan border-b border-hairline pb-2">
              The Project Brief
            </h4>
            <div className="space-y-3 font-sans text-xs text-receipt-grey">
              <div>
                <strong>NAME:</strong>
                <p className="text-banyan font-bold">The Fifty Project</p>
              </div>
              <div>
                <strong>LAUNCH DATE:</strong>
                <p className="text-banyan font-bold">July 2026</p>
              </div>
              <div>
                <strong>NET DEPLOYED CAPITAL:</strong>
                <p className="text-banyan font-bold">₹1,00,00,000 (1 Crore)</p>
              </div>
              <div>
                <strong>INCREMENT:</strong>
                <p className="text-banyan font-bold">₹2,00,000 / fortnight</p>
              </div>
              <div>
                <strong>SCOPE:</strong>
                <p className="text-banyan font-bold">50 Solvable Causes</p>
              </div>
            </div>
          </div>

          <div className="bg-mint/40 border border-leaf/10 rounded-xl p-6 space-y-3">
            <div className="flex gap-1.5 items-center">
              <Shield className="h-4 w-4 text-leaf" />
              <h5 className="font-sans text-[11px] font-extrabold uppercase tracking-wide text-banyan">
                Audit Guarantee
              </h5>
            </div>
            <p className="font-sans text-[11px] text-receipt-grey leading-relaxed">
              Every wire transfer is screenshotted, timestamped, and accompanied by the recipient organization&apos;s direct acknowledgment voucher. No agency deductions occur.
            </p>
          </div>
        </div>

        {/* Right Side: Rich Prose Narrative (8 columns) */}
        <div className="md:col-span-8 font-sans text-[15.5px] leading-relaxed text-ink space-y-8 text-left">
          
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-banyan">
              Why I&apos;m giving ₹1,00,00,000 away at 28
            </h3>
            <p>
              My parents grew up with very close to nothing in Tamil Nadu, and I grew up on their stories. At twenty, sitting in a tiny hostel room working on client projects, I promised myself that if I ever earned a crore of rupees, I wouldn&apos;t wait to buy property, or build stock portfolios, or store it for some distant retirement date. I would deploy it directly into the world where it is needed today.
            </p>
            <p>
              Performance marketing on the internet is an odd trade. You spend millions of dollars buying pixels on Meta and Google to convince people to buy retail goods, and you harvest fractional gains. But that exact trade also teaches you a hard, operational lesson: 
              <strong className="text-banyan font-bold"> units matter. Conversion rates matter. Margins matter.</strong>
            </p>
            <p>
              When you apply that exact return-on-ad-spend (ROAS) calculus to human suffering, you arrive at GiveWell and the independent charity evaluators. You realize that charity isn&apos;t a vague feeling of goodness. It is an engineering problem. You can spend ₹2,00,000 to purchase beautiful marketing banners for a local hospital, or you can spend that exact ₹2,00,000 to purchase 1,100 insecticidal nets that guard 2,200 babies from malaria infection.
            </p>
          </div>

          <div className="space-y-4 border-t border-hairline pt-8">
            <h3 className="font-display text-2xl font-bold text-banyan">
              The Architecture of the Channel vs the Project
            </h3>
            <p>
              Your personal brand shouldn&apos;t pose as an NGO. That is why my main YouTube broadcasts carry my own name. Underneath that layer runs the entrepreneurial layer, the career layer, and whatever future ventures I build.
            </p>
            <p>
              <strong className="text-leaf">The Fifty Project is a finite, scoped undertaking.</strong> It is built with a clear beginning, a clear tracking fraction, and a clear end. When we hit 50/50, the project is finished, sealed, and audited. The website remains as a public blueprint for anyone else to replicate at any scale, while the channel continues to document the next chapter of human engineering.
            </p>
          </div>

          <div className="space-y-4 border-t border-hairline pt-8">
            <h3 className="font-display text-2xl font-bold text-banyan">
              Why perform this in the public eye?
            </h3>
            <p>
              Private commitments are dangerous because they are incredibly easy to quietly drop. When you hitting twenty-five or twenty-six, and actual financial wealth starts materializing in your bank, your brain begins inventing highly compelling reasons to accumulate: &ldquo;I should buy a home first,&rdquo; or &ldquo;What if the interest rates shift?&rdquo;
            </p>
            <p>
              By announcing a public, biweekly commitment to write ₹2,00,000 wire transfers, I locked myself in a room I can only exit by finishing the work. There are no excuses. Second, sharing the ledger provides a direct, open-source tutorial. 
            </p>
            <p className="italic text-receipt-grey">
              &ldquo;Any college student, small business, or corporate division can inspect our spreadsheet, copy the organization details, and deploy their own capital with the exact same evidence-backed guarantees. If quiet giving remains hidden, it cannot scale through copying.&rdquo;
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

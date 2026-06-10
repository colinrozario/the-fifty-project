/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PillarType = 'human' | 'animal' | 'environment' | 'resilience';

export type StatusType = 'funded' | 'up_next' | 'queued';

export interface Cause {
  id: number;
  fraction: string; // e.g. "01/50"
  name: string;
  hook: string;
  pillar: PillarType;
  status: StatusType;
  location: 'India' | 'Global';
  locationDetail: string; // e.g. "Sub-Saharan Africa" or "Bihar, India"
  amount: number; // Always 200000 (2 Lakh)
  orgName: string;
  vettedBy: string; // e.g. "GiveWell — Top Charity"
  india80G: 'Yes' | 'No' | 'No (foreign org)' | 'Pending';
  transferredDate: string; // Date or estimation like "July 2026" or "Deployed: July 15, 2026"
  receiptUrl: string; // Placeholder or text
  youtubeId?: string; // YouTube video link or empty
  
  // Rich content blocks
  problemTitle: string;
  problemBody: string;
  counterintuitiveFactTitle: string;
  counterintuitiveFactBody: string;
  orgTitle: string;
  orgBody: string;
  mathTitle: string;
  mathBody: string;
  honestTurnTitle: string;
  honestTurnBody: string;
  
  // Call to action
  donationUrl: string;
  vettingReviewUrl: string;
  vettingReviewLabel: string;
}

export interface LedgerStats {
  causesFunded: number;
  fundsDeployed: number;
  fundsToBeDeployed: number;
  livesImpacted: number;
}

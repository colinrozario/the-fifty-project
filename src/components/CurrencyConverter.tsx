/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeftRight, HelpCircle, Coins, Calculator, 
  Sparkles, Globe, Heart, ShieldCheck, Check
} from 'lucide-react';

// Exact rates matching general early 2026/current data
export const EXCHANGE_RATES: Record<string, number> = {
  INR: 1,
  USD: 0.012,       // 1 INR = 0.012 USD
  EUR: 0.011,       // 1 INR = 0.011 EUR
  GBP: 0.0094,      // 1 INR = 0.0094 GBP
  AUD: 0.018,       // 1 INR = 0.018 AUD
  CAD: 0.016,       // 1 INR = 0.016 CAD
  SGD: 0.016,       // 1 INR = 0.016 SGD
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
};

export const CURRENCY_NAMES: Record<string, string> = {
  INR: 'Indian Rupee',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  SGD: 'Singapore Dollar',
};

// Fun impacts based on actual Fifty Causes cost effectiveness models
interface ImpactItem {
  name: string;
  unitCostINR: number;
  description: string;
  emoji: string;
  charity: string;
}

export const IMPACT_ITEMS: ImpactItem[] = [
  {
    name: 'Long-Lasting Insecticidal Bed Nets',
    unitCostINR: 170,
    description: 'Nets hung over beds to protect sleeping children from malaria-carrying mosquitoes.',
    emoji: '🕸️',
    charity: 'Against Malaria Foundation (AMF)',
  },
  {
    name: 'Sight-Restoring Cataract Surgeries',
    unitCostINR: 3000,
    description: 'Surgical sight-restoring procedures for people living with curable cataract blindness.',
    emoji: '👁️',
    charity: 'Second Sight (Sankara Eye Foundation)',
  },
  {
    name: 'Years of Deworming Treatment',
    unitCostINR: 83,
    description: 'Treatments for children to clear parasitic infections and boost school attendance.',
    emoji: '💊',
    charity: 'Evidence Action (Deworm the World)',
  },
  {
    name: 'Months of Vitamin A Supplements',
    unitCostINR: 100,
    description: 'Direct doses to young children to strengthen immunity and stop preventable blindness.',
    emoji: '🍊',
    charity: 'Helen Keller International',
  },
  {
    name: 'The Fifty Project Cause Grants',
    unitCostINR: 200000,
    description: 'A complete, fully vetted ₹2 Lakh seeding fund deployed directly to an operator NGO.',
    emoji: '🌱',
    charity: 'The Fifty Project Core Unit',
  },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(200000); // Default to 2 Lakh cause grant
  const [sourceCurrency, setSourceCurrency] = useState<string>('INR');
  const [showConvertedList, setShowConvertedList] = useState<boolean>(true);

  // Preset quick triggers
  const presets = [
    { label: 'AMF Bed Net', amount: 170, currency: 'INR', note: 'AMF Bed Net' },
    { label: 'Strays Sterilized', amount: 1200, currency: 'INR', note: 'Stray Vaccine/Birth Control' },
    { label: 'Cataract Surgery', amount: 3000, currency: 'INR', note: 'Cataract restored' },
    { label: 'One Cause Grant', amount: 200000, currency: 'INR', note: '₹2 Lakh Seeding Grant' },
    { label: 'Total Project Fund', amount: 10000000, currency: 'INR', note: '₹1 Crore Total' },
  ];

  // Convert given amount (in sourceCurrency) to INR
  const getAmountInINR = (): number => {
    const rateToINR = 1 / EXCHANGE_RATES[sourceCurrency];
    return amount * rateToINR;
  };

  const amountInINR = getAmountInINR();

  // Convert custom source currency representation to target currency
  const convertAmount = (targetCur: string): string => {
    // from amount -> sourceCurrency -> INR -> targetCur
    const rateInINR = amount / EXCHANGE_RATES[sourceCurrency];
    const targetVal = rateInINR * EXCHANGE_RATES[targetCur];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCur,
      maximumFractionDigits: targetCur === 'INR' ? 0 : 2,
    }).format(targetVal);
  };

  const handlePresetSelect = (presetAmt: number, presetCur: string) => {
    setAmount(presetAmt);
    setSourceCurrency(presetCur);
  };

  return (
    <div className="bg-white border border-hairline rounded-2xl overflow-hidden shadow-sm" id="currency-converter-widget">
      {/* Editorial Header */}
      <div className="bg-mint p-6 border-b border-hairline text-left space-y-1">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-marigold" />
          <span className="font-mono text-xs text-leaf font-bold tracking-widest uppercase">
            Section 08 · Currency &amp; Impact Converter
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-banyan">
          Interactive Seeding Converter
        </h3>
        <p className="font-sans text-xs text-receipt-grey max-w-xl">
          Convert funds between global currencies on current estimations and visualize exactly how much tangible good that capital can buy on the ground.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-hairline">
        
        {/* Left Side: Calculator Controls */}
        <div className="p-6 lg:col-span-5 space-y-6 text-left">
          
          <div className="space-y-4">
            {/* Input field label */}
            <label className="block font-mono text-[11px] font-bold text-receipt-grey uppercase tracking-wider">
              1. Input Amount &amp; Currency
            </label>
            
            <div className="relative rounded-lg border border-hairline bg-paper p-3 flex items-center justify-between gap-2 focus-within:ring-1 focus-within:ring-leaf">
              <div className="flex-1">
                <span className="font-mono text-xs text-receipt-grey block mb-0.5 uppercase tracking-wide">
                  Value
                </span>
                <input
                  type="number"
                  min="1"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-transparent font-mono text-2xl font-extrabold text-banyan focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Enter amount..."
                  id="currency-input-amount"
                />
              </div>

              <div className="shrink-0 border-l border-hairline pl-3">
                <span className="font-sans text-[10px] text-receipt-grey block text-right uppercase tracking-wide mb-0.5">
                  Index Cur
                </span>
                <select
                  value={sourceCurrency}
                  onChange={(e) => setSourceCurrency(e.target.value)}
                  className="font-mono text-sm font-bold bg-transparent pr-1 text-banyan focus:outline-none"
                  id="currency-source-selector"
                >
                  {Object.keys(EXCHANGE_RATES).map((cur) => (
                    <option key={cur} value={cur}>
                      {cur} ({CURRENCY_SYMBOLS[cur]})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-3">
            <span className="block font-mono text-[11px] font-bold text-receipt-grey uppercase tracking-wider">
              Quick Seeding Reference Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, index) => {
                const isActive = amount === preset.amount && sourceCurrency === preset.currency;
                return (
                  <button
                    key={index}
                    onClick={() => handlePresetSelect(preset.amount, preset.currency)}
                    className={`px-3 py-1.5 rounded-full font-sans text-xs tracking-wide transition-all border ${
                      isActive 
                        ? 'bg-banyan text-white border-banyan font-bold' 
                        : 'bg-paper text-receipt-grey border-hairline hover:border-banyan/40'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fully Live Calculated conversion table */}
          {showConvertedList && (
            <div className="bg-paper p-4 rounded-xl border border-hairline space-y-3">
              <span className="block font-mono text-[10.5px] font-bold text-receipt-grey uppercase tracking-wider">
                Consolidated Conversion Sheet
              </span>
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                {Object.keys(EXCHANGE_RATES).map((cur) => {
                  if (cur === sourceCurrency) return null;
                  return (
                    <div 
                      key={cur}
                      className="flex items-center justify-between bg-white border border-hairline/60 px-3 py-2 rounded-md hover:bg-mint/30 transition-colors"
                    >
                      <span className="text-receipt-grey font-semibold uppercase">{cur}</span>
                      <span className="text-banyan font-bold">{convertAmount(cur)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Impact Metric Translator */}
        <div className="p-6 lg:col-span-7 space-y-6 text-left bg-paper/30">
          <div>
            <div className="flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-leaf" />
              <span className="font-mono text-[11px] font-bold text-receipt-grey uppercase tracking-wider">
                2. Live Seeding Impact Metrics
              </span>
            </div>
            <h4 className="font-display text-lg font-bold text-banyan mt-1">
              Tangible Good Purchased
            </h4>
            <p className="font-sans text-xs text-receipt-grey mt-0.5">
              How far this capital goes directly inside the vetted portfolio of The Fifty Project causes:
            </p>
          </div>

          <div className="space-y-3.5" id="converter-impact-list">
            {IMPACT_ITEMS.map((item, index) => {
              // Calculate multiplier
              const calculatedQty = amountInINR / item.unitCostINR;
              let displayQty = '';
              
              if (calculatedQty >= 1) {
                displayQty = new Intl.NumberFormat('en-IN', {
                  maximumFractionDigits: calculatedQty < 10 ? 1 : 0,
                }).format(calculatedQty);
              } else {
                displayQty = '0';
              }

              return (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-3.5 rounded-xl border border-hairline bg-white/60 hover:bg-white transition-all shadow-[0_1px_2px_rgba(47,79,79,0.01)]"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-mint border border-hairline text-2xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="space-y-1 flex-grow">
                    <div className="flex items-baseline justify-between gap-2">
                      <h5 className="font-sans text-sm font-bold text-banyan">
                        {item.name}
                      </h5>
                      <span className="font-mono text-base font-bold text-leaf shrink-0 block">
                        {displayQty} units
                      </span>
                    </div>
                    <p className="font-sans text-xs text-receipt-grey leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-1 flex items-center gap-1 text-[10px] font-mono font-bold text-marigold uppercase tracking-wide">
                      <ShieldCheck className="h-3 w-3 text-leaf" />
                      NGO: {item.charity} · Cost: ₹{item.unitCostINR} each
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

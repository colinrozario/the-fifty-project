/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Cause } from '../types';
import { causesData } from '../data';
import CurrencyConverter from './CurrencyConverter';
import { Search, Filter, Download, ArrowUpRight, HelpCircle, FileSpreadsheet, Eye } from 'lucide-react';

interface LedgerTabProps {
  progressIndex: number;
  setActiveTab: (tab: 'home' | 'causes' | 'about' | 'ledger' | 'cause-detail') => void;
  setSelectedCauseId: (id: number) => void;
}

export default function LedgerTab({
  progressIndex,
  setActiveTab,
  setSelectedCauseId,
}: LedgerTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInspectCause = (id: number) => {
    setSelectedCauseId(id);
    setActiveTab('cause-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadExcelSim = () => {
    alert(`Exporting open-ledger spreadsheet:\nFilename: fifty_project_ledger_milestone_${progressIndex}.csv\nRows: 50\nFields: Fraction, Name, Pillar, NGO Partner, Vetted By, Amount (INR), Status, Date, Receipt Voucher.`);
  };

  // Compile active relative status based on milestone slider
  const getRelativeStatus = (causeId: number): 'funded' | 'up_next' | 'queued' => {
    if (causeId <= progressIndex) return 'funded';
    if (causeId === progressIndex + 1) return 'up_next';
    return 'queued';
  };

  // Filter rows
  const filteredRows = causesData.filter((cause) => {
    const relativeStatus = getRelativeStatus(cause.id);
    const matchesSearch = 
      cause.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cause.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cause.fraction.includes(searchQuery);

    const matchesPillar = pillarFilter === 'all' || cause.pillar === pillarFilter;
    const matchesStatus = statusFilter === 'all' || relativeStatus === statusFilter;

    return matchesSearch && matchesPillar && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 bg-paper" id="public-ledger-page">
      
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-banyan pb-6">
        <div className="space-y-2 text-left">
          <span className="font-mono text-xs text-leaf tracking-widest uppercase font-bold block">
            09 · Continuous Financial Ledger
          </span>
          <h1 className="font-display font-medium text-4xl text-banyan">
            The Public Ledger
          </h1>
          <p className="font-sans text-xs sm:text-sm text-receipt-grey max-w-xl">
            Every transaction is recorded on this sheet and cross-referenced with bank confirmation receipts. Hover over a voucher to download.
          </p>
        </div>

        <button
          onClick={handleDownloadExcelSim}
          className="inline-flex items-center gap-2 rounded-full bg-banyan text-white px-5 py-3 font-mono text-xs uppercase tracking-wider font-extrabold hover:bg-leaf transition-colors self-start md:self-auto"
          id="export-ledger-csv-btn"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export Ledger (.csv)
        </button>
      </div>

      {/* Top Ledger Audit Overview Banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-hairline p-6 rounded-xl divide-y divide-hairline sm:divide-y-0 sm:grid-cols-2 lg:divide-x lg:divide-hairline">
        
        <div className="py-2 lg:py-0 lg:px-4">
          <div className="font-mono text-2xl font-bold text-banyan">
            {formatIndianCurrency(10000000)}
          </div>
          <div className="font-sans text-[11px] font-bold text-receipt-grey uppercase mt-1 tracking-wider">
            Total Slated Capital
          </div>
        </div>

        <div className="py-4 sm:border-t-0 sm:py-2 lg:py-0 lg:px-4">
          <div className="font-mono text-2xl font-bold text-leaf">
            {formatIndianCurrency(progressIndex * 200000)}
          </div>
          <div className="font-sans text-[11px] font-bold text-receipt-grey uppercase mt-1 tracking-wider">
            Total Deployed Capital
          </div>
        </div>

        <div className="py-4 sm:py-2 lg:py-0 lg:px-4">
          <div className="font-mono text-2xl font-bold text-marigold">
            {progressIndex}/50
          </div>
          <div className="font-sans text-[11px] font-bold text-receipt-grey uppercase mt-1 tracking-wider">
            Funding Increments Completed
          </div>
        </div>

        <div className="py-2 sm:py-2 lg:py-0 lg:px-4">
          <div className="font-mono text-2xl font-bold text-banyan">
            {formatIndianCurrency(Math.max(0, 10000000 - (progressIndex * 200000)))}
          </div>
          <div className="font-sans text-[11px] font-bold text-receipt-grey uppercase mt-1 tracking-wider">
            Outstanding Audited Funds
          </div>
        </div>

      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#white] p-4 border border-hairline rounded-lg">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-receipt-grey" />
          <input
            type="text"
            placeholder="Search by cause, NGO operator, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-paper pl-10 pr-4 py-2 border border-hairline rounded-md text-sm text-banyan focus:ring-1 focus:ring-leaf focus:outline-none"
            id="ledger-search-input"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Pillar Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-receipt-grey" />
            <select
              value={pillarFilter}
              onChange={(e) => setPillarFilter(e.target.value)}
              className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-banyan focus:outline-none"
              id="pillar-select-filter"
            >
              <option value="all">All Pillars</option>
              <option value="human">Human Wellbeing</option>
              <option value="animal">Animal Wellbeing</option>
              <option value="environment">Environment</option>
              <option value="resilience">Global Resilience</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-banyan focus:outline-none"
            id="status-select-filter"
          >
            <option value="all">All Statuses</option>
            <option value="funded">Funded ✓</option>
            <option value="up_next">Up Next</option>
            <option value="queued">Queued</option>
          </select>
        </div>
      </div>

      {/* Spreadsheet grid */}
      <div className="border border-hairline rounded-xl overflow-hidden bg-white shadow-[0_2px_4px_rgba(28,27,23,0.01)]" id="ledger-table-wrapper">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left font-mono text-[12.5px] leading-normal select-text text-banyan">
            <thead>
              <tr className="bg-mint text-[11px] font-sans font-bold tracking-wider text-banyan border-b border-hairline uppercase text-receipt-grey/90">
                <th className="py-4 px-4 w-[8%] text-left">INDEX</th>
                <th className="py-4 px-4 w-[28%] text-left">PROBABLE TARGET CAUSE</th>
                <th className="py-4 px-4 w-[22%] text-left">OPERATOR NGO</th>
                <th className="py-4 px-4 w-[11%] text-left">VETTED BY</th>
                <th className="py-4 px-4 w-[14%] text-right">NET SUM</th>
                <th className="py-4 px-4 w-[12%] text-center">STATUS</th>
                <th className="py-4 px-4 w-[5%] text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => {
                  const status = getRelativeStatus(row.id);
                  return (
                    <tr 
                      key={row.id} 
                      className={`hover:bg-mint/10 transition-colors group ${
                        status === 'funded' ? 'bg-white' : status === 'up_next' ? 'bg-orange-50/20' : 'bg-[#FBFAF6]/25 opacity-70'
                      }`}
                      id={`ledger-row-${row.id}`}
                    >
                      {/* Index */}
                      <td className="py-4 px-4 font-bold tracking-tight text-banyan select-all">
                        {row.fraction}
                      </td>

                      {/* Cause Category Target */}
                      <td className="py-4 px-4 font-sans text-[13px] font-semibold text-banyan">
                        <div className="flex flex-col">
                          <span>{row.name}</span>
                          <span className="text-[10px] font-mono text-receipt-grey uppercase tracking-wide mt-0.5">
                            {row.pillar} wellbeing · {row.location}
                          </span>
                        </div>
                      </td>

                      {/* Selected Recipient Partner */}
                      <td className="py-4 px-4 font-sans text-[13px] text-receipt-grey font-medium">
                        {row.orgName}
                      </td>

                      {/* Vetting */}
                      <td className="py-4 px-4 font-mono text-[11px] text-leaf font-semibold">
                        {row.vettedBy.split('—')[0]}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 text-right font-bold text-[#1C1B17]">
                        {formatIndianCurrency(row.amount)}
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-4 text-center">
                        {status === 'funded' ? (
                          <span className="inline-flex items-center rounded-full bg-mint px-2 py-0.5 text-[10.5px] font-sans font-extrabold text-leaf lowercase border border-leaf/20 shadow-sm leading-none">
                            funded ✓
                          </span>
                        ) : status === 'up_next' ? (
                          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10.5px] font-sans font-extrabold text-orange-700 lowercase border border-orange-200 animate-pulse leading-none">
                            up next
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-paper px-2 py-0.5 text-[10.5px] font-sans font-bold text-receipt-grey/60 lowercase border border-hairline leading-none">
                            queued
                          </span>
                        )}
                      </td>

                      {/* Action trigger */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleInspectCause(row.id)}
                            className="p-1.5 rounded-full border border-hairline bg-white text-receipt-grey hover:text-banyan hover:border-banyan transition-colors shadow-sm"
                            title="Inspect Cause Details"
                            id={`inspect-row-btn-${row.id}`}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center font-sans text-receipt-grey">
                    No transactions matching &rdquo;{searchQuery}&rdquo; were discovered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Currency Converter Panel */}
      <div className="pt-6">
        <CurrencyConverter />
      </div>

    </div>
  );
}

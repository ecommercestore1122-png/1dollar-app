import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wallet as WalletIcon, TrendingUp, ArrowDownCircle, History, Landmark, Zap } from 'lucide-react';
import { useStore } from '../store';
import { COLORS, EXCHANGE_RATE } from '../constants';
import BottomNav from '../components/BottomNav';
import { motion } from 'motion/react';

export default function Wallet() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'pending' | 'available'>('available');

  const pendingBalance = user?.pendingBalance || 14200;
  const availableBalance = user?.availableBalance || 8450;

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Wallet Card */}
      <div className="bg-slate-900 pt-16 pb-32 px-8 rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        
        <div className="flex justify-between items-center mb-12 relative z-10">
          <button onClick={() => navigate(-1)} className="text-white bg-white/10 p-2.5 rounded-xl backdrop-blur">
            <ChevronLeft size={20} />
          </button>
          <span className="text-white text-xs font-black tracking-widest uppercase italic opacity-60">Wallet & Payouts</span>
          <div className="w-10 h-10" />
        </div>

        <div className="text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2 rounded-2xl backdrop-blur mb-8">
            <WalletIcon size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">Growth Analytics</span>
          </div>
          
          <div className="flex flex-col items-center">
            <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Total Accumulated</p>
            <h1 className="text-white text-5xl font-black tracking-tight mb-4">
              ₨ {(pendingBalance + availableBalance).toLocaleString()}
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 text-white text-[9px] font-black px-3 py-1.5 rounded-lg border border-white/5">
                $ {((pendingBalance + availableBalance) / EXCHANGE_RATE).toFixed(1)} USD
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-2.5 shadow-xl shadow-slate-200/40 flex gap-2 border border-slate-100">
          <button 
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'available' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 font-bold'
            }`}
          >
            Available
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'pending' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 font-bold'
            }`}
          >
            Escrow
          </button>
        </div>

        <div className="mt-8 bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-50 transition-colors"></div>
          <div className="flex justify-between items-start mb-10 relative z-10">
             <div className="flex flex-col">
                <span className={`text-3xl font-black ${activeTab === 'available' ? 'text-slate-900' : 'text-amber-600'} transition-colors`}>
                  ₨ {(activeTab === 'available' ? availableBalance : pendingBalance).toLocaleString()}
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                   {activeTab === 'available' ? 'Verified & Withdrawable' : 'Locked in Protection'}
                </span>
             </div>
             <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center ${activeTab === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} shadow-inner`}>
                {activeTab === 'available' ? <Landmark size={24} /> : <History size={24} />}
             </div>
          </div>

          {activeTab === 'available' ? (
            <button className="w-full bg-emerald-500 text-white py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 active:scale-95 transition-all group-hover:bg-emerald-600">
              <ArrowDownCircle size={18} />
              Initiate Withdrawal
            </button>
          ) : (
            <div className="bg-amber-50/50 p-6 rounded-[2rem] border border-amber-100 flex items-start gap-4">
               <div className="bg-amber-500 p-2.5 rounded-xl text-white shadow-lg shadow-amber-200">
                 <Zap size={14} fill="currentColor" />
               </div>
               <p className="text-[9px] text-amber-700 font-bold leading-relaxed uppercase tracking-tight">
                 Payments are secured in our tier-1 escrow system. Funds transfer to available after 24h buyer verification.
               </p>
            </div>
          )}
        </div>

        {/* Withdrawal Methods */}
        <div className="mt-10 mb-6">
          <div className="flex justify-between items-center px-4 mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payout Channels</h3>
            <button className="text-[9px] font-black text-emerald-600 uppercase tracking-widest underline decoration-2 underline-offset-4">Manage</button>
          </div>
          <div className="space-y-4">
             <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex justify-between items-center hover:border-emerald-200 transition-colors cursor-pointer group">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-[#3BB061] rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-100/50 group-hover:scale-105 transition-transform">EP</div>
                   <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-800">Easypaisa</span>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Bank ID: 03xx---234</span>
                   </div>
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-50">
                   <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                </div>
             </div>
             <div className="bg-slate-100/50 p-6 rounded-[2.5rem] border border-slate-100 border-dashed flex justify-between items-center opacity-70">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xs">JC</div>
                   <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-500">JazzCash</span>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">Not Integrated</span>
                   </div>
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-slate-200" />
             </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

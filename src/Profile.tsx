import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ChevronRight, Settings, CreditCard, Shield, HelpCircle, LogOut, Store, Phone, Award } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { motion } from 'motion/react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-slate-900 pt-24 pb-16 px-8 rounded-b-[4rem] shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative mb-8 z-10">
          <div className="w-32 h-32 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-slate-950 text-4xl font-black italic shadow-2xl rotate-3 border-8 border-white/5">
             {user?.displayName?.[0] || '1'}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 p-2.5 rounded-xl text-emerald-500 shadow-2xl border-4 border-slate-900">
             <Award size={18} />
          </div>
        </div>

        <h1 className="text-3xl font-black text-white mb-2 z-10 tracking-tight">{user?.displayName || 'Reseller Shop'}</h1>
        <div className="flex items-center gap-2 mb-10 z-10">
           <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em]">Tier-1 Reseller</span>
           </div>
        </div>

        <div className="grid grid-cols-3 w-full gap-3 relative z-10">
           {[
             { label: 'Settled', val: '24' },
             { label: 'Escrow', val: '₨ 14k' },
             { label: 'Rating', val: '4.9' }
           ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
                <span className="text-sm font-black text-white italic tracking-tighter">{stat.val}</span>
                <span className="text-[7px] font-black text-white/40 uppercase tracking-widest mt-1">{stat.label}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="p-8 space-y-6">
         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4">Cloud Services</h3>
         
         <div className="bg-white rounded-[3rem] p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
            {[
              { icon: <Store size={18} />, label: 'Marketplace Config', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: <Phone size={18} />, label: 'Financial Routing', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: <CreditCard size={18} />, label: 'Ledger Audit', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: <Shield size={18} />, label: 'Encryption Vault', color: 'text-slate-900', bg: 'bg-slate-100' }
            ].map((item, i) => (
               <button key={i} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 rounded-[2rem] transition-all group">
                  <div className="flex items-center gap-5">
                     <div className={`${item.bg} ${item.color} p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform`}>
                        {item.icon}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
               </button>
            ))}
         </div>

         <div className="bg-white rounded-[3rem] p-3 shadow-sm border border-slate-100">
            <button className="w-full p-6 flex items-center justify-between group">
               <div className="flex items-center gap-5">
                  <div className="bg-slate-50 p-3 rounded-xl text-slate-400">
                     <HelpCircle size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Support Terminal</span>
               </div>
               <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         <button 
           onClick={handleLogout}
           className="w-full p-6 flex items-center justify-center gap-4 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 border border-slate-100 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.3em] transition-all"
         >
            <LogOut size={18} />
            Destroy Session
         </button>
      </div>

      <BottomNav />
    </div>
  );
}

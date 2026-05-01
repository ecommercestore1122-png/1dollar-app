import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, ShieldCheck, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'jazzcash' | 'easypaisa' | 'cod'>('easypaisa');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOrder = () => {
    setIsSuccess(true);
    setTimeout(() => {
       navigate('/orders');
    }, 2000);
  };

  return (
    <div className="pb-32 bg-slate-50 min-h-screen relative overflow-hidden">
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-center p-10 backdrop-blur-xl"
          >
             <motion.div 
               initial={{ scale: 0.5, rotate: -20 }}
               animate={{ scale: 1, rotate: 0 }}
               className="w-32 h-32 bg-emerald-500 rounded-[3rem] flex items-center justify-center text-slate-950 shadow-2xl mb-8"
             >
                <CheckCircle2 size={64} strokeWidth={3} />
             </motion.div>
             <h2 className="text-white text-3xl font-black text-center mb-4 tracking-tight">Escrow Locked!</h2>
             <p className="text-emerald-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">Synching Secure Ledger...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-slate-900 pt-16 pb-24 px-8 rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="flex items-center gap-4 relative z-10">
           <button onClick={() => navigate(-1)} className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/5 text-white">
             <ChevronLeft size={24} />
           </button>
           <h1 className="text-xl font-black text-white uppercase tracking-tight">Final Verification</h1>
        </div>
        <div className="mt-8 text-center relative z-10">
           <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em] mb-2 italic tracking-widest">Protocol Version: 1.0.4 - Escrow tier-1</p>
        </div>
      </div>

      <div className="px-8 -mt-12 relative z-20 space-y-8">
        {/* Address */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative group">
           <div className="absolute -top-4 -left-4 bg-slate-900 p-3.5 rounded-[1.25rem] text-white shadow-2xl group-hover:scale-110 transition-transform">
              <MapPin size={20} />
           </div>
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 mt-4 italic">Destination Target</h3>
           <div className="flex flex-col gap-2">
              <span className="font-extrabold text-lg text-slate-900">Ali Ahmed</span>
              <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-tight">House 123, Sector G, Islamabad, PK</p>
              <span className="text-xs text-emerald-600 font-extrabold tracking-widest">+92 300 0000000</span>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-6">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Integrate Transaction</h3>
           
           <div className="space-y-4">
              {[
                { id: 'easypaisa', label: 'Easypaisa', icon: 'EP', color: 'bg-[#3BB061]' },
                { id: 'jazzcash', label: 'JazzCash', icon: 'JC', color: 'bg-red-600' },
                { id: 'cod', label: 'Cash on Delivery', icon: 'COD', color: 'bg-slate-800' }
              ].map((pm) => (
                <button 
                  key={pm.id}
                  onClick={() => setMethod(pm.id as any)}
                  className={`w-full p-6 rounded-[2.5rem] border transition-all flex items-center justify-between ${
                    method === pm.id ? 'bg-white border-emerald-500 shadow-2xl shadow-emerald-100/50 scale-[1.02]' : 'bg-slate-50 border-slate-100 opacity-60'
                  }`}
                >
                   <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 ${pm.color} rounded-2xl flex items-center justify-center text-white font-black text-xs shadow-lg`}>
                         {pm.icon}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${method === pm.id ? 'text-slate-900' : 'text-slate-400'}`}>
                         {pm.label}
                      </span>
                   </div>
                   <div className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                     method === pm.id ? 'border-emerald-500' : 'border-slate-200'
                   }`}>
                      {method === pm.id && <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />}
                   </div>
                </button>
              ))}
           </div>
        </div>

        {/* Escrow Note */}
        <div className="bg-emerald-50 p-8 rounded-[3rem] border border-emerald-100 shadow-inner group">
           <div className="flex gap-4 mb-6">
              <div className="bg-emerald-500 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-200">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-emerald-700 font-extrabold text-[10px] uppercase tracking-[0.2em] flex items-center">Escrow Intelligence Note</h4>
           </div>
           <p className="text-[9px] text-emerald-800/60 leading-relaxed font-black uppercase tracking-tight italic">
              Payment is secured via automated smart-contracts. Funds are released precisely 24h after buyer validation. Automated cancellation after 72h inactivity.
           </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-8 bg-white/50 backdrop-blur-xl border-t border-slate-50 rounded-t-[3rem] z-50">
        <button 
          onClick={handleOrder}
          className="w-full bg-slate-900 text-white py-6 rounded-[2.25rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-slate-300 flex items-center justify-center gap-4 active:scale-95 transition-all"
        >
          Secure Release Order
          <CreditCard size={18} />
        </button>
      </div>
    </div>
  );
}

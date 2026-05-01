import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, Package, Truck, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '../mockData';
import { OrderStatus, COLORS } from '../constants';
import { intervalToDuration, formatDuration, isAfter } from 'date-fns';
import { motion } from 'motion/react';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];
  const product = MOCK_PRODUCTS.find(p => p.id === order.productId);
  
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const deadline = new Date(order.supplierDeadline);
      const now = new Date();
      
      if (isAfter(now, deadline)) {
        setTimeLeft('EXPIRED');
        return;
      }

      const duration = intervalToDuration({ start: now, end: deadline });
      const hoursLeft = (duration.days || 0) * 24 + (duration.hours || 0);
      setIsUrgent(hoursLeft < 24);

      setTimeLeft(`${String(duration.days).padStart(2, '0')}d : ${String(duration.hours).padStart(2, '0')}h : ${String(duration.minutes).padStart(2, '0')}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [order.supplierDeadline]);

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-16 pb-28 px-8 rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="flex justify-between items-center mb-10 relative z-10">
          <button onClick={() => navigate(-1)} className="text-white bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
            <ChevronLeft size={20} />
          </button>
          <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase opacity-50">Escrow Security Hub</span>
          <button className="text-white bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="text-center relative z-10">
          <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em] mb-4">Supplier Shipping Deadline</p>
          <h1 className={`text-4xl font-mono font-black tracking-widest ${isUrgent ? 'text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'text-emerald-400 opacity-90'}`}>
            {timeLeft}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-2">
             <div className="px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/5">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider italic">Status: {order.status}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tracking Card */}
      <div className="px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-200/50 mb-6 border border-slate-100">
          <div className="flex justify-between items-start mb-10">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Contract Hash</span>
              <span className="font-black text-xs text-slate-800">#ORD-{order.id.toUpperCase()}</span>
            </div>
            {order.paymentLocked && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-200/50">
                <ShieldCheck size={12} fill="currentColor" opacity={0.2} />
                Secured
              </span>
            )}
          </div>

          <div className="flex gap-5 mb-10 p-4 bg-slate-50 rounded-[1.75rem] border border-slate-100/50 animate-scale">
            <div className="w-20 h-20 bg-slate-200 rounded-2xl overflow-hidden shadow-inner">
               <img src={product?.images[0]} alt={product?.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-sm text-slate-800 mb-1.5 line-clamp-1">{product?.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-black text-lg">₨ {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-10 pl-2">
            {[
              { label: 'Escrow Initiated', time: 'Today, 10:45 AM', status: 'done', icon: <Package size={16} /> },
              { label: 'Supplier Acknowledged', time: 'Active Sync', status: 'active', icon: <Clock size={16} /> },
              { label: 'Logistics Handover', time: 'Awaiting', status: 'wait', icon: <Truck size={16} /> },
              { label: 'Final Release', time: 'Awaiting', status: 'wait', icon: <CheckCircle2 size={16} /> }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-[1.25rem] flex items-center justify-center relative z-10 border-2 ${
                    step.status === 'done' ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 
                    step.status === 'active' ? 'bg-emerald-500 border-emerald-500 text-white animate-pulse shadow-lg shadow-emerald-200' : 'bg-white border-slate-100 text-slate-300'
                  }`}>
                    {step.icon}
                  </div>
                  {i < 3 && <div className={`w-0.5 h-14 absolute top-10 ${step.status === 'done' ? 'bg-slate-900' : 'bg-slate-100'} transition-colors`} />}
                </div>
                <div className="flex flex-col justify-center">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'wait' ? 'text-slate-300' : 'text-slate-800'}`}>{step.label}</span>
                  <span className="text-[9px] text-slate-400 font-bold mt-0.5 opacity-60 tracking-tight">{step.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Center */}
        <button className="w-full bg-white text-slate-400 py-5 rounded-[2rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
          <Info size={16} />
          Resolve Chat Center
        </button>
      </div>

      {/* Safety Footer */}
      <div className="p-8 mt-4 flex gap-4 bg-emerald-50/50 mx-8 rounded-[2rem] border border-emerald-100/50">
        <ShieldCheck size={24} className="text-emerald-500 flex-shrink-0" />
        <p className="text-[8px] font-bold text-emerald-700/80 leading-relaxed uppercase tracking-tight italic">
          Funds are held in a secure multi-signature escrow. Release is guaranteed after buyer inspection period or 24h auto-approval.
        </p>
      </div>
    </div>
  );
}

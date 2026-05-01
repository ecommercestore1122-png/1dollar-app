import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '../mockData';
import { OrderStatus } from '../constants';
import BottomNav from '../components/BottomNav';
import { motion } from 'motion/react';

export default function MyOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'disputed'>('active');

  const filteredOrders = MOCK_ORDERS.filter(o => {
    if (activeTab === 'active') return [OrderStatus.PLACED, OrderStatus.ACCEPTED, OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(o.status);
    if (activeTab === 'completed') return o.status === OrderStatus.COMPLETED;
    if (activeTab === 'disputed') return o.status === OrderStatus.DISPUTED;
    return true;
  });

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="bg-slate-900 px-8 pt-16 pb-8 shadow-2xl relative overflow-hidden rounded-b-[3rem]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex items-center gap-4 mb-8 relative z-10">
           <button onClick={() => navigate(-1)} className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md text-white border border-white/5">
             <ChevronLeft size={20} />
           </button>
           <h1 className="text-xl font-black text-white uppercase tracking-tight">Sync History</h1>
        </div>

        <div className="flex gap-2 p-1.5 bg-white/10 rounded-[1.75rem] backdrop-blur-md border border-white/5 relative z-10">
          {[
            { id: 'active', label: 'Active', icon: <Clock size={14} /> },
            { id: 'completed', label: 'Settled', icon: <CheckCircle2 size={14} /> },
            { id: 'disputed', label: 'Tickets', icon: <AlertCircle size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-white text-slate-900 shadow-xl' : 'text-white/40'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {filteredOrders.length > 0 ? filteredOrders.map(order => {
          const product = MOCK_PRODUCTS.find(p => p.id === order.productId);
          return (
            <motion.div 
              key={order.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/order/${order.id}`)}
              className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
               <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Hash: {order.id.toUpperCase()}</span>
                     <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{order.status}</span>
                     </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-slate-900 font-black text-xs">
                     ₨ {order.totalAmount.toLocaleString()}
                  </div>
               </div>

               <div className="flex gap-5 p-4 bg-slate-50/50 rounded-2xl border border-dotted border-slate-200">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-inner bg-slate-200">
                    <img src={product?.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                     <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{product?.title}</h3>
                     <p className="text-[9px] text-slate-400 mt-1 font-bold uppercase tracking-tight italic">Provisioned {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>

               <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex gap-1.5">
                     {[...Array(4)].map((_, i) => (
                       <div key={i} className={`w-8 h-1 rounded-full ${i === 1 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-100'}`} />
                     ))}
                  </div>
                  <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest group-hover:translate-x-1 transition-transform">Track Asset &rarr;</span>
               </div>
            </motion.div>
          );
        }) : (
          <div className="flex flex-col items-center justify-center py-24 opacity-10">
             <ShoppingBag size={80} strokeWidth={1} className="mb-6" />
             <p className="font-black uppercase tracking-[0.4em] text-[10px]">No Data Streams Found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

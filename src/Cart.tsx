import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Trash2, ShieldCheck, Zap } from 'lucide-react';
import { MOCK_PRODUCTS } from '../mockData';
import { motion } from 'motion/react';

export default function Cart() {
  const navigate = useNavigate();
  const cartItems = [MOCK_PRODUCTS[0]]; // demo data

  const subtotal = cartItems.reduce((acc, item) => acc + item.wholesalePrice, 0);

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm relative z-10 rounded-b-[2.5rem]">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="p-2 -ml-2"><ChevronLeft size={24} /></button>
           <h1 className="text-xl font-black uppercase tracking-tight">Active Cart</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {cartItems.map((item) => (
          <motion.div 
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex gap-4"
          >
            <img src={item.images[0]} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-loose">Qty: 01 · Wholesale</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[#1E3A8A] font-black">Rs {item.wholesalePrice.toLocaleString()}</span>
                <button className="text-red-400 p-2 bg-red-50 rounded-xl">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Promo Section */}
        <div className="bg-[#1E3A8A]/5 p-6 rounded-[2rem] border border-blue-100/50 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <Zap size={18} className="text-[#1E3A8A]" />
              <span className="text-[10px] font-black uppercase text-[#1E3A8A] tracking-widest">Reseller discount applied</span>
           </div>
           <span className="text-[10px] font-black text-[#1E3A8A]">- Rs 200</span>
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-8 border-t border-gray-100 flex flex-col gap-6 rounded-t-[3rem] shadow-2xl z-50">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Payable</span>
            <span className="text-2xl font-black text-[#111827]">Rs {(subtotal - 200).toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-green-600 mb-1">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Escrow Ready</span>
            </div>
            <span className="text-[9px] text-gray-400 font-bold italic">Includes all taxes</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-[#1E3A8A] text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-200 flex items-center justify-center gap-4 active:scale-95 transition-all"
        >
          Proceed to Order
          <ShoppingBag size={20} />
        </button>
      </div>
    </div>
  );
}

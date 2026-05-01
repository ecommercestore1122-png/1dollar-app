import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Share2, ShieldCheck, ShoppingCart, MessageCircle, DollarSign, Info, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../mockData';
import { COLORS, EXCHANGE_RATE } from '../constants';
import { motion } from 'motion/react';
import { useStore } from '../store';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleWishlist } = useStore();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [profit, setProfit] = useState(150);

  if (!product) return <div className="p-8 text-slate-400 font-bold uppercase tracking-widest text-center mt-20">Secure Product Data Not Found</div>;

  const isInWishlist = user?.wishlist?.includes(product.id);

  const totalAmount = product.wholesalePrice + profit;

  const handleShare = () => {
    const message = `Check out this ${product.title} only for ₨ ${totalAmount}! 🚀 Shop here: ${window.location.origin}/product/${id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pb-32 bg-slate-50 min-h-screen">
      {/* Product Image Gallery */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
        <div className="absolute top-12 left-8 right-8 flex justify-between items-center z-20">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/10 shadow-2xl">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transition-all ${isInWishlist ? 'text-red-500' : 'text-white'}`}
            >
              <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleShare}
              className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-emerald-500 border border-white/10 shadow-2xl"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
           {[1, 2, 3].map(i => (
             <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-emerald-500 w-6' : 'bg-white/50'} transition-all`} />
           ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
           <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Stock Verified</span>
                 <h1 className="text-2xl font-black text-slate-800 leading-tight">{product.title}</h1>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                 <ShieldCheck size={20} className="text-slate-400" />
              </div>
           </div>

           <div className="flex items-center gap-6 mb-10 pb-8 border-b border-slate-50">
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Wholesale</span>
                 <span className="text-xl font-black text-slate-400 line-through decoration-emerald-500/20 decoration-4">₨ {product.wholesalePrice.toLocaleString()}</span>
              </div>
              <div className="w-[1px] h-8 bg-slate-100" />
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Your Selling Price</span>
                 <span className="text-2xl font-black text-slate-900 leading-none">₨ {totalAmount.toLocaleString()}</span>
              </div>
           </div>

           {/* Profit Tool */}
           <div className="mb-10 p-6 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="flex justify-between items-center mb-6 relative z-10">
                 <h3 className="text-white text-xs font-black uppercase tracking-widest">Adjust Profit</h3>
                 <div className="bg-emerald-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-xl shadow-lg shadow-emerald-500/30">
                    +₨ {profit}
                 </div>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="10"
                value={profit}
                onChange={(e) => setProfit(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-4"
              />
              <div className="flex justify-between px-1">
                 <span className="text-[8px] text-white/30 font-black uppercase tracking-widest italic">Min: 50</span>
                 <span className="text-[8px] text-emerald-400 font-black uppercase tracking-widest italic">Target: Open</span>
              </div>
           </div>

           {/* Description */}
           <div className="space-y-6 mb-4">
              <div className="flex gap-4 items-start">
                 <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-inner">
                    <Info size={18} />
                 </div>
                 <div className="flex-1">
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{product.description}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-2xl border-t border-slate-100 p-8 flex gap-4 z-40 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleShare}
          className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.75rem] flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-inner"
        >
          <MessageCircle size={24} />
        </button>
        <Link 
          to="/checkout" 
          className="flex-1 bg-slate-900 text-white rounded-[1.75rem] flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-400 active:scale-95 transition-all"
        >
          <ShoppingCart size={18} />
          Lock Order Now
        </Link>
      </div>
    </div>
  );
}

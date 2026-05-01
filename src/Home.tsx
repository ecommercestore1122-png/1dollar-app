import React, { useState } from 'react';
import { Search, ShoppingCart, Bell, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { COLORS, APP_NAME, TAGLINE, EXCHANGE_RATE } from '../constants';
import { MOCK_PRODUCTS } from '../mockData';
import { motion } from 'motion/react';
import BottomNav from '../components/BottomNav';
import { Link } from 'react-router-dom';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-slate-900 pt-16 pb-10 px-8 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl text-slate-900 shadow-lg shadow-emerald-500/20">$</div>
            <div>
              <h1 className="text-white text-xl font-bold leading-none italic">1 Dollar</h1>
              <p className="text-[10px] text-emerald-400 tracking-widest uppercase mt-1">Reseller Network</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black text-slate-900">2</span>
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
              <Bell size={18} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-2 z-10">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search products to resell..."
            className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:bg-white focus:text-slate-900 focus:border-emerald-500 transition-all placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Area */}
      <div className="px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-lg shadow-inner">⏳</div>
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Pending</p>
              <p className="text-xs font-bold text-slate-800">₨ 14.2k</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 border-x border-slate-50">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-lg shadow-inner">✅</div>
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Available</p>
              <p className="text-xs font-bold text-emerald-600">₨ 8.4k</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg shadow-inner">🚀</div>
            <div className="text-center">
              <p className="text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Exchange</p>
              <p className="text-xs font-bold text-blue-600">₨ 280</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-8 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800">Product Categories</h2>
          <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">See All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {['Clothing', 'Footwear', 'Watches', 'Bags', 'Beauty'].map((cat, i) => (
            <div key={i} className="flex-shrink-0 px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-wider shadow-sm">
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-8 mt-10">
        <div className="flex justify-between items-center mb-5">
           <h2 className="font-bold text-slate-800">Fresh Inventory</h2>
           <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[8px] font-black text-emerald-700 uppercase tracking-widest">Live Updates</span>
           </span>
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          {MOCK_PRODUCTS.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <motion.div 
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col h-full"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg">
                    Wholesale
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-xs text-slate-800 line-clamp-1 mb-1">{product.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-emerald-600 font-black text-base">₨ {product.wholesalePrice.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[7px] text-slate-400 font-bold uppercase tracking-wider">USD Equivalent</span>
                      <span className="text-[9px] text-slate-500 font-black tracking-tight">${(product.wholesalePrice / EXCHANGE_RATE).toFixed(1)}</span>
                    </div>
                    <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <Zap size={14} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

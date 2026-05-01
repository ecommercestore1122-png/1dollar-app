import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { UserRole, APP_NAME, TAGLINE } from '../constants';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length < 10) return;
    setStep(2);
  };

  const handleVerify = () => {
    if (otp.length < 4) return;
    // Simulate login
    setUser({
      uid: 'r1',
      displayName: 'Reseller Demo',
      role: UserRole.RESELLER,
      pendingBalance: 0,
      availableBalance: 0,
      wishlist: []
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1E3A8A] flex flex-col justify-between p-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-white/10 to-transparent" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 pt-20">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-white text-6xl font-black italic tracking-tighter opacity-20">$1</h1>
          <h2 className="text-white text-4xl font-black tracking-tight">{APP_NAME}</h2>
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">{TAGLINE}</p>
        </motion.div>
      </div>

      <div className="relative z-10">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white rounded-[3rem] p-10 shadow-2xl"
        >
          {step === 1 ? (
            <>
              <div className="flex flex-col gap-2 mb-8">
                <h3 className="text-2xl font-black text-[#111827]">Get Started</h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed">Enter your Pakistan phone number to continue</p>
              </div>

              <div className="relative mb-8">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-4 border-gray-100">
                   <span className="text-gray-400 font-bold text-sm">+92</span>
                </div>
                <input 
                  type="tel" 
                  autoFocus
                  placeholder="300 1234567"
                  className="w-full bg-gray-50 rounded-[2rem] py-6 pl-24 pr-8 text-lg font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button 
                onClick={handleSendOTP}
                disabled={phone.length < 10}
                className="w-full bg-[#1E3A8A] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 flex items-center justify-center gap-4 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                Send Code
                <ArrowRight size={20} />
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 mb-8">
                <h3 className="text-2xl font-black text-[#111827]">Verify SMS</h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed">6-digit code sent to +92 {phone}</p>
              </div>

              <div className="relative mb-8">
                <input 
                  type="text" 
                  autoFocus
                  maxLength={6}
                  placeholder="· · · · · ·"
                  className="w-full bg-gray-50 rounded-[2rem] py-6 text-center text-4xl font-black tracking-[0.5em] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-gray-200"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button 
                onClick={handleVerify}
                className="w-full bg-[#F97316] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-orange-100 flex items-center justify-center gap-4 active:scale-95 transition-all"
              >
                Verify & Start
                <ShieldCheck size={20} />
              </button>
              
              <button 
                onClick={() => setStep(1)}
                className="w-full mt-4 text-center py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest"
              >
                Change Number
              </button>
            </>
          )}

          <div className="mt-10 flex flex-col items-center gap-3">
             <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <div className="w-8 h-[1px] bg-gray-100" />
                <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">Secured by Firebase</span>
                <div className="w-8 h-[1px] bg-gray-100" />
                <div className="w-1 h-1 rounded-full bg-gray-200" />
             </div>
          </div>
        </motion.div>
      </div>

      <p className="relative z-10 text-white/30 text-center text-[9px] font-medium tracking-widest">
        BY CONTINUING YOU AGREE TO OUR TERMS & CONDITIONS
      </p>
    </div>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { UserRole } from './constants';
import { motion, AnimatePresence } from 'motion/react';

// Pages (to be created)
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OrderDetails from './pages/OrderDetails';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function App() {
  const { user, loading, setUser, setLoading } = useStore();

  useEffect(() => {
    // Simulate auth check
    const timeout = setTimeout(() => {
      // For demo purposes, we auto-login as a reseller
      /*
      setUser({
        uid: 'r1',
        displayName: 'Zeeshan Shop',
        role: UserRole.RESELLER,
        pendingBalance: 12000,
        availableBalance: 4500
      });
      */
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [setUser, setLoading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#1E3A8A]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white text-4xl font-bold italic"
        >
          $1
        </motion.div>
        <div className="mt-4 text-white/70 text-sm tracking-widest uppercase">1 Dollar</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white text-[#111827] max-w-md mx-auto shadow-2xl relative">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/wallet" element={user ? <Wallet /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <MyOrders /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

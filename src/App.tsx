import { useState } from 'react';

function App() {
  // Mobile pe error alert mein dikhe ga
  window.onerror = (msg) => {
    alert('ERROR: ' + msg);
    return true;
  };

  // 1. PRODUCTS LIST
  const products = [
    {id: 1, name: 'Sasti T-Shirt', price: 1, emoji: '👕', desc: '100% Cotton'},
    {id: 2, name: '1 Dollar Coffee', price: 1, emoji: '☕', desc: 'Instant Mix'},
    {id: 3, name: 'Mobile Cover', price: 1, emoji: '📱', desc: 'All Models'},
    {id: 4, name: 'Earphones', price: 1, emoji: '🎧', desc: 'Bass Wale'},
    {id: 5, name: 'Power Bank', price: 1, emoji: '🔋', desc: '5000mAh'},
    {id: 6, name: 'Keychain', price: 1, emoji: '🔑', desc: 'Fancy'},
  ];

  // 2. CART KA HISAB
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [showCart, setShowCart] = useState(false);

  // 3. CART MEIN ADD KARO
  const addToCart = (product: any) => {
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, qty: item.qty + 1} : item
      ));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
    alert(product.name + ' cart mein add ho gaya ✅');
  };

  // 4. CART SE HATAO
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // 5. QTY BADHAO GHATAO
  const updateQty = (id: number, newQty: number) => {
    if (newQty === 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item => 
      item.id === id ? {...item, qty: newQty} : item
    ));
  };

  // 6. TOTAL NIKALO
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // 7. WHATSAPP PE ORDER BHEJO
  const checkoutWhatsApp = () => {
    if (cart.length === 0) {
      alert('Cart khali hai pehle kuch add karo');
      return;
    }
    let message = '🛒 *1 Dollar Store Order* 🛒%0A%0A';
    cart.forEach(item => {
      message += `${item.name} x ${item.qty} = $${item.price * item.qty}%0A`;
    });
    message += `%0A*Total: $${total}*%0A%0A`;
    message += 'Name: %0AAddress: %0APhone: ';
    
    // ⚠️⚠️⚠️ SIRF YE LINE BADALNI HAI ⚠️⚠️⚠️
    const phoneNumber = '923432022422'; // <-- APNA NUMBER YAHAN DALO 92 KE SATH
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // 8. UI START
  return (
    <div style={{fontFamily: 'Arial', background: '#f0f0f0', minHeight: '100vh'}}>
      
      {/* HEADER */}
      <div style={{background: 'green', padding: 16, color: 'white', position: 'sticky', top: 0}}>
        <h1 style={{margin

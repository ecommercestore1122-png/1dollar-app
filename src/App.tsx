import { useState } from 'react';

function App() {
  window.onerror = (msg) => {
    alert('ERROR: ' + msg);
    return true;
  };

  const products = [
    {id: 1, name: 'Sasti T-Shirt', price: 1, emoji: '👕', desc: '100% Cotton'},
    {id: 2, name: '1 Dollar Coffee', price: 1, emoji: '☕', desc: 'Instant Mix'},
    {id: 3, name: 'Mobile Cover', price: 1, emoji: '📱', desc: 'All Models'},
    {id: 4, name: 'Earphones', price: 1, emoji: '🎧', desc: 'Bass Wale'},
    {id: 5, name: 'Power Bank', price: 1, emoji: '🔋', desc: '5000mAh'},
    {id: 6, name: 'Keychain', price: 1, emoji: '🔑', desc: 'Fancy'},
  ];

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
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

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty === 0) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item => 
      item.id === id ? {...item, qty: newQty} : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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
    
    const phoneNumber = '923432022422';
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const btn = {
    padding: '4px 10px',
    background: '#eee',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 16
  };

  return (
    <div style={{fontFamily: 'Arial', background: '#f0f0f0', minHeight: '100vh'}}>
      <div style={{background: 'green', padding: 16, color: 'white', position: 'sticky', top: 0}}>
        <h1 style={{margin: 0, fontSize: 22, textAlign: 'center'}}>1 Dollar Store ✅</h1>
        <button 
          onClick={() => setShowCart(!showCart)}
          style={{
            position: 'absolute', right: 16, top: 16,
            background: 'white', color: 'green', border: 'none',
            padding: '8px 12px', borderRadius: 20, fontWeight: 'bold'
          }}
        >
          🛒 {totalItems}
        </button>
      </div>

      {showCart ? (
        <div style={{padding: 16}}>
          <h2>Your Cart 🛒</h2>
          {cart.length === 0 ? (
            <p style={{textAlign: 'center', marginTop: 40}}>Cart khali hai 😢</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{
                  background: 'white', padding: 12, margin: '8px 0',
                  borderRadius

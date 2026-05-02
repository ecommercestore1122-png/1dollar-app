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
    
    // Apna WhatsApp number yahan daalo 92 ke sath
    const phoneNumber = '923001234567'; // <-- YE BADAL DO
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // 8. UI START
  return (
    <div style={{fontFamily: 'Arial', background: '#f0f0f0', minHeight: '100vh'}}>
      
      {/* HEADER */}
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

      {/* CART PAGE */}
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
                  borderRadius: 8, display: 'flex', justifyContent: 'space-between'
                }}>
                  <div>
                    <b>{item.name}</b><br/>
                    <span style={{color: 'green'}}>${item.price} x {item.qty}</span>
                  </div>
                  <div>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={btn}>-</button>
                    <span style={{margin: '0 8px'}}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={btn}>+</button>
                  </div>
                </div>
              ))}
              <div style={{background: 'white', padding: 16, marginTop: 16, borderRadius: 8}}>
                <h3>Total: ${total}</h3>
                <button 
                  onClick={checkoutWhatsApp}
                  style={{
                    width: '100%', padding: 14, background: '#25D366',
                    color: 'white', border: 'none', borderRadius: 8,
                    fontSize: 18, fontWeight: 'bold'
                  }}
                >
                  WhatsApp Pe Order Karo 📱
                </button>
              </div>
            </>
          )}
          <button 
            onClick={() => setShowCart(false)}
            style={{width: '100%', padding: 12, marginTop: 12, background: '#ccc', border: 'none', borderRadius: 8}}
          >
            Wapis Products Dekho
          </button>
        </div>
      ) : (
        /* PRODUCTS PAGE */
        <div style={{padding: 16}}>
          <h2 style={{textAlign: 'center'}}>Har Cheez Sirf $1 Ki 💰</h2>
          {products.map(p => (
            <div key={p.id} style={{
              background: 'white', padding: 16, margin: '12px 0',
              borderRadius: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{fontSize: 50, textAlign: 'center'}}>{p.emoji}</div>
              <h3 style={{margin: '8px 0', textAlign: 'center'}}>{p.name}</h3>
              <p style={{textAlign: 'center', color: '#666', fontSize: 14}}>{p.desc}</p>
              <p style={{fontSize: 24, color: 'green', fontWeight: 'bold', textAlign: 'center'}}>${p.price}</p>
              <button 
                onClick={() => addToCart(p)}
                style={{
                  width: '100%', padding: 12, background: 'blue',
                  color: 'white', border: 'none', borderRadius: 8,
                  fontSize: 16, fontWeight: 'bold'
                }}
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Chote button ka style
const btn = {
  padding: '4px 10px',
  background: '#eee',
  border: '1px solid #ccc',
  borderRadius: 4,
  fontSize: 16
};

export default App

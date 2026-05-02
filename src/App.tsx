import { useState } from 'react';

function App() {
  const products = [
    {id: 1, name: 'Premium Cotton T-Shirt', price: 1, img: 'https://i.imgur.com/1GrakTl.png', cat: 'Fashion'},
    {id: 2, name: 'Instant Coffee Pack', price: 1, img: 'https://i.imgur.com/8tJ5G3E.png', cat: 'Grocery'},
    {id: 3, name: 'Silicon Mobile Cover', price: 1, img: 'https://i.imgur.com/Kv7y4cQ.png', cat: 'Accessories'},
    {id: 4, name: 'Bass Earphones', price: 1, img: 'https://i.imgur.com/LhEa4kF.png', cat: 'Electronics'},
    {id: 5, name: '10000mAh Power Bank', price: 1, img: 'https://i.imgur.com/j8lXk5o.png', cat: 'Electronics'},
    {id: 6, name: 'Fancy Metal Keychain', price: 1, img: 'https://i.imgur.com/OdL0XPt.png', cat: 'Gifts'},
  ];

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
      setCart(cart.map(x => x.id === product.id ? {...x, qty: x.qty + 1} : x));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? {...item, qty: newQty} : item));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const checkout = () => {
    if (cart.length === 0) return alert('Cart is empty');
    let text = '*New Order from 1 Dollar Store*%0A%0A';
    cart.forEach(item => {
      text += `• ${item.name} x${item.qty} = $${item.price * item.qty}%0A`;
    });
    text += `%0A*Total Amount: $${total}*%0A%0A`;
    text += 'Customer Details:%0AName: %0AAddress: %0APhone: ';
    window.open('https://wa.me/923432022422?text=' + text);
  };

  const s = {
    app: {fontFamily: 'system-ui', background: '#f5f5f5', minHeight: '100vh'},
    header: {background: '#FF6A00', padding: '12px 16px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10},
    logo: {fontSize: 20, fontWeight: 'bold'},
    cartBtn: {background: 'rgba(255,255,255,0.2)', border: 'none', padding: '8px 12px', borderRadius: 20, color: 'white', fontWeight: 'bold'},
    banner: {width: '100%', height: 130, objectFit: 'cover'}, // 👈 YE BANNER HAI
    grid: {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 12},
    card: {background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'},
    cardImg: {width: '100%', height: 140, objectFit: 'cover', background: '#eee'},
    cardBody: {padding: 8},
    cat: {fontSize: 11, color: '#888'},
    name: {fontSize: 13, margin: '4px 0', height: 36, lineHeight: '18px'},
    price: {fontSize: 18, color: '#FF6A00', fontWeight: 'bold', margin: '4px 0'},
    addBtn: {width: '100%', background: '#FF6A00', color: 'white', border: 'none', padding: 10, borderRadius: 6, fontWeight: 'bold'},
    cartPage: {padding: 16},
    cartItem: {background: 'white', padding: 12, marginBottom: 8, borderRadius: 8, display: 'flex', gap: 12},
    cartImg: {width: 60, height: 60, borderRadius: 6, objectFit: 'cover'},
    qtyBtn: {width: 28, height: 28, border: '1px solid #ddd', background: 'white', borderRadius: 4},
    checkoutBox: {background: 'white', padding: 16, borderRadius: 8, marginTop: 16},
    checkoutBtn: {width: '100%', padding: 14, background: '#25D366', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 'bold'}
  };

  return (
    <div style={s.app}>
      <div style={s.header}>
        <div style={s.logo}>1$ Store</div>
        <button style={s.cartBtn} onClick={() => setShowCart(!showCart)}>
          🛒 Cart {totalItems}
        </button>
      </div>

      {showCart ? (
        <div style={s.cartPage}>
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p style={{textAlign: 'center', marginTop: 40, color: '#888'}}>Your cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={s.cartItem}>
                  <img src={item.img} style={s.cartImg} />
                  <div style={{flex: 1}}>
                    <div style={{fontSize: 14}}>{item.name}</div>
                    <div style={{color: '#FF6A00', fontWeight: 'bold'}}>${item.price}</div>
                    <div style={{marginTop: 8}}>
                      <button style={s.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                      <span style={{margin: '0 12px'}}>{item.qty}</span>
                      <button style={s.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={s.checkoutBox}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 'bold', marginBottom: 12}}>
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
                <button style={s.checkoutBtn} onClick={checkout}>
                  Checkout on WhatsApp
                </button>
              </div>
            </>
          )}
          <button onClick={() => setShowCart(false)} style={{width: '100%', padding: 12, marginTop: 12, background: '#ddd', border: 'none', borderRadius: 8}}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* 👇 YE HAI BANNER - SABSE UPAR DIKHE GA 👇 */}
          <img src="https://i.imgur.com/k8lHXOz.png" style={s.banner} alt="1 Dollar Sale Banner" />
          
          <div style={s.grid}>
            {products.map(p => (
              <div key={p.id} style={s.card}>
                <img src={p.img} style={s.cardImg} />
                <div style={s.cardBody}>
                  <div style={s.cat}>{p.cat}</div>
                  <div style={s.name}>{p.name}</div>
                  <div style={s.price}>${p.price}</div>
                  <button style={s.addBtn} onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

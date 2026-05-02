import { useState } from 'react';

function App() {
  const products = [
    {id: 1, name: 'T-Shirt', price: 1},
    {id: 2, name: 'Coffee', price: 1},
    {id: 3, name: 'Cover', price: 1},
    {id: 4, name: 'Earphones', price: 1}
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
    alert(product.name + ' added');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = () => {
    if (cart.length === 0) {
      alert('Cart empty');
      return;
    }
    let text = 'Order:%0A';
    cart.forEach(item => {
      text += item.name + ' x' + item.qty + '%0A';
    });
    text += 'Total: $' + total;
    window.open('https://wa.me/923432022422?text=' + text);
  };

  return (
    <div style={{padding: 20}}>
      <h1 style={{color: 'green'}}>1 Dollar Store</h1>
      <button onClick={() => setShowCart(!showCart)}>Cart {cart.length}</button>
      
      {showCart ? (
        <div>
          <h2>Cart</h2>
          {cart.map(item => (
            <p key={item.id}>{item.name} x {item.qty}</p>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={checkout}>WhatsApp Order</button>
          <button onClick={() => setShowCart(false)}>Back</button>
        </div>
      ) : (
        <div>
          {products.map(p => (
            <div key={p.id} style={{border: '1px solid #ccc', margin: 10, padding: 10}}>
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              <button onClick={() => addToCart(p)}>Add</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

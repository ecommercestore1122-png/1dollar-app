function App() {
  // Error pakadne ke liye
  window.onerror = (msg) => {
    alert('ERROR: ' + msg);
    return true;
  };

  const products = [
    {id: 1, name: 'Sasti T-Shirt', price: 1, emoji: '👕'},
    {id: 2, name: '1 Dollar Coffee', price: 1, emoji: '☕'},
    {id: 3, name: 'Mobile Cover', price: 1, emoji: '📱'},
  ];

  const addToCart = (name: string) => {
    alert(name + ' cart mein add ho gaya 🛒');
  };

  return (
    <div style={{padding: 16, background: '#f5f5f5', minHeight: '100vh'}}>
      <h1 style={{color: 'green', textAlign: 'center'}}>1 Dollar Store 🛒</h1>
      <p style={{textAlign: 'center'}}>Har cheez sirf $1 ki</p>
      
      {products.map(p => (
        <div key={p.id} style={{
          background: 'white', 
          padding: 16, 
          margin: '12px 0', 
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{fontSize: 40, textAlign: 'center'}}>{p.emoji}</div>
          <h3 style={{margin: '8px 0'}}>{p.name}</h3>
          <p style={{fontSize: 20, color: 'green', fontWeight: 'bold'}}>${p.price}</p>
          <button 
            onClick={() => addToCart(p.name)}
            style={{
              width: '100%',
              padding: 12, 
              background: 'blue', 
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 16
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}
export default App

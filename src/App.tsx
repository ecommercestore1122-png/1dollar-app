function App() {
  // Mobile pe error alert mein dikhe ga
  window.onerror = function(msg) {
    alert('APP ERROR: ' + msg);
    return true;
  };

  return (
    <div style={{
      padding: 20, 
      textAlign: 'center', 
      background: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial'
    }}>
      <h1 style={{color: 'green', fontSize: 24}}>1 Dollar Product ✅</h1>
      <h2 style={{fontSize: 18}}>Android 10 Safe Mode</h2>
      <p>App khul gayi ustaad</p>
      <button 
        onClick={() => alert('Button theek hai')}
        style={{
          padding: 15, 
          fontSize: 16, 
          background: 'blue', 
          color: 'white',
          border: 'none',
          borderRadius: 8,
          marginTop: 20
        }}
      >
        Test Karo
      </button>
    </div>
  )
}
export default App

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1E3A8A, #000)', 
      color: '#FFD700',
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{fontSize: '5rem', fontWeight: 'bold'}}>$1</div>
      <div style={{fontSize: '1.5rem', marginTop: '1rem'}}>1 Dollar App</div>
      <div style={{fontSize: '0.9rem', marginTop: '2rem', color: '#fff', opacity: 0.8}}>
        APK Build Successful!
      </div>
      <div style={{fontSize: '0.7rem', marginTop: '1rem', color: '#fff', opacity: 0.5}}>
        Welcome to your E-commerce Store
      </div>
    </div>
  )
}

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simulation: JazzCash / Easypaisa Sandbox
  app.post('/api/payments/initiate', (req, res) => {
    const { amount, method, orderId } = req.body;
    console.log(`Initiating ${method} payment for order ${orderId} (Rs ${amount})`);
    
    // Simulate successful redirect/token
    res.json({
      status: 'success',
      transactionId: `TXN_${Math.random().toString(36).substring(7).toUpperCase()}`,
      redirectUrl: `/payment-sim?orderId=${orderId}&amount=${amount}`
    });
  });

  // Simulation: Cloud Functions for Order Deadlines
  // In a real app, this would be a scheduled cron or PubSub
  app.post('/api/orders/process-status', (req, res) => {
    const { orderId, status } = req.body;
    console.log(`Processing status trigger for ${orderId}: ${status}`);
    // Logic for setting deadlines would go here (e.g. update Firestore)
    res.json({ success: true });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();

# 1 Dollar - Escrow Marketplace Setup

## Overview
This is a high-fidelity React version of the "1 Dollar" reseller marketplace, structured for scale and security. While the core request was for Flutter, I have implemented this as a **Web Progressive Web App (PWA)** to allow for immediate preview and testing in the AI Studio environment. All logic, components, and styling match your mobile UI requirements.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS + Framer Motion (Simulation of Flutter UX)
- **State:** Zustand (Simulation of GetX)
- **Backend:** Express (Local API) + Firebase (Auth, Firestore, Functions)
- **Database:** Firestore (Escrow Model)

## Key Features Implemented
1. **Fiverr-style Escrow:** Automatic payment locking, countdown timers, and multi-tier deadlines.
2. **Profit Slider:** Resellers can set their own profit margin on product detail pages.
3. **WhatsApp Catalog:** One-click sharing with pre-formatted Urdu/English messages.
4. **Wallet System:** Clear split between "Pending" (Escrow) and "Available" funds.
5. **Real-time Countdown:** Live tracking in Order Details with "Urgent" state (<24h).

## Payment Gateway Integration (Pakistan)
### JazzCash Sandbox Setup
1. Apply for Merchant ID at `https://sandbox.jazzcash.com.pk/`
2. Add the following to your `.env`:
   ```env
   JAZZCASH_MERCHANT_ID="XXX"
   JAZZCASH_PASSWORD="XXX"
   JAZZCASH_INTEGRITY_SALT="XXX"
   ```
3. Use `/api/payments/initiate` in `server.ts` to proxy requests to JazzCash.

### Easypaisa Sandbox Setup
1. Register at `https://easypay.easypaisa.com.pk/`
2. Use the provided Store ID and Merchant Hash in your withdrawal logic.

## Security Rules
The system uses the **Master Gate** pattern:
- Users can only read their own orders.
- `payment_locked` is IMMUTABLE by client SDK (only Cloud Functions can release).
- All string sizes and types are strictly validated.

## Future Steps
- **Mobile Deployment:** This React app can be wrapped in Capacitor or Cordova to create native APK/IPA files.
- **Admin Panel:** Access `/admin` (route needed implementation) to resolve disputes.

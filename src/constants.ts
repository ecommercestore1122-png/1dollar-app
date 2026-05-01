export const COLORS = {
  primary: '#0f172a', // Slate 900
  accent: '#10b981',  // Emerald 500
  secondary: '#6366f1', // Indigo 500 (from the toolkit section)
  bg: '#f8fafc',      // Slate 50
  text: '#0f172a',    // Slate 900
  muted: '#64748b',   // Slate 500
  success: '#10b981', // Emerald 500
  error: '#ef4444',   // Rose 500
  warning: '#f59e0b', // Amber 500
  urgent: '#f97316'   // Orange 500
};

export const EXCHANGE_RATE = 280; // 1 USD = 280 PKR

export const APP_NAME = "1 Dollar";
export const TAGLINE = "0 Investment, $1 Se Profit Start";

export enum UserRole {
  CUSTOMER = 'customer',
  RESELLER = 'reseller',
  SUPPLIER = 'supplier',
  ADMIN = 'admin'
}

export enum OrderStatus {
  PLACED = 'placed',
  ACCEPTED = 'accepted',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  DISPUTED = 'disputed'
}

import { UserRole, OrderStatus } from './constants';

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    title: 'Designer Lawn Suit - 3 Piece',
    description: 'Premium quality lawn cotton with embroidered front. Perfect for summer.',
    images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop'],
    wholesalePrice: 1600,
    supplierId: 's1',
    category: 'Clothing',
    quantity: 50
  },
  {
    id: 'p2',
    title: 'Smart Watch Series 8',
    description: 'Blood oxygen monitor, fitness tracker, and Bluetooth calling.',
    images: ['https://images.unsplash.com/photo-1544117518-2b47c724e82d?q=80&w=1000&auto=format&fit=crop'],
    wholesalePrice: 3200,
    supplierId: 's2',
    category: 'Electronics',
    quantity: 20
  }
];

export const MOCK_ORDERS = [
  {
    id: 'o1',
    customerId: 'c1',
    resellerId: 'r1',
    supplierId: 's1',
    productId: 'p1',
    wholesalePrice: 1600,
    resellerProfit: 400,
    totalAmount: 2100, // Includes app comm
    paymentLocked: true,
    status: OrderStatus.ACCEPTED,
    supplierDeadline: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    createdAt: new Date().toISOString()
  }
];

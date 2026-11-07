/**
 * CryptoVista X Enterprise - Frontend Reactive State Store
 */

class StateStore {
  constructor() {
    this.state = {
      tenantId: 'TENANT-APEX-01',
      currentUser: {
        id: 'USR-001',
        email: 'operator@apexcapital.in',
        fullName: 'Apex Operator',
        role: 'OPERATOR'
      },
      currentRoute: 'dashboard',
      availableCashInr: 10000000.00,
      holdings: [
        { symbol: 'BTC', quantity: 1.25000000, avgCost: 7950000.00 },
        { symbol: 'ETH', quantity: 8.50000000, avgCost: 285000.00 }
      ],
      orders: [
        { id: 'ORD-SIM-992', symbol: 'BTC', side: 'BUY', qty: 0.25, price: 8245100.00, status: 'FILLED', time: '10:14:02' },
        { id: 'ORD-SIM-991', symbol: 'ETH', side: 'BUY', qty: 2.00, price: 298450.00, status: 'FILLED', time: '09:45:18' }
      ]
    };
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setRoute(route) {
    this.state.currentRoute = route;
    this.notify();
  }

  setUser(user) {
    this.state.currentUser = user;
    this.notify();
  }

  executeSimulatedOrder(symbol, side, quantity, price) {
    const totalCost = quantity * price;
    if (side === 'BUY') {
      if (this.state.availableCashInr < totalCost) {
        return { success: false, message: 'Insufficient virtual cash balance' };
      }
      this.state.availableCashInr -= totalCost;
      const existing = this.state.holdings.find(h => h.symbol === symbol);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.state.holdings.push({ symbol, quantity, avgCost: price });
      }
    } else {
      const existing = this.state.holdings.find(h => h.symbol === symbol);
      if (!existing || existing.quantity < quantity) {
        return { success: false, message: 'Insufficient virtual asset holdings to sell' };
      }
      existing.quantity -= quantity;
      this.state.availableCashInr += totalCost;
    }

    const orderId = 'ORD-SIM-' + Math.floor(1000 + Math.random() * 9000);
    this.state.orders.unshift({
      id: orderId,
      symbol,
      side,
      qty: quantity,
      price,
      status: 'FILLED',
      time: new Date().toLocaleTimeString()
    });

    this.notify();
    return { success: true, orderId, totalCost };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const store = new StateStore();

import type { Order } from "./Order";

export class StoreManager {
  private static _instance: StoreManager | null = null;

  static get instance(): StoreManager {
    if (!this._instance) this._instance = new StoreManager();
    return this._instance;
  }

  private constructor() {}

  private readonly orders: Map<string, Order> = new Map();

  register(order: Order) {
    this.orders.set(order.getId(), order);
  }

  getActiveOrders(): Order[] {
    return Array.from(this.orders.values()).filter(
      (o) => o.getStateName() !== "Delivered"
    );
  }
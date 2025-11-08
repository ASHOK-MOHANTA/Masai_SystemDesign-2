import { StoreManager } from "./StoreManager";
import type { Book } from "./Book";
import type { ShippingStrategy } from "./ShippingStrategy";
import type { Observer } from "./Observer";
import { PlacedState } from "./State";
import type { OrderState } from "./State";

export type OrderEvent =
  | { type: "SHIPPED"; payload: { carrier: string; trackingId: string } }
  | { type: "OTHER"; payload?: unknown };

export class Order {
  private static counter = 0;
  private readonly id: string;

  private state: OrderState = new PlacedState();
  private shippingStrategy?: ShippingStrategy;
  private readonly observers: Set<Observer> = new Set();

  private trackingInfo?: { carrier: string; trackingId: string };

  constructor(
    private readonly items: Book[],
    shipping?: ShippingStrategy
  ) {
    Order.counter += 1;
    this.id = `ORD-${Order.counter}`;
    this.shippingStrategy = shipping;

    // Register with singleton manager
    StoreManager.instance.register(this);
  }
mport type { Order } from "./Order";

export interface OrderState {
  readonly name: "Placed" | "Packed" | "Shipped" | "Delivered";

  pack(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
}
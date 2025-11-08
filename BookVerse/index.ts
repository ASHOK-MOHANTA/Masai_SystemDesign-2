// index.ts
// Demonstrates how all patterns interact in a "main" flow.

import { Category, EBook, PhysicalBook } from "./Book";
import { PercentageDiscount, DigitalOnlyDiscount } from "./DiscountDecorator";
import { FedExShipping, BlueDartShipping } from "./ShippingStrategy";
import { CustomerNotifier, DeliveryNotifier } from "./Observer";
import { Order } from "./Order";
import { StoreManager } from "./StoreManager";

// --- Create books ---
const cleanCode = new PhysicalBook("Clean Code", "Robert C. Martin", Category.Technology, 799);
const ddd = new PhysicalBook("Domain-Driven Design", "Eric Evans", Category.Technology, 999);
const jsEBook = new EBook("Effective JS (eBook)", "David Herman", Category.Technology, 399);

// --- Apply dynamic discounts (Decorator) ---
const festiveCleanCode = new PercentageDiscount(cleanCode, 10); // 10% off
const digitalPromoEBook = new DigitalOnlyDiscount(jsEBook, 15); // extra 15% if digital

console.log(`Price (Clean Code, festive): ₹${festiveCleanCode.getPrice()}`);
console.log(`Price (DDD): ₹${ddd.getPrice()}`);
console.log(`Price (JS eBook, digital promo): ₹${digitalPromoEBook.getPrice()}`);

// --- Create order and choose shipping strategy (Strategy) ---
const order1 = new Order([festiveCleanCode, ddd, digitalPromoEBook], new FedExShipping());

// --- Subscribe observers (Observer) ---
order1.addObserver(new CustomerNotifier());
order1.addObserver(new DeliveryNotifier());

console.log(`\nOrder ${order1.getId()} total: ₹${order1.getTotal()}`);
console.log(`Initial state: ${order1.getStateName()}`);

order1.pack();
console.log(`State after pack: ${order1.getStateName()}`);

order1.ship(); // triggers shipping + notifications
console.log(`State after ship: ${order1.getStateName()}`);
console.log("Tracking:", order1.getTrackingInfo());

order1.deliver();
console.log(`State after deliver: ${order1.getStateName()}`);

// --- Another order to show swapping strategies at runtime ---
const order2 = new Order([ddd]); // choose later
order2.setShippingStrategy(new BlueDartShipping());
order2.addObserver(new CustomerNotifier());

order2.pack();
order2.ship();
order2.deliver();

// --- StoreManager (Singleton) overview ---
console.log("\n=== StoreManager Snapshot ===");
console.log("All orders:", StoreManager.instance.getAll().map(o => ({ id: o.getId(), state: o.getStateName() })));
console.log("Active orders:", StoreManager.instance.getActiveOrders().map(o => o.getId()));
console.log("Delivered orders:", StoreManager.instance.getDeliveredOrders().map(o => o.getId()));

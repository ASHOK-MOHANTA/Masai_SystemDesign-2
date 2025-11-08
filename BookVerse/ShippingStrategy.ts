import type{Order} from "./Order";

export interface ShippingStrategy{
    ship(order:Order):{carrier:string; trackingId:string};
}

export class FedExShipping implements ShippingStrategy{
    ship(order: Order)return{carrier:"FedEx",trackingId:`DX-${Date.now()}-${order.getId()}`
        
    }
}

export class BlueDartShipipping implements ShippingStrategy{
    ship(order: Order): { carrier: string; trackingId: `BD-${Date.now()} - ${Order.getId()}`
        
    }
}
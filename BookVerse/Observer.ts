import type {Order,OrderEvent} from "./Order"

export class CustomerNotifier implements Observer{
    update(order:Order,event:OrderEvent){
        if(event.type === "SHIPPED"){
            console.log(`[CustomerNotifier] Order${order.getId()} is shipped via ${event.payload.carrier},tracking: ${event.payload.trackingId`};
        }
    }
}

export class DeliveryNotifier implements Observer{
update(order:Order,event:OrderEvent){
 if (event.type === "SHIPPed"){
 console.log(`CustomerNotifier] Order${order.getId()} is shipped via ${event.payload.carrier},tracking: ${event.payload.trackingId`};
 }
}
}
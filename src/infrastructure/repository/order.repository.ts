import Order from "../../Domain/entity/order";
import OrderItem from "../../Domain/entity/order_item";
import OrderRepositoryInterface from "../../Domain/repository/order-repository.interdace";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository implements OrderRepositoryInterface {
  
  async create(entity: Order): Promise<void> {
      await OrderModel.create({
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => (
            {
              id: item.id,
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
          })),
      },
      {
        include: [{model: OrderItemModel}]
      }
      );
  }

  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({ where: { order_id: entity.id } });
  
    for (const item of entity.items) {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      });
    }
  
    await OrderModel.update(
      {
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try{
      orderModel = await OrderModel.findOne({ 
        where : { id },
        include: ["items"],
        rejectOnEmpty: true,
      });

    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems: OrderItem[] = orderModel.items.map(itemModel => {
      const orderItem = new OrderItem(
        itemModel.id,
        itemModel.name,
        itemModel.price,
        itemModel.product_id,
        itemModel.quantity
      );
      return orderItem;
    });

    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
      const orders = await OrderModel.findAll({ include: ["items"] });

      return orders.map(order => {
        const orderItems = order.items.map(item => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        ));
    
        return new Order(
          order.id,
          order.customer_id,
          orderItems
        );
      });  
  }

}
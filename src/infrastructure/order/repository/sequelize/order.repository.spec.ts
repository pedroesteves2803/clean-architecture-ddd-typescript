import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Address from "../../../../domain/customer/value-object/adress";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a new order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
    
      const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("123", "123", [orderItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderModel = await OrderModel.findOne({
        where: {id: order.id},
        include: ["items"],
      });

      expect(orderModel.toJSON()).toStrictEqual({
          id: "123",
          customer_id: "123",
          total: order.total(),
          items: [
              {
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123"
              },
          ],
      });
  });

  it("Should update a order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
    
      const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("123", "123", [orderItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderModel = await OrderModel.findOne({
        where: {id: order.id},
        include: ["items"],
      });

      expect(orderModel.toJSON()).toStrictEqual({
          id: "123",
          customer_id: "123",
          total: order.total(),
          items: [
              {
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123"
              },
          ],
      });

      const product2 = new Product("456", "Product 2", 20);
      await productRepository.create(product2);
    
      const orderItem2 = new OrderItem(
        "2",
        product2.name,
        product2.price,
        product2.id,
        1
      );

      order.changeItems([orderItem2]);

      await orderRepository.update(order);

      const orderModel2 = await OrderModel.findOne({
        where: {id: order.id},
        include: ["items"],
      });

      expect(orderModel2.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
            {
              id: orderItem2.id,
              name: orderItem2.name,
              price: orderItem2.price,
              quantity: orderItem2.quantity,
              order_id: "123",
              product_id: "456"
            },
        ],
    });
  });

  it("Should find a order", async() => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);
    
      const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      const order = new Order("123", "123", [orderItem]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);

      const orderResult = await orderRepository.find("123");

      expect(order).toStrictEqual(orderResult);
  });

  it("should throw an error when order is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all orders", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      const product2 = new Product("456", "Product 2",20);
      await productRepository.create(product2);
    
      const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        product.id,
        2
      );

      const orderItem2 = new OrderItem(
        "2",
        product2.name,
        product2.price,
        product2.id,
        1
      );

      const order = new Order("123", "123", [orderItem]);
      const order2 = new Order("456", "123", [orderItem2]);

      const orderRepository = new OrderRepository();
      await orderRepository.create(order);
      await orderRepository.create(order2);

      const orders = await orderRepository.findAll();

      expect(orders).toHaveLength(2);
      expect(orders).toContainEqual(order);
      expect(orders).toContainEqual(order2);
  });
  
});
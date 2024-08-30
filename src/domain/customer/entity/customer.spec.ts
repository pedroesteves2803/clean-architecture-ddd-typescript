import Address from "../value-object/adress";
import Customer from "./customer";

describe("Customer unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Pedro");
        }).toThrowError("customer: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required");
    });

    it("should throw error when name is id are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required,customer: Name is required");
    });

    it("should change name", () => {
        let customer = new Customer("123", "Pedro");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");

        const address = new Address(
            "Street 1",
            124,
            "12345-678",
            "São Paulo"
        );
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);

    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    });
});
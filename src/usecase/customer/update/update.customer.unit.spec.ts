import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/adress";
import inputUpdateCustomerUseCase from "./update.customer.use.case";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 1, "1233-213", "São paulo")
);

const input = {
    id: customer.id,
    name: "John update",
    address: {
        street: "Street update",
        number: 1234,
        zip: "Zip update",
        city: "City update",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for customer update use case", () => {

    it("Should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new inputUpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
});
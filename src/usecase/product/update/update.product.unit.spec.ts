import ProductFactory from "../../../domain/product/factory/product.factory";
import inputUpdateProductUseCase from "./upadate.product.usecase";

const product = ProductFactory.create(
    "a",
    "Produto",
    100
);

const input = {
    id: product.id,
    name: "Produto update",
    price: 200
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {

    it("Should update a customer", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new inputUpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
});
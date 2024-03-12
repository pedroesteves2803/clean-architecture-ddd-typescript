import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

export default interface ProductrepositoryInterface 
    extends RepositoryInterface<Product> {}
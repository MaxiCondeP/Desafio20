import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


const schema = buildSchema(`
    type Product{
        id: ID!,
        title: String, 
        price: Float,
        thumbnail: String
    }

    input ProductInput{
        title: String, 
        price: Float,
        thumbnail: String
    }

    type Query {
        getProduct(id: ID!): Product,
        getProducts(campo: String, valor: String): [Product],
    }

    type Mutation {
        createProduct(datos: ProductInput): Product,
        updateProduct(id: ID!, datos: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`);
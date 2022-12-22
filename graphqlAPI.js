
import { buildSchema } from "graphql";


import repositoryMessages from "./src/modules/repositoryMessages.js";
import repositoryProducts from "./src/modules/repositoryProducts.js";
const repoMessages = new repositoryMessages();
const repoProducts = new repositoryProducts();
export const daoProducts = await repoProducts.getDao();
export const daoMessages = await repoMessages.getDao();



export const schemaGraphQL = buildSchema(`
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
        saveProduct(datos: ProductInput): Product,
        updateProduct(id: ID!, datos: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`);

////Resolutions
export async function getProduct({ id }) {
    const product = await daoProducts.getDTOByID(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}


export async function getProducts({ campo, valor }) {
    const products = await daoProducts.getAll();
    if (campo && valor) {
        return products.filter(p => p[campo] === valor);
    } else return products;
}

export async function saveProduct({ datos }) {
    const id = await daoProducts.save(datos);
    return await daoProducts.getDTOByID(id);
}

export async function updateProduct({ id, datos }) {
    const product = await daoProducts.getDTOByID(id);
    if (!product) {
        throw new Error('Product not found')
    }
    const updatedTrainer = await daoProducts.editByID(id, datos);
    return updatedTrainer
}

export async function deleteProduct({ id }) {
    const product = await daoProducts.getDTOByID(id);
    if (!product) {
        throw new Error('Product not found')
    }
    return await daoProducts.deleteById(id);
}




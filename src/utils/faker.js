import { daoProducts } from "../../src/daos/index.js";
import { fakeProducts } from "./src/utils/addProduct.js";

///GENERO LOS 5 PRODUCTOS MOCKEADOS
async function getFakerProducts() {
    for (let i = 0; i <= 5; i++) {
      let product = fakeProducts();
      console.log(product);
      await daoProducts.save(product);
  
    }
  }  
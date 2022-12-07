import { daoProducts } from "../../server.js";
import { fakeProducts } from "../../src/utils/addProduct.js";

///GENERO LOS 5 PRODUCTOS MOCKEADOS
async function getFakerProducts() {
    for (let i = 0; i <= 5; i++) {
      let product = fakeProducts();
      console.log(product);
      await daoProducts.save(product);
  
    }
  } 
  
  export const getFakerProduct=()=>{
    let product = fakeProducts();
    return product;
  }
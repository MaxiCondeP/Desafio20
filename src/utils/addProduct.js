 import {faker} from '@faker-js/faker';


 export const fakeProducts=()=>{
     return{
         title : faker.commerce.productName(),
         price : faker.commerce.price(),
         stock: faker.random.numeric(),
         thumbnail : faker.image.image()
     }
    
 }
import mongoose from "mongoose";
import { ProductDTO } from '../modules/dtoProducts.js';

let instance=null;


const schemaProduct = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 400 }
});

///Creo la clase Producto
export class Product {
    constructor(name, price, thumb, stock, id) {
        this.title = name;
        this.price = price;
        this.thumbnail = thumb;
        this.id= id
    }

}
///creo la clase Contenedor

export class mongoProductContainer {
    constructor() {
        this.collection = mongoose.model('products', schemaProduct);
    }

    static getContainer(){
        if(!instance){
            instance=new mongoProductContainer();
        }
        return instance;
    }
    
    ///Traigo el archivo y devuelvo el array.
    async getAll() {
        try {
            const content = await this.collection.find();
            return (content);
        }
        catch (err) {
            console.log("Error al traer datos de la base", err)
            return { error: "Error al traer datos de la base", err }
        }
    }

    async getDTOProduct() {
        try {
            let products = await this.getAll();
            let productsDTO=[];
            products.map((prod) => {
                let product=new ProductDTO(prod)
                productsDTO.push(product)
            });
            return productsDTO;
        }
        catch (err) {
            console.log("Error al traer datos de la base", err);
        }
    }

      ////Devuelvo un DTO de producto por el ID
      async getDTOByID(id) {
        try {
            let prod = await this.collection.findOne({ id: id });
            let product=new ProductDTO(prod)
            return product;
        } catch (err) {
            console.log("No se encontró el product", err)
            return { error: "No se encontró el product" }
        }
    }
    
    ////Agrego producto al array
    async save(product) {
        try {
            const content = await this.getAll();
            //Defino el valor del id en base al contenido del archivo
            let lastId = 1;
            if (content.length > 0) {
                lastId = content[content.length - 1].id + 1;
            }
            let newProduct = new Product(product.title, product.price,product.thumbnail,product.stock, lastId)
            //agrego el producto a la mongo
            const newElement = new this.collection(newProduct);
            await newElement.save();
            //muestro el último id
            console.log(`El último id es: ${lastId}`);
            return lastId;
        } catch (err) {
            console.log("Error al modificar el archivo", err);
            return { error: "Error al modificar el archivo", err }
        }
    }

    ////Devuelvo un  producto por el ID
    async getByID(id) {
        try {
            let prod = await this.collection.findOne({ id: id });
          
            return prod;
        } catch (err) {
            console.log("No se encontró el product", err)
            return { error: "No se encontró el product" }
        }
    }


    async editByID(id, newProd) {
        try {
            let prod = await this.getByID(id);

            if (prod) {
                let updated = new Product(newProd.title, newProd.price,newProd.thumbnail,newProd.stock, id);
                await this.collection.findOneAndUpdate({_id: prod._id},updated);

                return updated;
            }
        } catch(err) {
            console.log("No se encontró el product", err)
            return { error: "No se encontró el product" }
        }

    }


    ///Elimino un producto por ID
    async deleteById(id) {
        try {
            let content = await this.getAll();
            //Busco el index del id, y si existe lo elimino del array
            const index = content.findIndex(prod => prod.id == id);
            if (index != -1) {
                await this.collection.deleteOne({id: id})
                return content[index]
            }
        } catch {
            console.log("No se pudo eliminar el product", err)
            return { error: "No se pudo eliminar el product" }
        }
    }



   
}


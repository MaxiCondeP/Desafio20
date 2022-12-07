
import { daoProducts } from "../../server.js"

export const getProducts= async (req, res)=>{
    const id=req.params.id;
    if (!id){
        res.status(200).send(await daoProducts.getDTOProduct());
    }else{
        res.status(200).send(await daoProducts.getDTOByID(id));
    }
}


export const saveProduct = async(req,res)=>{
    const id= await daoProducts.save(req.body)
    res.status(200).send(200);
    return id;
}


export const updateProduct= async(req,res)=>{
    let prod=req.body;
    let id= req.params.id;
    let updated= await daoProducts.editByID(id, prod);
    res.status(200).send(updated);
   
}

export const deleteProduct= async(req,res)=>{
    let id=req.params.id;
    await daoProducts.deleteById(id);
    res.status(200).send(200);
    return id;
}



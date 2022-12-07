import axios from 'axios';
import { getFakerProduct } from './src/utils/faker.js';

let id = 2;


const getProduct = async () => {
    axios.get(`http://localhost:8080/api/products/${id}`)
        .then(function (response) { console.log("GET: ", response.status) })
        .catch(function (error) { console.log(error) })
}

const getProducts = async () => {
    axios.get(`http://localhost:8080/api/products`)
        .then(function (response) {console.log("GET(ALL): ", response.status)})
        .catch(function (error) { console.log(error) })
}

const saveProduct = async () => {
    const product = getFakerProduct();
    axios.post('http://localhost:8080/api/products', product)
        .then(function (response) { console.log("POST: ", response.status) })
        .catch(function (error) { console.log(error) })
};

const updateProduct = async () => {
    const product = getFakerProduct();
    axios.put(`http://localhost:8080/api/products/${id}`, product)
        .then(function (response) { console.log("PUT: ", response.status) })
        .catch(function (error) { console.log(error) })
};

const deleteProduct = async () => {
    axios.delete(`http://localhost:8080/api/products/${id}`)
        .then(function (response) { console.log("DELETE: ", response.status) })
        .catch(function (error) { console.log(error) })
};


// getProduct();


getProducts();
saveProduct();
updateProduct();
deleteProduct();
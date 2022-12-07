import supertest from 'supertest';
import chai from 'chai';
import { getFakerProduct } from '../src/utils/faker.js';

const request=  supertest('http://localhost:8080/api');
const expect= chai.expect;


describe('test api restfull', ()=>{
    describe('GET',()=>{
        it('debería retornar status 200', async ()=>{
            let response= await request.get('/products');
            expect(response.status).to.eql(200);
        })
    });

    describe('POST', ()=>{
        it('debería guardar un producto', async()=>{
            let prod= getFakerProduct();    
            let response= await request.post('/products').send(prod);
            console.log(response.status)

            expect(response.status).to.eql(200);
        });
    });

    describe('PUT', ()=>{
        it('debería modificar un producto', async()=>{
            let prod= getFakerProduct();

            let response= await request.put('/products/1').send(prod);
            expect(response.status).to.eql(200);

            const product= response.body;
            expect(product.title).to.eql(prod.title);
            expect(product.price).to.eql(prod.price);
            expect(product.thumbnail).to.eql(prod.thumbnail);
        })
    });


    
    describe('DELETE', ()=>{
        it('debería eliminar un producto', async()=>{
            let prod= getFakerProduct();

            let response= await request.delete('/products/1');
            expect(response.status).to.eql(200);

        })
    });
});



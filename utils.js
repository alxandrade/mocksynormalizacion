import { faker } from "@faker-js/faker";

faker.locale = 'es_MX';
let idMensaje = 0;

export const generadorProducto = () => {
    const producto = {
        id: faker.database.mongodbObjectId(),
        codigo: faker.random.alphaNumeric(5),
        nombre: faker.commerce.product(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        stock: faker.random.numeric(2),
        imagen: faker.image.imageUrl()
    }
    return producto;
}

export const generadorAutor = () => {
    const autor = {
        id: faker.database.mongodbObjectId(),
        nombre: faker.name.firstName(),
        apellido:faker.name.lastName(),
        edad:faker.random.numeric(2),
        alias:faker.internet.email(),
        avatar: faker.image.avatar(),        
    }
    return autor;
}

export const generadorMensaje = (autor) => {
    let nvoMensaje = {};
    nvoMensaje.id = ++idMensaje;
    nvoMensaje.autor = autor,    
    nvoMensaje.mensaje = faker.lorem.text()

   // console.log(nvoMensaje);
    return nvoMensaje;
}
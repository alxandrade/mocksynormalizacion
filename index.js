import express, { json } from "express";
import {generadorProducto, generadorAutor, generadorMensaje} from './utils.js';
import {normalize, denormalize, schema} from 'normalizr'

const PORT = 8080
const app = express();
const autores = [];
const mensajes = [];
const chat = {    
    "id":"001",
    "company": "ecommerce",
    mensajes,
};

app.use(express.json());

// Para Simular Productos
app.get('/api/productos-test',(req, res)=>{
    const productos = [];
    for(let i=0; i<5;i++){
        productos.push(generadorProducto());
    }
    //res.send({status:"success",productos});
    res.send(JSON.stringify(productos));
}); 


// Para Simular el Chat
app.get('/api/chat',(req, res)=>{

    // Generamos los Autores
    for(let i=0; i<5;i++){
        autores.push(generadorAutor());
    }

    // Generamos los mensajes por cada Autor
    let indx;
    for(let i=0; i<10;i++){
        indx = Math.floor((Math.random() * (4 - 0) + 0));         
        mensajes.push(generadorMensaje(autores[indx]));        
    }
    
    //Base de Datos del Chat
    chat.mensajes = mensajes;
    //res.send(JSON.stringify(chat));

    // Comenzamos a Normalizar
    const shema_user = new schema.Entity('user');
    const shema_mensaje = new schema.Entity('message',{
        autor:shema_user
    });
    const shema_chat = new schema.Entity('chat',{
        autor:shema_user,
        mensajes:[shema_mensaje]
    });
    

    const normalizeData = normalize(chat,shema_chat);
    
    console.log("Longitud Original:" + JSON.stringify(chat).length);
    console.log("Longitud Normalizada:" + JSON.stringify(normalizeData).length)

    res.send(JSON.stringify(normalizeData));
    
});

app.listen(PORT, ()=>console.log('http://localhost:' + PORT));


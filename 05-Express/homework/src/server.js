// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 0;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
    //crear un nuevo usuario
    const post = req.body;
    if(post.author && post.title && post.contents){
        let newPost = {...post, id: id++};
        posts.push(newPost);
        res.status(200).json(newPost);
    }else{
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
})

server.post('/posts/author/:author', (req, res) => {
    //crear un nuevo usuario
    const {title, contents} = req.body;
    const {author} = req.params;
    if(!title || !contents || !author){
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }else{
        let newPost = {author, title, contents, id: id++};
        posts.push(newPost);
        res.status(200).json(newPost);
    }
})

server.get('/posts', (req, res) => {
    //crear un nuevo usuario
    const {term} = req.query; // {'/api?term=2' => id = 2}
    // a traves de req.query obtener las variables que escribamos en el path ñuego del ? por ejemplo '/api?term=2' , req.query seria igual a un objeto con la propiedad 'term'
    if(!term){
        res.status(200).json(posts)
    }else{
        let result = posts.filter((elem) => elem.title.includes(term) || elem.contents.includes(term)
        )
        res.status(200).json(result);
    }
})

server.get('/posts/:author', (req, res) => {
    //se busca en la ruta de la siguiente manera /posts/mijail sin los :
    const {author} = req.params;
    let result = posts.filter((elem) => elem.author === author)
    let some = posts.some(elem => elem.author === author)
    if(!some){
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post del autor indicado"})
    }else{
        res.status(200).json(result);
    }
})

server.get('/posts/:author/:title', (req, res) => {
    //se busca en la ruta de la siguiente manera /posts/mijail/Redux sin los :
    // los : indican que alli nos pasaran un variables params
    const {author, title} = req.params;
    let result = posts.filter(elem => elem.author === author && elem.title === title)
    if(result.length === 0){
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }else{
        res.status(200).json(result);
    }
})

server.put('/posts', (req, res) => {
    // en el body debe llegar lo siguiente {
        //   "title": "nodejs",
        //   "contents": "manejo de dependencias",
        //   "id": 1
        // }
    const {id, title, contents} = req.body;
    const modify = posts.find(elem => elem.id === id);
    //uso .find porque esto trae el elemento del array que pasa el test
    if(!id || !title || !contents){
        res
        .status(STATUS_USER_ERROR)
        .json( {error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }else if(modify){
        modify.title=title
        modify.contents=contents
        res.json(modify)
    }else{
        res
        .status(STATUS_USER_ERROR)
        .json( {error: "No corresponde con un post válido"})
    }
})

server.delete('/posts', (req, res) => {
    // en el body debe llegar lo siguiente {"id": 2}
    const {id} = req.body;
    const remove = posts.find(elem => elem.id === id);
    //uso .find porque esto trae el elemento del array que pasa el test
    if(!id){
        res
        .status(STATUS_USER_ERROR)
        .json( {error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }else if(remove){
        let position = posts.indexOf(remove);
        //con .indexOf obtengo el elemento a eliminar
        posts.splice(position, 1);
        //uso .splice porque este no crea un nuevo array sino que elimina dicho elemento
        res.json({ success: true })
    }else{
        res
        .status(STATUS_USER_ERROR)
        .json( {error: "No corresponde con un post válido"})
    }
})

server.delete('/author', (req, res) => {
    //en el body debe llegar lo siguiente {"author": "juan"}
    const {author} = req.body;
    const remove = posts.find(elem => elem.author === author);
    //valido que exitan autores en el posts
    if (!author || !remove) {
        //si no existen autores o no se proporciono el author se retorna el error
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe el autor indicado"})
    }else{
        //en caso contrario dejo en el array de posts, los de diferentes autores al que me pasaron y los post que elimne los guardo en out para poder retornarlos
        let out = [];
        posts = posts.filter(elem => {
            if (elem.author !== author) {
                return true;
            } else {
                out.push(elem)
            }
        })
        res.status(200).json(out)
    }
})


module.exports = { posts, server };

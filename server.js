const express = require('express');
const app =express();
const PORT = 8080;

app.use(express.static('public'));

//Defino los distintos Routers
const routerProductos = express.Router();

routerProductos.use(express.urlencoded({extended: true}))
routerProductos.use(express.json());


const  server=app.listen(PORT, ()=>{
    console.log('servidor levantado en puerto' + server.address().port)
})
server.on('error',(error) => console.log(`hubo un error ${error}`));


const productos =   [{"id":"1","titulo":"bicicleta","precio":"123", "thumbnail":"www.bicicleta.com"},
                    {"id":"2","titulo":"skate","precio":"133", "thumbnail":"www.skate.com"},
                    {"id":"3","titulo":"rollers","precio":"234", "thumbnail":"www.rollers.com"},
                    {"id":"4","titulo":"monopatin","precio":"456", "thumbnail":"www.monopatin.com"}, 
                    {"id":"5","titulo":"bici electrica","precio":"23144", "thumbnail":"www.bicielect.com"}];


//Rutas para Productos
routerProductos.get('/productos', (req, res)=>{
    res.json(productos);
})
routerProductos.get('/productos/:id', (req, res)=>{
    const id = req.params.id;
    let solicitado= productos.filter((el)=> el.id === String(id))
    solicitado.length !==0 ? res.json(solicitado) : res.json({mensaje: "no existe el producto"})
})
routerProductos.post('/productos', (req, res)=>{
    console.log(req.body);
    let tamanio = productos.length -1;    
    let id= parseInt(productos[tamanio].id);
    let newProduct= req.body;
    newProduct.id = String(id +1);
    productos.push(req.body);
    res.json({mensaje:'se agrego correctamente el producto'})
})
routerProductos.put('/productos/:id', (req, res)=>{
    const id = req.params.id;
    let buscado = productos[id - 1];
    //Dato a actualizar
    productos[id - 1].titulo = "avion";

    res.json(productos);
})
routerProductos.delete('/productos/:id', (req, res)=>{
    const id = req.params.id;
    let buscado = productos[id - 1];
    productos.splice(id - 1, 1);   
    console.log(buscado);
    res.json(productos);
})
app.use('/api', routerProductos);





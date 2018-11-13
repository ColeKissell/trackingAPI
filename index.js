const Hapi = require('hapi');
const mongoose = require('mongoose');

const methods = require('./methods')
const URL = "mongodb://Admin:k1ngc0le!!@ds035836.mlab.com:35836/hobby-tracking";


const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {cors:true}
});

mongoose.connect(URL,{useNewUrlParser: true},)
mongoose.connection.on('connected', () => {
    console.log('connected to database')
})
mongoose.connection.on('err', (err) => {
    console.log('failed to connect to database', err)
})


// need to set up the required models and schemas
const ItemsModel = require('./model/itemModel')

server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
        return 'Home page';
    }
});
// get item
server.route({
    method: 'GET',
    path: '/item',
    handler: (req, rep) =>{
        return methods.AllThings(ItemsModel)
    }
})

// get item by id
server.route({
    method: 'GET',
    path: '/item/{id}',
    handler: (req, rep) =>{
        return methods.findTheId(req.params.id, rep)
    }
})
// update item put by id
server.route({
    method: 'PUT',
    path: '/item/{id}',
    handler: (req, res) =>{
        return methods.updateItem(req, res);
    }
})
// delete item by id
server.route({
    method: 'DELETE',
    path: '/item/{id}',
    handler: (req, res) =>{
        return methods.deleteTheThing(req.params.id);
    }
})
// new item post
server.route({
    method: 'POST',
    path: '/item',
    handler: (req, res) =>{
        return methods.newItem(req)
    }
})


const init = async () => {
    await server.start((err)=>{
        if(err){throw err;}
        console.log(`server is running at port ${server.info.port}`)
    });
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
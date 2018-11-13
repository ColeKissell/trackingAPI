const hapi = require('hapi');
const mongoose = require('mongoose');

const Items = require('./model/itemModel')

const AllThings = () => {
    const foundItems= Items.find();
    return foundItems
}
const findTheId = ( id, reply) => {
    const foundThing = Items.findById(id, (err, data)=>{
        if(err){return reply(err).code(404)}
    })
    return foundThing;
}
const newItem = (request) => {
    const {name, description} = request.payload;
    const thing = new Items ({
        name,
        description
    }); 
    return thing.save();
}

const updateItem = (request, reply) => {
    const updatedItem = Items.findByIdAndUpdate(request.params.id, request.payload, (err, data)=>{
        if(err){return reply(err).code(404)}})
    const foundItem = Items.findById(request.params.id, (err, data)=>{
        if(err){return reply(err).code(404)}})
    return foundItem;
}


const deleteTheThing = (id, reply) => {
    const thingToDelete = Items.findByIdAndRemove(id, (err, data)=>{
        if(err){return reply(err).code(404)}
    })
    return thingToDelete && 'Item has been deleted'
}


module.exports = {
    AllThings,
    findTheId,
    newItem,
    updateItem,
    deleteTheThing
}

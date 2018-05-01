const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const ticketSchema = require('./model/ticket');

const TicketsCollection = mongoose.model(config.collectionName, ticketSchema);

const saveTickets = function(tickets) {
    return new Promise(function(resolve, reject) {
        TicketsCollection.collection.insert(tickets, function(err, docs) {
            if (err) {
                console.err(err);
                reject(err);
            }
            console.log('Multiple records successfully inserted');
            resolve(true);
        });
    });
};

const getTicketsBySearchTermX = function(searchTerm){
    return new Promise(function(resolve, reject){
        console.log('Search term : ', searchTerm);
        const result = TicketsCollection.find({$text: {$search: { '$regex' : searchTerm, '$options' : 'i' }}}, function(err, docs) {
            if (err) console.log(err);
            else {
                return docs;
            }
        });
        resolve(result);
    })
}

const getTicketsBySearchTermy = function(searchTerm){
    return new Promise(function(resolve, reject){
        console.log('Search term : ', searchTerm);
        const result = TicketsCollection.find({$or: [{$text: {$search: searchTerm}}, {name: {$regex: searchTerm, $options:'$i'}}]}, function(err, docs) {
            if (err) console.log(err);
            else {
                return docs;
            }
        });
        resolve(result);
    })
}

const getTicketsBySearchTermz = function(searchTerm){
    return new Promise(function(resolve, reject){
        console.log('Search term : ', searchTerm);
        const term = '/'+searchTerm+'/i';
        const result = TicketsCollection.find({$or: [{$text: {$search: searchTerm}}, {name: {$regex: term}}]}, function(err, docs) {
            if (err) console.log(err);
            else {
                return docs;
            }
        });
        resolve(result);
    })
}

const getTicketsBySearchTerm = function(searchTerm){
    return new Promise(function(resolve, reject){
        const result = TicketsCollection.find({name: {$regex: searchTerm, $options:'$i' }}, function(err, docs) {
            if (err) console.log(err);
            else {
                return docs;
            }
        });
        resolve(result);
    })
}

module.exports = {
    saveTickets,
    getTicketsBySearchTerm
}

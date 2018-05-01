const jsonfile = require('jsonfile');
const { saveTickets: saveTicketsToDB, getTicketsBySearchTerm } = require('./db/ticket');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const parserXML = require('xml2json');

const parseAndDump = (file) => {
    let fileType;
    if (file.mimetype === 'application/json') {
        fileType = 'json';
       return parseJSON(file).then(tickets => {
            console.log(tickets);
            return saveToDB(tickets)
        });
    } else if (file.mimetype === 'text/xml') {
        fileType = 'xml';
        console.log('Evaluation stage');
        return parseXMlToJSON(file).then(data => {
            console.log(data);
            return saveToDB(data);
        });
    }
};

const parseJSON = (file) => {
    return new Promise((resolve, reject) => {
        const parsefile = file.path;
        jsonfile.readFile(parsefile, function(err, data) {
            resolve(data);
        });
    });
}

const parseXML = (file) => {
    return new Promise((resolve, reject) => {
        const parsefile = file.path;
        fs.readFile(parsefile, 'utf-8', (err, data) => {
            if (err) console.log(err);
            else {
                parser.parseString(data, (err, result) => {
                    const data = result['root']['element'];
                    console.log('XML ',JSON.stringify(data));
                    resolve(data);
                })
            }
        });
    })
}

const parseXMlToJSON = (file) => {
    return new Promise((resolve, reject) => {
        const parsefile = file.path;
        fs.readFile(parsefile, 'utf-8', (err, data) => {
            if (err) console.log(err);
            else {
                const result = parserXML.toJson(data);
                const result2 = JSON.parse(result)['root']['element'];
              //  console.log('XML ',result2);                
                resolve(result2);
            }
        })
    })
}

const saveToDB = (tickets) => {
    return saveTicketsToDB(tickets)
        .then((data) => data);
};

const getTickets = (searchTerm) => {
    return getTicketsBySearchTerm(searchTerm)
    .then((docs) => docs);
}

module.exports = {
    parseAndDump,
    getTickets
}

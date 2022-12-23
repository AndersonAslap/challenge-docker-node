const express = require('express');
const mysql = require('mysql');
const faker = require('faker');

const app = express();

const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const create_table = `CREATE TABLE IF NOT EXISTS peoples(id int primary key auto_increment, name varchar(255))`;
connection.query(create_table);

app.get('/', (request, response) => {
    const randomName = faker.name.findName();

    const sql = `INSERT INTO peoples(name) values ('${randomName}')`;
    connection.query(sql);

    connection.query(`SELECT * FROM peoples`, function (err, rows) {
        let page = "<h1>Rochas de ciclo completo!</h1>";


        if (!err && rows.length > 0) {

            page += "<ul>";

            rows.forEach(element => {
                page += `<li>${element.name}</li>`;
            });

            page += "</ul>";

            response.send(page);
        } else {
            response.send(page);
        }
    });
    
});

app.listen(port, () => {
    console.log(`Server is running, port: ${port}`);
});
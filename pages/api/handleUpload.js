import formidable from "formidable";
import fs from "fs";
import res from "express/lib/response";
import bodyParser from "body-parser";

export const config = {
    api: {
        bodyParser: true
    }
};
const post = async (req, res) => {
           //console.log(req.body);

            saveFile(req);


        return res.status(201).send("Nothing");
    ;
};

/*const post = async (req, res) => {

    const data = req.body instanceof Buffer ? req.body : Buffer.alloc(0);
    console.log('Ошибка: ',data);
    fs.writeFile("public/animals.json", data, (err) => {
        if (!err) {
            res.status(200).send('Success!');
        } else {
            res.status(500).send(err.toString());
        }
    });

};*/

const saveFile = (req) => {
    const fs = require("fs");
    //console.log(req);

    var myJSON = JSON.stringify(req);


    fs.readFile("public/animals.json", "utf-8", function (err, data) {
        if (err)
            return console.log(err);

        console.log("File content before replace:");
        console.log(data);

        data = data.substr(0, data.length - 1);
        data = data+",";
        console.log("File content after replace: ");
        console.log(data);

        console.log(myJSON);
        fs.writeFile('public/animals.json', data+"\n"+myJSON+"]", (err) => {
            if(err) throw err;
            console.log('Data has been added!');
        });
    });









    /*fs.appendFile("public/animals.json", req, (err) => {
        if (!err) {
            console.log('Ок');
        } else {
            console.log('Не ок');
        }

    });*/
};

export default (req, res) => {
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();
    app.use(bodyParser.json());
    // const body = JSON.parse(req.body);
    console.log(req.body);
    saveFile(req.body);
    // if (req.method === "POST") post(req,res);
    // else res.status(200).send("Invalid method, use POST")
};

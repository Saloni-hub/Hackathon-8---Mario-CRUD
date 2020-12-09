const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get('/mario', async (req, res) => {
    res.send(await marioModel.find());
});

app.get('/mario/:id', async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await marioModel.findById());
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
});

const isNullOrUndefined = (val) => val === null || val === undefined;
app.post('/mario', async (req, res) => {
    const newMArio = req.body;
    if (isNullOrUndefined(newMArio.name) || isNullOrUndefined(newMArio.weight)) {
        res.status(400).send({ message: 'either name or weight is missing' });
    } else {
        const newMarioModel = new marioModel(newMArio);
        await newMarioModel.save();
        res.status(201).send(newMarioModel);
    }
});

app.patch('/mario/:id', async (req, res) => {
    const id = req.params.id;
    const newMArio = req.body;

    try {
        const data = await marioModel.findById();
        if (isNullOrUndefined(newMArio.name) && isNullOrUndefined(newMArio.weight)) {
            res.status(400).send({ message: 'both name and weight is missing' });
        } else {
            if (!isNullOrUndefined(newMArio.name)) {
                data.name = newMArio.name;
            }
            if (!isNullOrUndefined(newMArio.weight)) {
                data.weight = newMArio.weight;
            }
            await data.save();
            res.send(data);
        }
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
});

app.delete('/mario/:id', async (req, res) => {
    const id = req.params.body
    try {
        await marioModel.findById(id);
        await marioModel.deleteOne({ _id: id });
        res.status(200).send({ message: 'character deleted' })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
});

module.exports = app;
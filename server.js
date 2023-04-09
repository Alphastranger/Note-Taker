const express = require('express');
const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')
const uuid = require('uuid')

const app = express()

const PORT = 3001;

app.use(express.json())

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, `./public/index.html`))
})
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            let parsedNotes = JSON.parse(data)
            res.json(parsedNotes)
        }
    })
})
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`)
    console.log('Successfully posted')
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote)
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (err) =>
                    err ? console.error(err) : console.log('You made it'))
            }
        })
    } else {
        res.error('Error in adding new note')
    }
    // fs.appendFile('db.json', res.json(`${req}`), (error) =>{
    //     error ? console.error(error) : console.log('success')
    // })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
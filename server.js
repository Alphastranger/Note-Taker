const express = require('express');
const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')
const {v4: uuidv4} = require('uuid')

const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, `./public/index.html`))
// });
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received`)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            let parsedNotes = JSON.parse(data)
            res.json(parsedNotes)
            console.log('Im here')
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
            note_id: uuidv4(),
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
})
app.get('/api/notes/:note_id', (req, res)=>{
    if (req.params.note_id){
        const noteId = req.params.note_id;
        console.info(`${req.method} received`)
        for (let i = 0; i <db.length; i++){
            const currentNote = db[i];
            if (currentNote.review_id === noteId){
                res.json(currentNote);
                return;
            }
        }
    }
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, `./public/index.html`))
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
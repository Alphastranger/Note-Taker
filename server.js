const express = require('express');
const fs = require('fs')

const app = express()

const PORT = 3001;

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, `./public/index.html`))
})
app.get('/api/notes', (req, res) =>{
    fs.readFile('db.json', 'utf-8',(error, data)=>
    error ? console.error(error): JSON.stringify(data))
})

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`)
})
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

const app = express()
const port = 3000


app.get('/characters', (req, res) => {
  // ...
})

app.get('/characters/:id', (req, res) => {

})

app.post('/characters', (req, res) => {

})

app.put('/characters/:id', (req, res) => {
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

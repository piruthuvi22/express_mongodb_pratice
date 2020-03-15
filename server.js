const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

// app.use(express.static('public'))
app.use(bodyParser.json())

var db;
const url = "mongodb://localhost/quotesDB2";
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('quotesDB2') // whatever your database name is
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', { quotes: result })
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})

app.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate({name: 'Yoda'}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  function edit(id){
    alert(id);
  }
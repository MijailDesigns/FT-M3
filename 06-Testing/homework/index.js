const express = require('express');
const app = express();
const { sumArray } = require('./sumArray.js') // me importo la funcion

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.status(200).json({
    message: 'test'
  })
})

app.post('/sum', (req, res) => {
  const {a, b} = req.body
  res.send({
    result: a + b
  });
})

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body;
  let result = sumArray(array, num)
  res.send({
    result: result
  })
})

app.post('/numString', (req, res) => {
  const { string } = req.body;
  if(typeof string !== 'string' || string === ""){
    return res.sendStatus(400);
  }else{
    let numString = string.length;
    res.status(200).json({result: numString})
  }

})

app.post('/pluck', (req, res) => {
  const { array, string } = req.body;
  if (!Array.isArray(array)) {
    return res.status(400).json({error: "The array can't be a number"})
  }
  if (string.length === 0) {
    return res.status(400).json({error: "The string can't be empty"})
  }
  else{
    let result1 = array.filter(elem => elem.hasOwnProperty(string));
    return res.send({result: result1}); // hay que colocar return para los test que tienen return al parecer
  }
  
  
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar

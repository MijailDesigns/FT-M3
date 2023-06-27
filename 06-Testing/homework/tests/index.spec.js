const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3}) //me envian un body
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => {
      return agent.post('/sumArray').send({array:[2,5], num: 1}).expect(200) //aqui incluimos el send porque sino falla el test
    });
    it('responds with and object with message `true`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    it('responds with and object with message `false`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 1})
        .then((res) => {
          expect(res.body.result).toEqual(false);
    }));  
    it('responds with and object with message `false` if use two equals numbers', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 10})
        .then((res) => {
          expect(res.body.result).toEqual(false);
    }));  
  });

  describe('POST /numString', () => {
    it('responds with result equal 4', () => {
      return agent.post('/numString') //no olvides colocar el return para las promesas porque si no pasara el test antes
      .send({string: "hola"})
      .then((res) => {
        expect(res.body.result).toEqual(4)
      })
    });
    it('responds with 200', () => {
      return agent.post('/numString')
      .send({string: "hola"})
      .expect(200)
    });
    it('responds with 400 if string is a number', () => {
      return agent.post('/numString')
      .send({string: 4})
      .expect(400);
    });
    it('responds with 400 if the string is empty', () => {
      return agent.post('/numString')
      .send({string: ""})
      .expect(400)
    })
  });

  const posts = [
    {
      id: 1,
      title: "React",
      author: 'Martina',
      content: "Introduccion a React"
    },
    {
      id: 2,
      name: "El señor de los anillos",
      author: 'book1.author',
      stock: 'book1.stock',
      available: 'book1.available',
      rating: 5,
      admission: 'book1.admission',
      genre: "Alta fantasía",
    },
    {
      id: 3,
      title: "nodejs",
      author: 'Ana',
      content: "Manejo de dependencias"
    }
  ]

  describe('POST /pluck', () => {
    it('responds with 400 if the array is a number', () => {
      return agent.post('/pluck')
      .send({array: 4, string: 'name'})
      .expect(400)
    });
    it('responds with a 400 if the array is a string', () => {
      return agent.post('/pluck')
      .send({array: 'hola', string: 'name'})
      .expect(400)
    });
    it('responds with a 400 if the array is an object', () => {
      return agent.post('/pluck')
      .send({array: {name: 'hola'}, string: 'name'})
      .expect(400)
    });
    it('responds with a 400 if the string property is empty', () => {
      return agent.post('/pluck')
      .send({array: posts, string: ""})
      .expect(400)
    })
    it('responds with a 200', () => {
      return agent.post('/pluck')
      .send({array: posts, string: 'rating'})
      .expect(200)
    });
    it('responds with an array with object with that property', () => {
      return agent.post('/pluck')
      .send({array: posts, string: 'rating'})
      .then((res) => {
        expect(res.body.result).toEqual([posts[1]])
      })
    })
  })

});


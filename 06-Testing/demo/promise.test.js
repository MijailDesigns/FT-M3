const promisifiedFunction = require('./promise');
//forma 1
xit('should resolve to Henry Promise', () => {
  return promisifiedFunction(true).then(data => {
    expect(data).toBe('Henry Promise');
  });
});
//forma 2
xit('should resolve to Henry Promise (other way)', () => {
  return expect(promisifiedFunction(true)).resolves.toBe('Henry Promise');
});
// forma del reject
xit('should reject to Rejected Promise', () => {
  return expect(promisifiedFunction(false)).rejects.toBe('Rejected Promise');
});
//forma 2 async/await
//en esta colocamos la palabra asyn adelante de la arrow para indicar que se esta testeando una funcion asincrona
xit('should resolve to Henry Promise (async/await)', async () => {
  const data = await promisifiedFunction(true);
  expect(data).toBe('Henry Promise');
});

// --------------------------- rejected
//forma 1 con assertions
xit('should reject to Rejected Promise', () => {
  expect.assertions(1); // si usamos el catch debemos colocar esta linea, el 1 hace referencia a la cantidad de funciones que se van a invocar dentro del catch
  return promisifiedFunction(false).catch(e => {
    expect(e).toMatch('Rejected Promise')
  });
});
//forma 2 con rejects
xit('should reject to Rejected Promise (other way)', () => {
  return expect(promisifiedFunction(false)).rejects.toMatch('Rejected Promise');
});
//forma 3 con async, se utiliza nuevamente el assertion para indicar la cantidad de funciones que se van a llamar dentro del catch
xit('should reject to Rejected Promise (async/await)', async () => {
  expect.assertions(1);
  try {
    await promisifiedFunction(false);
  } catch (error) {
    expect(error).toMatch('Rejected Promise');
  }
});
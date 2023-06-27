'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
    if (typeof executor !== "function") {
        throw new TypeError('executor is not a function')
    }

    this._state= 'pending';
    this._value= undefined;
    this._handlerGroups = [];

    executor(value => this._internalResolve(value), reason => this._internalReject(reason))
}


$Promise.prototype._internalResolve = function (value) {
    if (this._state === 'pending') {
        this._state= 'fulfilled';
        this._value= value;
        this._callHandlers();
    }
}

$Promise.prototype._internalReject = function (reason) {
    if (this._state === 'pending') {
        this._state= 'rejected';
        this._value= reason;
        this._callHandlers();
    }
}

$Promise.prototype.then = function (successCb, errorCb) {
    if (typeof successCb !== 'function') successCb = false;
    if (typeof errorCb !== 'function') errorCb = false;

    const downstreamPromise = new $Promise(function () {
        
    })

    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise
    })

    if (this._state !== 'pending') this._callHandlers();

    return downstreamPromise; //Promesa B
}

$Promise.prototype._callHandlers = function () {
    while (this._handlerGroups.length) {
        let currentHandler = this._handlerGroups.shift();

        //Promesa B
        const downstreamPromise = currentHandler.downstreamPromise;

        if (this._state === 'fulfilled') {
            if (!currentHandler.successCb) {
                //No tenemos successHandler
                //Resuelvo a B al valor de A
                downstreamPromise._internalResolve(this._value) //promesaA.value
            } else {
                //Hay succesHandler
                try {
                    const result = currentHandler.successCb(this._value) //valor / promesa / err
                    //1) successCb retorna una promesa (Z)
                    if (result instanceof $Promise) {
                        result.then(function (value) {
                            downstreamPromise._internalResolve(value)
                        }, function (err) {
                            downstreamPromise._internalReject(err)
                        })
                    }else{
                        //2)successCb retorna un valor
                        downstreamPromise._internalResolve(result) //un valor
                    }
                    
                } catch (error) {
                    //3)El handler successCb lanzo un error
                    downstreamPromise._internalReject(error) //un error
                }
            }
            
        }else{
            //cuando la promesa A se rechace
            if (!currentHandler.errorCb) {
                //No tenemos Handler
                //rechazo a B al valor de A
                downstreamPromise._internalReject(this._value) //valor promesa A
            }else{
                //tenemos handler
                try {
                    const result = currentHandler.errorCb(this._value) //valor / promesa / err
                    //1) errorCb retorna una promesa (Z)
                    if (result instanceof $Promise) {
                        result.then(function (value) {
                            downstreamPromise._internalResolve(value)
                        }, function (err) {
                            downstreamPromise._internalReject(err)
                        })
                    }else{
                        //2)errorCb retorna un valor
                        downstreamPromise._internalResolve(result) //un valor
                    }
                    
                } catch (error) {
                    //3)El handler lanzo un error
                    downstreamPromise._internalReject(error) //un error
                }
            }
        }
    }
}

$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb);
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

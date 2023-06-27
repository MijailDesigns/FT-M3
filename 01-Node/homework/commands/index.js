var fs = require('fs')
var request = require('request');

module.exports = {
    date: function (params, toPrint) {
        toPrint(Date())
    },
    pwd: function (params, toPrint) {
        //process.cwd trae la ruta en la que estamos (current working directory)
        // process.stdout.write(process.cwd());
        // process.stdout.write('\nprompt > ');
        toPrint(process.cwd())
    },
    ls: function (params, toPrint) {
        //Usá fs.readdir para obtener los archivos en el directorio
        fs.readdir('.', function(err, files){
            if (err) throw err;
            //console.log(files)
            
            //toPrint(files.join("\n"))
            //diferente solucion
            let output = '';
            files.forEach(function(file){
                output =  output + file + "\n";
            })
            toPrint(output)
            // process.stdout.write("prompt > ");
        })
    },
    echo: function (params, toPrint){
        toPrint(params.join(''))
    },
    cat: function (params, toPrint) {
        //let path = params.join('')
        fs.readFile(params[0], 'utf8', (err, data) => {
            if (err) throw err;
            toPrint(data);
          });
    },
    head: function (params, toPrint) {
        fs.readFile(params[0], 'utf8', (err, data) => {
            if (err) throw err;
            
            
            toPrint(data.split('\n').splice(0, params[1] || 5).join('\n'));
          });
    },
    tail: function (params, toPrint) {
        fs.readFile(params[0], 'utf8', (err, data) => {
            if (err) throw err;
            
            
            toPrint(data.split('\n').splice(-params[1] || -5).join('\n'));
          });
    },
    curl: function (params, toPrint) {
        request(params[0], (err, data) => {
            if (err) throw err;
            
            toPrint(data.body);
          });
    },
    sort: function (params, toPrint) {
        fs.readFile(params[0], 'utf8', (err, data) => {
            if (err) throw err;
            
            
            toPrint(data.split('\n').sort().join('\n'));
          });
    },
    wc: function (params, toPrint) {
        fs.readFile(params[0], 'utf8', (err, data) => {
            if (err) throw err;
            
            
            toPrint(data.split('\n').length.toString());
          });
    },
    uniq: function (params, toPrint) {
        fs.readFile(params[0], 'utf8', (err, data) => {
            if (err) throw err;
            let result = new Set(data.split('\n'));

            
            toPrint(Array.from(result).join('\n'));
          });
    }

}
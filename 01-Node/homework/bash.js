// console.log(Object.keys(process))
const commands = require('./commands/index.js')

const toPrint = function (output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

    // Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      var params = data.toString().trim().split(' ');
      var cmd = params.shift(); // remueve la nueva línea
    //   if (cmd === 'date') {
    //     process.stdout.write(Date());
    //   }
    //   if (cmd === 'pwd') {
    //     process.stdout.write(process.cwd());
    //   }
    //repetido
    //   if (cmd === 'pwd') {
    //     process.stdout.write(process.cwd());
    //   }
        if (commands[cmd]) {
            commands[cmd](params, toPrint);
        }else{
            process.stdout.write('Command does not exit');
            process.stdout.write('\nprompt > ');
        }
        
      //process.stdout.write('You typed: ' + cmd);
      //process.stdout.write('\nprompt > ');
    });
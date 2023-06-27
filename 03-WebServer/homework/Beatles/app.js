var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]





// http.createServer( function(req, res){ 
//   function forHtml(index) {
//     res.writeHead(200, { 'Content-Type':'text/html' })
  
//     var html = fs.readFileSync(__dirname +'/beatle.html', 'utf8'); 
//     var name = beatles[index].name; 
//     var birthdate = beatles[index].birthdate; 
//     var profilePic = beatles[index].profilePic;
//     html = html.replace('{name}', name); 
//     html = html.replace('{birthdate}', birthdate); 
//     html = html.replace('{profilePic}', profilePic); 
//     res.end(html);
//   }

//   function forJson(obj) {
//     res.writeHead(200, { 'Content-Type':'application/json' })
//     res.end(JSON.stringify(obj));
//   }

//   if( req.url === '/'){ 
//     res.writeHead(200, { 'Content-Type':'text/html' })
//     var html = fs.readFileSync(__dirname +'/index.html');
//     res.end(html);
//   }else if( req.url === '/John%20Lennon'){
//     forHtml(0);
//   }else if( req.url === '/Paul%20McCartney'){
//     forHtml(1)
//   }else if( req.url === '/George%20Harrison'){
//     forHtml(2)
//   }else if( req.url === '/Richard%20Starkey'){
//     forHtml(3)
//   }else if( req.url === '/api'){
//     forJson(beatles)
//   }else if(req.url === '/api/John%20Lennon'){
//     forJson(beatles[0])
//   }else if(req.url === '/api/Paul%20McCartney'){
//     forJson(beatles[1])
//   }else if(req.url === '/api/George%20Harrison'){
//     forJson(beatles[2])
//   }else if(req.url === '/api/Richard%20Starkey'){
//     forJson(beatles[3])
//   }else{
//     res.writeHead(404); //Ponemos el status del response a 404: Not Found
//     res.end(); //No devolvemos nada más que el estado.
//   }
  
//  }).listen(1337, '127.0.0.1');

http.createServer( function(req, res){ 
  if( req.url === '/api' || req.url === '/api/'){ 
    res.writeHead(200, { 'Content-Type':'application/json' });
    res.end(JSON.stringify(beatles));
  }
  else if(req.url.substring(0, 5) === '/api/' && req.url.length > 5){
    let findBeatle = req.url.split('/').pop();
    let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name));
    if (foundBeatle) {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(JSON.stringify(foundBeatle));
    }else{
      res.writeHead(404, {'Content-type': 'application-json'});
      res.end('No existe ese Beatle')
    }
  }else if(req.url === '/'){
    res.writeHead(200, { 'Content-Type':'text/html' })
    var html = fs.readFileSync(__dirname +'/index.html');
    res.end(html);
  }else if(req.url.substring(0, 5) !== '/api/'){
    let findBeatle = req.url.split('/').pop();
    let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name));
    if (foundBeatle) {
      res.writeHead(200, {'Content-type': 'text/html'});
      var html = fs.readFileSync(__dirname +'/beatle.html', 'utf8'); 
      var name = foundBeatle.name; 
      var birthdate = foundBeatle.birthdate; 
      var profilePic = foundBeatle.profilePic;
      html = html.replace('{name}', name); 
      html = html.replace('{birthdate}', birthdate); 
      html = html.replace('{profilePic}', profilePic); 
      res.end(html);
    }else{
      res.writeHead(404, {'Content-type': 'application-json'});
      res.end('No existe ese Beatle')
    }
  }
  

  
 }).listen(1337, '127.0.0.1');



 //****otra solucion */



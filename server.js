/*------------------------------------------------------------------------------
 * Run a basic web server to view test web pages.
 * Without web server, Firefox won't load external resources like fonts.
 */

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on http://127.0.0.1:8080/test/software-package.html');
});

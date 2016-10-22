var fs = require('fs');
var path = require('path');

const titles = {
	'index' : 'תנו לחיות לחיות רמתגן והסביבה', 
	'contactus' : 'צרו קשר - תנו לחיות לחיות', 
	'donation' : 'תרומה - תנו לחיות לחיות', 
	'adoptacat' : 'אמצו חתול - תנו לחיות לחיות', 
	'adoptadog' : 'אמצו כלב - תנו לחיות לחיות',
	'aboutus' : 'אודותינו - תנו לחיות לחיות'
};


['index', 'contactus', 'donation', 'adoptacat', 'adoptadog', 'aboutus']
	.forEach( function(p){
		console.log("writing " + p);
		writePage([
			generateHead(titles[p], p),
			generateNav(),
			readFile(`page_sources/${p}._html`),
			generateTail()
		], `${p}.html`);
	});

console.log("all done.");

// utils
function readFile(relPath) {
	return fs.readFileSync(path.join(__dirname, relPath), { encoding: 'utf8' });
}

function writeFile(relPath, contents){
	return fs.writeFileSync(path.join(__dirname, relPath), contents);
}

function generateHead(title, page){
	var head = readFile('page_sources/head._html');
	return head.replace(/\$TITLE\$/g,title).replace(/\$PAGE\$/,page);
}

function generateTail(){
	return readFile('page_sources/tail._html');
}

function generateNav(){
	return readFile('page_sources/nav._html');
}

function writePage(sections, relPath){
	var sectionsString = sections.join("\n");
	writeFile(relPath, sectionsString);
}
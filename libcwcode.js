/* CWcode by OE3SPR
*/

var wordCount = 60;
var wordLength = 5;
var wordsPerLine = 5;

var uppercase = true;
var useLetters = true;
var useFigures = true;
var useSpecialChars = true;
var urlParams = new URLSearchParams(window.location.search);
var rand;

function hash_cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    // return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
    return (h1^h2^h3^h4)>>>0;
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function init_rand() {
    var codeid = urlParams.get('codeid');
    if (codeid === null) {
        codeid = new Date().toISOString().substr(0, 13) + ':00';
        window.location = window.location.pathname + '?codeid=' + codeid;
    }
    rand = mulberry32(hash_cyrb128(codeid));
}

function generateCode() {
    init_rand();
    uppercase = document.getElementById('uppercase').checked;
    useLetters = document.getElementById('letters').checked;
    useFigures = document.getElementById('figures').checked;
    useSpecialChars = document.getElementById('specialchars').checked;
    if (!useLetters && !useFigures && !useSpecialChars) {
        useLetters = true;
        useFigures = true;
        useSpecialChars = true;
    }
    document.getElementById('text').innerHTML = generateWords(wordCount, wordLength, wordsPerLine);
}

function generateWords(wordcnt, wordlen, wordsPerLine) {
    var line = 0;
    var words = '<span class="bg1">';
    for (var w=1; w <= wordcnt; w++) {
        words += generateWord(wordlen) + ' ';
        if (!(w % wordsPerLine)) {
            words += `</span><br><span class="bg${++line%2 +1}">`;
        }
    }
    words += '</span>';
    if (!uppercase) {
        words = words.toLowerCase();
    }
    return words.replace(/0/g, '&Oslash;');
}

function generateWord(len) {
    if (len <= 0) {
        len = 5;
    }
    var word = '';
    for (var i=0; i<len; i++) {
        word += generateChar();
    }
    return word;
}

function generateChar() {
    var rnd;
    while (true) {
        rnd = Math.floor(rand() * 41);
        if ((rnd < 26 && useLetters)
             || (rnd >= 26 && rnd < 36 && useFigures)
             || (rnd >= 36 && useSpecialChars)) {
            break;
        }
    }
    if (rnd < 26) {
        return String.fromCharCode(65+rnd);
    } else if (rnd >= 36) {
        return ['=', '/', '?', ',', '.'][rnd-36];
    } else {
        return (35-rnd).toString();
    }
}


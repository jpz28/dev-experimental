var path = require('path');
var fs = require('fs');
var readline = require('readline');
var mkdirp = require('mkdirp');
var pad = require('pad-left');
var ytdl = require('youtube-dl');
var request = require('request');
var ffmetadata = require('ffmetadata');

var options = [
    '--no-check-certificate',
    // '--yes-playlist'
];


main('https://www.youtube.com/playlist?list=PL482F699C61AFD9A4', {
    album: 'K2 Soundtrack',
    artist: 'Zimmer, Hans',
    disc: 1,
    image: 'https://images-na.ssl-images-amazon.com/images/I/41Z3GPF6TZL.jpg',
    genre: 'Soundtrack',
    date: '2012'
}, /(K2 Soundtrack|Hans Zimmer)/gi);





/*********************************************************************************** PRIVATE HELPERS */
function main(url, tags, stripTitleStr) {
    ytGetInfo(url, options).then(data => {
        data = data instanceof Array ? data : [data];
        var item = data[0];
        //Create output folder
        destDir = 'output/' + (tags.album || item.playlist_title);
        mkdirp.sync(destDir);
        //Download album cover
        if (tags.image.indexOf('http') >= 0) {
            var imgUrl = tags.image;
            var imgExt = path.extname(imgUrl).substr(0, 4);
            var imgFilePath = `${destDir}/albumcover.jpg`;
            tags.image = imgFilePath;
            request(imgUrl).pipe(fs.createWriteStream(imgFilePath));
        }
        data.forEach((info, index) => {
            var trackNum = pad(index + 1, 2, '0');
            tags = createMetadata(tags, info, index, stripTitleStr);
            var fileName = `${destDir}/${trackNum}-${tags.title}`;
            return ytExtractMp3(info.webpage_url, fileName, tags)
                .then(result => { setMetadata(`${result.file}.mp3`, result.tags) });
        });
    }).catch(error => {
        console.log(error);
    });
}

function ytGetInfo(url, options) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url, options, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

function ytExtractMp3(url, destFile, meta) {
    var tags = {};
    Object.assign(tags, meta);
    return new Promise((resolve, reject) => {
        var options = [
            '--no-check-certificate',
            '-x',
            '--audio-format', 'mp3',
            '--audio-quality', '0',
            '--output', `${destFile}.%(ext)s`
        ];
        ytdl.exec(url, options, {}, (err, output) => {
            if (err) reject(err);
            console.log(output.join('\n'));
            resolve({
                file: destFile,
                tags: tags
            });
        });
    });
}

function createMetadata(tags, info, index, strip) {
    var title = getCleanTitle(info.title, strip);
    if (typeof(tags) === 'undefined')
        tags = {};
    tags.track = pad(index + 1, 2, '0');
    tags.title = title;
    tags.album = tags.album || info.playlist_title;
    tags.album_artist = tags.artist;
    return tags;
}

function setMetadata(filePath, tags) {
    return new Promise((resolve, reject) => {
        var metaOptions = {
            'id3v2.3': true,
            'attachments': [tags.image]
        };
        ffmetadata.write(filePath, tags, metaOptions, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

function getCleanTitle(title, strip) {
    var cleaned = title.replace(/[^'"\(\)a-z0-9\_ ]/gi, '').replace(/ {2,}/g, ' ');
    if (typeof(strip) !== 'undefined')
        return cleaned.replace(strip, '').trim();
    else
        return cleaned;
}
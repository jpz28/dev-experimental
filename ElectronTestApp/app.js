var playlistDownload = require('./youtube-playlist-download.js')();

angular.module('app', [
        // 'ngMaterial',
        // 'ngAria',
        'angular-electron'
    ])
    .config(function() {});

angular.module('app').controller('mainCtrl', ($scope, $log) => {
    let vm = $scope.vm = {
        playlistUrl: 'https://www.youtube.com/playlist?list=PLpDKBmcqAQ_7SUkRuL9jfcVqZWEe-xEGb',
        album: {
            title: 'Gravity (Soundtrack)',
            artist: 'Price, Steven',
            image: 'http://screeninvasion.com/wp-content/uploads/2013/09/gravity-steven-price-soundtrack.jpg',
            genre: 'Soundtrack',
            year: '2013',
            tags: ''
        },
        isProcessing: false,
        isInfoProcessing: false
    };

    $scope.loadPlaylistInfo = loadPlaylistInfo;
    $scope.submit = submit;


    function loadPlaylistInfo(url) {
        vm.isInfoProcessing = true;
        playlistDownload.loadInfo(url).then(data => {
            data = data.length ? data[0] : data;
            vm.album.title = data.playlist_title;
            vm.album.image = data.thumbnail;
            vm.album.tags = data.tags.join(', ');
            $log.info(data);
            vm.isInfoProcessing = false;
            $scope.$apply();
        });
    }

    function submit() {
        vm.isProcessing = true;
        playlistDownload.main(vm.playlistUrl, {
            album: vm.album.title,
            artist: vm.album.artist,
            disc: 1,
            image: vm.album.image,
            genre: vm.album.genre,
            date: vm.album.year
        }, /(Simple Forms|The Naked and Famous|\(Lyric Video\))/gi).then(() => {
            vm.isProcessing = false;
        }).catch(() => {
            vm.isProcessing = false;
        });
    }
});
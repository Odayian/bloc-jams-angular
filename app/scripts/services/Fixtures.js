  /*global angular*/
 (function() {
     function Fixtures() {
         var Fixtures = {};
         
         var albumPicasso = {
             title: 'The Colors',
             artist: 'Pablo Picasso',
             label: 'Cubism',
             year: '1881',
             albumArtUrl: '/assets/images/album_covers/01.png',
             songs: [
                 { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
                 { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
                 { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
                 { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
                 { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
             ]
         };
         
         Fixtures.getAlbum = function(){
             return albumPicasso;
         };
         
         Fixtures.getCollection = function(numberOfAlbums){
            var albums = [];
                for (var i = 0; i < numberOfAlbums; i++) {
                    albums.push(angular.copy(albumPicasso));
                    console.log("im in the collection");
                }
                return albums;
         };
         
         return Fixtures;
     }
 
     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
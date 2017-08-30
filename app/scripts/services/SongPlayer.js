   /*global angular*/
   /*global buzz*/
 (function() {
     function SongPlayer(Fixtures) {
         /**
         * @desc Service returns this object, making its properties and methods public to the rest of the application
         * @type {Object}
         */         
        var SongPlayer = {};
        /**
         * @desc Stores album object from Fixtures file. 
         * @type {Object}
         */  
        var currentAlbum = Fixtures.getAlbum();
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
         /**
         * @function playSong
         * @desc Plays current song{Object} stored in currentBuzzObject. Changes playing boolean to true so html icon updates properly.
         * @param {Object} song
        */        
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
         /**
         * @function stopSong
         * @desc Stops playing current song.
         * @param {Object} song
        */  
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
            
        };
        /**
         * @function getSongIndex
         * @desc returns the index of a song from currentAlbum
         * @param {Object} song
        */ 
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
         /**
         * @desc Stores currently playing song from AlbumCtrl.albumData.songs{}
         * @type {Object}
         */        
        SongPlayer.currentSong = null;
         /**
         * @function SongPlayer.play
         * @desc Checks if currentSong matches passed @param. If false it will set a new song and play. If true, it will resume playing @param
         * @param {Object} song
        */        
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song){
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };
         /**
         * @function SongPlayer.pause
         * @desc Pauses currently playing song and sets bool to false. 
         * @param {Object} song
        */   
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
         * @function SongPlayer.previous
         * @desc Plays previous track in index. 
        */   
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
         * @function SongPlayer.next
         * @desc Plays next track in index. 
        */  
         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
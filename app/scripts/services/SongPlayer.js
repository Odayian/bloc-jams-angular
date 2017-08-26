   /*global angular*/
   /*global buzz*/
 (function() {
     function SongPlayer() {
         /**
         * @desc Service returns this object, making its properties and methods public to the rest of the application
         * @type {Object}
         */         
        var SongPlayer = {};
         /**
         * @desc Stores currently playing song from AlbumCtrl.albumData.songs{}
         * @type {Object}
         */        
        var currentSong = null;
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
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
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
         * @function SongPlayer.play
         * @desc Checks if currentSong matches passed @param. If false it will set a new song and play. If true, it will resume playing @param
         * @param {Object} song
        */        
        SongPlayer.play = function(song){
            if(currentSong !== song){
                setSong(song);
                playSong(song);
            } else if (currentSong === song){
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
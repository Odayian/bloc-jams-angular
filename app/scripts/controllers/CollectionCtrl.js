 /*global angular*/
  /*global albumPicasso*/
 (function() {
     function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);
        console.log("test");
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
         
 })();
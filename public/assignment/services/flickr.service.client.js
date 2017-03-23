/**
 * Created by Ashton on 3/22/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {

        var key = "cbcfe680a9d1c0f70a91e6d01c3577a2";
        var secret = "29db16ced0149bb0";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
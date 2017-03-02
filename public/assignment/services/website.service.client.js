/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(uid, website) {
            return $http.post("/api/user/"+uid+"/website",website);
        }

        function findAllWebsitesForUser(uid) {
            return $http.get("/api/user/"+uid+"/website");
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }

        function updateWebsite(wid, newWebsite) {
            $http.put("/api/website/"+wid, newWebsite);
        }

        function deleteWebsite(wid) {
            $http.delete("/api/website/"+wid);
        }
    }
})();
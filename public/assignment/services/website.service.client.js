/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var newWebsite = {
                "_id": (new Date()).getTime(),
                "name": website.name,
                "developerId": userId,
                "description": website.description
            };
            websites.push(newWebsite);
        }


        function findWebsitesByUser(uid) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === uid) {
                    sites.push(websites[w]);
                }
            }
            return angular.copy(sites);
        }

        function findWebsiteById(wid) {
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(wid, newWebsite) {
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;
                }
            }
        }

        function deleteWebsite(wid) {
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    websites.splice(w, 1);
                }
            }
        }

    }
})();
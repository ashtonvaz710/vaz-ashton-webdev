/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                "_id": (new Date()).getTime(),
                "name": page.name,
                "websiteId": websiteId,
                "description": page.description
            };
            pages.push(newPage);
        }

        function findPageByWebsiteId(wid) {
            var sites = [];
            for(var p in pages) {
                if (pages[p].websiteId === wid) {
                    sites.push(pages[p]);
                }
            }
            return sites;
        }

        function findPageById(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pid, newPage) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;
                }
            }
        }

        function deletePage(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    pages.splice(p, 1);

                }
            }
        }

    }
})();
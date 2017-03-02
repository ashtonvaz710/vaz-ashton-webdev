/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {

        var api = {
            "createPage": createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(wid, page) {
            return $http.post("/api/website/"+wid+"/page",page);
            // var newPage = {
            //     "_id": (new Date()).getTime(),
            //     "name": page.name,
            //     "websiteId": websiteId,
            //     "description": page.description
            // };
            // pages.push(newPage);
        }

        function findAllPagesForWebsite(wid) {
            return $http.get("/api/website/"+wid+"/page");
            // var sites = [];
            // for(var p in pages) {
            //     if (pages[p].websiteId === wid) {
            //         sites.push(pages[p]);
            //     }
            // }
            // return sites;
        }

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
            // for(var p in pages) {
            //     if(pages[p]._id === pid) {
            //         return angular.copy(pages[p]);
            //     }
            // }
            // return null;
        }

        function updatePage(pid, newPage) {
            return $http.put("/api/page/"+pid, newPage);
            // for(var p in pages) {
            //     if(pages[p]._id === pid) {
            //         pages[p].name = newPage.name;
            //         pages[p].description = newPage.description;
            //     }
            // }
        }

        function deletePage(pid) {
            return $http.delete("/api/page/"+pid);
            // for(var p in pages) {
            //     if(pages[p]._id === pid) {
            //         pages.splice(p, 1);
            //
            //     }
            // }
        }

    }
})();
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
        }

        function findAllPagesForWebsite(wid) {
            return $http.get("/api/website/"+wid+"/page");
        }

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
        }

        function updatePage(pid, newPage) {
            return $http.put("/api/page/"+pid, newPage);
        }

        function deletePage(pid) {
            return $http.delete("/api/page/"+pid);
        }

    }
})();
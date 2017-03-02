/**
 * Created by Ashton on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pid, widget) {
            return $http.post("/api/page/"+pid+"/widget",widget);
        }

        function findAllWidgetsForPage(pid) {
            return $http.get("/api/page/"+pid+"/widget");
        }

        function findWidgetById(wgid) {
            return $http.get("/api/widget/"+wgid);
        }

        function updateWidget(wgid, newWidget) {
            return $http.put("/api/widget/"+wgid,newWidget);
        }

        function deleteWidget(wgid) {
            return $http.delete("/api/widget/"+wgid);
        }
    }
})();
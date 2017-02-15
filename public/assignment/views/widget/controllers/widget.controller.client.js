/**
 * Created by Ashton on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", editWidgetController)
        .controller("NewWidgetController", newWidgetController)
        .controller("WidgetListController", widgetListController);

    function editWidgetController(WidgetService, $routeParams) {
        var vm = this;

        function init() {
            vm.widgetId = $routeParams["wgid"];
            vm.widget = WidgetService.findPageByWebsiteId(vm.widgetId);
        }
        init();
    }

    function newWidgetController(WidgetService, $routeParams) {
        var vm = this;
    }

    function widgetListController(WidgetService, $routeParams) {
        var vm = this;
    }

})();
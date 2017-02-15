/**
 * Created by Ashton on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", editWebsiteController)
        .controller("NewWebsiteController", newWebsiteController)
        .controller("WebsiteListController", websiteListController);

    function editWebsiteController(WebsiteService, $routeParams) {
        var vm = this;

        //Event Handlers:
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.userWebsites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(newWebsite) {
            WebsiteService.updateWebsite(vm.websiteId, newWebsite);
        }
        
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }

    function newWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;

        //Event Handlers:
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.userWebsites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(newWebsite) {
            WebsiteService.createWebsite(vm.userId, newWebsite);
        }
    }

    function websiteListController(WebsiteService, $routeParams) {
        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }


})();
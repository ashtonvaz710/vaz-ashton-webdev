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
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.userWebsites = websites;
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
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
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (website) {
                    vm.userWebsites = website;
                });
        }
        init();

        function createWebsite(newWebsite) {
            WebsiteService
                .createWebsite(vm.userId, newWebsite)
                .success(function (website) {
                    vm.userWebsites = website;
                })
        }
    }

    function websiteListController(WebsiteService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
        }
        init();
    }
})();
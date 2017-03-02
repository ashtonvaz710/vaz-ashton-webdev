/**
 * Created by Ashton on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", editPageController)
        .controller("NewPageController", newPageController)
        .controller("PageListController", pageListController);

    function editPageController(PageService, $routeParams) {
        var vm = this;

        //Event Handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.websitePages = pages;
                });
        }
        init();

        function updatePage(newPage) {
            PageService.updatePage(vm.pageId, newPage);
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }

    function newPageController(PageService, $routeParams) {
        var vm = this;

        //Event Handlers
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.websitePages = pages;
                })
        }

        init();

        function createPage(newPage) {
            PageService
                .createPage(vm.websiteId, newPage)
                .success(function (page) {
                    vm.websitePages = page;
                })
        }
    }

    function pageListController(PageService, $routeParams) {
        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.websitePages = pages;
                })
        }
        init();
    }

})();
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
            vm.page = PageService.findPageById(vm.pageId);
            vm.websitePages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function updatePage(newPage) {
            var page = PageService.updatePage(vm.pageId, newPage);
        }

        function deletePage() {
            var page = PageService.deletePage(vm.pageId);
        }
    }

    function newPageController(PageService, $routeParams) {
        var vm = this;

        //Event Handlers
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.websitePages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();

        function createPage(newPage) {
            PageService.createPage(vm.websiteId, newPage);
        }
    }

    function pageListController(PageService, $routeParams) {
        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.websitePages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

})();
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

        //Event Handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];
            vm.getEditorTemplateUrl = getEditorTemplateUrl;
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            console.log(type);
            return 'views/widget/templates/editors/widget-'+type+'-edit.view.client.html';
        }

        function updateWidget(newWidget) {
            WidgetService.updateWidget(vm.widgetId, newWidget);
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
        }
    }

    function newWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;

        //Event Handlers:
        vm.newHeader=newHeader;
        vm.newHTML = newHTML;
        vm.newImage = newImage;
        vm.newYouTube = newYouTube;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
        }
        init();

        function newHeader() {
            var newWidget = { "_id": "", "widgetType": "HEADER", "pageId": "", "size": "", "text": ""};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
        }

        function newHTML() {
            var newWidget = { "_id": "", "widgetType": "HTML", "pageId": "", "size": "", "text": ""};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
        }

        function newImage() {
            var newWidget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "size": "", "text": ""};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
        }

        function newYouTube() {
            var newWidget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "size": "", "text": ""};
            vm.widget = WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
        }

    }

    function widgetListController(WidgetService, $routeParams, $sce) {
        var vm = this;

        function init() {
            vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
            vm.getTrustedHtml = getTrustedHtml;
            vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            console.log(widgetType);
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();
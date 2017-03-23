/**
 * Created by Ashton on 2/8/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", editWidgetController)
        .controller("NewWidgetController", newWidgetController)
        .controller("WidgetListController", widgetListController);

    function editWidgetController(WidgetService, $routeParams, $location) {
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                })
        }
        init();

        function getEditorTemplateUrl(widgetType) {
            return 'views/widget/templates/editors/widget-'+widgetType+'-edit.view.client.html';
        }

        function updateWidget(newWidget) {
            if((newWidget.type == "HEADING" && (!newWidget.text || !newWidget.size)) ||
                (newWidget.type == "IMAGE" && !newWidget.url) ||
                (newWidget.type == "YOUTUBE" && !newWidget.url)) {
                vm.error = "Cannot update widget";
            }
            else {
                WidgetService.updateWidget(vm.widgetId, newWidget);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }

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
        vm.newText = newText;
        vm.newImage = newImage;
        vm.newYouTube = newYouTube;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
        }
        init();

        function newHeader() {
            var newWidget = { "_id": "", "type": "HEADING", "pageId": "", "size": "", "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                });
        }

        function newHTML() {
            var newWidget = { "_id": "", "type": "HTML", "pageId": "", "name": "", "size": "", "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                });
        }

        function newText() {
            var newWidget = { "_id": "", "type": "TEXT", "pageId": "", "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                });
        }

        function newImage() {
            var newWidget = { "_id": "", "type": "IMAGE", "pageId": "", "size": "", "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                });
        }

        function newYouTube() {
            var newWidget = { "_id": "", "type": "YOUTUBE", "pageId": "", "size": "", "text": ""};
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);
                });
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
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
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
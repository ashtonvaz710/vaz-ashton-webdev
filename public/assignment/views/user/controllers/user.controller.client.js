/**
 * Created by Ashton on 2/7/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController)
        .controller("RegisterController", registerController)
        .controller("ProfileController", profileController);

    function loginController(UserService, $location) {
        var vm = this;

        //Event Handlers
        vm.login = login;

        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            }
            else {
                vm.error = "Invalid username/password pair";
            }
        }
    }

    function registerController(UserService) {
        var vm = this;

        //Event Handlers
        vm.register=register;

        function register(user) {
            var registerUser = UserService.createUser(user);
        }
    }

    function profileController(UserService, $routeParams) {
        var vm = this;

        //Event Handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        
        function init() {
            vm.userId = $routeParams["uid"];
            vm.user = UserService.findUserById(vm.userId);
        }
        init();
        
        function updateUser(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user != null) {
                vm.message = "User successfully updated!";
            }
            else {
                vm.error = "Unable to update user";
            }
        }
        
        function deleteUser() {
            UserService.deleteUser(vm.userId);
        }
    }

})();
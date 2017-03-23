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
            UserService
                .findUserByCredentials(user.username, user.password)
                .success(function (user) {
                    if(user) {
                        $location.url('/user/' + user._id);
                    }
                    else {
                        vm.error = "Invalid username/password pair";
                    }
                });
        }
    }

    function registerController(UserService, $location) {
        var vm = this;

        //Event Handlers
        vm.register=register;

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.message = "Sorry, username already taken";
                })
                .error(function () {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url('/user/' + user._id);
                        })
                        .error(function () {
                            vm.message = "Sorry, could not register"
                        });
                });
        }
    }

    function profileController(UserService, $location, $routeParams) {
        var vm = this;

        //Event Handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        
        function init() {
            vm.userId = $routeParams["uid"];
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
            });
        }
        init();
        
        function updateUser(newUser) {
            UserService
                .updateUser(vm.userId, newUser)
                .success(function (user) {
                    if(user != null) {
                        vm.message = "User successfully updated!";
                    }
                    else {
                        vm.error = "Unable to update user";
                    }
                });
        }

        function deleteUser(user) {
            var answer = confirm("Are you sure you want to delete your account?");
            if(answer) {
                UserService
                    .deleteUser(vm.userId)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = "Unable to delete account";
                    });
            }
        }
    }

})();
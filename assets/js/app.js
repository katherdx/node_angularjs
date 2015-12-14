var app = angular.module('shoppingcart',[]).
 config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/home', {
        templateUrl: 'home',
        controller: homeController 
      }).
      when('/products/:productSku', {
        templateUrl: 'product.html',
        controller: homeController
      }).
      when('/cart', {
        templateUrl: 'shoppingCart.html',
        controller: homeController
      }).
      otherwise({
        redirectTo: '/home'
      })

  }]);

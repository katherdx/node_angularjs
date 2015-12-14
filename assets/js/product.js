 var myApp = angular.module('shoppingcart', []);
 myApp.directive('fileModel', ['$parse', function($parse) {
     return {
         restrict: 'A',
         link: function(scope, element, attrs) {
             var model = $parse(attrs.fileModel);
             var modelSetter = model.assign;

             element.bind('change', function() {
                 scope.$apply(function() {
                     modelSetter(scope, element[0].files[0]);
                 });
             });
         }
     };
 }]);

 myApp.service('fileUpload', ['$http', function($http) {
     this.uploadFileToUrl = function(file, uploadUrl, data) {
         var fd = new FormData();
         fd.append('file', file);

         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {
                 'Content-Type': undefined
             },
             transformRequest: function(data, headersGetter) {
                 angular.forEach(data, function(value, key) {
                     fd.append(key, value);

                 });

                 return fd;
             }
         })

         .success(function(data) {
             var da = data;
         })

         .error(function(data, status) {});
     }
 }]);

 myApp.controller('prodcutCtrl', function($scope, $http, fileUpload) {
     $scope.isProcessing1 = true;
     $scope.isProcessing = true;
     $scope.type = 1;

     $scope.$watch('PName', function() {
         $scope.test();
     });
     $scope.$watch('PPrice', function() {
         $scope.test();
     });

     $scope.test = function() {
         if ($scope.PName != undefined && $scope.PPrice) {

             if ($scope.PName.length > 0 && $scope.PPrice.length > 0 && !isNaN($scope.PPrice)) {
                 $scope.isProcessing = false;
             } else {
                 $scope.isProcessing = true;
             }
         }
     };

     $scope.list = function() {
         $http.get("/Product").success(function(response) {
             $scope.Product = response;
         });
         //$scope.list();
     };
     $scope.list();



     $scope.editProduct = function(id) {
         $scope.type = 2;
         $scope.isProcessing1 = false;
         $scope.isProcessing = true;
         var myEl = angular.element(document.querySelector('h1#action'));
         myEl.text('Update Product');
         myEl.css('height', '50px');
         myEl.css('color', 'red');

         $http.get("/Product/find/" + id).success(function(response) {

             $scope.PId = response.ProductId;
             $scope.PName = response.ProductName;
             $scope.PImage = response.ProductImage;
             $scope.PPrice = response.Price;


         });


     };

     $scope.updateProduct = function() {
         var data = {};
         data.PName = $scope.PName;
         data.PImage = $scope.PImage;
         data.PPrice = $scope.PPrice;
         data.PId = $scope.PId;


         var file = $scope.myFile;
         console.log('file is ');
         console.dir(file);

         var uploadUrl = "/Product/Update";
         $http({
                 method: 'POST',
                 url: uploadUrl,
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 },
                 data: {
                     PName: $scope.PName,
                     PPrice: $scope.PPrice,
                     PImage: $scope.myFile,
                     PId: $scope.PId,
                     PImagePath: $scope.PImage


                 },

                 transformRequest: function(data, headersGetter) {
                     var fd = new FormData();
                     angular.forEach(data, function(value, key) {
                         fd.append(key, value);
                     });

                     var headers = headersGetter();
                     delete headers['Content-Type'];

                     return fd;
                 }
             })
             .success(function(data) {

                 $scope.list();

             })
             .error(function(data, status) {

             });

     }



     $scope.createProduct = function() {

         var data = {};
         data.PName = $scope.PName;
         //data.PImage = $scope.PImage;
         data.PPrice = $scope.PPrice;
         var file = $scope.myFile;
         var uploadUrl = "/Product/Create";
         $http({
                 method: 'POST',
                 url: uploadUrl,
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 },
                 data: {
                     PName: $scope.PName,
                     PPrice: $scope.PPrice,
                     PImage: $scope.myFile

                 },

                 transformRequest: function(data, headersGetter) {
                     var fd = new FormData();
                     angular.forEach(data, function(value, key) {
                         fd.append(key, value);
                     });

                     var headers = headersGetter();
                     delete headers['Content-Type'];
                     return fd;
                 }
             })
             .success(function(data) {
                 $scope.list();

             })
             .error(function(data, status) {

             });


     };

     $scope.deleteProduct = function(id) {
         $http.get("/Product/destroy/" + id).success(function(response) {
             $scope.list();
         });
     };





 });
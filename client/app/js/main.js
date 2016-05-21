var app = angular.module("ssApp",['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{template:'This is the default Route'})
    .when('/book',{templateUrl: "../app/partials/book.html", controller: "ArdorController"})
    .when('/about', {templateUrl: "../app/partials/about.html"})
    .when('/faq',{templateUrl: "../app/partials/faq.html"})
    .when('/contact',{templateUrl: "../app/partials/contact.html"})
    .otherwise({redirectTo:'/'});
}]);

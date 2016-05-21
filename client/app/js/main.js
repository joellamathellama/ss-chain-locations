var app = angular.module("ssApp",['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',{template:'This is the default Route'})
    .when('/services',{template:'This is the services Route'})
    .when('/about',{template:'This is the about Route'})
    .when('/faq',{template:'This is the faq Route'})
    .when('/contact',{template:'This is the contact Route'})
    .otherwise({redirectTo:'/'});
}]);

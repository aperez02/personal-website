var app = angular.module('website-me', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	$routeProvider.
      when('/About', {
        templateUrl: 'partials/About.html'
      }).
      when('/Projects', {
        templateUrl: 'partials/Projects.html'
      }).
      when('/Career', {
        templateUrl: 'partials/Career.html'
      }).
      when('/Resume', {
        templateUrl: 'partials/Resume.html'
      }).
      when('/Contact', {
        templateUrl: 'partials/Contact.html'
      }).
      otherwise({
        redirectTo: '/About'
      });
});

app.controller('navController', function ($scope, $location) {
	$scope.isCollapsed = true;
	console.log("angularjs is up");

	$scope.isActive = function (viewLocation) {
		return $location.path().indexOf(viewLocation) === 0;
	};

	$scope.itemSelected = function () {
		$scope.isCollapsed = true;
	};
});
var app = angular.module('website-me', ['ngAnimate', 'ui.bootstrap']);
		
app.controller('navController', function ($scope) {
	$scope.isCollapsed = true;
	console.log("angularjs is up");
});
var app = angular.module('website-me', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	$routeProvider.
      when('/', {
      	title: 'Home',
        templateUrl: 'partials/Home.html'
      }).
      when('/About', {
        title: 'About',
        templateUrl: 'partials/About.html'
      }).
      when('/Projects', {
      	title: 'Projects',
        templateUrl: 'partials/Projects.html'
      }).
      when('/Contact', {
      	title: 'Contact',
        templateUrl: 'partials/Contact.html'
      }).
      otherwise({
        redirectTo: '/'
      });
});

app.run(function($rootScope) {
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | Alan';
        }
    };

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.page.setTitle(current.$$route.title || 'Site');
    });
});

app.controller('navController', function ($scope, $location) {
	$scope.isCollapsed = true;
	console.log("angularjs is up");

	$scope.isActive = function (viewLocation, exactMatch) {
    if (exactMatch)
    {
      return $location.path() === viewLocation;
    }
    else
    {
      return $location.path().indexOf(viewLocation) === 0;
    }
	};

	$scope.itemSelected = function () {
		$scope.isCollapsed = true;
	};
});
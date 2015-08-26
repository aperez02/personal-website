var app = angular.module('website-me', ['ngRoute', 'ui.bootstrap']);

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
        templateUrl: 'partials/Projects.html',
        controller: 'projectController'
      }).
      when('/Contact', {
      	title: 'Contact',
        templateUrl: 'partials/Contact.html'
      }).
      otherwise({
        redirectTo: '/'
      });
});

app.service('projectService', function () {
  
  function constructProject(name, description)
  {
    return {
      "name": name,
      "description": description
    };
  }

  var projects = [
    constructProject("CaseAide", "A mobile assistant for social workers"),
    constructProject("Red Folder", "Initiative designed to assist students in distress"),
    constructProject("Student Advising", "A mobile application built to assist students in planning future at CSUSB."),
    constructProject("Yeti-Vision", "An animatronic robot that utilizes machine learning to improve user interaction."),
    constructProject("Firefighting robot", "A robot who looks for and estinguish fires.")
  ];

  this.all = projects;

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


app.controller('projectController', function ($scope, projectService) {
  console.log("project controller loaded");

  // two column data that means I need array with arrays in chunks [[chunk1], [chunck2]] split the data which looks like this [data1, data2]
  function partitionProjects(projs, size)
  {
    var partitionedData = [];
    for (var i = 0; i < projs.length; i = i + size)
    {
      // slice data from (i to i+size) without going over size of array
      var limit = Math.min(i+size, projs.length);
      partitionedData.push(projs.slice(i, limit));
    }
    return partitionedData;
  }

  $scope.projects = projectService;
  $scope.partitionedProjects = partitionProjects($scope.projects.all, 2);

});
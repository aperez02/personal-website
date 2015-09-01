var app = angular.module('website-me', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	$routeProvider.
      when('/', {
      	title: 'Home',
        templateUrl: 'partials/Home.html',
        controller: 'homeController'
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
      when('/Projects/:id', {
        title: 'Project',
        templateUrl: 'partials/Project-detail.html',
        controller: 'projectDetailController'
      }).
      when('/Contact', {
      	title: 'Contact',
        templateUrl: 'partials/Contact.html',
        controller: 'contactController'
      }).
      otherwise({
        redirectTo: '/'
      });
});

app.service('projectService', function ($filter) {
  var id = 0;
  var projects = [
    constructProject("CaseAide", "A mobile assistant for social workers"),
    constructProject("Red Folder", "Initiative designed to assist students in distress"),
    constructProject("Student Advising", "A mobile application built to assist students in planning future at CSUSB."),
    constructProject("Yeti-Vision", "An animatronic robot that utilizes machine learning to improve user interaction."),
    constructProject("Firefighting robot", "A robot who looks for and estinguish fires.")
  ];

  function generateId()
  {
    return id++;
  }

  function constructProject(name, description)
  {
    return {
      "id": generateId(),
      "name": name,
      "description": description
    };
  }

  this.spotlight = function ()
  {
    return [projects[0], projects[1]];
  };

  this.all = function ()
  {
    return projects;
  };

  this.get = function (id)
  {
    return $filter('filter')(projects, function (d) {return d.id === id;})[0];
  };

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

app.controller('homeController', function ($scope, projectService) {
  // two column data that means I need array with arrays in chunks [[chunk1], [chunck2]] split the data which looks like this [data1, data2]
  function partitionData(data, size)
  {
    var partitionedData = [];
    for (var i = 0; i < data.length; i = i + size)
    {
      // slice data from (i to i+size) without going over size of array
      var limit = Math.min(i+size, data.length);
      partitionedData.push(data.slice(i, limit));
    }
    return partitionedData;
  }

  $scope.projects = projectService.spotlight();
  $scope.partitionedProjects = partitionData($scope.projects, 2);

});


app.controller('projectController', function ($scope, projectService) {
  console.log("project controller loaded");

  $scope.projects = projectService.all();

});

app.controller('projectDetailController', function ($scope, $routeParams, projectService) {
  $scope.selectedId = parseInt($routeParams.id);
  $scope.selectedProject = projectService.get($scope.selectedId);

  console.log("project detail loaded");
});

app.controller('contactController', function ($scope) {
  console.log("contact controller running");

  $scope.send = function () {
    console.log("message = ", $scope.message);
    console.log("Name = ", $scope.name);
    console.log("email = ", $scope.email);
  };
});
'use strict';

/**
 * @ngdoc function
 * @name cfwebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cfwebApp
 */
angular.module('cfwebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

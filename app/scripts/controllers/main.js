'use strict';

/**
 * @ngdoc function
 * @name cfwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cfwebApp
 */
angular.module('cfwebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

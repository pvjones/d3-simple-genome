(function() {
  angular
    .module('app')
    .controller('mainController', mainController);

  function mainController($scope) {

    $scope.barChart = 'Bar Chart'

    $scope.data = [4, 8, 15, 16, 23, 42];

    
  }
})();
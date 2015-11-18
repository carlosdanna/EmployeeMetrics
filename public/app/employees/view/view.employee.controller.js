'use strict'
var employeeApp = angular.module('employeeModule');

employeeApp.controller('viewEmployeeController', ['$scope', '$rootScope', '$state', 'EmployeeServices','AppServices', function($scope, $rootScope, $state ,EmployeeServices,AppServices){
	$scope.employees = {};
	$scope.showCreateForm = false;
	
	$scope.accesslevels = [{
		'id' : 0,
		'name' : 'Employee'
	},
	{
		'id' : 1,
		'name' : 'Manager'
	},
	{
		'id' : 2,
		'name' : 'Administrator'
	}];
	$scope.initialize = function(){
		AppServices.GetAccess().then(function(data){
			switch(parseInt(data.access)){
				case 0:
				case 1:
					$state.go('logout');
					break;
				case 2:
					break;
			}
		});
		
		EmployeeServices.GetEmployees().then(function(response){
			$scope.employees = response;
			for (var i = 0 ; i < $scope.employees.length; i++){
				$scope.employees[i].accesslevelname = showAccessLevel($scope.employees[i].accesslevel);
			}
		});
	}

	$scope.showCreate = function()
	{
		
		$scope.showCreateForm = true;
	}

	var showAccessLevel = function(number){
		
		return $scope.accesslevels[number].name
	}
	
	$scope.updateEmployee = function(employee){
		
		if($scope.showCreateForm == false)
		{
			$scope.showCreateForm = true;
			$state.go('app.employee.update', {'id': employee._id});
			
		}
	}
}]);
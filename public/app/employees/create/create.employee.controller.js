'use strict'

var employeeApp = angular.module('employeeModule');

employeeApp.controller('createEmployeeController', ['$scope','$mdToast', '$stateParams','$state','EmployeeServices','GroupServices','AppServices' , 
			function($scope,$mdToast, $stateParams,$state, EmployeeServices,GroupServices, AppServices){
	
	$scope.employee = {};
	
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

	$scope.groups= [];
	$scope.option = {

	};
	$scope.model = {};
	

	$scope.initialize = function(){
		$scope.model = {
			firstname: '',
			lastname: '',
			email: '',
			accesslevel : null,
			group: null,
			active : true
		};
		AppServices.GetAccess().then(function(data){
			switch(parseInt(data.access)){
				case 0:
				case 1:
					$state.go('logout');
					break;
				case 2:
					GroupServices.GetGroups().then(function(response){
						$scope.groups = response;
						$scope.fields = [
							{
								key: 'firstname',
								type: 'input',
								templateOptions: {
									label: 'First Name: ',
									placeholder: 'John'
								}
							},
							{
								key: 'lastname',
								type: 'input',
								templateOptions: {
									label: 'Last Name: ',
									placeholder: 'Doe'
								}
							},
							{
								key: 'email',
								type: 'input',
								templateOptions: {
									label: 'E-Mail: ',
									placeholder: 'John.Doe@synechron.com'
								}
							},
							{
								key: 'accesslevel',
								type: 'select',
								templateOptions: {
									label: 'Access Level: ',
									options: $scope.accesslevels,
									ngOptions: 'option.id as option.name for option in to.options'
								}
							},
							{
								key: 'group',
								type: 'select',
								templateOptions: {
									label: 'User Group: ',
									options: $scope.groups,
									ngOptions: 'option._id as option.name for option in to.options'	
								}

							},
							{
								key: 'active',
								type: 'checkbox',
								templateOptions: {
									label: 'Active',
									placeholder: 'Active'
								}
							}


						];
					});
					break;
			}
		});
		
		
		


	}

	$scope.saveEmployee = function(){
		
		var employee = $scope.employee;
		EmployeeServices.SaveEmployee(employee).then(function(response){
			$mdToast.show(
				$mdToast.simple()
				.content('Employee has been added successfully')
				.action('x')
				.highlightAction(false)
				.hideDelay(3000)
				.position("top right")
				.theme('success-toast')
			);
		
		
		$state.go('app.employee',	{}	,{	reload: true	});	
			
			
		});	
	}

	$scope.cancel = function(){
		$state.go('app.employee',	{}	,{	reload: true	});	
	}

}]);
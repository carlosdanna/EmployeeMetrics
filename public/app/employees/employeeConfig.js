var employeeApp = angular.module('employeeModule');


employeeApp.config(function($stateProvider){
	
	$stateProvider

		.state('app.employee',{
			url: '/employee',
			templateUrl	: 'app/employees/view/view.employee.tmpl.html',
			controller 	: 'employeeController',
		})

		.state('app.employee.create',{
			url: '/create',
			templateUrl	: 'app/employees/create/create.employee.tmpl.html',
			controller 	: 'employeeController',
		})

		.state('app.employee.update',{
			url: '/update',
			templateUrl	: 'app/employees/update/update.employee.tmpl.html',
			controller 	: 'employeeController'		
		});

});
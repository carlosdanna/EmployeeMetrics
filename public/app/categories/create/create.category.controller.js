'use strict'

var categoryApp = angular.module('categoryModule');

categoryApp.controller('createCategoryController', ['$scope', '$mdToast', '$state', '$stateParams','CategoryServices','AppServices' ,function($scope, $mdToast, $state, $stateParams, CategoryServices,AppServices){
	$scope.category = {};
	
	$scope.matrixTables = [{
		'id' : 0,
		'name' : 'Technology'
	},
	{
		'id' : 1,
		'name' : 'Training'
	},
	{
		'id' : 2,
		'name' : 'Continuous evaluation'
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
		

	}

	$scope.createCategory = function(){
		
		CategoryServices.CreateCategory($scope.category).then(function(response){
			$mdToast.show(
				$mdToast.simple()
				.content('Category updated successfully')
				.action('x')
				.highlightAction(false)
				.hideDelay(3000)
				.position("top right")
				.theme('success-toast')
			);
			$state.go('app.category',	{}	, {	reload: true });	
			
		});
	}

	$scope.cancel = function(){
		$state.go('app.category',{}, {reload: true});
	}

}]);
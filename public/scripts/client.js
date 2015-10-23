'use strict';
var getMongoModule = angular.module('getData');


//Creates the controllero for getMongo controller
getMongoModule.controller('getMongoController', ['$scope', '$filter', 'MongoModules', function($scope, $filter,MongoModules){

	//Here it will be stored all the information for people
	$scope.people= {};
	//Here it will be stored all the information about categories
	$scope.categories = {};
	//Here it will be stored all the relations between categories and people
	$scope.peopleCategories = {};
	
	//This variable will store only the parameters date and employeeId
	$scope.params = {};

	//This decides which button will show
	$scope.ShowButton=false;

	//depending on the person selected it will show all the categories that person has been graded
	$scope.getPeopleCategories = function(params){
		$scope.params = params;

		MongoModules.GetPeopleCategories(params).then(function(data){

			if (data.length == 0){
				$scope.ShowButton = true;
				for (var i=0;i<$scope.categories.length; i++)
				{
					//Creates a new people categories and set the default data for that person
					$scope.peopleCategories[i] = {};
					$scope.peopleCategories[i].employeeId = params.employeeId;
					$scope.peopleCategories[i].categoryId = $scope.categories[i]._id;		
					$scope.peopleCategories[i].Results = [	1,	1,	1,	1 	];
					$scope.resultChanged(i);
					var date = moment($scope.params.date).format("MM/DD/YYYY");
					$scope.peopleCategories[i].date = moment().toDate(date);
					
				}
			}else{
				//gets all the information for that person
				$scope.ShowButton = false;
				$scope.peopleCategories = data;
				for (var i = 0; i < $scope.categories.length; i++){
					
					$scope.resultChanged(i);
					//Creates a variable to set the date in a way that is available to read for the input box
					var date = moment($scope.peopleCategories[i].date).format("MM/DD/YYYY");
					$scope.peopleCategories[i].date = moment().toDate(date);
						
				}
			}
		});
		
	}

	//Add new documents to the people-categories collection
	$scope.addToMongo = function(){

		$scope.ShowButton = false;
		//Sends all the categories
		for(var i = 0; i<$scope.peopleCategories.length;i++){
			//Post the information stored in $scope.peoplecategories
			$scope.peopleCategories[i].date = $scope.params.date;
			MongoModules.AddToMongo($scope.peopleCategories[i]).then(function(data){
				
			});
		}
		
	}

	//Update the documents in people catagories with the new data
	$scope.updateToMongo = function(){
		
		for(var i = 0; i<$scope.peopleCategories.length;i++){
			
			//Update all the categories of the person selected by sending the most recent information 
			//stored in $scope.peopleCategories
			MongoModules.UpdateToMongo($scope.peopleCategories[i]).then(function(data){
				

			});
		}
		$scope.ShowButton = false;	
	};

	//On Index load this fucntion is called to and gets all the information from people and categories
	$scope.initialize = function(){
		MongoModules.GetPeople().then(function(response){
			$scope.people = response;
		});
		MongoModules.GetCategories().then(function(response){
			$scope.categories = response;
		});
		$scope.params.date = new Date();
		
	}

	//This function triggers if any value of a specific row changes 
	$scope.resultChanged = function(rowNumber){
		$scope.peopleCategories[rowNumber].total= parseInt($scope.peopleCategories[rowNumber].Results[0]) + //make this a function and take out the hard coding in the indexes
							parseInt($scope.peopleCategories[rowNumber].Results[1]) + 
							parseInt($scope.peopleCategories[rowNumber].Results[2]) + 
							parseInt($scope.peopleCategories[rowNumber].Results[3]);

	}


	//This function is to get the correct name for the categories
	//This function is not being used
	$scope.getCategoryName = function(id){
		for (var i = 0; i<$scope.categories.length;i++)
		{
			if(id == $scope.categories[i]._id)
				return $scope.categories[i].name;
		}
	}
}]);



//use vm instead of scope


//take the update to the side if the rows are too many

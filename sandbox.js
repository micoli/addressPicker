'use strict';

var app = angular.module('demo', ['ngSanitize', 'ui.select']);


app.controller('DemoCtrl', function ($scope, $http, $timeout, $interval) {
	var vm = this;
	$scope.postcodes=[]
	$scope.address={
		town:13100,
		postcode:"test"
	}
	$scope.onSelectCallback = function($item){
		console.log($item);
		$scope.address.postcode=$item.postcode;
		$scope.address.town=$item.name;
	}
	vm.refreshPostcode = function(search){
		if(search.length>3){
			var params = {
				q:search,
				type:'town',
				limit:10
			};
			return $http
			.get('http://api-adresse.data.gouv.fr/search/', {
				params : params
			}).then(function(response) {
				$scope.postcodes = _.map(response.data.features,function(v){
					return {
						'name' : v.properties.name,
						'postcode' : v.properties.postcode
					}
				});
			});
		}

	}
});

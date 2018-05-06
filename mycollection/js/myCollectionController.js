var app = angular.module("myCollection", []);

app.controller("myCollectionCtrl", function($scope)
{
	$scope.unblockedPacks = [];
	$scope.addedFreePacks = [];

	$scope.loadUserCollections =  function ()
	{
		let str = localStorage.getItem("lsUnblockedPacks");
		$scope.unblockedPacks = JSON.parse(str);

		str = localStorage.getItem("lsAddedFreePacks");
		$scope.addedFreePacks = JSON.parse(str);
	}

	$scope.openedPack;

	$scope.openPack = function(selectedPack)
	{
		$scope.openedPack = selectedPack;
	}
	
});
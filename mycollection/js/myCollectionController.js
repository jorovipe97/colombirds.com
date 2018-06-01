var app = angular.module("myCollection", []);

app.controller("myCollectionCtrl", function($scope)
{
	$scope.unblockedPacks = [];
	$scope.addedFreePacks = [];
	$scope.collectionsPacks = {
		1: [], // Cards for collection 1
		2: [] // Cards for collection 2
	};

	$scope.collectionCards = {
		1: 	{
				id: 1,
				name: 'A las aves de mi llano',
				description: 'Some collection description here',
				cards: [ // Pack 1
					{
						count: 0,
						imgName: 'GarzaRoja.jpg'
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'GabanPionio.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'GarzaMorena.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'GarzaPaleta.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'PatoGuire.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'zamuritas.jpg' // The image name
					}
				]
			},
		2: 	{
				id: 2,
				name: 'Noches eternas',
				description: 'Some collection description here',
				cards: [ // Pack 2
					{
						count: 0,
						imgName: 'mochuelo.jpg'
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'black-collared_swallow.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'cliff_swallow.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'collared_sand_martin.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'tree_swallow.jpg' // The image name
					},
					{
						count: 0, // The number of times user has unblocked this card
						imgName: 'white-winged_Swallow.jpg' // The image name
					}
				]
			}
	};

	$scope.loadUserCollections =  function ()
	{
		// Loads bought packs
		let str = localStorage.getItem("lsUnblockedPacks");
		if (str !== null)
		{
			$scope.unblockedPacks = JSON.parse(str);
			// Saves the cards into the correct collection
			// ES5 for-each loop
			$scope.unblockedPacks.forEach(function (pack) {
				$scope.collectionsPacks[pack.collection].push(pack);
			});	
		}		

		// Loads free packs
		str = localStorage.getItem("lsAddedFreePacks");		
		// Checks if there are saved free packs
		if (str !== null)
		{
			$scope.addedFreePacks = JSON.parse(str);
			// Saves the cards into the correct collection
			// ES5 for-each loop
			$scope.addedFreePacks.forEach(function (card) {
				$scope.collectionsPacks[card.collection].push(card);
			});			
		}

		$scope.getCardCountOfCollection(1);
		$scope.getCardCountOfCollection(2);
		console.log($scope.collectionCards);
		
	}

	$scope.openedCollection;

	$scope.whichImgCardShow = function (card)
	{
		var ret = card.imgName;

		// If this card has not been unblocked yet
		if (card.count === 0)
		{
			ret = 'not-available.png'
		}

		return ret;
	}

	$scope.openCollection = function(collection)
	{
		$scope.openedCollection = collection;
	}

	$scope.getCardCountOfCollection = function (collectionNumber)
	{
		// Iterates over the packs of collection 1
		$scope.collectionsPacks[collectionNumber].forEach(function (pack) {
			//console.log(pack);
			// Iterates all the possible cards
			for (let i = 0; i < $scope.collectionCards[collectionNumber].cards.length; i++)
			{
				for (let j = 0; j < pack.packImgs.length; j++)
				{
					//console.log();
					// console.log(pack.packImgs[j]);
					if (pack.packImgs[j] === $scope.collectionCards[collectionNumber].cards[i].imgName)
					{
						$scope.collectionCards[collectionNumber].cards[i].count++;
					}
				}
			}
		});		
	}
	
});
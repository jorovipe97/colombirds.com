var app = angular.module("collect", []);

app.controller("collectCtrl", function($scope) {
	// Demo rare codes
	$scope.goodCodes = [
		'turpial',
		'garza',
		'cucarachero'
	];

	$scope.inputCode = '';

	$scope.rarePacksInfo = [
		{
			name: 'Turpial',
			description: 'Hello, you may dont know me but i want fly over the sea :D',
			img: 'GabanPionio.jpg',
			codes: [
				'turpial',
				'turpy',
				'turpi'
			],
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		},
		{
			name: 'Garza',
			description: 'Hello, I like eat fishes in rivers, I am a bussy bird, fishes are not there for ever',
			img: 'GarzaMorena.jpg',
			codes: [
				'garza',
				'garzin'
			],
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		},
		{
			name: 'Cucarachero',
			description: 'Psss, silent please i am trying to catch some cockroach',
			img: 'PatoGuire.jpg',
			codes: [
				'cucarachero',
				'cochino'
			],
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		}
	];

	$scope.selectedRarePack;

	$scope.openRare = function(selectedPack)
	{
		$scope.selectedRarePack = selectedPack;
	}

	$scope.saveUnblockedPacks = function ()
	{
		let strobj = JSON.stringify($scope.unblockedPacks);
		// Put the object into storage
		localStorage.setItem('lsUnblockedPacks', strobj);
	}

	$scope.unblockedPacks = [];
	$scope.submitCode = function()    
	{
		// Checks if user has introduced a valid code
		// Iterates over rare packs info
		for (let i = 0; i < $scope.rarePacksInfo.length; i++)
		{
			// Iterates over the available codes for each rare pack
			for (let j = 0; j < $scope.rarePacksInfo[i].codes.length; j++)
			{
				// The user code is equal to one of the valid codes?
				if ($scope.inputCode === $scope.rarePacksInfo[i].codes[j])
				{
					console.log("Here");
					// Ensures the rare pack has not been unblocked
					for (let k = 0; k < $scope.unblockedPacks.length; k++)
					{
						if ($scope.unblockedPacks[k] === $scope.rarePacksInfo[i])
						{
							M.toast({html: 'You have already unblocked this pack'});
							return;
						}
					}

					// The unshift() method adds new items to the beginning of an array, and returns the new length.
					$scope.unblockedPacks.unshift($scope.rarePacksInfo[i]);
					$scope.saveUnblockedPacks();
					M.toast({html: 'Amazing! Your rare collection was unblocked succesfully'});
					return;
				}
			}
		}		
		M.toast({html: 'Oh, your code is incorrect :('});
	}

	$scope.loadUnblockedPacks = function ()
	{
		// Checks unblocked packs alredy exists in local storage
		let item = localStorage.getItem('lsUnblockedPacks');
		if (item !== null)
		{
			$scope.unblockedPacks = JSON.parse(item);
		}			
	}

	/* *************************************************
	**** FREE PACKS LOGIC ******************************
	****************************************************
	*/
	$scope.freePacksInfo = [
		{
			name: 'Loro',
			description: 'Hello, you may dont know me but i want fly over the sea :D',
			img: 'GabanPionio.jpg',
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		},
		{
			name: 'Chichafria',
			description: 'Hello, I like eat fishes in rivers, I am a bussy bird, fishes are not there for ever',
			img: 'GarzaMorena.jpg',
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		},
		{
			name: 'Diostede',
			description: 'Psss, silent please i am trying to catch some cockroach',
			img: 'PatoGuire.jpg',
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		}
	];
	$scope.addedFreePacks = [];

	$scope.openedPack;

	$scope.remainingDailyFreePacks;

	$scope.loadRemainingDailyFreePacks = function ()
	{
		if (localStorage.getItem('remainingDailyPacks') !== null)
		{
			$scope.remainingDailyFreePacks = localStorage.getItem('remainingDailyPacks');
		}
		else
		{
			// Resets the default limit
			localStorage.setItem('remainingDailyPacks', 2);
			$scope.remainingDailyFreePacks = 2;
		}
	}

	$scope.resetDailyFreePacks = function ()
	{
		localStorage.removeItem('remainingDailyPacks')
		location.reload();
	}
	// Resets the daily pack after 60 seconds
	setInterval($scope.resetDailyFreePacks, 60 * 1000);

	$scope.openPack = function(selectedPack)
	{
		$scope.openedPack = selectedPack;
	}

	$scope.modalName = '#no';
	$scope.addPackToMyCollection = function(pack)
	{

		for (let i = 0; i < $scope.addedFreePacks.length; i++)
		{
			// Checks if the pack wass already added to my collection
			if (pack.name === $scope.addedFreePacks[i].name)
			{
				M.toast({html: 'Sorry, You have already added this pack to your collection'});
				$scope.modalName = '#no';
				return;
			}
		}

		// Ensures there are remaining daily free packs
		if ($scope.remainingDailyFreePacks <= 0)
		{
			M.toast({html: 'Sorry, You don\'t have remaingin free packs for today'});
			return;
		}

		// One less daily free pack
		$scope.remainingDailyFreePacks--;
		localStorage.setItem('remainingDailyPacks', $scope.remainingDailyFreePacks);
		$scope.modalName = '#modal'
		// The unshift() method adds new items to the beginning of an array, and returns the new length.
		$scope.addedFreePacks.unshift(pack);
		$scope.saveAddedFreePacks();
		M.toast({html: 'Amazing! Your pack was added succesfully to your collections'});
	}

	$scope.saveAddedFreePacks = function ()
	{
		let strobj = JSON.stringify($scope.addedFreePacks);
		// Put the object into storage
		localStorage.setItem('lsAddedFreePacks', strobj);
	}


});

/* Demo codes
b1rds4us
rarebird
birds
bird
*/

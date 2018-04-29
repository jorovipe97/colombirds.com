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
			img: 'turpial1.jpg',
			codes: [
				'turpial',
				'turpy',
				'turpi'
			]
		},
		{
			name: 'Garza',
			description: 'Hello, I like eat fishes in rivers, I am a bussy bird, fishes are not there for ever',
			img: 'garza1.jpg',
			codes: [
				'garza',
				'garzin'
			]
		},
		{
			name: 'Cucarachero',
			description: 'Psss, silent please i am trying to catch some cockroach',
			img: 'cucarachero1.jpg',
			codes: [
				'cucarachero',
				'cochino'
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

});

/* Demo codes
b1rds4us
rarebird
birds
bird
*/

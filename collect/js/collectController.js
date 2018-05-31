var app = angular.module("collect", []);

app.controller("collectCtrl", function($scope) {

	/* START BOUGHT PACKS LOGIC */
	$scope.inputCode = '';

	$scope.rarePacksInfo = [
		{
			name: 'GarzaRoja',
			description: 'Pack details',
			img: 'GarzaRoja.jpg',
			collection: 1, // The collection which this pack is part of
			codes: [
				'garza_roja'
			],
			packImgs: [
				'GarzaRoja.jpg'
			]
		},
		{
			name: 'Mochuelo',
			description: 'Pack details',
			img: 'mochuelo.jpg',
			collection: 2, // The collection which this pack is port of
			codes: [
				'mochuelo'
			],
			packImgs: [
				'mochuelo.jpg'
			]
		}
	];

	$scope.selectedRarePack = null;

	// Array containing all the available cameras
	$scope.canShowToggleCamBtn = false;
	$scope.selectedCameraId = 0;

	$scope.initController = function ()
	{
		$scope.initQrScanner();
	}

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
						if ($scope.unblockedPacks[k].name === $scope.rarePacksInfo[i].name)
						{
							M.toast({html: 'You have already unblocked this pack'});
							return;
						}
					}

					// The unshift() method adds new items to the beginning of an array, and returns the new length.					
					$scope.unblockedPacks.unshift($scope.rarePacksInfo[i]);
					// Updates the view
					$scope.$apply();
					$scope.saveUnblockedPacks();
					M.toast({html: 'Amazing! You have unblocked succesfully this pack'});
					return;
				}
			}
		}
		M.toast({html: 'Oh, your code is incorrect :('});
	}

	$scope.initQrScanner = function ()
	{ 
		window.scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
		window.scanner.addListener('scan', function (content) {
			console.log(content);
			// Closes modal
			let elem = $('#modalqr');
			let instance = M.Modal.getInstance(elem);
			instance.close();

			$scope.stopScanner();

			// Sends the QR code
			$scope.inputCode = content.toLowerCase();
			$scope.submitCode();
			$scope.inputCode = null;

		});
		window.scanner.addListener('inactive', function () {
			console.log('Scanner stopped');
		})
	}
	$scope.initQrCamera = function ()
	{
		// Put this snippet inside the function that is called when is opened the QR lector
		Instascan.Camera.getCameras().then(function (_cameras) {
		window.cameras = _cameras;
		console.log('System available cameras');
		for (let i = 0; i < window.cameras.length; i++)
		{
			console.log(window.cameras[i].name);
		}
		if (window.cameras.length > 0) {
			window.scanner.start(window.cameras[$scope.selectedCameraId]);
		} else {
			console.error('No cameras found.');
		}
		}).catch(function (e) {
			console.error(e);
		});
	}

	$scope.stopScanner = function ()
	{
		window.scanner.stop();
	}

	$scope.toggleCameraId = function ()
	{
		let len = window.cameras.length;
		$scope.selectedCameraId++;
		let newId = $scope.selectedCameraId % len;
		console.log('Number of cameras: ' + len);
		window.scanner.start(window.cameras[newId]);
	}

	$scope.loadUnblockedPacks = function ()
	{

		// Checks unblocked packs alredy exists in local storage
		let item = localStorage.getItem('lsUnblockedPacks');		
		if (item !== null)
		{
			$scope.unblockedPacks = JSON.parse(item);
			console.log($scope.unblockedPacks);
		}
	}

	/* *************************************************
	**** FREE PACKS LOGIC ******************************
	****************************************************
	*/
	$scope.freePacksInfo = [		
		{
			name: 'Garza Paleta',
			description: 'Pack details',
			img: 'Pack_ALasAvesDeMiLlano.png',
			collection: 1, // The collection which this pack is part of
			packImgs: [
				'GarzaPaleta.jpg',
				'PatoGuire.jpg'
			]
		},
		{
			name: 'Tree Swallow',
			description: 'Pack details',
			img: 'Pack_NochesEternas.png',
			collection: 2, // The collection which this pack is part of
			packImgs: [
				'tree_swallow.jpg',
				'black-collared_swallow.jpg'
			]
		},
		{
			name: 'Zamuritas',
			description: 'Pack details',
			img: 'Pack_ALasAvesDeMiLlano.png',
			collection: 1, // The collection which this pack is part of
			packImgs: [
				'GabanPionio.jpg',
				'zamuritas.jpg'
			]
		},
		{
			name: 'Cliff Swallow',
			description: 'Pack details',
			img: 'Pack_NochesEternas.png',
			collection: 2, // The collection which this pack is part of
			packImgs: [
				'cliff_swallow.jpg',
				'collared_sand_martin.jpg'
			]
		},
		{
			name: 'Pionio',
			description: 'Pack details',
			img: 'Pack_ALasAvesDeMiLlano.png',
			collection: 1, // The collection which this pack is part of
			packImgs: [
				'GabanPionio.jpg',
				'GarzaMorena.jpg',
			]
		},
		{
			name: 'white-Winged Swallow',
			description: 'Pack details',
			img: 'Pack_NochesEternas.png',
			collection: 2, // The collection which this pack is part of
			packImgs: [
				'white-winged_Swallow.jpg',
				'collared_sand_martin.jpg'
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

		// Ensures there are remaining daily free packs
		if ($scope.remainingDailyFreePacks <= 0)
		{
			M.toast({html: 'Sorry, You don\'t have remaingin free packs for today'});
			$scope.modalName = '#no';
			return;
		}

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

	$scope.loadAddedFreePacks = function()
	{
		if (localStorage.getItem('lsAddedFreePacks') !== null)
		{
			let str = localStorage.getItem('lsAddedFreePacks');
			$scope.addedFreePacks = JSON.parse(str);
		}
	}


});

/* Demo codes
b1rds4us
rarebird
birds
bird
*/

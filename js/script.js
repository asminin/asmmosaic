(function () {
	this.AsmMosaic = function (s, m, w) {
		var selector = s || '.images-mosaic',
			margin = m ? 3 : 0,
			ww = w || 720,
			displayConfig = [ 	// HERE IS A SIMPLE ROOLES FOR THE MOSAIC. YOU CAN CHANGE IT ON YOUR TAISTE.
				[1], 			// if total 1 image
				[2], 			// if total 2 images
				[1, 2], 		// etc..
				[1, 3],	 		// first line - one image, second line = 3 images 
				[2, 3], 		//
				[1, 2, 3], 		// Example. Total: 6 images. First line - 1 image, second line - 2 images, third line - 3 images;
				[1, 3, 3],
				[2, 3, 3],    	
				[1, 2, 3, 3],
				[2, 1, 2, 3, 2]
			],
			in_line_1 = function (w, h) { // FOR 1 ITEMS IN LINE
				var wwn = ww;
				var k = wwn / w;
				return [k]
			},
			in_line_2 = function (w1, w2, h1, h2) { // FOR 2 ITEMS IN LINE
				var wwn = ww - margin;
				var k2 = wwn * h1 / (h2 * w1 + w2 * h1);
				var k1 = k2 * h2 / h1;
				return [k1, k2]
			},
			in_line_3 = function (w1, w2, w3, h1, h2, h3) { // FOR 3 ITEMS IN LINE
				var wwn = ww - margin*2;
				var h0 = wwn * h1 / (w1 + w2 * h1 / h2 + w3 * h1 / h3);
				var k1 = h0 / h1;
				var k2 = h0 / h2;
				var k3 = h0 / h3;
				return [k1, k2, k3];
			};

		if (typeof selector === 'string'){
			var mosaic = document.querySelector(selector)
		} else {
			mosaic = selector;
		}
	
		var	imgArray = mosaic.getElementsByTagName('img'),
			imgDimArray = [],
			mosaicStyle = displayConfig[imgArray.length - 1],
			rowLength = 0,
			currentRow = 0,
			cc = 0;
		
		// TEMP. ARRAY FOR SIZES
		mosaicStyle.forEach(function () {
			imgDimArray.push([]);
		});
		
		// CREATE LIST OF IMAGES AND HOLD ON, BEFORE THAY LOAD
		for (var i1 = 0; i1 < imgArray.length; i1++) {
			imgArray[i1].addEventListener('load', ccCb);
		}
		
		// AND CALLBACK ^
		function ccCb() {
			cc++;
			if (cc == imgArray.length) {
				//ONE MORE ITERATION WITH LOADED IMAGES
				for (var i1 = 0; i1 < imgArray.length; i1++) {
					imgDimArray[currentRow][rowLength] = [imgArray[i1].width, imgArray[i1].height];
					rowLength++;
					if (rowLength === mosaicStyle[currentRow]) {
						rowLength = 0;
						currentRow++;
					}
					imgArray[i1].width = 0;
					imgArray[i1].height = 0;
					if(margin){
						imgArray[i1].style.marginBottom = '3px'
					}
				}
				domEm();
				cc = 0;
			}
		}

		// NOW SOME MAGIC - COUNT AND APPLY NEW VALUES TO IMAGES;
		function domEm() {
			var counter = 0;
			imgDimArray.forEach(function (e, i) {
				if (e.length === 1) {
					var k = in_line_1(e[0][0], e[0][1]);
					e.forEach(function (e1, i1) {
						imgArray[counter].width = e[i1][0] * k[i1];
						imgArray[counter].height = e[i1][1] * k[i1];
						counter++;
					})
				} else if (e.length === 2) {
					k = in_line_2(e[0][0], e[1][0], e[0][1], e[1][1]);
					e.forEach(function (el, i1) {
						imgArray[counter].width = e[i1][0] * k[i1];
						imgArray[counter].height = e[i1][1] * k[i1];
						if ( (i1 == 0) && margin) {
							imgArray[counter].style.marginRight = '3px';
						}
						counter++;
					})
				} else if (e.length === 3) {
					k = in_line_3(e[0][0], e[1][0], e[2][0], e[0][1], e[1][1], e[2][1])
					e.forEach(function (el, i1) {
						imgArray[counter].width = e[i1][0] * k[i1];
						imgArray[counter].height = e[i1][1] * k[i1];
						if ( (i1 == 0 || i1 == 1) && margin) {
							imgArray[counter].style.marginRight = '3px';
						}
						counter++;
					});
				}
			});
			mosaic.classList.add('ready')
		}

	}
})();
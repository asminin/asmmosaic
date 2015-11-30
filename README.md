# Images Mosaic
Images mosaic for content publications.  


**Live Demo**  
http://asminin.github.io/asmmosaic/

### Features
- pure JS. No dependencies
- all images keep dimentions and proportions
- mosaic greed has strong square view
- config mosaic grid

### How to use
HTML
```
<div class="images-mosaic mosaic1">
	<img src="img/3.jpg" />
	<img src="img/5.jpg" />
	<img src="img/2.jpg" />
	<img src="img/7.jpg" />
	<img src="img/2.jpg" />
	<img src="img/1.jpg" />
	<img src="img/4.jpg" />
</div>
<div class="images-mosaic mosaic2">
	<img src="img/3.jpg" />
	<img src="img/5.jpg" />
	<img src="img/2.jpg" />
	<img src="img/7.jpg" />
	<img src="img/2.jpg" />
	<img src="img/1.jpg" />
	<img src="img/4.jpg" />
</div>
<!-- Do not forget to add the script :-) -->
```
JavaScript
```JavaScript
// V1
// for a single mosaic on a page, or for a multiple mosaics with different parametres
AsmMosaic('.mosaic1'); // '.mosaic1' - is a className of images wrapper
AsmMosaic('.mosaic2', true, 800); // style each mosaic on page

// V2 
// for multiple mosaic on page with same parametres
var mosaicCollection = document.getElementsByClassName('images-mosaic')
for(var i =  0; i < mosaicCollection.length; i ++ ) {
	AsmMosaic(mosaicCollection[i], true);
} 
// 
```

### Available setting
```JavaScript
AsmMosaic('.class-name', true, 800);
// 1st '.class-name' - class name or collection for mosaic wrapper ('.images-mosaic') - default;
// 2nd true - separate images in mosaic, or display it solid (false) - default
// 3rd 800 - width of Mosaic Wrapper Box in px. (720) - default
```



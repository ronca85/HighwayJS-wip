/*eslint-disable*/

import simpleParallax from 'simple-parallax-js';

export default class HBG {
	
	constructor(){

		this.bg = document.querySelector('.b-head__background');
		// console.log("penis", this.bg);
		
		this.headImage = new simpleParallax(this.bg);

		this.head();
	}
	
	head(){
		function example() {
			// console.log("penis");
		}
		example();

		function zoom(event) {
			event.preventDefault();
	
			scale += event.deltaY * 0.1;
			scaleArticle += event.deltaY * -.6667;
	
			// Restrict scale
			// scale = Math.min(Math.max(1, scale), 4);
	
			console.log("scale", scale)

			if ( scale <= 0 ) scale = 0;
			if ( scaleArticle >= 0 ) scaleArticle = 0;
	
			// Apply scale transform
			zoomImg.style.transform = `translate3d(0, ${scale}px, 0)`;
			scrollableArticle.style.transform = `translate3d(0, ${scaleArticle}px, 0)`;
		}

		let scale = 1;
		let scaleArticle = 1;
		const el = document.querySelector('.a-main');
		const zoomImg = document.querySelector('.b-head__background');
		const scrollableArticle = document.querySelector('.scrollable');
		scrollableArticle.onwheel = zoom;

	}

};


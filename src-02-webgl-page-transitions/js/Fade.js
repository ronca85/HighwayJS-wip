/*eslint-disable*/

import Highway from '@dogstudio/highway';
import {TimelineMax} from "gsap";

const charming = require("charming");

import A from './canvas/app';

const antoni = new A();



class Fade extends Highway.Transition {

	out({from, done}){ // hide previous page
		
		new TimelineMax({ onComplete: done })
			.to(from, 0.5, {opacity: 0});
	}

	in({from, to, done}){ // show clicked page

		let h1 = to.querySelector("h1");
		charming(h1); // charming is a plugin that wraps each letter in a <span>

		let goto = to.getAttribute("data-router-view");
		antoni.goto(goto, 0.5);

		let spans = [...h1.querySelectorAll("span")];
		console.log(spans);

		from.remove();

		new TimelineMax({ onComplete: done })
			// .fromTo(to, 0.5, {opacity: 0}, {opacity: 1});
			.staggerFromTo(spans, 0.5, {opacity: 0, y: 100}, {opacity: 1, y: 0}, 0.05);
			// staggerFromTo targets arrays, that's why we set spans, not to as before
	}

}

export default Fade;


/*eslint-disable*/

import Highway from '@dogstudio/highway';
import {TimelineMax} from "gsap";
// import A from './canvas/shader-container';
// const bgTransition = new A();
const charming = require("charming");
import HBG from './headBG';

class pageTransitions extends Highway.Transition {

	out({from, done}){ // hide previous page

		let plahta = from.querySelector(".main-overlay");
		
		new TimelineMax({ onComplete: done })
			.fromTo(plahta, 0.55, { x : "-100%", ease : Power3.easeIn }, { x : "0%", ease : Power3.easeOut });
			// .to(from, 0.5, {opacity: 0});
	}

	in({from, to, done}){ // show clicked pageraps each letter in a <span>

		let goto = to.getAttribute("data-router-view");
		// bgTransition.goto(goto, 0.5);

		let plahta = to.querySelector(".main-overlay");
		let pageHeading = to.querySelector(".js-h-title");
		charming(pageHeading);
		let spans = [...pageHeading.querySelectorAll("span")];

		from.remove();

		document.querySelector(".b-head .no-mobile").play();
		new HBG(); // allow scroll

		new TimelineMax({ onComplete : done })
			.fromTo(plahta, 0.55, { x : "0%", ease : Power3.easeIn }, { x : "100%", ease : Power3.easeOut })
			.staggerFromTo(spans, 0.5, {opacity: 0, y: 100}, {opacity: 1, y: 0}, 0.05);

		// new TimelineMax({ onComplete : done })
		// 	.fromTo(".js-h-form", 0.5, {opacity: 0, y: 100}, {opacity: 1, y: 0});
	}

}

export default pageTransitions;


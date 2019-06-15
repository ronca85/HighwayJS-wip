/*eslint-disable*/

import Highway from '@dogstudio/highway';
import {TimelineMax} from "gsap";



class Fade extends Highway.Transition {

	out({from, done}){ // hide previous page
		
		new TimelineMax({ onComplete: done })
			.to(from, 0.5, {opacity: 0});

		// done();
	}

	in({from, to, done}){ // show clicked page
		from.remove();

		new TimelineMax({ onComplete: done })
			.fromTo(to, 0.5, {opacity: 0}, {opacity: 1});

		// done();
	}

}

export default Fade;


/*eslint-disable*/

import Highway from '@dogstudio/highway';
import {TimelineMax} from "gsap";



class Fade extends Highway.Transition {

	out({from, done}){ // hide previous page
		console.log("out..", from);
		done();
	}

	in({from, to, done}){ // show clicked page
		console.log("in...", from, to);
		done();
	}

}

export default Fade;


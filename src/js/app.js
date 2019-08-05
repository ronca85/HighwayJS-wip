/*eslint-disable*/

import Highway from '@dogstudio/highway';
import pageTransitions from './pageTransitions';
import HBG from './headBG';



const H = new Highway.Core({
	transitions: {
		default: pageTransitions
	}
});



new HBG(); // allow scroll



document.querySelector(".b-head .no-mobile").play();



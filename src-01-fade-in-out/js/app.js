import Highway from '@dogstudio/highway';
import Fade from './Fade';



// Call Highway.Core once.
// Relate transitions to pages with the label of the `data-router-view`.
const H = new Highway.Core({
	transitions: {
		default: Fade
	}
});


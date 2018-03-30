import inView from 'in-view';


function isMobile(){
    // returns false if the side-saddle arrangement is active; For now, we'll just make it true
    return window.innerWidth < 850 ? true : false;
}


window.addEventListener('DOMContentLoaded', function(e){
		console.log('DOMContentLoaded');
		console.log('We are on mobile?', isMobile());
	// Only do this if we are desktop+
	if (!isMobile()){

	  	// Let's set our lazyload offset to roughly half the viewport height. 
	  	// This will trigger our waypoints about halfway up the screen.
	    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    console.log('viewportHeight = ', viewportHeight);
	    inView.offset(viewportHeight/2);
	    
	    // Let's do things with the map
	    inView('.vignette')
	        .on('enter', el => {
	     		const vignetteToShow = el.getAttribute('id');
	
	        	// Remove highlight from current capsule
	        	if (document.querySelector(`.capsule--active`) !== null) document.querySelector(`.capsule--active`).classList.remove('capsule--active');
	        	
	        	// highlight the capsule
	        	document.querySelector(`.capsule[data-vignette="${vignetteToShow}"]`).classList.add('capsule--active');
	            
	            console.log("Reached a new vignette >>", el);
	        });
	}

	if (document.getElementById('comments-button')){
		// If there is a comments button, then init comments on click. Otherwise, skip it. 
		document.getElementById('comments-button').addEventListener('click', function(e){
		    document.querySelector(`.trb_cm_so[data-role="cm_container"]`).style.maxHeight = "10000000vh";
		    (window.registration || (registration = [])).push('solidopinion');
		}, false);
	}
}); // End DOMContentLoaded
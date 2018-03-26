import inView from 'in-view';

function isMobile(){
    // returns false if the side-saddle arrangement is active; For now, we'll just make it true
    return true;
    return window.innerWidth < 850 ? true : false;
}



window.addEventListener('DOMContentLoaded', function(e){
	console.log('DOMContentLoaded');


	// Only do this if we are desktop+
	if (!isMobile()){
	  	// Let's set our lazyload offset to roughly half the viewport height. 
	  	// This will trigger our waypoints about halfway up the screen.
	    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    console.log('viewportHeight = ', viewportHeight);
	    inView.offset(viewportHeight/2);
	    
	    // Let's do things with the map
	    inView('.map-waypoint')
	        .on('enter', el => {
	        	const mapLayerToShow = el.getAttribute('id');
	
	        	// If there already is a map layer showing, then hide it.
	        	if (document.querySelector(`.map-layer--visible`) !== null) document.querySelector(`.map-layer--visible`).classList.remove('map-layer--visible');
	        	
	        	// Make the desired map layer visible
	        	document.querySelector(`.map-layer--${mapLayerToShow}`).classList.add('map-layer--visible');
	            
	        	// Remove highlight from current map waypoint in the text
	        	if (document.querySelector(`.map-waypoint--visible`) !== null) document.querySelector(`.map-waypoint--visible`).classList.remove('map-waypoint--visible');
	
	        	// Add highlight to current waypoont
	        	el.classList.add('map-waypoint--visible');
	
	            console.log("Reached a map waypoint >>", el.getAttribute('id'));
	        });
	}


	if (document.getElementById('comments-button')){
		// If there is a comments button, then init comments on click. Otherwise, skip it. the sidebars 
		// have no comments thus no comments button.
		document.getElementById('comments-button').addEventListener('click', function(e){
		    document.querySelector(`.trb_cm_so[data-role="cm_container"]`).style.maxHeight = "10000000vh";
		    (window.registration || (registration = [])).push('solidopinion');
		}, false);
	}
}) // End DOMCOntentLoaded event
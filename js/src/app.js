import inView from 'in-view';
import MultilineChart from './multiline-chart.js';
import BarChart from './bar-chart.js';
import {format, curveBasisOpen} from 'd3';
import Swiper from 'swiper.min.js';


function isMobile(){
    // returns false if the side-saddle arrangement is active; For now, we'll just make it true
    return window.innerWidth < 850 ? true : false;
}


window.addEventListener('load', function(e){

	// -------------------------
	// Load the cumulative chart
	// -------------------------

	console.log("window is loaded");
	const 	innerMargins = { top:15, right:15 ,bottom:30, left:40 },
			incomeMargins = { top:15, right:15 ,bottom:30, left:45 },
			lineWeight = 6,
			lineColors = ['#aaa', 'black'],
			curve = false;

	const incomeChart27 = new BarChart({
	    container: document.querySelector("#income-east-garfield-park-27"),
	    dataset: incomeData, // Will be charted AS IS. All transforms, etc., should be done by now.
	    innerMargins:incomeMargins, // This will inset the chart from the base container (which should be controlled by CSS)
	    barFillColor:lineColors[1], // must be a valid color syntax, #HEX, rgba(), etc.
	    xAxis:{
	        dataAttribute: "year", // The key of the x attribute in the data set
	        axisFormatter: format("d"),
	        minValue:false,
	        maxValue:false, // Useful for making multiple charts match in scale
	        showAxis: true,
	        removeAxisDomain: true,// the straight line with the axis
	        removeAxisTicks: true, // Set to true to remove the lines (not numbers)
	        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
	    },
	    yAxis:{
	        dataAttribute:"east_garfield_27", // The key of the y attribute in the data set
	        axisFormatter:format("$,"),
	        minValue:0,
	        maxValue:40000, // Useful for making multiple charts match in scale
	        showAxis: true,
	        removeAxisDomain: true, // the straight line with the axis
	        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
	        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
	    },
	    meta:{
	        headline:false, // You must make room for this in the margins
	        xAxisLabel: false,
	        yAxisLabel: false,
	        sources: false, // You must make room for this in the margins
	        credit: false // You must make room for this in the margins
	    }
	});

	const incomeChart29 = new BarChart({
    container: document.querySelector("#income-north-lawndale-29"),
    dataset: incomeData, // Will be charted AS IS. All transforms, etc., should be done by now.
    innerMargins:incomeMargins, // This will inset the chart from the base container (which should be controlled by CSS)
    barFillColor:lineColors[1], // must be a valid color syntax, #HEX, rgba(), etc.
    xAxis:{
        dataAttribute: "year", // The key of the x attribute in the data set
        axisFormatter: format("d"),
        minValue:false,
        maxValue:false, // Useful for making multiple charts match in scale
        showAxis: true,
        removeAxisDomain: true,// the straight line with the axis
        removeAxisTicks: true, // Set to true to remove the lines (not numbers)
        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
    },
    yAxis:{
        dataAttribute:"north_lawndale_29", // The key of the y attribute in the data set
        axisFormatter:format("$,"),
        minValue:0,
        maxValue:40000, // Useful for making multiple charts match in scale
        showAxis: true,
        removeAxisDomain: true, // the straight line with the axis
        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
    },
    meta:{
        headline:false, // You must make room for this in the margins
        xAxisLabel: false,
        yAxisLabel: false,
        sources: false, // You must make room for this in the margins
        credit: false // You must make room for this in the margins
    }
	});

	const populationChart27 = new MultilineChart({
	    container: document.querySelector("#east-garfield-park-27"),
	    dataset: populationData, // Will be charted AS IS. All transforms, etc., should be done by now.
	    innerMargins:innerMargins, // This will inset the chart from the base container (which should be controlled by CSS)
	    lineColors:lineColors, // must be a valid color syntax, #HEX, rgba(), etc.
		lineWeights: [lineWeight,lineWeight],
		curve: curve,
		highlightLastPoint: [true, true],
	    xAxis:{
	        dataAttribute:["year"], // The key of the x attribute in the data set
	        axisFormatter: format("d"),
	        minValue:false,
	        maxValue:false, // Useful for making multiple charts match in scale
	        showAxis: true,
	        removeAxisDomain: true,// the straight line with the axis
	        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
	        totalTicks: 10 // Remember, with d3 axes, this number is a suggestions
	    },
	    yAxis:{
	        dataAttributes:["27_white_per", "27_black_per"], // The key of the y attribute in the data set
	        axisFormatter:format(".0%"),
	        minValue:0,
	        maxValue:1, // Useful for making multiple charts match in scale
	        showAxis: true,
	        removeAxisDomain: true, // the straight line with the axis
	        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
	        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
	    },
	    meta:{
	        headline:"East Garfield Park population", // You must make room for this in the margins
	        xAxisLabel: "Decade",
	        yAxisLabel: "Percentage",
	        sources: "Sources", // You must make room for this in the margins
	        credit: false // You must make room for this in the margins
	    }
	});

	const populationChart29 = new MultilineChart({
	    container: document.querySelector("#north-lawndale-29"),
	    dataset: populationData, // Will be charted AS IS. All transforms, etc., should be done by now.
	    innerMargins:innerMargins, // This will inset the chart from the base container (which should be controlled by CSS)
	    lineColors:lineColors, // must be a valid color syntax, #HEX, rgba(), etc.
		lineWeights: [lineWeight,lineWeight],
		curve: curve,
		highlightLastPoint: [true, true],
	    xAxis:{
	        dataAttribute:["year"], // The key of the x attribute in the data set
	        axisFormatter: format("d"),
	        minValue:false,
	        maxValue:false, // Useful for making multiple charts match in scale
	        showAxis: true,
	        removeAxisDomain: true,// the straight line with the axis
	        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
	        totalTicks: 10 // Remember, with d3 axes, this number is a suggestions
	    },
	    yAxis:{
	        dataAttributes:["29_white_per","29_black_per"], // The key of the y attribute in the data set
	        axisFormatter:format(".0%"),
	        minValue:0,
	        maxValue:1, // Useful for making multiple charts match in scale
	        showAxis: true,
	        removeAxisDomain: true, // the straight line with the axis
	        removeAxisTicks: false, // Set to true to remove the lines (not numbers)
	        totalTicks: 5 // Remember, with d3 axes, this number is a suggestions
	    },
	    meta:{
	        headline:"North Lawndale population", // You must make room for this in the margins
	        xAxisLabel: "Decade",
	        yAxisLabel: "Percentage",
	        sources: "Sources", // You must make room for this in the margins
	        credit: false // You must make room for this in the margins
	    }
	});


    const swipers = [].slice.call(document.querySelectorAll('.swiper-container'));
    if (swipers.length > 0){
        let slideshows={};
        swipers.forEach((swiper, index) => {
            swiper.setAttribute('id', `swiper${index}`);
            //if there are swipers, iterate over the containers array and init them.
            slideshows[`swiper${index}`] = new Swiper('.swiper-container', {
                speed: 400,
                slidesPerView: 1,
                centeredSlides: true,
                // pagination: `#swiper${index} .swiper-pagination`,
                nextButton: `#swiper${index} .swiper-button-next`,
                prevButton: `#swiper${index} .swiper-button-prev`,
                // scrollBar: '.swiper-scrollbar',
                paginationClickable: true,
                spaceBetween: 30,
                loop: true,
                // Disable preloading of all images
                // preloadImages: false,
                // // Enable lazy loading
                // lazyLoading: true,
                // watchSlidesProgress:true,
                // watchSlidesVisibility:true
            }); 

            

            document.querySelector(`.swiper-button-next`).addEventListener('click', e => {
                slideshows[`swiper${index}`].slideNext();
            });

            document.querySelector(`.swiper-button-prev`).addEventListener('click', e => {
                slideshows[`swiper${index}`].slidePrev();
            });         
        });
    }

});

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1].toUpperCase();}
       }
       return(false);
}

window.addEventListener('DOMContentLoaded', function(e){
	console.log('DOMContentLoaded');
	console.log('We are on mobile?', isMobile());

	if (getQueryVariable('batman') == "TRUE"){
		document.querySelector('.first-slide--photo').classList.add('batman');
	}

	// Only do this if we are desktop+
	if (!isMobile()){
	  	// Let's set our lazyload offset to roughly half the viewport height. 
	  	// This will trigger our waypoints about 40% up the screen.
	    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    console.log('viewportHeight = ', viewportHeight);
	    inView.offset(viewportHeight * .4);
	    
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
	
	// When the audio toggle button is clicked, then kill the audio.
	document.querySelector('#audio-toggle').addEventListener('click', function(e){
		const aud = document.querySelector('#ambient');
		aud.pause();
	})
	    // Also, let's lazyload the images
	 //    const lazyLoad = inView('.image--lazy img');
		// lazyLoad.offset(-500);
	 //    lazyLoad.on('enter', el => {
	 //        	const 	imageContainerWidth = el.parentNode.offsetWidth,
	 //        			src = el.dataset.fullResSrc.replace('/650', `/${Math.floor(imageContainerWidth)}`);
	 //            console.log('adding', src);
	 //            el.setAttribute('src', src);
	 //        });

	if (document.getElementById('comments-button')){
		// If there is a comments button, then init comments on click. Otherwise, skip it. the sidebars 
		// have no comments thus no comments button.
		document.getElementById('comments-button').addEventListener('click', function(e){
		    document.querySelector(`.trb_cm_so[data-role="cm_container"]`).style.maxHeight = "10000000vh";
		    (window.registration || (registration = [])).push('solidopinion');
		}, false);
	}
}) // End DOMCOntentLoaded event
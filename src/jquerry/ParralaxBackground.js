
import $ from 'jquery';



const ParralaxBackground = () => {


$(window).scroll(function(e){
	parallax();
});

function parallax(){
	var scrolled = $(window).scrollTop();
	$('.background').css('top',-(scrolled*0.2)+'px');
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

  
$(document).ready(function(){


	
async function StartCss(){
	await sleep(50);
	$(".dropdown-content ").css({"transition": "all 0.4s ease"});
  }
  StartCss();
});


}


export default ParralaxBackground;

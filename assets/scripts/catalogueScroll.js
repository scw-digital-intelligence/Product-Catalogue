// Identifies the elements to be scrolled
const chevronsRight = document.getElementsByClassName('scroll-right-arrow');
const chevronsLeft = document.getElementsByClassName('scroll-left-arrow');

function addScrollArrows(){
    for(i = 0; i < chevronsRight.length; i++){
        let arrow = chevronsRight[i]
        // function to scroll the catalogue elements on click
        arrow.onmousedown = function(){
            this.parentElement.previousSibling.scrollLeft += 200;
        }
    }

    for(i = 0; i < chevronsLeft.length; i++){
        let arrow = chevronsLeft[i]
        // function to scroll the catalogue elements on click
        arrow.onmousedown = function(){
            this.parentElement.nextSibling.scrollLeft -= 200;
        }
    }    
}


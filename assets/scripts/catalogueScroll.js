// Identifies the elements to be scrolled
const chevronsRight = document.getElementsByClassName('scroll-right-arrow');
const chevronsLeft = document.getElementsByClassName('scroll-left-arrow');

function addScrollArrows(){
    for(i = 0; i < chevronsRight.length; i++){
        let arrow = chevronsRight[i]
        // function to scroll the catalogue elements on click
        arrow.onmousedown = function(){
            // let scrollAmount = this.parentElement.parentElement.scrollWidth;
            // this.parentElement.previousSibling.scrollLeft += (scrollAmount * 0.35);
            let scrollAmount = this.parentElement.parentElement.querySelector('.content-box').getBoundingClientRect().width;
            
            if(scrollAmount > 300){
                this.parentElement.previousSibling.scrollLeft += (scrollAmount + (scrollAmount*0.22));
            } else if(scrollAmount > 250) {
                this.parentElement.previousSibling.scrollLeft += (scrollAmount + (scrollAmount*0.14));
            } else {
                this.parentElement.previousSibling.scrollLeft += (scrollAmount + (scrollAmount*0.0786));
            }
            
        }
    }

    for(i = 0; i < chevronsLeft.length; i++){
        let arrow = chevronsLeft[i]
        // function to scroll the catalogue elements on click
        arrow.onmousedown = function(){
            // let scrollAmount = this.parentElement.parentElement.scrollWidth;
            // this.parentElement.nextSibling.scrollLeft -= (scrollAmount * 0.35);
            let scrollAmount = this.parentElement.parentElement.querySelector('.content-box').getBoundingClientRect().width;;            
            
            if(scrollAmount > 300){
                this.parentElement.nextSibling.scrollLeft -= (scrollAmount + (scrollAmount*0.22));
            } else if(scrollAmount > 250) {
                this.parentElement.nextSibling.scrollLeft -= (scrollAmount + (scrollAmount*0.14));
            } else {
                this.parentElement.nextSibling.scrollLeft -= (scrollAmount + (scrollAmount*0.0786));
            }
        }
    }    
}


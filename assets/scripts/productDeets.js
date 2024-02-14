// function to update element properties to match clicked product
function makeProduct(){
    // update banner text
    bannerText = document.getElementById("product-banner-text")
    bannerText.textContent = `${product.Name}`

    // update banner image
    bannerImage = document.getElementById("hero-product")
    bannerImage.style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.392), rgba(0, 0, 0, 0.392)), url(${product.Image})`

    // update product description
    titleDesc = document.getElementById("product-desc")
    titleDesc.textContent = `${product.Description}`

    // updating links for sharing on LinkedIn and Twitter
    linkedinURL = document.getElementById("linkedin-btn")
    linkedinURL.setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`)     

    twitterURL = document.getElementById("twitter-btn")
    twitterURL.setAttribute("href", `http://twitter.com/share?text=${product.Description}&url=${window.location.href}&hashtags=NHS,SCWCSU,HealthcareAnalytics`) 
}
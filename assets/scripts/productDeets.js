const product = JSON.parse(localStorage.getItem("useThisProduct") || "[]");
const imgURL = product.Image.substring(product.Image.lastIndexOf("\\") + 1);

// function to update element properties to match clicked product
function makeProduct(){
    // declaring required variables
    let bannerText, bannerImage, titleDesc, linkedinURL, twitterURL;
    let bannerTextParent, titleDescParent, carouselInner;

    // add banner text
    bannerText = document.createElement("h1");
    bannerText.setAttribute("id","product-banner-text");
    bannerText.textContent = `${product.Name}`;

    bannerTextParent = document.getElementById("hero-content-product");
    bannerTextParent.appendChild(bannerText);

    // update banner image
    bannerImage = document.getElementById("hero-product");
    // bannerImage.style.backgroundImage =  `linear-gradient(rgba(0, 0, 0, 0.392), rgba(0, 0, 0, 0.392)), url(${product.Image})`;
    bannerImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.392), rgba(0, 0, 0, 0.392)), url(./assets/images/img/products/"+ imgURL + ")"

    // adding product description
    titleDesc = document.createElement("p");
    titleDesc.setAttribute("id","product-desc");
    titleDesc.textContent = `${product.Description}`;

    titleDescParent = document.getElementById("product-title-container");
    titleDescParent.appendChild(titleDesc);

    // adding links for sharing on LinkedIn and Twitter
    linkParams = product.Name.replace(/\s+/g, "-").toLowerCase();

    linkedinURL = document.getElementById("linkedin-btn");
    linkedinURL.setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&${linkParams}`)  ;   

    twitterURL = document.getElementById("twitter-btn")
    twitterURL.setAttribute("href", `http://twitter.com/share?text=${product.Description}&url=${window.location.href}&${linkParams}&hashtags=NHS,SCWCSU,HealthcareAnalytics`);

    // contextually adding carousel
    carouselInner = [].slice.call(document.getElementById("carousel-inner").getElementsByTagName('img'),0);
    carouselInner[0].setAttribute("src",`${product.Carousel_Images_1}.svg`)
    carouselInner[1].setAttribute("src",`${product.Carousel_Images_2}.svg`)
    carouselInner[2].setAttribute("src",`${product.Dummy_Product_URL}.svg`)  
}
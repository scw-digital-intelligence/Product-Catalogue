// records any parameters in the URL used to access the page
const urlParams = new URLSearchParams(window.location.search);

// uses parameters to identify products, returns from local storage or loads default
function loadProductData() {
    if (urlParams.size > 0) {
        let prodID = urlParams.get('id')
        for(let i = 0; i < portfolios.length; i++) {
            let portfolio = portfolios[i]
            for (let x = 0; x < (portfolio.Products.length); x++){
                if(portfolio.Products[x].ID == prodID){
                    return portfolio.Products[x];
                }
            }      
        }
    } else if (localStorage.getItem("useThisProduct") !== null){
        return JSON.parse(localStorage.getItem("useThisProduct"));
    } else {
        for(let i = 0; i < portfolios.length; i++) {
            let portfolio = portfolios[i]
            for (let x = 0; x < (portfolio.Products.length); x++){
                if(portfolio.Products[x].ID == "117"){
                    return portfolio.Products[x];
                }
            }      
        }
    }
}

const product = loadProductData()


const imgURL = product.Image.substring(product.Image.lastIndexOf("\\") + 1);
const imgCar1 = product.Carousel_Images_1.substring(product.Image.lastIndexOf("\\") + 1);
const imgCar2 = product.Carousel_Images_2.substring(product.Image.lastIndexOf("\\") + 1);
const imgCar3 = product.Dummy_Product_URL.substring(product.Image.lastIndexOf("\\") + 1);

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
    if(product.Image.includes("products")) {
        bannerImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.292), rgba(0, 0, 0, 0.292)), url(./assets/images/img/products/" + imgURL + ")";
    } else {
        bannerImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.292), rgba(0, 0, 0, 0.292)), url(" + product.Image + ")";
    }
    
    // adding product description
    titleDesc = document.createElement("p");
    titleDesc.setAttribute("id","product-desc");
    titleDesc.textContent = `${product.Description}`;

    titleDescParent = document.getElementById("product-title-container");
    titleDescParent.appendChild(titleDesc);

    // updating meta tags of product page
    document.title = product.Name;
    document.querySelector('meta[name="description"]').setAttribute("content", product.Description);
    document.querySelector('meta[property="og:description"]').setAttribute("content", product.Description);
    document.querySelector('meta[property="og:title"]').setAttribute("content", product.Name);
    document.querySelector('meta[property="og:site_name"]').setAttribute("content", `NHS SCW Analytics - ${product.Name}`);
    document.querySelector('meta[name="twitter:site"]').setAttribute("content", `NHS SCW Analytics - ${product.Name}`);

    // adding links for sharing on LinkedIn and Twitter
    // linkParams = product.Name.replace(/\s+/g, "-").toLowerCase();
    // linkParams = `id=${product.ID}&name=${product.Name.replace(/\s+/g, "-").toLowerCase()}`;
    linkParams = `id=${product.ID}`;

    linkedinURL = document.getElementById("linkedin-btn");
    linkedinURL.setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}?${linkParams}`)  ;   

    twitterURL = document.getElementById("twitter-btn")
    twitterURL.setAttribute("href", `http://twitter.com/share?text=${product.Description}&url=${window.location.href}?${linkParams}&hashtags=NHS,SCWCSU,HealthcareAnalytics`);

    // contextually adding carousel
    carouselInner = [].slice.call(document.getElementById("carousel-inner").getElementsByTagName('img'),0);

    if(product.Carousel_Images_1.includes("products")) {
        carouselInner[0].setAttribute("src",`./assets/images/img/products/${imgCar1}`)
        carouselInner[1].setAttribute("src",`./assets/images/img/products/${imgCar2}`)
        carouselInner[2].setAttribute("src",`./assets/images/img/products/${imgCar3}`)
    } else {
        carouselInner[0].setAttribute("src",`${product.Carousel_Images_1}`)
        carouselInner[1].setAttribute("src",`${product.Carousel_Images_2}`)
        carouselInner[2].setAttribute("src",`${product.Dummy_Product_URL}`)
    }
}
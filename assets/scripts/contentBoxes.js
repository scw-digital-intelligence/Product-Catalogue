window.onload = function(){
    recentBoxes();
}

// function to generate content boxes
function contentBoxes(parent, img_source, link_text,link_href, text,i) {
    // creating main box
    let spec_class = "content-box".concat("-",i)
    let box = document.createElement("div");
    box.setAttribute("class", "content-box", spec_class)

    // creating product image box
    let pib = document.createElement("div");
    pib.setAttribute("class", "product-img-box");

    // adding image to product image box
    let image = document.createElement("img");
    image.setAttribute("class", "product-img");
    image.setAttribute("src", img_source);
    pib.appendChild(image);

    // creating h4 with link
    let title = document.createElement("h4");
    let link = document.createElement("a");
    link.setAttribute("href", link_href)
    link.textContent = `${link_text}`
    title.appendChild(link)

    // creating text
    let para = document.createElement("p")
    para.textContent = `${text}`

    // combining with main box
    box.appendChild(pib)
    box.appendChild(title)
    box.appendChild(para)

    // adding box to parent element
    parent.appendChild(box)
}

// adding boxes to landing page
function recentBoxes(){
    for (let i = 0; i < 3; i++) {
        let targetElement = document.getElementsByClassName("content-container-row");
        let text = "Duis pulvinar purus non tellus vestibulum, ac porta dui laoreet. Integer eu tellus scelerisque, placerat arcu ut massa."
        let link_text = "Lorem ipsum dolor sit amet"
    
        contentBoxes(targetElement[0], "./assets/images/img/product_box.svg", link_text, "#", text, String(i))
        contentBoxes(targetElement[1], "./assets/images/img/product_box.svg", link_text, "#", text, String(i))
    }
}

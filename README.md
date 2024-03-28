# E-Catalogue Redesign
This repository contains all the code required to generate and deploy a new version of the new Digital Intelligence catalogue.

When working on this project, make sure you have opened the root folder [as a workspace](https://code.visualstudio.com/docs/editor/workspaces) in VS Code (or the equivalent in your code editor/IDE of choice).

# Table of Contents
1. [High - level technical components](#high-level-technical-components)
2. [Code notes](#code-notes)
    + [Conventions](#conventions)
    + [T-SQL](#tsql)
    + [Python](#python)
        - [Packages](#python-packages)
            + [Os](#Os)
            + [Office 365 REST API](#office365-rest)
            + [Pillow](#pillow)
    + [Javascript](#javascript)
        - [Libraries](#javascript-libraries)
            + [jQuery](#jquery)
            + [Bootstrap](#bootstrap)
            + [Font Awesome](#font-awesome)
3. [Script specifics](#script-specifics)
    + [data_extractor.py](#dataextractor)
    + [catalogeScroll.js](#cataloguescroll)
    + [contentBoxes.js](#contentboxes)
    + [navFunctions.js](#navfunctions)
    + [productDeets.js](#productdetails)
    + [showFilters.js](#showfilters)
    + [stickyProductSearch.js](#stickyproductsearch)

## High - level technical components <a name="high-level-technical-components"></a>
There are four languages used in the build of this product: HTML, CSS, JavaScript and Python.

HTML, CSS and JavaScript fulfill the roles they always do in web development: Structure, styling and scripting respectively. Animations and effects are carried out using a combination of CSS and JavaScript where required. Additionally, responsive resizing for the site is handled in CSS using media queries.

For this project, Python serves two purposes: 
+ Firstly, as a bridge between the local SCW servers and the website. It connects to the database, retrieves the required information to form the catalogue and converts it to JSON format so it can be read.
+ Secondly, as a means to handle imagery from Insights - both to associate product images with the correct product in the catalogue, and to compress the images to make them suitable for use in a website. It does this by using the [Office 365 Python rest API](https://github.com/vgrem/Office365-REST-Python-Client) to acquire current imagery and store this in the catalogue's folders, which is then compressed using [Pillow](https://pillow.readthedocs.io/en/stable/).

## Code notes <a name="code-notes"></a>

### Conventions <a name="conventions"></a>
With regard to Python and JavaScript, the following conventions are followed for each language. Deviations from these style guides are **incorrect** and should be updated to match the latest style guidance for the language in question.

+ Python - [PEP 8](https://peps.python.org/pep-0008/) 
+ JavaScript - [W3](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript)

### T-SQL <a name="tsql"></a>
Data for the catalogue comes from the `[DigitalIntellgence]` database on `BIS-000-SP08.bis.xswhealth.nhs.uk,14431`.

There are two views used: `Catalogue_Full_Portfolios`, which contains all required data for the products, and `Catalogue_Portfolio_Distinct` which provides an iterable list of the portfolios to make filters and allow programmatic downloading of images.

Criteria for inclusion in the catalogue is set as follows. It was determined that Report_Development_Status_Name does not matter for the catalogue.

```
[Report_Release_Status_Name] = 'Official' 
--AND [Report_Development_Status_Name] = 'Live' 
AND Portfolio_Status_Name = 'Live' 
AND Report_Release_Date IS NOT NULL
AND Include_In_Catalogue = 1
```

### Python <a name="python"></a>
This project has been developed using Python version [3.10](https://www.python.org/downloads/release/python-3100/).

There are two Python scripts in this project, [data_extractor.py](./assets/scripts/data_extractor.py) and [settings.py](./assets/scripts/settings.py). The former contains the code required to build the framework the catalogue is built on, while the latter is a local testing file and **is not tracked by the project** - the settings stored in it should be replaced with environment variables in the DevOps pipeline, when local data is no longer required. Should the automated process break, you can use this file to create new versions of the catalogue.

The settings.py files should **NOT** be included in the public repository for the catalogue on GitHub. It is not required for the catalogue to be accessed by users, only for the catalogue to be generated in the first place.

#### **Packages** <a name="python-packages"></a>

#### Os <a name="os"></a>
[os](https://docs.python.org/3/library/os.html) allows easy access to folder and file strucures, as well as defining filepaths. This package is used extensively whenever data or images are retrieved or stored.

#### Office 365 REST API <a name="office365-rest"></a>
The Python implementation of the [Office 365 REST API](https://github.com/vgrem/Office365-REST-Python-Client) is used retrieve images (both product and carousel). This is achieved in the following stages:

+ Stores the local folders that will receive images as variables
+ Using the *os* package and a for loop, removes all images currently stored
+ Loops through every portfolio returned by the metadata query to do the following:
    - Accounts for differences between the SharePoint site and Metadata names for portfolios
    - Authenticates the stored user credentials with the SharePoint client
    - Identifies the folder in the relevant Insights SharePoint site that stores the required images
    - Stores a list of every image in the folder
    - Using a for loop, downloads each file and saves it to the correct folder
    - PIL is then used for image manipulation - see the relevant section below
    - Confirms success or failure for each image within each portfolio

#### Pillow <a name="pillow"></a>
[Pillow](https://pillow.readthedocs.io/en/stable/) is used to both resize and compress images retrieved from the SharePoint libraries that support Insights.

It is executed on a successful retrieval and download of an image by the Office 365 REST API. It carries out the following tasks:

**For main product images:**
+ Stores the downloaded image as a variable called 'image'
+ Extracts the width and height of the image
+ Calculates half the width and height
+ Resizes the image to these dimensions
+ Optimises for the web and reduces the image quality by 50% to further lower the file size
+ Saves the image in the product image folder
+ Outputs a message confirming success or failure

**For carousel product images:**
+ Stores the downloaded image as a variable called 'image'
+ Extracts the width and height of the image
+ Checks if the images meet the preset parameters for the carousel (W: 1592 H: 893)
+ If the images does not match, resizes the image to these dimensions
+ Outputs a message confirming success or failure

### Javascript <a name="javascript"></a>

#### **Libraries** <a name="javascript-libraries"></a>

#### jQuery <a name="jquery"></a>
[jQuery](https://jquery.com/) makes the catalogue more modular and component-based. The [.load()](https://api.jquery.com/load/) method is used to insert the separate header, footer and navbar elements into each main page. This is done for two reasons:

1. It allows those elements to be adjusted throughout the catalogue, without the changes having to replicated in more than one place.
2. It simplifies the structure and design of the catalogue.

At the time of writing, the latest version (3.7.1) is being used. This can be adjusted by altering the relevant `<script>` tag in the `<head>` element of each of the main pages, which will look like the below.

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
```
---
#### Bootstrap <a name="bootstrap"></a>
[Bootstrap](https://getbootstrap.com/) provides the code for the carousel used on the product page. It is 'boilerplate' code that can be customised as required. It also comes with its own css styling to ensure that components function as intended.

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```

---
#### Font Awesome <a name="font-awesome"></a>
[Font Awesome](https://fontawesome.com/) provides iconography for social media as part of the footer element and product page. Part of the brief is that these match the SCW CSU website as of 12th March 2024, meaning version 6.4.2 is used. This can be adjusted by altering the relevant `<link>` tag in the `<head>` element of the footer element and product page, which will look like the below.

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">


```

## Script Specifics <a name="script-specifics"></a>
### **dataextractor.py** <a name="dataextractor"></a>
This code retrieves data from a SQL Server database and SharePoint, processes it, and writes it to a JSON file. Here's a breakdown of the steps involved:

1. Importing Libraries:
+ pyodbc: connects to a SQL Server database.
+ PIL.Image: used for image processing (resizing, compressing).
+ json: used to convert Python data structures to JSON format.
+ os: interacts with the operating system (finding files, creating paths).
+ office365: interacts with Microsoft SharePoint.

2. Credentials and Server Connection:
+ Defines variables for username, password, database server, and database name (stored in a separate file settings.py).
+ Creates a connection to the SQL Server database using trusted connection (no need to specify username and password on each connection).

3. Helper Functions:
+ find_nth(haystack, needle, n): This function finds the nth occurrence of a substring (needle) within a larger string (haystack). It returns the starting index of the nth occurrence.
+ addImage(dataset): This function iterates through a list of dictionaries (dataset) representing products. It checks for a local image file corresponding to each product ID and updates the "Image" key in the dictionary with the path to the local image file if found.
+ addCarouselImage(dataset): Similar to addImage, this function updates the "Carousel_Images_1", "Carousel_Images_2", and "Dummy_Product_URL" keys in the dictionaries based on image filenames and their positions. It uses the find_nth function to identify the image number within the filename.
+ groupBy(dataset, fields, pos): This function recursively groups a list of dictionaries based on specified fields. It's used for reorganizing the complex product data structure.

4. Data Retrieval:
+ Establishes a cursor object to interact with the database.
+ Fetches distinct portfolio names from a SQL table.
+ Loops through each portfolio:
+ Defines the corresponding SharePoint site name based on the portfolio name (accounting for some special cases).
+ Connects to the SharePoint site using user credentials.
+ Downloads product main images from a specific SharePoint folder and saves them locally after resizing and compressing them.
+ Downloads carousel images from another SharePoint folder, resizes them to a specific dimension if needed, and saves them locally.

5. Data Processing and Conversion:
+ Converts the retrieved portfolio data (list of dictionaries) into JSON format using json.dumps.
+ Fetches distinct product names from another SQL table and converts them to JSON.
+ Retrieves full portfolio data from another SQL table, converts it to a list of dictionaries, and replaces image placeholder links with real file paths using the addImage and addCarouselImage functions.
+ Groups the full portfolio data using the groupBy function.
+ Converts the grouped data back to JSON format.
+ Fetches the top 6 most recent product releases from the database, processes image links, and converts them to JSON.

6. Writing JSON to File:
+ Opens a file named data.js for writing.
+ Writes the converted JSON data for portfolios, latest products, distinct portfolios, and distinct products into the file, assigning them variable names within the JavaScript code (const portfolios = ...).
+ Overall, this Python script automates the process of fetching data from a database and SharePoint, processing image files, and creating a structured JSON file for use by a web application.



### **catalogueScroll.js** <a name="cataloguescroll"></a>
This code creates functionality for scrolling a section horizontally using arrow buttons. Let's break it down step-by-step:

1. Finding the Arrows:
The code starts by finding all the elements with the class names 'scroll-right-arrow' and 'scroll-left-arrow'. These represent the left and right arrow buttons you see on the webpage for scrolling.
It uses document.getElementsByClassName() function twice, once for each class name, and stores the results in variables named chevronsRight and chevronsLeft. These variables now hold a list of those arrow elements.

2. Adding Scroll Functionality (addScrollArrows function):
The code defines a function called addScrollArrows. This function gets called somewhere else in the code to activate the scrolling functionality.

3. Looping through Right Arrows:
The function iterates through the list of right arrow elements (chevronsRight) using a for loop.
Inside the loop, it assigns the current arrow element to a variable named arrow.

4. Defining Right Scroll Function:
It defines another function named rightScroll inside the loop. This function is responsible for handling the click or touch event on the right arrow button.

4. Calculating Scroll Amount:
Inside the rightScroll function, it calculates the width of the scrollable content area. It uses getBoundingClientRect() to get the size and position of the element with class .content-box relative to the viewport. It then extracts the width from the returned information.

5. Conditional Scrolling based on Screen Size and Content Width:
The function checks the width of the scrollable content and the screen width (window.innerWidth). Based on these values, it applies a different scroll amount. This ensures a smoother scrolling experience for different content sizes and screen sizes.
There are four conditions:
    + If content width is greater than 300px and screen width is less than or equal to 1024px (tablets), it scrolls by the content width plus a small additional amount (2.4%).
    + If content width is greater than 300px (larger screens), it scrolls by the content width plus a moderate additional amount (22%).
    + If content width is between 250px and 300px, it scrolls by the content width plus a medium additional amount (14%).
    + Otherwise, it scrolls by the content width plus a smaller additional amount (7.86%).

6. Scrolling the Content:
After calculating the scroll amount, the function uses scrollLeft property to adjust the horizontal scroll position of the element that is the immediate sibling before the current arrow element's parent element (scrollable container). This essentially scrolls the content to the right.

7. Attaching Click Event to Right Arrows:
After defining the rightScroll function, the main loop assigns this function to the onmousedown (click) and touchup (touch end) events of the current right arrow element (arrow). This means whenever the user clicks or taps (or touches and ends the touch) on the right arrow, the rightScroll function gets executed, triggering the scrolling of the content to the right.

8. Looping through Left Arrows (Similar to Right Arrows):
The code performs similar steps for the left arrow buttons (chevronsLeft). It loops through the list, defines a leftScroll function that calculates scroll amount based on content width and screen size, adjusts the scrollLeft property of the element that is the immediate sibling after the current arrow element's parent element (scrollable container) to scroll content to the left, and finally assigns the leftScroll function to the click and touch events of the left arrow buttons.

In summary, this code adds functionality to the left and right arrow buttons on a webpage. Clicking or tapping these buttons triggers scrolling of the content area horizontally based on the calculated scroll amount and screen size.



### **contentBoxes.js** <a name="contentboxes"></a>
**1. Data Preparation:**
   + A variable `data` is created, likely containing a list of product portfolios (fetched from elsewhere).

**2. Product Click Tracking:**
   + A function `clickedProduct` is defined to track clicks on product links:
     - It retrieves the clicked product name from the link's text content.
     - It searches through a collection of products (`portfolios`) to find the matching product.
     - When found, it stores the product details in local storage (`localStorage.setItem("useThisProduct", productData)`).

**3. Content Box Creator:**
   + A function `contentBoxes` is defined to create reusable content boxes for products:
     - It takes parameters for ID, parent element, image source, link text and URL, text description, index, and alt text.
     - It creates a box structure with an image, link, title, and description.
     - It appends the box to the specified parent element.

**4. Recent Product Boxes:**
   + A function `recentBoxes` is defined to display a section of recently added products:
     - It iterates through a list of recent products (`latestProducts`).
     - It calls `contentBoxes` to create a box for each product and appends it to a designated container.
     - It handles variations for testing and deployment URLs.

**5. Product Portfolio Sections:**
   + A variable `catmain` is assigned to an existing element on the page (likely a main container).
   + A function `portfolioBoxes` is defined to create sections for product portfolios:
     - It iterates through each portfolio in `data`.
     - It creates a section, container, and carousel container with left and right arrow buttons.
     - It sets a background color based on the portfolio ID (odd or even).
     - It adds a title and description for the portfolio.
     - It iterates through each product within the portfolio.
     - It calls `contentBoxes` to create a box for each product and appends it to the carousel container.
     - It appends the entire section to `catmain`.

**Overall, this code dynamically generates a product catalog structure on a web page:**
   + It creates sections for different product portfolios.
   + Within each section, it displays a carousel of product boxes, allowing for scrolling using arrow buttons.
   + It features a section for recently added products.
   + It tracks user clicks on product links and stores product details in local storage for later use.



### **navFunctions.js** <a name="navfunctiions"></a>
**1. Initialization:**
   + **Gets references to elements:** The code first identifies the HTML elements it will work with: the navbar, burger menu button, main global menu, navigation container, and filter container.

**2. Creating a Sticky Navbar:**
   + **Tracks scroll position:** When the user scrolls down the page, the `navSticky` function continuously checks the scroll position.
      - If the scroll position is past a certain point (`sticky`), it adds a CSS class (`sticky`) to the navbar element. This class likely makes the navbar stay fixed at the top of the viewport.
      - If the user scrolls back up, the function removes the `sticky` class, allowing the navbar to scroll normally.

**3. Managing a Mobile Hamburger Menu:**
   + **Shows/hides based on screen width:** The `mobileMenu` function handles a hamburger menu icon used for smaller screens:
      - If the screen width is less than or equal to 1279 pixels (likely indicating a smaller device), it shows the hamburger menu button and hides the full global menu.
      - Otherwise, it hides the hamburger menu button and shows the full global menu.
      - It ensures the hamburger button is initially hidden on page load.

**4. Handling Hamburger Menu Clicks:**
   + **Adds/removes classes for menu visibility:** When the user clicks on the hamburger menu button (`burgerMenu`):
      - It calls a function called `burgerVisibility` to toggle the visibility of the global menu (`globalMenu`).
      - The function likely uses CSS classes (`animate__fadeInDown`, `animate__fadeOutUp`, and `hidden`) to animate the menu's appearance and disappearance.
      - It also activates this function on touch events for mobile devices.



### **productDeets.js** <a name="productdetails"></a>
**1. Retrieving Product Data:**
   + **Captures URL parameters:** It stores any parameters found in the URL using `URLSearchParams`.
   + **Loads product:** The `loadProductData` function does one of three things:
      - **From URL parameter:** If a "?id=" parameter exists in the URL, it searches for a product with that ID within a collection of product portfolios.
      - **From local storage:** If no URL parameter exists, it checks local storage for a previously stored product named "useThisProduct" and retrieves it.
      - **Loads a default:** If neither option above yields a product, it loads a product with a hardcoded ID of "117".

**2. Extracting Image URLs:**
   + **Isolates image names:** It extracts the image filenames from the full image paths for the main product image, carousel images 1-3, and a "dummy product URL."

**3. Populating Product Details:**
   + **Updates banner:** It creates and appends an H1 element with the product name to a banner section on the page.
   + **Sets banner image:** It sets the background image of a banner element to the extracted product image, checking for a specific image directory if needed.
   + **Adds product description:** It creates a P element with the product description and adds it to the page.
   + **Updates meta tags:** It sets various meta tags, including the page title, description, and Open Graph tags for social sharing, using the product name and description.
   + **Prepares sharing links:** It creates links for sharing on LinkedIn and Twitter, incorporating the product ID and URL for sharing.
   + **Swaps carousel images:** It retrieves the images within a carousel element and updates their sources to match the product's carousel images, adjusting paths if needed.



### **showFilters.js** <a name="showfilters"></a>
**1. Conditional Filter Display:**
   + **Identifies current page:** Retrieves the current page from the URL.
   + **Shows filters on "catalogue.html":** If the user is on the "catalogue.html" page, it makes a filter container element visible; otherwise, it hides it.

**2. Filter Data Management:**
   + **Creates filter lists from distinct data:** It extracts unique portfolio names from a `portfolioDistinct` object and stores them in a list.
   + **Tracks active filters:** It creates arrays to track which filters are currently applied for different categories (portfolios).

**3. Filtering Logic:**
   + **Responds to filter checkbox changes:** When a filter checkbox is checked or unchecked, the `filteredData` function runs:
      - **Determines active filters:** It identifies which filters are active for the clicked checkbox's category.
      - **Adds/removes filters:** It updates the list of active filters based on the checkbox's state.
      - **Filters data:** It filters the `portfolios` data based on the active filters.
      - **Clears existing content:** It removes any previously displayed content.
      - **Repopulates filtered content:** It calls functions named `portfolioBoxes` and `addScrollArrows` (assumed to display the filtered content).

**4. Filter Class:**
   + **Creates a base filter class:** The `Filter` class serves as a blueprint for creating different filters. It holds:
      - Content for the filter.
      - Class name for styling.
      - A method to create the filter list.

**5. Filter Initialization:**
   + **Creates a portfolio filter:** It creates a `Filter` object for the portfolio category, generating the corresponding filter list.

**6. Chevron Functionality:**
   + **Inverts chevrons for active filters:** 
      - Attaches click events to chevron elements: When a chevron is clicked, it toggles the active state of its associated filter list, presumably showing or hiding it.



### **stickyProductSearch.js** <a name="productsearch"></a>
**1. Sticky Product Search Navigation:**
   + **Grabs elements:** It gets references to the product search container and its initial position on the page.
   + **Adds/removes sticky class:** The `productSticky` function, likely called on scroll events, adds a "sticky-product" class to make the search bar stay fixed at the top when scrolled past its original position, and removes it when scrolled back up.

**2. Product Search List Creation:**
   + **Generates product links:** It loops through a `productDistinct` object, likely containing product data, and does the following for each product:
      - Creates a list item and link element.
      - Sets the link's text to the product's name.
      - Assigns an ID and a link to "product.html".
      - Attaches an event listener for mouseenter events (presumably for additional actions).
      - Appends the link to the list item and the list item to the search results list.

**3. Product Search Functionality:**
   + **Filters results:** The `productSearchResults` function, likely triggered when the user types in the search bar, does the following:
      - Gets references to the search bar, search results list, and list items.
      - Filters the list items: It hides those whose text doesn't match the search query (case-insensitive) and shows those that do.
      - Shows/hides results container: It displays the results list if a search term is present and hides it if the search bar is empty.

**4. Search Term Monitoring (Commented-out):**
   + **Note:** The commented-out sections were likely intended for additional functionality:
      - **Monitoring search term:** It appears to have been set up to retrieve the search term from the input field every 100 milliseconds.
      - **Searching portfolios:** It seems to have been meant to search through a collection of product portfolios for a matching product based on the search term. However, it's incomplete and commented out.

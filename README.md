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
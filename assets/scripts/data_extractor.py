# Importing required libraries
import pyodbc
from PIL import Image
import json
import os
from office365.sharepoint.client_context import ClientContext
from office365.runtime.auth.user_credential import UserCredential
from settings import USER_CRED, USER_PASSWORD, SERVER, DATABASE, SHAREPOINT

# creating required credentials for access to Insights SharePoint site
user_creds = UserCredential(USER_CRED,USER_PASSWORD)

# function to replace placeholder images with ones from SharePoint
def addImage(dataset):    
    base_path = 'assets\\images\\img\\products'
    image_folder = os.path.join(os.getcwd(), base_path)
    file_list = [file for file in os.listdir(image_folder) if os.path.isfile(os.path.join(image_folder, file))]
    # print(file_list)
    for image in file_list:
        if image.lower().endswith(('.png', '.jpg', '.jpeg')):
            index = image.find("-")        
            for object in dataset:
                if object['ID'] == image[:index]:
                    object['Image'] = os.path.join(".",base_path,image)

# function to group json
def groupBy(dataset, fields, pos):
    if(pos >= len(fields)):
      return dataset
    gmx = fields[pos]
    group = gmx["field"]
    kx = gmx["gbkey"]
    groups = {}
    captured = {}
    returned = []    
    for l in dataset:
        lmf = {}
        for k, s in l.items():
            val_group = l[group]             
            if not (val_group in groups):
                groups[val_group] = []
            if group != k:
              lmf[k] = s
        groups[val_group].append(lmf)              
    for l in groups:
        agrup = groups[l]
        if(len(fields) > 1):            
            agrup = groupBy(agrup, fields, pos + 1)
        captured = {}
        captured[group] = l
        captured[kx] = agrup
        returned.append(captured)
    return returned

# Connecting to the server
server = SERVER
database = DATABASE

## Uses a trusted connection so any team member can access
con = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};Server=' + server + ';Database=' + database + ';ENCRYPT=no; TRUSTED_CONNECTION=yes;'
    )

# Retrieving the data from the database
# NOTE - Release dates are converted to milliseconds from 1970 for compatibility with JSON conversion
cursor = con.cursor()

# Distinct lists for use in webpage later
## Portfolio names
cursor.execute(
'''
SELECT DISTINCT [Portfolio] AS [Report_Portfolio_Name]
FROM [DigitalIntelligence].[Cat].[Catalogue_Full_Portfolios]
'''
)

rows = cursor.fetchall()
columns = [col[0] for col in cursor.description]
data = [dict(zip(columns, row)) for row in rows]

# Image retrieval from SharePoint

for portfolio in data:
    sharepoint_portfolio = portfolio["Report_Portfolio_Name"].replace(" ", "")
    
    # accounts for the site on Insights having a different name to metadata portfolio
    if "PbR" in sharepoint_portfolio:
        sharepoint_portfolio = "PbR"
    elif sharepoint_portfolio == "Urgentandemergencycare":
        sharepoint_portfolio = "UrgentEmergencyCare"

    ctx = ClientContext(os.path.join(SHAREPOINT,sharepoint_portfolio)).with_credentials(user_creds)
    
    print(f"Retrieving photos for: {sharepoint_portfolio}")

    # establishing relative path to required images
    target_folder_url = "SiteAssets/SitePages/Images"
    root_folder = ctx.web.get_folder_by_server_relative_path(target_folder_url)

    # creates list of all files in folder
    files = root_folder.get_files(True).execute_query()

    # defines local folder that will store retrived images
    product_folder = os.path.join(os.getcwd(), "assets\\images\\img\\products")

    # loop to download specified images
    for f in files:
        # acquires the url for the specific file
        file_url = f.serverRelativeUrl
        try:    
            # limits download to specific image file extensions
            if file_url.lower().endswith(('.png', '.jpg', '.jpeg')):  
                download_path = os.path.join(product_folder, os.path.basename(file_url))
                with open(download_path, "wb") as local_file:      
                    file = (
                        ctx.web.get_file_by_server_relative_path(file_url)
                        .download(local_file)
                        .execute_query()
                    )   
                
                local_file.close()
            
            # compressing images and optimising them for web use
            try:
                image = Image.open(download_path)
                width, height = image.size
                new_size = (width//2, height//2)
                resized_image = image.resize(new_size)
                resized_image.save(download_path, optimize=True, quality=50)
                print(f"    Compressed {f.name}")
            except:
                print(f"    Could not compress {f.name}")
        except:
            print(f"Could not acquire {file_url}")
    

portfolio_list = json.dumps(data, indent=2)

## Product names
cursor.execute(
'''
SELECT DISTINCT [Name] As [Report_Title]
FROM [DigitalIntelligence].[Cat].[Catalogue_Full_Portfolios]
'''
)

rows = cursor.fetchall()
columns = [col[0] for col in cursor.description]
data = [dict(zip(columns, row)) for row in rows]

product_list = json.dumps(data, indent=2)

# print(product_list)

## Platform names
cursor.execute(
'''
SELECT DISTINCT [Platform]
FROM [DigitalIntelligence].[Cat].[Catalogue_Full_Portfolios]
'''
)

rows = cursor.fetchall()
columns = [col[0] for col in cursor.description]
data = [dict(zip(columns, row)) for row in rows]

platform_list = json.dumps(data, indent=2)

# print(platform_list)

# Full portfolios for use in website
cursor.execute(
'''
SELECT * FROM [DigitalIntelligence].[Cat].[Catalogue_Full_Portfolios]

ORDER BY Portfolio_ID
'''
    )

# Capturing and converting the data to dictionaries
rows = cursor.fetchall()
columns = [col[0] for col in cursor.description]
data = [dict(zip(columns, row)) for row in rows]

# if image exists, replacing placeholder link with real one
addImage(data)

# for object in data:
#     print(object['Image'])
    
# Checking the data if required
# for i in data:
#     print(i)

# grouping and reformatting
data = groupBy(data, [{'field': ('Portfolio'), 'gbkey': 'Products'}],0)

# Converting to json
to_json = json.dumps(data, indent=2)

# Checking json output if required
# print(to_json)

# Top 6 most recent product releases for landing page
cursor.execute(
'''
SELECT TOP 6 * FROM [DigitalIntelligence].[Cat].[Catalogue_Full_Portfolios]

ORDER BY [Released] DESC
'''
    )

# Capturing and converting the data to dictionaries
rows = cursor.fetchall()
columns = [col[0] for col in cursor.description]
data = [dict(zip(columns, row)) for row in rows]

# if image exists, replacing placeholder link with real one
addImage(data)

# Checking the data if required
# for i in data:
#     print(i)

# Converting to json
latest_products = json.dumps(data, indent=2)

# Closing the connections
cursor.close()
con.close()

# Writing the JSON data into a regular JS file for easy loading
with open('./assets/scripts/data.js', 'w') as file:
    file.write("const portfolios = " + to_json + ",")

file.close()

with open('./assets/scripts/data.js', 'a') as file:
    file.write(" latestProducts = " + latest_products + ",")
    file.write(" portfolioDistinct = " + portfolio_list + ",")
    file.write(" productDistinct = " + product_list + ",")
    file.write(" platformDistinct = " + platform_list)

file.close()
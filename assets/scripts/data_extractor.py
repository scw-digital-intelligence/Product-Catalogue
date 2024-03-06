# Importing required libraries
import pyodbc
import json

# function to group json
def groupBy(data, fields, pos):
    if(pos >= len(fields)):
      return data
    gmx = fields[pos]
    group = gmx["field"]
    kx = gmx["gbkey"]
    groups = {}
    captured = {}
    returned = []    
    for l in data:
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
server = r'BIS-000-SP08.bis.xswhealth.nhs.uk, 14431'
database = 'DigitalIntelligence'

## Uses a trusted connection so any team member can access
con = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};Server=' + server + ';Database=' + database + ';ENCRYPT=no; TRUSTED_CONNECTION=yes;'
    )

# Retrieving the data from the database
cursor = con.cursor()

# Release dates are converted to milliseconds from 1970 for compatibility with JSON conversion
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

# Checking the data if required
for i in data:
    print(i)

# Converting to json
latest_products = json.dumps(data, indent=2)

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

portfolio_list = json.dumps(data, indent=2)

# print(portfolio_list)

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
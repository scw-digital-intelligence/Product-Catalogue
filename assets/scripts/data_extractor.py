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

# Portfolio_Descriptions are converted to milliseconds from 1970 for compatibility with JSON conversion
cursor.execute(
'''
    WITH CTE AS (
    SELECT DISTINCT 
    Report_Portfolio_Name
    FROM [DigitalIntelligence].[Cat].[catalogue_view]
        WHERE 
        [Report_Release_Status_Name] = 'Official' 
        AND [Report_Development_Status_Name] = 'Live' 
        AND Portfolio_Status_Name = 'Live' 
        AND Report_Release_Date IS NOT NULL
    ), CTE2 AS (
    SELECT 
    Report_Portfolio_Name
    ,ROW_NUMBER() OVER (ORDER BY Report_Portfolio_Name) as ID
    FROM CTE
    )

    SELECT 
    v.[Report_Portfolio_Name] AS [Portfolio]
	,ID AS [Portfolio_ID]
    ,v.[Report_Portfolio_Description] AS [Portfolio_Description]
    ,[Report_Title] AS [Name]
    ,[Report_Description_Text] AS [Description]
    ,'./assets/images/img/product_box.svg' AS [Image]
    ,DATEDIFF_BIG(MILLISECOND, [Report_Release_Date], GETDATE()) AS [Released]
    FROM [DigitalIntelligence].[Cat].[catalogue_view] v
	LEFT JOIN CTE2 ON v.[Report_Portfolio_Name] = CTE2.Report_Portfolio_Name
    WHERE 
    [Report_Release_Status_Name] = 'Official' 
    AND [Report_Development_Status_Name] = 'Live' 
    AND Portfolio_Status_Name = 'Live' 
    AND Report_Release_Date IS NOT NULL

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

# Closing the connections
cursor.close()
con.close()

# Writing the JSON data into a regulat JS file for easy loading
with open('./assets/scripts/data.js', 'w') as file:
    file.write("const portfolios = " + to_json)
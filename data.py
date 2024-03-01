import requests
from bs4 import BeautifulSoup
url ="https://fnec.cornell.edu/for-participants/recipe-table"
r = requests.get(url)
print(r)
soup =BeautifulSoup(r.text,"lxml")

# Parse HTML
soup = BeautifulSoup(r.content, "html.parser")

# Find the table
table = soup.find("table", class_="tablepress")


#table =soup.find("table",class_=" tablepress tablepress-id-67 dataTable no-footer")
#print(table)

# Find all headers with class "column-1" and "sorting"
headers = table.find_all("th")
#print(headers)
titles = []
for i in headers:
    title = i.text
    titles.append(title)

print(titles)

#creating dataframes
# Create a list of dictionaries with empty values for each title
#data = [dict.fromkeys(titles) for _ in range(10)]

#print(data)



# Check if titles are properly populated
if not titles:
    print("No headers found or headers are empty.")
else:
    # Create a list of dictionaries with empty values for each title
    data =dict.fromkeys(titles)

    # Print the list of dictionaries
    for row in data:
        print(row)
 # Find all rows in the table
rows = table.find_all("tr")

# Create an empty list to store the data
data = []

# Iterate over each row (skipping the first row which contains headers)
for row in rows[1:]:
    # Extract data from each cell in the row
    cells = row.find_all("td")
    row_data = [cell.text.strip() for cell in cells]
    # Append the row data to the list
    data.append(row_data)

# Print the extracted data
for row in data:
    print(row) 


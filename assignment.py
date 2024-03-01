import requests
from bs4 import BeautifulSoup
import mysql.connector as mariadb
conn = mariadb.connect(
    user='root', password='Bhumika', host='localhost', port='3306'
)

cursor = conn.cursor()
cursor.execute("CREATE DATABASE IF NOT EXISTS bhumika_database")
conn.database = 'bhumika_database'

cursor.execute("CREATE TABLE IF NOT EXISTS expenses (expense_id INT AUTO_INCREMENT PRIMARY KEY, category VARCHAR(255) NOT NULL, payment_method VARCHAR(255) NOT NULL, expense_date DATE, amount DOUBLE, description TEXT, salary VARCHAR(255))")

def add_expense(category, payment_method, expense_date, amount, description, salary):
    cursor.execute("INSERT INTO expenses (category, payment_method, expense_date, amount, description, salary) VALUES (%s, %s, %s, %s, %s, %s)", (category, payment_method, expense_date, amount, description, salary))
    conn.commit()

url = "https://ninjatables.com/examples-of-data-table-design-on-website/"
response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table")
    if table:
        data = []
        for row in table.find_all("tr"):
            if "th" in str(row):
                continue
            row_data = []
            for cell in row.find_all(["td", "th"]):
                text = cell.get_text(strip=True)
                row_data.append(text)
            data.append(row_data)
        for row in data:
            print(row)
        if table:
            header=[]
            data = []
            for row in table.find_all("tr"):
                for cell in row.find_all(["th"]):
                    text = cell.get_text(strip=True)
                    if ' ' in text:
                        text = f"`{text}`"
                    header.append(text)
                row_data = []
                for cell in row.find_all(["td"]):
                    text = cell.get_text(strip=True)
                    row_data.append(text)
                if row_data:
                    data.append(row_data)
                    for items in data:
                        query = "INSERT INTO `data_table` ({}) VALUES ({})"
                        query = query.format(', '.join(header), ', '.join(['%s'] * len(header)))
                        cursor.execute(query, items)
                        conn.commit()
                else:
                    print("Table not found on the website.")
    else:
        print("Table not found on the website.")
else:
    print(f"Error: Request failed with status code {response.status_code}")

print(soup.title, "header", header, "data", data)

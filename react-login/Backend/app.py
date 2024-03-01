# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as mariadb

connection = mariadb.connect(
    user='root',password='Bhumika',host='localhost',port='3306'
)

connection.database = 'bhumika_database'

app = Flask(__name__)
CORS(app)

# Dummy user data (replace with database access)
users = {
    'admin': 'adminpass',
    'user': 'userpass'
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if username in users and users[username] == password:
        return jsonify({'message': 'Login successful', 'user_type': 'admin' if username == 'admin' else 'user'})
    else:
        return jsonify({'message': 'Login failed'})

@app.route('/data', methods=['GET'])
def get_all_data():
    try:
        with connection.cursor() as cursor:
            # Example query to fetch all records from your table
            query = 'SELECT * FROM expenses'
            cursor.execute(query)
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({'error': 'Error fetching data'})

if __name__ == '__main__':
    app.run(debug=True)

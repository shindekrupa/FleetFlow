from flask import Flask
import mysql.connector

app = Flask(__name__)

# Database connection function
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",          # your mysql username
        password="dbms",  # your mysql password
        database="fleet_flow"
    )
    return connection


@app.route("/")
def test_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()

        cursor.close()
        conn.close()

        return f"Connected Successfully to {db_name[0]} 🚀"

    except Exception as e:
        return f"Connection Failed ❌ {e}"

@app.route("/vehicles")
def get_vehicles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM vehicle;")
    vehicles = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"vehicles": vehicles}

if __name__ == "__main__":
    app.run(debug=True)
import mysql.connector

# Database connection function
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",          # your mysql username
        password="dbms",      # your mysql password
        database="fleet_flow"
    )
    return connection


# Test database connection
def test_database():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        return f"Connected Successfully to {db_name} 🚀"
    except Exception as e:
        return f"Connection Failed ❌ {e}"


# Get all vehicles
def fetch_all_vehicles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM vehicle;")
    vehicles = cursor.fetchall()

    cursor.close()
    conn.close()

    return vehicles
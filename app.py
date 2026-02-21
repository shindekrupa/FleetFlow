from flask import Flask
from db import test_database, fetch_all_vehicles

app = Flask(__name__)


@app.route("/")
def test_connection():
    return test_database()


@app.route("/vehicles")
def get_vehicles():
    vehicles = fetch_all_vehicles()
    return {"vehicles": vehicles}


if __name__ == "__main__":
    app.run(debug=True)
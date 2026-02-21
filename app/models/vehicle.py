
from ..extensions import db

class Vehicle(db.Model):
    __tablename__ = "vehicle"
    vehicle_id = db.Column(db.Integer, primary_key=True)
    name_model = db.Column(db.String(100))
    license_plate = db.Column(db.String(20), unique=True)
    vehicle_type = db.Column(db.String(20))
    max_load_capacity = db.Column(db.Float)
    status = db.Column(db.String(20))

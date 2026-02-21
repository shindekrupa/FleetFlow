
from ..extensions import db

class Trip(db.Model):
    __tablename__ = "trip"
    trip_id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicle.vehicle_id"))
    driver_id = db.Column(db.Integer, db.ForeignKey("driver.driver_id"))
    cargo_weight = db.Column(db.Float)
    origin = db.Column(db.String(100))
    destination = db.Column(db.String(100))
    status = db.Column(db.String(20))

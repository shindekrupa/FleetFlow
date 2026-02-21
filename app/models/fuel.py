
from ..extensions import db

class Fuel(db.Model):
    __tablename__ = "fuel"
    fuel_id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer)
    liters = db.Column(db.Float)
    cost = db.Column(db.Float)

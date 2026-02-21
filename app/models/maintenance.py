
from ..extensions import db

class Maintenance(db.Model):
    __tablename__ = "maintenance"
    maintenance_id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicle.vehicle_id"))
    service_type = db.Column(db.String(50))
    cost = db.Column(db.Float)

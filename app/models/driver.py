
from ..extensions import db

class Driver(db.Model):
    __tablename__ = "driver"
    driver_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    license_number = db.Column(db.String(50))
    status = db.Column(db.String(20))

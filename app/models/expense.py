
from ..extensions import db

class Expense(db.Model):
    __tablename__ = "expense"
    expense_id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer)
    amount = db.Column(db.Float)
    expense_type = db.Column(db.String(50))


from flask import request, jsonify
from ..extensions import db
from ..models.expense import Expense

def create():
    data = request.json
    obj = Expense(**data)
    db.session.add(obj)
    db.session.commit()
    return jsonify({"msg":"created"})

def get_all():
    objs = Expense.query.all()
    return jsonify([o.expense_id for o in objs])

def delete(id):
    obj = Expense.query.get(id)
    db.session.delete(obj)
    db.session.commit()
    return jsonify({"msg":"deleted"})

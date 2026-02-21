
from flask import request, jsonify
from ..extensions import db
from ..models.fuel import Fuel

def create():
    data = request.json
    obj = Fuel(**data)
    db.session.add(obj)
    db.session.commit()
    return jsonify({"msg":"created"})

def get_all():
    objs = Fuel.query.all()
    return jsonify([o.fuel_id for o in objs])

def delete(id):
    obj = Fuel.query.get(id)
    db.session.delete(obj)
    db.session.commit()
    return jsonify({"msg":"deleted"})

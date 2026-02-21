
from flask import request, jsonify
from ..extensions import db
from ..models.vehicle import Vehicle

def create():
    data = request.json
    obj = Vehicle(**data)
    db.session.add(obj)
    db.session.commit()
    return jsonify({"msg":"created"})

def get_all():
    objs = Vehicle.query.all()
    return jsonify([o.vehicle_id for o in objs])

def delete(id):
    obj = Vehicle.query.get(id)
    db.session.delete(obj)
    db.session.commit()
    return jsonify({"msg":"deleted"})

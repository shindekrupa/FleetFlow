
from flask import request, jsonify
from ..extensions import db
from ..models.trip import Trip

def create():
    data = request.json
    obj = Trip(**data)
    db.session.add(obj)
    db.session.commit()
    return jsonify({"msg":"created"})

def get_all():
    objs = Trip.query.all()
    return jsonify([o.trip_id for o in objs])

def delete(id):
    obj = Trip.query.get(id)
    db.session.delete(obj)
    db.session.commit()
    return jsonify({"msg":"deleted"})

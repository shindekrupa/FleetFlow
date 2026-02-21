
from flask import request, jsonify
from ..extensions import db
from ..models.driver import Driver

def create():
    data = request.json
    obj = Driver(**data)
    db.session.add(obj)
    db.session.commit()
    return jsonify({"msg":"created"})

def get_all():
    objs = Driver.query.all()
    return jsonify([o.driver_id for o in objs])

def delete(id):
    obj = Driver.query.get(id)
    db.session.delete(obj)
    db.session.commit()
    return jsonify({"msg":"deleted"})

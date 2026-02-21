
from flask import request, jsonify
from ..extensions import db
from ..models.maintenance import Maintenance

def create():
    data = request.json
    obj = Maintenance(**data)
    db.session.add(obj)
    db.session.commit()
    return jsonify({"msg":"created"})

def get_all():
    objs = Maintenance.query.all()
    return jsonify([o.maintenance_id for o in objs])

def delete(id):
    obj = Maintenance.query.get(id)
    db.session.delete(obj)
    db.session.commit()
    return jsonify({"msg":"deleted"})


from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..extensions import db
from ..models.user import User

def register():
    data = request.json
    user = User(
        email=data["email"],
        password_hash=generate_password_hash(data["password"]),
        role=data.get("role","manager")
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"User created"})

def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password_hash, data["password"]):
        return jsonify({"msg":"Invalid credentials"}),401
    token = create_access_token(identity=user.user_id)
    return jsonify({"token":token})

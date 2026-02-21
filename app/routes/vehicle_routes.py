
from flask import Blueprint
from ..controllers.vehicle_controller import create, get_all, delete

vehicle_bp = Blueprint("vehicle", __name__)

vehicle_bp.route("/", methods=["POST"])(create)
vehicle_bp.route("/", methods=["GET"])(get_all)
vehicle_bp.route("/<int:id>", methods=["DELETE"])(delete)

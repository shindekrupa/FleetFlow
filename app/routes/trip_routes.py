
from flask import Blueprint
from ..controllers.trip_controller import create, get_all, delete

trip_bp = Blueprint("trip", __name__)

trip_bp.route("/", methods=["POST"])(create)
trip_bp.route("/", methods=["GET"])(get_all)
trip_bp.route("/<int:id>", methods=["DELETE"])(delete)

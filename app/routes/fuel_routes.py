
from flask import Blueprint
from ..controllers.fuel_controller import create, get_all, delete

fuel_bp = Blueprint("fuel", __name__)

fuel_bp.route("/", methods=["POST"])(create)
fuel_bp.route("/", methods=["GET"])(get_all)
fuel_bp.route("/<int:id>", methods=["DELETE"])(delete)

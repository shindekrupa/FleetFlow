
from flask import Blueprint
from ..controllers.maintenance_controller import create, get_all, delete

maintenance_bp = Blueprint("maintenance", __name__)

maintenance_bp.route("/", methods=["POST"])(create)
maintenance_bp.route("/", methods=["GET"])(get_all)
maintenance_bp.route("/<int:id>", methods=["DELETE"])(delete)

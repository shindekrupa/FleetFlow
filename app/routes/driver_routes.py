
from flask import Blueprint
from ..controllers.driver_controller import create, get_all, delete

driver_bp = Blueprint("driver", __name__)

driver_bp.route("/", methods=["POST"])(create)
driver_bp.route("/", methods=["GET"])(get_all)
driver_bp.route("/<int:id>", methods=["DELETE"])(delete)

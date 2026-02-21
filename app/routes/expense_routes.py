
from flask import Blueprint
from ..controllers.expense_controller import create, get_all, delete

expense_bp = Blueprint("expense", __name__)

expense_bp.route("/", methods=["POST"])(create)
expense_bp.route("/", methods=["GET"])(get_all)
expense_bp.route("/<int:id>", methods=["DELETE"])(delete)

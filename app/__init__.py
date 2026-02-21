
from flask import Flask
from config import Config
from .extensions import db, jwt

from .routes.auth_routes import auth_bp
from .routes.vehicle_routes import vehicle_bp
from .routes.driver_routes import driver_bp
from .routes.trip_routes import trip_bp
from .routes.maintenance_routes import maintenance_bp
from .routes.fuel_routes import fuel_bp
from .routes.expense_routes import expense_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(vehicle_bp, url_prefix="/api/vehicles")
    app.register_blueprint(driver_bp, url_prefix="/api/drivers")
    app.register_blueprint(trip_bp, url_prefix="/api/trips")
    app.register_blueprint(maintenance_bp, url_prefix="/api/maintenance")
    app.register_blueprint(fuel_bp, url_prefix="/api/fuel")
    app.register_blueprint(expense_bp, url_prefix="/api/expenses")

    with app.app_context():
        db.create_all()

    return app

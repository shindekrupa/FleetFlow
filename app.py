from flask import Flask
from db import test_database, fetch_all_vehicles

app = Flask(__name__)


@app.route("/")
def test_connection():
    return test_database()


@app.route("/vehicles")
def get_vehicles():
    vehicles = fetch_all_vehicles()
    return {"vehicles": vehicles}

# from flask import Flask
# from flask_migrate import Migrate
# from extensions import db, jwt, ma
# # from .routes import auth_routes, vehicle_routes, driver_routes, trip_routes
#
# def create_app():
#     app = Flask(__name__)
#
#     # Load config
#     from config import config
#     app.config.from_object(config['default'])
#
#     # Initialize extensions
#     db.init_app(app)
#     jwt.init_app(app)
#     ma.init_app(app)
#     migrate = Migrate(app, db)
#
#     # Register blueprints
#     app.register_blueprint(auth_routes.bp, url_prefix='/api/auth')
#     app.register_blueprint(vehicle_routes.bp, url_prefix='/api/vehicles')
#     app.register_blueprint(driver_routes.bp, url_prefix='/api/drivers')
#     app.register_blueprint(trip_routes.bp, url_prefix='/api/trips')
#     # ... register others similarly
#
#     @app.route('/health')
#     def health():
#         return {"status": "ok"}, 200
#
#     return app

if __name__ == "__main__":
    app.run(debug=True)
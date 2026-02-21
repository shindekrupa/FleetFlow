
class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:password@localhost/fleetflow"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "super-secret-key"

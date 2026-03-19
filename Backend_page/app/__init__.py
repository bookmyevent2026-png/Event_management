from flask import Flask

from app.auth.routes import auth_bp
#from admin.routes import admin_bp
#from user.routes import user_bp
from app.super_admin.routes import super_admin_bp


def create_app():

    app = Flask(__name__, static_url_path='/uploads', static_folder='app/uploads')
    app.config['SECRET_KEY'] = '123'
    app.register_blueprint(auth_bp, url_prefix="/auth")
    #app.register_blueprint(admin_bp, url_prefix="/admin")
    #app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(super_admin_bp, url_prefix="/superadmin")

    return app
from app import  create_app
from app.init_db import create_tables
from flask_cors import CORS
from app.super_user.superuser_routers import create_default_superuser

app = create_app()
CORS(app)

# Automatically create tables
with app.app_context():
    create_tables()
    create_default_superuser()

if __name__ == "__main__":
    app.run(debug=True)
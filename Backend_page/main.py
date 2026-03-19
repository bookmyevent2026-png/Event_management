from app import  create_app
from app.init_db import create_tables
from flask_cors import CORS


app = create_app()
CORS(app)

# Automatically create tables
with app.app_context():
    create_tables()

if __name__ == "__main__":
    app.run(debug=True)
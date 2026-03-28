from flask import Blueprint, request, jsonify,send_from_directory
import os
from app.database import get_db_connection
from werkzeug.security import generate_password_hash
from datetime import timedelta
superuser_bp = Blueprint("superuser", __name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.abspath(os.path.join(BASE_DIR, "..", "uploads"))
print(os.path.exists("D:/Project/app/uploads/photos/download_2.jpg"))


def create_default_superuser():
    db = get_db_connection()
    cursor = db.cursor()
    try:
        name = "superuser"
        email = "superadmin123@gmail.com"
        password = "admin123"

        # 🔐 Hash password
        hashed_password = generate_password_hash(password)

        # ✅ Check if exists
        cursor.execute("SELECT id FROM users WHERE email=%s", (email,))
        existing = cursor.fetchone()

        if existing:
            print("✅ SuperUser already exists")
        else:
            cursor.execute("""
                INSERT INTO users (name, email, password, role)
                VALUES (%s, %s, %s, %s)
            """, (name, email, hashed_password, "superuser"))

            db.commit()
            print("🚀 SuperUser auto-created")

    except Exception as e:
        print("❌ Error creating superuser:", e)

    finally:
        cursor.close()
        db.close()

@superuser_bp.route('/uploads/<path:filename>')
def uploaded_file(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        print("FILE ERROR:", e)
        return jsonify({"error": "File not found"}), 404

#  Helper: format time
def format_time(td):
    if isinstance(td, timedelta):
        total_seconds = int(td.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours:02}:{minutes:02}"
    return str(td) if td else None

# ✅ MAIN API
@superuser_bp.route("/get-events", methods=["GET"])
def get_events():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                e.id, 
                e.event_name, 
                e.status,
                e.start_date, 
                e.start_time,
                e.venue, 
                e.address,
                b.capacity,
                f.file_path
            FROM event_details_table e
            LEFT JOIN event_booking_details b 
                ON e.id = b.event_id
            LEFT JOIN event_files f 
                ON e.id = f.event_id AND f.file_type = 'banner'
            ORDER BY e.id DESC
        """)

        data = cursor.fetchall()

        for row in data:

            # =========================
            # ✅ FORMAT DATE
            # =========================
            if row.get("start_date"):
                row["start_date"] = row["start_date"].strftime("%Y-%m-%d")

            # =========================
            # ✅ FORMAT TIME
            # =========================
            row["start_time"] = format_time(row.get("start_time"))

            # =========================
            # ✅ FIX IMAGE URL (CRITICAL)
            # =========================
            if row.get("file_path"):
                file_path = os.path.normpath(row["file_path"])

                relative_path = os.path.relpath(file_path, UPLOAD_FOLDER)
                relative_path = relative_path.replace("\\", "/")

                row["banner_url"] = f"http://127.0.0.1:5000/superuser/uploads/{relative_path}"

                print("FINAL URL:", row["banner_url"])
                print("FILE PATH:", file_path)
                print("EXISTS:", os.path.exists(file_path))
            else:
                row["banner_url"] = None

            # Remove raw path (clean response)
            row.pop("file_path", None)

        cursor.close()
        conn.close()

        return jsonify({
            "status": "success",
            "events": data
        }), 200

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@superuser_bp.route("/event-full-details/<int:event_id>")
def full_event(event_id):
    try:
        print("Eventid", event_id)

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM event_details_table WHERE id=%s", (event_id,))
        event = cursor.fetchone()

        cursor.execute("SELECT * FROM event_booking_details WHERE event_id=%s", (event_id,))
        booking = cursor.fetchone()

        cursor.execute("SELECT * FROM event_stalls WHERE event_id=%s", (event_id,))
        stalls = cursor.fetchall()

        cursor.execute("SELECT * FROM event_files WHERE event_id=%s", (event_id,))
        docs = cursor.fetchall()

        cursor.execute("SELECT * FROM event_terms WHERE event_id=%s", (event_id,))
        terms = cursor.fetchall()

        cursor.execute("SELECT * FROM event_vendors WHERE event_id=%s", (event_id,))
        vendors = cursor.fetchall()

        # =========================
        # ✅ FIX TIME FIELDS
        # =========================
        def fix_time(data):
            if isinstance(data, dict):
                for k, v in data.items():
                    if isinstance(v, timedelta):
                        total_seconds = int(v.total_seconds())
                        hours = total_seconds // 3600
                        minutes = (total_seconds % 3600) // 60
                        data[k] = f"{hours:02}:{minutes:02}"
            return data

        # Apply fix
        event = fix_time(event)
        booking = fix_time(booking)

        for s in stalls:
            fix_time(s)

        for d in docs:
            fix_time(d)

        for t in terms:
            fix_time(t)

        for v in vendors:
            fix_time(v)

        cursor.close()
        conn.close()

        return jsonify({
            "eventDetails": event,
            "booking": booking,
            "layout": {"stalls": stalls},
            "documents": {"docs": docs},
            "terms": terms,
            "vendors": vendors
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
@superuser_bp.route("/update-status/<int:event_id>", methods=["PUT"])
def update_status(event_id):
    data = request.json
    status = data.get("status")

    conn = get_db_connection()
    cursor = conn.cursor()

    if status == "APPROVED":
        cursor.execute("""
            UPDATE event_details_table
            SET status=%s, approved_at=NOW(), rejected_at=NULL
            WHERE id=%s
        """, (status, event_id))

    elif status == "REJECTED":
        cursor.execute("""
            UPDATE event_details_table
            SET status=%s, rejected_at=NOW(), approved_at=NULL
            WHERE id=%s
        """, (status, event_id))

    elif status == "PENDING":   # ✅ ADD THIS
        cursor.execute("""
            UPDATE event_details_table
            SET status=%s, approved_at=NULL, rejected_at=NULL
            WHERE id=%s
        """, (status, event_id))

    else:
        return jsonify({"error": "Invalid status"}), 400

    conn.commit()

    return jsonify({"success": True})
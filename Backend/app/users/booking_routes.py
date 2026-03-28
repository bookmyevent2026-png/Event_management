from flask import Blueprint, request, jsonify
from app.database import get_db_connection
from app.Services.otp_service import is_verified, clear_verified
from app.Services.mail_service import send_booking_email

user_bp = Blueprint("user", __name__)


@user_bp.route('/book-event', methods=['POST'])
def book_event():
    data = request.json

    event_id = data.get("event_id")
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")

    # 🔥 OTP CHECK
    if not is_verified(email):
        return jsonify({"error": "Please verify OTP first"}), 403

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # 🔥 EVENT DETAILS
    cursor.execute("""
        SELECT 
            *
        FROM event_details_table
        WHERE id = %s
    """, (event_id,))
    event = cursor.fetchone()

    if not event:
        return jsonify({"error": "Event not found"}), 404

    # 🔥 INSERT BOOKING
    cursor.execute("""
        INSERT INTO user_booking_details (event_id, name, email, phone)
        VALUES (%s, %s, %s, %s)
    """, (event_id, name, email, phone))

    conn.commit()

    # 🔥 CLEAR VERIFIED
    clear_verified(email)

    # 🔥 SEND MAIL
    send_booking_email(email, name, event)

    return jsonify({"message": "Booking successful"})
import smtplib
from email.mime.text import MIMEText
import os

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USERNAME = os.getenv("EMAIL_USER", "bookmyevent2026@gmail.com")
SMTP_PASSWORD = os.getenv("EMAIL_PASS", "ltgm lmji aofr ekup")

def send_email(to_email, subject, message, is_html=False):
    # ✅ HANDLE HTML / TEXT
    if is_html:
        msg = MIMEText(message, "html")
    else:
        msg = MIMEText(message, "plain")

    msg['Subject'] = subject
    msg['From'] = SMTP_USERNAME
    msg['To'] = to_email

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)

        print(f"✅ Email sent to {to_email}")

    except Exception as e:
        print(f"❌ Email error: {e}")
        raise e
def send_otp_email(email, otp):
    subject = "Your OTP for Event Booking"
    message = f"""
Hello,

Your OTP is: {otp}
Valid for 5 minutes.
"""
    send_email(email, subject, message)

def send_otp_email_reset(email, otp):
    subject = "🔐 Password Reset OTP"

    message = f"""
Hello,

We received a request to reset your password.

🔑 Your OTP is: {otp}

⏳ This OTP is valid for 5 minutes.

If you did NOT request a password reset, please ignore this email.

For security reasons, do not share this OTP with anyone.

Regards,  
Your App Team
"""

    send_email(email, subject, message)
# =========================================
# 🟢 BOOKING EMAIL FUNCTION (ONLY BOOKING)
# =========================================
def send_booking_email(email, name, event):
    """Send a professional HTML booking confirmation email"""
    subject = "Event Booking Confirmed"

    # Professional HTML email template
    html_message = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }}
            .email-container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }}
            .header h1 {{
                margin: 0;
                font-size: 28px;
                font-weight: 600;
            }}
            .confirmation-badge {{
                display: inline-block;
                background-color: rgba(255,255,255,0.2);
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                margin-top: 10px;
            }}
            .body {{
                padding: 40px 30px;
            }}
            .greeting {{
                font-size: 16px;
                margin-bottom: 30px;
                color: #333;
            }}
            .section {{
                margin-bottom: 30px;
                border-bottom: 1px solid #eee;
                padding-bottom: 20px;
            }}
            .section:last-child {{
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }}
            .section-title {{
                font-size: 13px;
                font-weight: 700;
                color: #667eea;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
            }}
            .event-name {{
                font-size: 22px;
                font-weight: 600;
                color: #333;
                margin-bottom: 10px;
            }}
            .event-category {{
                display: inline-block;
                background-color: #f0f0f0;
                color: #667eea;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 15px;
            }}
            .info-row {{
                display: flex;
                margin-bottom: 12px;
                font-size: 14px;
            }}
            .info-label {{
                font-weight: 600;
                color: #667eea;
                width: 100px;
                min-width: 100px;
            }}
            .info-value {{
                color: #555;
                flex: 1;
            }}
            .description {{
                background-color: #f9f9f9;
                padding: 15px;
                border-left: 4px solid #667eea;
                border-radius: 4px;
                font-size: 14px;
                color: #555;
                line-height: 1.6;
            }}
            .amenities {{
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }}
            .amenity-tag {{
                background-color: #e8f0fe;
                color: #667eea;
                padding: 6px 12px;
                border-radius: 16px;
                font-size: 12px;
                font-weight: 500;
            }}
            .footer {{
                background-color: #f5f5f5;
                padding: 20px 30px;
                text-align: center;
                font-size: 12px;
                color: #999;
            }}
            .cta-button {{
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: 600;
                margin-top: 20px;
                transition: transform 0.2s;
            }}
            .cta-button:hover {{
                transform: translateY(-2px);
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <h1>Booking Confirmed!</h1>
                <div class="confirmation-badge">✓ Ready to Go</div>
            </div>

            <!-- Body -->
            <div class="body">
                <div class="greeting">
                    <p>Hi {name},</p>
                    <p>Thank you for your booking! We're excited to have you at our event. Here are your booking details:</p>
                </div>

                <!-- Event Details Section -->
                <div class="section">
                    <div class="section-title">Event Information</div>
                    <div class="event-name">{event.get('event_name', 'N/A')}</div>
                    <span class="event-category">{event.get('category', 'N/A')}</span>
                    <div class="info-row">
                        <div class="info-label">Code:</div>
                        <div class="info-value"><strong>{event.get('event_code', 'N/A')}</strong></div>
                    </div>
                </div>

                <!-- Date & Time Section -->
                <div class="section">
                    <div class="section-title">Date & Time</div>
                    <div class="info-row">
                        <div class="info-label">Date:</div>
                        <div class="info-value">{event.get('start_date', 'N/A')}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Time:</div>
                        <div class="info-value">{event.get('start_time', 'N/A')}</div>
                    </div>
                </div>

                <!-- Venue Section -->
                <div class="section">
                    <div class="section-title">Venue Location</div>
                    <div class="info-row">
                        <div class="info-label">Venue:</div>
                        <div class="info-value">{event.get('venue', 'N/A')}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Address:</div>
                        <div class="info-value">{event.get('address', 'N/A')}</div>
                    </div>
                </div>

                <!-- Description Section -->
                <div class="section">
                    <div class="section-title">About This Event</div>
                    <div class="description">
                        {event.get('description', 'No description available')}
                    </div>
                </div>

                <!-- Amenities Section -->
                {f'''<div class="section">
                    <div class="section-title">Amenities</div>
                    <div class="amenities">
                        {' '.join([f'<span class="amenity-tag">{amenity.strip()}</span>' for amenity in event.get('amenities', '').split(',') if amenity.strip()])}
                    </div>
                </div>''' if event.get('amenities', '').strip() else ''}

                <center>
                    <a href="#" class="cta-button">View Full Details</a>
                </center>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p>If you have any questions, please don't hesitate to contact our support team.</p>
                <p>&copy; 2024 Your Event Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """

    # Send HTML email (make sure your send_email function supports HTML)
    send_email(email, subject, html_message, is_html=True)
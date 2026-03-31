from flask import Blueprint, jsonify,request
#from app.middleware.role_required import role_required
from datetime import datetime
from app.init_db import get_db_connection
super_admin_bp = Blueprint("super_admin", __name__)

#@role_required("super_admin")

@super_admin_bp.route("/api/events_detail", methods=["GET"])
def events():

    db = get_db_connection()
    cursor = db.cursor()

    try:

        cursor.execute("""
            SELECT id, event_code, event_name 
            FROM event_details_table
        """)

        rows = cursor.fetchall()
        print("Event",rows)

        events = []

        for row in rows:
            events.append({
                "id": row[0],
                "event_code": row[1],
                "event_name": row[2]
            })

        return jsonify({
            "status": "success",
            "data": events
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    finally:
        cursor.close()
        db.close()

@super_admin_bp.route("/api/live_food_count", methods=["POST"])
def get_live_food_count():

    db = get_db_connection()
    cursor = db.cursor()

    try:

        data = request.json

        event_id = data.get("event_id")
        meal_time = data.get("meal_time")
        meal_type = data.get("meal_type")

        cursor.execute("""
            SELECT guests_inside, total_capacity, waiting_outside
            FROM food_live_count
            WHERE event_id=%s AND meal_time=%s AND meal_type=%s
        """,(event_id, meal_time, meal_type))

        row = cursor.fetchone()
        print("Food",row)

        if row:

            result = {
                "guests_inside": row[0],
                "total_capacity": row[1],
                "waiting_outside": row[2]
            }

        else:

            result = {
                "guests_inside": 0,
                "total_capacity": 0,
                "waiting_outside": 0
            }

        return jsonify({
            "status": "success",
            "data": result
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    finally:
        cursor.close()
        db.close()

# -----------------------------------
# GET COUNTRIES
# -----------------------------------

@super_admin_bp.route("/api/countries", methods=["GET"])
def get_countries():

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM countries")

        data = cursor.fetchall()

        return jsonify(data)

    except Exception as e:

        return jsonify({"error": str(e)})

    finally:

        cursor.close()
        conn.close()


# -----------------------------------
# GET STATES
# -----------------------------------

@super_admin_bp.route("/api/states/<country_id>", methods=["GET"])
def get_states(country_id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM states WHERE country_id=%s",
            (country_id,)
        )

        data = cursor.fetchall()

        return jsonify(data)

    except Exception as e:

        return jsonify({"error": str(e)})

    finally:

        cursor.close()
        conn.close()


# -----------------------------------
# GET CITIES
# -----------------------------------

@super_admin_bp.route("/api/cities/<state_id>", methods=["GET"])
def get_cities(state_id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM cities WHERE state_id=%s",
            (state_id,)
        )

        data = cursor.fetchall()

        return jsonify(data)

    except Exception as e:

        return jsonify({"error": str(e)})

    finally:

        cursor.close()
        conn.close()


# -----------------------------------
# CREATE VENUE
# -----------------------------------
@super_admin_bp.route("/api/create_venue", methods=["POST"])
def create_venue():

    try:

        data = request.json
        print("Create", data)

        venue_name = data.get("venue_name")
        address = data.get("address")
        country_id = data.get("country")
        state_id = data.get("state")
        city_id = data.get("city")
        status = data.get("status")
        venue_image = data.get("venue_image")

        documents = data.get("documents")

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # get country name
        cursor.execute(
            "SELECT country_name FROM countries WHERE id=%s",
            (country_id,)
        )
        country = cursor.fetchone()["country_name"]

        # get state name
        cursor.execute(
            "SELECT state_name FROM states WHERE id=%s",
            (state_id,)
        )
        state = cursor.fetchone()["state_name"]

        # get city name
        cursor.execute(
            "SELECT city_name FROM cities WHERE id=%s",
            (city_id,)
        )
        city = cursor.fetchone()["city_name"]

        # generate venue code
        cursor.execute("SELECT MAX(id) as max_id FROM venues")
        result = cursor.fetchone()

        new_number = (result["max_id"] or 0) + 1
        venue_code = f"VEN-{new_number}"

        # insert venue
        cursor.execute(
            """
            INSERT INTO venues
            (venue_code,venue_name,address,country_name,state_name,city_name,venue_image,status)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                venue_code,
                venue_name,
                address,
                country,
                state,
                city,
                venue_image,
                status
            )
        )

        venue_id = cursor.lastrowid

        # insert documents
        if documents:

            for doc in documents:

                cursor.execute(
                    """
                    INSERT INTO venue_documents
                    (venue_id,document_type,document_number,document_file)
                    VALUES (%s,%s,%s,%s)
                    """,
                    (
                        venue_id,
                        doc["document_type"],
                        doc["document_number"],
                        doc["document_file"]
                    )
                )

        conn.commit()

        return jsonify({
            "message": "Venue Created",
            "venue_code": venue_code
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })

    finally:

        cursor.close()
        conn.close()


# -----------------------------------
# GET VENUE LIST
# -----------------------------------

@super_admin_bp.route("/api/venues", methods=["GET"])
def get_venues():

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT id,venue_code,venue_name,address,status FROM venues"
        )

        data = cursor.fetchall()
        print(data)

        return jsonify(data)

    except Exception as e:

        return jsonify({"error": str(e)})

    finally:

        cursor.close()
        conn.close()


# -----------------------------------
# VIEW VENUE DETAILS
# -----------------------------------

@super_admin_bp.route("/api/venuedetail/<id>", methods=["GET"])
def venue_details(id):

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM venues WHERE id=%s",
            (id,)
        )

        venue = cursor.fetchone()

        cursor.execute(
            "SELECT * FROM venue_documents WHERE venue_id=%s",
            (id,)
        )

        docs = cursor.fetchall()

        return jsonify({
            "venue": venue,
            "documents": docs
        })

    except Exception as e:

        return jsonify({"error": str(e)})

    finally:

        cursor.close()
        conn.close()


@super_admin_bp.route("/api/create_sponsor", methods=["POST"])
def create_sponsor_detail():

    conn = None
    cursor = None

    try:

        data = request.json
        print("Data:", data)

        sponsor_name = data["sponsor_name"]
        primary_contact = data["primary_contact"]
        secondary_contact = data.get("secondary_contact")
        mail_id = data["mail_id"]
        address = data["address"]
        status = data.get("status", "Active")

        conn = get_db_connection()
        cursor = conn.cursor()

        # Generate sponsor code
        cursor.execute("SELECT COUNT(*) FROM sponsors_details")
        count = cursor.fetchone()[0] + 1

        sponsor_code = f"SP{str(count).zfill(4)}"

        cursor.execute(
            """
            INSERT INTO sponsors_details
            (sponsor_code, sponsor_name, primary_contact, secondary_contact, mail_id, address, status)
            VALUES (%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                sponsor_code,
                sponsor_name,
                primary_contact,
                secondary_contact,
                mail_id,
                address,
                status
            )
        )

        conn.commit()

        return jsonify({
            "status": "success",
            "message": "Sponsor created successfully"
        }), 201

    except Exception as e:

        print("ERROR:", str(e))

        if conn:
            conn.rollback()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()

@super_admin_bp.route("/api/sponsors", methods=["GET"])
def get_sponsors():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM sponsors_details ORDER BY id DESC")

    sponsors = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(sponsors)

@super_admin_bp.route("/api/sponsor/<int:id>", methods=["GET"])
def view_sponsor(id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM sponsors_details WHERE id=%s",
        (id,)
    )

    sponsor = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(sponsor)

@super_admin_bp.route("/api/create_vendor", methods=["POST"])
def create_vendor():

    conn = None
    cursor = None

    try:

        data = request.json
        print("Data",data)

        vendor_type = data["vendor_type"]
        vendor_name = data["vendor_name"]
        company_name = data["company_name"]
        primary_contact = data["primary_contact"]
        secondary_contact = data.get("secondary_contact")
        mail_id = data["mail_id"]
        address = data["address"]

        bank_name = data.get("bank_name")
        account_holder = data.get("account_holder")
        ifsc_code = data.get("ifsc_code")
        account_number = data.get("account_number")

        status = data.get("status", "Active")

        documents = data.get("documents", [])

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO vendor_details
        (vendor_type,vendor_name,company_name,primary_contact,secondary_contact,mail_id,address,
        bank_name,account_holder,ifsc_code,account_number,status)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """,(
            vendor_type,
            vendor_name,
            company_name,
            primary_contact,
            secondary_contact,
            mail_id,
            address,
            bank_name,
            account_holder,
            ifsc_code,
            account_number,
            status
        ))

        vendor_id = cursor.lastrowid

        # Insert Documents

        for doc in documents:

            cursor.execute("""
            INSERT INTO vendor_documents
            (vendor_id,document_type,document_number,document_file)
            VALUES (%s,%s,%s,%s)
            """,(
                vendor_id,
                doc["document_type"],
                doc["document_number"],
                doc["document_file"]
            ))

        conn.commit()

        return jsonify({
            "status":"success",
            "message":"Vendor created successfully"
        })

    except Exception as e:

        if conn:
            conn.rollback()

        return jsonify({
            "status":"error",
            "message":str(e)
        }),500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()

@super_admin_bp.route("/api/vendors", methods=["GET"])
def get_vendors():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
    SELECT id,vendor_name,primary_contact,mail_id,address,status
    FROM vendor_details
    ORDER BY id DESC
    """)

    vendors = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(vendors)
@super_admin_bp.route("/api/vendor/<int:id>", methods=["GET"])
def view_vendor(id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM vendor_details WHERE id=%s",(id,)
    )

    vendor = cursor.fetchone()

    cursor.execute(
        "SELECT * FROM vendor_documents WHERE vendor_id=%s",(id,)
    )

    documents = cursor.fetchall()

    vendor["documents"] = documents

    cursor.close()
    conn.close()

    return jsonify(vendor)

@super_admin_bp.route("/api/venues_details", methods=["GET"])
def get_venues_detail():

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT id, venue_name, city_name FROM venues WHERE status='active'")
    venues = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(venues)
@super_admin_bp.route("/api/create_policy", methods=["POST"])
def create_policy():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # ✅ Generate POLICY CODE (POL-1, POL-2...)
        cursor.execute("SELECT MAX(id) as max_id FROM policies")
        result = cursor.fetchone()

        new_number = (result["max_id"] or 0) + 1
        policy_code = f"POL-{new_number}"

        # ✅ INSERT
        cursor.execute("""
            INSERT INTO policies 
            (policy_code, policy_name, policy_type, policy_group, description, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            policy_code,
            data.get("policy_name"),
            data.get("policy_type"),
            data.get("policy_group"),
            data.get("description"),
            data.get("status", "Active")
        ))

        conn.commit()

        return jsonify({
            "message": "Policy created successfully",
            "policy_code": policy_code
        }), 201

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "error": "Failed to create policy",
            "details": str(e)
        }), 500

    finally:
        cursor.close()
        conn.close()


# GET ALL
@super_admin_bp.route("/api/policies", methods=["GET"])
def get_policies():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM policies")
    return jsonify(cursor.fetchall())


# GET SINGLE
@super_admin_bp.route("/api/policy/<int:id>", methods=["GET"])
def get_policy(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM policies WHERE id=%s", (id,))
    return jsonify(cursor.fetchone())
import datetime as dt

def format_date(date_str):
    if not date_str:
        return None

    formats = [
        "%Y-%m-%d",   # 2026-03-17
        "%d/%m/%Y",   # 17/03/2026
        "%d-%m-%Y",   # 17-03-2026
    ]

    for fmt in formats:
        try:
            return dt.datetime.strptime(date_str, fmt).date()
        except:
            continue

    print("Date format error: Unsupported format ->", date_str)
    return None

def format_time(time_str):
    if not time_str:
        return None

    formats = [
        "%H:%M",        # 14:30
        "%I:%M %p",     # 02:30 PM
    ]

    for fmt in formats:
        try:
            return dt.datetime.strptime(time_str, fmt).time()
        except:
            continue

    print("Time format error: Unsupported format ->", time_str)
    return None

@super_admin_bp.route("/api/event-details", methods=["POST"])
def save_event_details():
    try:
        data = request.json
        print("Event_data",data)

        conn = get_db_connection()
        cursor = conn.cursor()

        # 🔹 INSERT EVENT
        insert_query = """
        INSERT INTO event_details_table (
            category, event_name, description, amenities, tags,
            visibility, include_program,
            mail, whatsapp, print,
            visitor_mail, visitor_name, visitor_photo, visitor_mobile, document_proof,
            day_pass, is_international_include,
            aadhar, passport,
            welcome_kit, food,
            event_type, occurrence,
            start_date, start_time, end_date, end_time,
            venue, address
        )
        VALUES (%s, %s, %s, %s, %s,
                %s, %s,
                %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s, %s,
                %s, %s,
                %s, %s,
                %s, %s,
                %s, %s, %s, %s,
                %s, %s)
        """

        values = (
            data.get("category"),
            data.get("eventName"),
            data.get("description"),
            ",".join(data.get("amenities", [])),
            ",".join(data.get("tags", [])),

            data.get("visibility"),
            str(data.get("includeProgram", False)),

            data.get("mail", False),
            data.get("whatsapp", False),
            data.get("print", False),

            data.get("visitorMail", False),
            data.get("visitorName", False),
            data.get("visitorPhoto", False),
            data.get("visitorMobile", False),
            data.get("documentProof", False),

            data.get("dayPass", False),
            data.get("isInternationalInclude", False),

            data.get("aadhar", False),
            data.get("passport", False),

            data.get("welcomeKit", False),
            data.get("food", False),

            data.get("eventType"),
            data.get("occurrence"),

            format_date(data.get("startDate")),
            format_time(data.get("startTime")),
            format_date(data.get("endDate")),
            format_time(data.get("endTime")),

            data.get("venue"),
            data.get("address"),
        )

        cursor.execute(insert_query, values)
        conn.commit()

        # 🔹 GET ID
        event_id = cursor.lastrowid

        # 🔹 GENERATE EVENT CODE
        event_code = f"EVT-{str(event_id).zfill(4)}"

        # 🔹 UPDATE EVENT CODE
        cursor.execute(
            "UPDATE event_details_table SET event_code=%s WHERE id=%s",
            (event_code, event_id)
        )
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Event created successfully",
            "event_id": event_id,
            "event_code": event_code
        }), 201

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
def format_datetime(dt_str):
    try:
        if dt_str:
            return datetime.strptime(dt_str, "%Y-%m-%dT%H:%M")
    except Exception as e:
        print("Datetime error:", e)
    return None



@super_admin_bp.route("/api/booking", methods=["POST"])
def save_booking_details():
    try:
        data = request.json
        print("Booking Data:", data)

        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
        INSERT INTO event_booking_details (
            event_id,
            booking_start_date, booking_end_date,
            capacity, pass_type,

            title, title_type, title_selection,
            designation, designation_type, designation_selection,
            company, company_type, company_selection,

            entry_type,

            charge_type, max_pass,
            razorpay_key,
            include_tax,

            price_type, currency,
            early_bird_expire
        )
        VALUES (%s, %s, %s, %s, %s,
                %s, %s, %s,
                %s, %s, %s,
                %s, %s, %s,
                %s,
                %s, %s,
                %s,
                %s,
                %s, %s,
                %s)
        """

        values = (
            data.get("event_id"),

            format_date(data.get("bookingStartDate")),
            format_date(data.get("bookingEndDate")),

            data.get("capacity"),
            data.get("passType"),

            data.get("title"),
            data.get("titleType"),
            data.get("titleSelection"),

            data.get("designation"),
            data.get("designationType"),
            data.get("designationSelection"),

            data.get("company"),
            data.get("companyType"),
            data.get("companySelection"),

            data.get("entryType"),

            data.get("chargeType"),
            data.get("maxPass"),

            data.get("razorpayKey"),

            data.get("includeTax", False),

            data.get("priceType"),
            data.get("currency"),

            format_datetime(data.get("earlyBirdExpire"))
        )

        cursor.execute(insert_query, values)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Booking saved successfully"}), 201

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

@super_admin_bp.route("/api/layout", methods=["POST"])
def save_layout():
    try:
        data = request.json
        print("Layout Data:", data)

        event_id = data.get("event_id")

        conn = get_db_connection()
        cursor = conn.cursor()

        # -------------------------
        # INSERT LAYOUT MASTER
        # -------------------------
        layout_query = """
        INSERT INTO event_layout (
            event_id,
            floor_type,
            day_based,
            person_pass,
            include_tax
        ) VALUES (%s, %s, %s, %s, %s)
        """

        cursor.execute(layout_query, (
            event_id,
            data.get("floorType"),
            data.get("dayBased"),
            data.get("personPass"),
            data.get("includeTax")
        ))

        # -------------------------
        # INSERT STALLS
        # -------------------------
        stalls = data.get("stalls", [])

        for stall in stalls:
            stall_query = """
            INSERT INTO event_stalls (
                event_id,
                stall_name,
                stall_size,
                size_range,
                visibility,
                stall_type,
                price_inr,
                price_usd,
                prime_seat,
                prime_price_inr,
                prime_price_usd
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """

            cursor.execute(stall_query, (
                event_id,
                stall.get("stallName"),
                stall.get("size"),
                stall.get("sizeRange"),
                stall.get("visibility"),
                stall.get("type"),
                stall.get("priceINR"),
                stall.get("priceUSD"),
                stall.get("primeSeat"),
                stall.get("primePriceINR"),
                stall.get("primePriceUSD")
            ))

        # -------------------------
        # INSERT AMENITIES
        # -------------------------
        amenities = data.get("amenities", [])

        for a in amenities:
            amenity_query = """
            INSERT INTO stall_amenities (
                event_id,
                stall_name,
                amenity,
                qty
            ) VALUES (%s, %s, %s, %s)
            """

            cursor.execute(amenity_query, (
                event_id,
                a.get("stallName"),
                a.get("amenity"),
                a.get("qty")
            ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Layout saved successfully"}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
import os
from werkzeug.utils import secure_filename

BASE_UPLOAD = "app/uploads"

PHOTO_FOLDER = os.path.join(BASE_UPLOAD, "photos")
VIDEO_FOLDER = os.path.join(BASE_UPLOAD, "videos")
DOC_FOLDER = os.path.join(BASE_UPLOAD, "documents")

os.makedirs(PHOTO_FOLDER, exist_ok=True)
os.makedirs(VIDEO_FOLDER, exist_ok=True)
os.makedirs(DOC_FOLDER, exist_ok=True)

def get_file_folder(file):
    content_type = file.content_type

    if content_type.startswith("image"):
        return PHOTO_FOLDER, "image"

    elif content_type.startswith("video"):
        return VIDEO_FOLDER, "video"

    else:
        return DOC_FOLDER, "document"

@super_admin_bp.route("/upload/all-docs", methods=["POST"])
def upload_all_docs():
    try:
        event_id = request.form.get("event_id")

        conn = get_db_connection()
        cursor = conn.cursor()

        # =========================
        # 🔥 BANNER
        # =========================
        banner = request.files.get("banner")

        if banner:
            folder, file_type = get_file_folder(banner)

            filename = secure_filename(banner.filename)
            path = os.path.join(folder, filename)

            banner.save(path)

            cursor.execute("""
                INSERT INTO event_files (event_id, file_name, file_path, file_type)
                VALUES (%s, %s, %s, %s)
            """, (event_id, filename, path, "banner"))

        # =========================
        # 🔥 DOCUMENTS
        # =========================
        doc_count = int(request.form.get("doc_count", 0))

        for i in range(doc_count):
            file = request.files.get(f"docs_{i}")
            doc_type = request.form.get(f"doc_type_{i}")
            doc_number = request.form.get(f"doc_number_{i}")

            if file:
                folder, file_category = get_file_folder(file)

                filename = secure_filename(file.filename)
                path = os.path.join(folder, filename)

                file.save(path)

                cursor.execute("""
                    INSERT INTO event_files 
                    (event_id, file_name, file_path, file_type, doc_type, doc_number)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    event_id,
                    filename,
                    path,
                    file_category,   # 🔥 dynamic type
                    doc_type,
                    doc_number
                ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Uploaded successfully"})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@super_admin_bp.route("/api/save-terms", methods=["POST"])
def save_terms():
    try:
        data = request.json
        print("terms",data)

        event_id = data.get("event_id")
        terms = data.get("terms", [])

        conn = get_db_connection()
        cursor = conn.cursor()

        insert_query = """
        INSERT INTO event_terms (event_id, policy_group, policy_type, policy_name)
        VALUES (%s, %s, %s, %s)
        """

        for term in terms:
            cursor.execute(insert_query, (
                event_id,
                term.get("policyGroup"),
                term.get("policyType"),
                term.get("policyName")
            ))

        conn.commit()

        return jsonify({"message": "Terms saved successfully"})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


@super_admin_bp.route("/api/all-policies", methods=["GET"])
def get_all_policies():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT policy_group, policy_type, policy_name
            FROM policies
            WHERE status='Active'
        """)

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        # 🔥 Convert to nested JSON
        data = {}

        for row in rows:
            group = row["policy_group"]
            type_ = row["policy_type"]
            name = row["policy_name"]

            if group not in data:
                data[group] = {}

            if type_ not in data[group]:
                data[group][type_] = []

            data[group][type_].append(name)

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# ✅ Get Vendor Types
@super_admin_bp.route("/api/get-vendor-types", methods=["GET"])
def get_vendor_types():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT id,vendor_type FROM vendor_details")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


# ✅ Get Vendor Names based on type
@super_admin_bp.route("/api/get-vendor-names/<vendor_type>", methods=["GET"])
def get_vendor_names(vendor_type):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT vendor_name FROM vendor_details WHERE vendor_type=%s",
        (vendor_type,)
    )
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


# ✅ Get Sponsor Names
@super_admin_bp.route("/api/get-sponsor-names", methods=["GET"])
def get_sponsor_names():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT DISTINCT sponsor_name FROM sponsors_details")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)
# =========================
# SAVE VENDORS + SPONSORS + GUESTS
# =========================
@super_admin_bp.route("/api/save-vendors-sponsors", methods=["POST"])
def save_vendors():
    try:
        data = request.json
        event_id = data.get("event_id")
        vendor_data = data.get("vendors", {})

        # 🔥 HANDLE BOTH CASES
        if isinstance(vendor_data, list):
            vendors = vendor_data
            sponsors = []
            guests = []
        else:
            vendors = vendor_data.get("vendors", [])
            sponsors = vendor_data.get("sponsors", [])
            guests = vendor_data.get("guests", [])

        conn = get_db_connection()
        cursor = conn.cursor()

        # =========================
        # CLEAR OLD DATA (IMPORTANT)
        # =========================
        cursor.execute("DELETE FROM event_vendors WHERE event_id=%s", (event_id,))
        cursor.execute("DELETE FROM event_sponsors WHERE event_id=%s", (event_id,))
        cursor.execute("DELETE FROM event_guests WHERE event_id=%s", (event_id,))

        # =========================
        # INSERT VENDORS
        # =========================
        for v in vendors:
            cursor.execute("""
                INSERT INTO event_vendors (event_id, vendor_type, vendor_name, pass_count)
                VALUES (%s, %s, %s, %s)
            """, (
                event_id,
                v.get("vendorType"),
                v.get("vendorName"),
                v.get("passCount", 0)
            ))

        # =========================
        # INSERT SPONSORS
        # =========================
        for s in sponsors:
            cursor.execute("""
                INSERT INTO event_sponsors (event_id, sponsor_name, sponsorship_type)
                VALUES (%s, %s, %s)
            """, (
                event_id,
                s.get("sponsorName"),
                s.get("sponsorship")
            ))

        # =========================
        # INSERT GUESTS
        # =========================
        for g in guests:
            cursor.execute("""
                INSERT INTO event_guests (event_id, guest_name, designation, contact, image)
                VALUES (%s, %s, %s, %s, %s)
            """, (
                event_id,
                g.get("name"),
                g.get("designation"),
                g.get("contact"),
                g.get("image")
            ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Vendors, Sponsors, Guests saved successfully"}), 200

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

import datetime as dt

@super_admin_bp.route("/event/final-submit", methods=["POST"])
def final_submit():
    try:
        data = request.json
        event_id = data.get("event_id")

        print("DATA:", data)

        if not event_id:
            return jsonify({"error": "event_id is required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE event_details_table
            SET status = %s
            WHERE id = %s
        """, ("PENDING", event_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Event submitted successfully",
            "status": "PENDING",
            "event_id": event_id
        }), 200

    except Exception as e:
        print("FINAL SUBMIT ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

from flask import send_from_directory
import datetime
# =====================================================
# ✅ ABSOLUTE UPLOAD FOLDER
# =====================================================
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.abspath(os.path.join(BASE_DIR, "..", "uploads"))

# Example:
# D:/Project/app/super_admin → BASE_DIR
# D:/Project/app/uploads → UPLOAD_FOLDER


# =====================================================
# ✅ SERVE UPLOADED FILES (IMAGES / VIDEOS / DOCS)
# =====================================================
@super_admin_bp.route("/uploads/<path:filename>")
def serve_file(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        print("FILE ERROR:", e)
        return jsonify({"error": "File not found"}), 404


# =====================================================
# ✅ GET EVENTS WITH BANNER IMAGE
# =====================================================
@super_admin_bp.route("/get-events", methods=["GET"])
def get_events():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT 
            e.id,
            e.status,
            e.event_name,
            e.start_date,
            e.start_time,
            e.venue,
            e.address,
            f.file_path,
            b.capacity
        FROM event_details_table e
        LEFT JOIN event_files f 
            ON e.id = f.event_id AND f.file_type = 'banner'
        LEFT JOIN event_booking_details b
            ON e.id = b.event_id
        ORDER BY e.id DESC
        """

        cursor.execute(query)
        data = cursor.fetchall()

        for row in data:

            # =========================
            # ✅ DATE FIX
            # =========================
            if row["start_date"]:
                row["start_date"] = row["start_date"].strftime("%Y-%m-%d")

            # =========================
            # ✅ TIME FIX
            # =========================
            if row["start_time"]:
                if isinstance(row["start_time"], datetime.timedelta):
                    total_seconds = int(row["start_time"].total_seconds())
                    hours = total_seconds // 3600
                    minutes = (total_seconds % 3600) // 60
                    row["start_time"] = f"{hours:02}:{minutes:02}"
                else:
                    row["start_time"] = str(row["start_time"])

            # =========================
            # ✅ IMAGE PATH FIX (IMPORTANT)
            # =========================
            if row["file_path"]:
                # Convert: app/uploads/photos/img.jpg → photos/img.jpg
                relative_path = os.path.relpath(row["file_path"], "app/uploads")

                row["banner_url"] = f"http://127.0.0.1:5000/superadmin/uploads/{relative_path}"
            else:
                row["banner_url"] = None

        cursor.close()
        conn.close()

        return jsonify(data), 200

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500

@super_admin_bp.route("/home/get-events", methods=["GET"])
def get_home_events():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT 
            e.id,
            e.status,
            e.event_name,
            e.start_date,
            e.start_time,
            e.venue,
            e.address,
            f.file_path,
            b.capacity
        FROM event_details_table e
        LEFT JOIN event_files f 
            ON e.id = f.event_id AND f.file_type = 'banner'
        LEFT JOIN event_booking_details b
            ON e.id = b.event_id
        WHERE e.status = 'APPROVED'
        ORDER BY e.id DESC
        """

        cursor.execute(query)
        data = cursor.fetchall()

        for row in data:

            # =========================
            # ✅ DATE FIX
            # =========================
            if row["start_date"]:
                row["start_date"] = row["start_date"].strftime("%Y-%m-%d")

            # =========================
            # ✅ TIME FIX
            # =========================
            if row["start_time"]:
                if isinstance(row["start_time"], datetime.timedelta):
                    total_seconds = int(row["start_time"].total_seconds())
                    hours = total_seconds // 3600
                    minutes = (total_seconds % 3600) // 60
                    row["start_time"] = f"{hours:02}:{minutes:02}"
                else:
                    row["start_time"] = str(row["start_time"])

            # =========================
            # ✅ IMAGE PATH FIX (IMPORTANT)
            # =========================
            if row["file_path"]:
                # Convert: app/uploads/photos/img.jpg → photos/img.jpg
                relative_path = os.path.relpath(row["file_path"], "app/uploads")

                row["banner_url"] = f"http://127.0.0.1:5000/superadmin/uploads/{relative_path}"
            else:
                row["banner_url"] = None

        cursor.close()
        conn.close()

        return jsonify(data), 200

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


from datetime import timedelta

@super_admin_bp.route('/booking/event/<int:event_id>', methods=['GET'])
def get_event_booking(event_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM event_details_table WHERE id=%s", (event_id,))
    event = cursor.fetchone()

    if event:
        for key, value in event.items():
            if isinstance(value, timedelta):
                # Convert to HH:MM:SS format
                event[key] = str(value)

    return jsonify(event)

@super_admin_bp.route('/api/admin/booking/<int:id>', methods=['GET'])
def get_single_booking(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT * FROM Exhibitor_stall_bookings
            WHERE id = %s
        """
        cursor.execute(query, (id,))
        booking = cursor.fetchone()

        if not booking:
            return jsonify({"message": "Booking not found"}), 404

        return jsonify(booking), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@super_admin_bp.route('/api/admin/bookings', methods=['GET'])
def get_all_bookings():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM Exhibitor_stall_bookings ORDER BY created_at DESC")
        bookings = cursor.fetchall()

        return jsonify(bookings), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@super_admin_bp.route('/api/admin/update-booking-status/<int:id>', methods=['PUT'])
def update_booking_status(id):
    try:
        data = request.json
        status = data.get("status")

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            UPDATE Exhibitor_stall_bookings
            SET status = %s
            WHERE id = %s
        """
        cursor.execute(query, (status, id))
        conn.commit()

        return jsonify({"message": "Status updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
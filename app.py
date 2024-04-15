# # from flask import Flask, request, jsonify
# # from flask_cors import CORS

# # app = Flask(__name__)
# # CORS(app)

# # # Dummy user data
# # users = {
# #     "user1": "password123",
# #     "user2": "password456",
# #     "adminUser": "password456",
# # }

# # @app.route('/verify_login', methods=['POST'])
# # def verify_login():
# #     data = request.json
# #     username = data.get('username')
# #     password = data.get('password')

# #     # This is a simplified example; you should check your user database or authentication source
# #     if username in users and users[username] == password:
# #         # Determine role; this should be based on your user data
# #         role = "admin" if username == "adminUser" else "student"
# #         return jsonify({"success": True, "role": role})
# #     else:
# #         return jsonify({"success": False})




# # courses = [
# #     {
# #         "id": 1,
# #         "name": "Introduction to Python",
# #         "description": "Learn the basics of Python programming.",
# #         "image": "https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/Banner-10.png",
# #         "duration": "5 weeks",
# #         "learningObjectives": ["Basic syntax", "Data structures", "Function definitions"],
# #         "fees": "$99",
# #         "schedule": "Mondays and Wednesdays, 7-9 PM"
# #     },
# #     {
# #         "id": 2,
# #         "name": "Web Development with Flask",
# #         "description": "Develop web applications using Flask.",
# #         "image": "https://www.schoolofit.co.za/wp-content/uploads/2020/03/Flask-courses-806x393.png",
# #         "duration": "6 weeks",
# #         "learningObjectives": ["Flask basics", "Templates", "Database integration"],
# #         "fees": "$120",
# #         "schedule": "Tuesdays and Thursdays, 6-8 PM"
# #     },
# #     {
# #         "id": 3,
# #         "name": "Advanced Machine Learning",
# #         "description": "Explore advanced topics in machine learning.",
# #         "image": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*cG6U1qstYDijh9bPL42e-Q.jpeg",
# #         "duration": "8 weeks",
# #         "learningObjectives": ["Neural networks", "Deep learning", "TensorFlow"],
# #         "fees": "$150",
# #         "schedule": "Fridays, 5-8 PM"
# #     },
# # ]

# # @app.route('/api/courses', methods=['GET'])
# # def get_courses():
# #     return jsonify(courses)


# # # Dummy data structure to store enrollments
# # enrollments = []

# # @app.route('/api/enroll', methods=['POST'])
# # def enroll_course():
# #     data = request.json
# #     # Check if the user is already enrolled in the course
# #     print(data)
# #     for enrollment in enrollments:
# #         if enrollment['username'] == data['username'] and enrollment['course_id'] == data['courseId']:
# #             return jsonify({"message": "Already enrolled in this course"}), 409

# #     enrollments.append({
# #         'username': data['username'],
# #         'course_id': data['courseId']
# #     })
# #     return jsonify({"message": "Enrollment successful", "data": data}), 200


# # @app.route('/api/enrollments', methods=['GET'])
# # def get_enrollments():
# #     # Add course details to each enrollment
# #     detailed_enrollments = []
# #     for enrollment in enrollments:
# #         course = next((c for c in courses if c["id"] == enrollment["course_id"]), None)
# #         if course:
# #             detailed_enrollments.append({
# #                 'username': enrollment['username'],
# #                 'course_name': course['name']
# #             })
# #     return jsonify(detailed_enrollments)


# # if __name__ == '__main__':
# #     app.run(debug=True)
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import csv
# import codecs

# app = Flask(__name__)
# CORS(app)

# # File paths
# USERS_CSV_FILE = 'users.csv'
# ENROLLMENTS_CSV_FILE = 'enrollments.csv'
# COURSES_CSV_FILE = 'courses.csv'

# # Read users from CSV
# def read_users_from_csv():
#     users = {}
#     with codecs.open(USERS_CSV_FILE, 'r', encoding='utf-8-sig') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             users[row['username']] = {'password': row['password'], 'role': row['role']}
#     return users

# # Read courses from CSV
# def read_courses_from_csv():
#     courses = []
#     with codecs.open(COURSES_CSV_FILE, 'r', encoding='utf-8-sig') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             courses.append({
#                 'id': int(row['id']),
#                 'name': row['name'],
#                 'description': row['description'],
#                 'image': row['image'],
#                 'duration': row['duration'],
#                 'learningObjectives': row['learningObjectives'].split(','),
#                 'fees': row['fees'],
#                 'schedule': row['schedule']
#             })
#     return courses

# # Write enrollment to CSV
# def write_enrollment_to_csv(enrollment):
#     with open(ENROLLMENTS_CSV_FILE, 'a', newline='') as file:
#         fieldnames = ['username', 'course_id']
#         writer = csv.DictWriter(file, fieldnames=fieldnames)
#         writer.writerow({'username': enrollment['username'], 'course_id': enrollment['course_id']})

# # Initialize users, courses, and enrollments
# users = read_users_from_csv()
# courses = read_courses_from_csv()
# enrollments = []

# @app.route('/verify_login', methods=['POST'])
# def verify_login():
#     data = request.json
#     username = data.get('username')
#     password = data.get('password')

#     if username in users and users[username]['password'] == password:
#         return jsonify({"success": True, "role": users[username]['role']})
#     else:
#         return jsonify({"success": False})

# @app.route('/api/courses', methods=['GET'])
# def get_courses():
#     return jsonify(courses)

# @app.route('/api/enroll', methods=['POST'])
# def enroll_course():
#     data = request.json
#     username = data['username']
#     course_id = data['courseId']

#     for enrollment in enrollments:
#         if enrollment['username'] == username and enrollment['course_id'] == course_id:
#             return jsonify({"message": "Already enrolled in this course"}), 409

#     enrollments.append({'username': username, 'course_id': course_id})
#     write_enrollment_to_csv({'username': username, 'course_id': course_id})

#     return jsonify({"message": "Enrollment successful", "data": data}), 200

# @app.route('/api/enrollments', methods=['GET'])
# def get_enrollments():
#     detailed_enrollments = []
#     for enrollment in enrollments:
#         course = next((c for c in courses if c["id"] == enrollment["course_id"]), None)
#         if course:
#             detailed_enrollments.append({'username': enrollment['username'], 'course_name': course['name']})
#     return jsonify(detailed_enrollments)

# if __name__ == '__main__':
# #     app.run(debug=True)
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import csv

# app = Flask(__name__)
# CORS(app)

# # File paths
# USERS_CSV_FILE = 'users.csv'
# ENROLLMENTS_CSV_FILE = 'enrollments.csv'
# COURSES_CSV_FILE = 'courses.csv'

# # Read users from CSV
# def read_users_from_csv():
#     users = {}
#     with open(USERS_CSV_FILE, 'r', encoding='utf-8') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             users[row['username']] = {'password': row['password'], 'role': row['role']}
#     return users

# # Read courses from CSV
# def read_courses_from_csv():
#     courses = []
#     with open(COURSES_CSV_FILE, 'r', encoding='utf-8') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             courses.append({
#                 'id': int(row['id']),
#                 'name': row['name'],
#                 'description': row['description'],
#                 'image': row['image'],
#                 'duration': row['duration'],
#                 'learningObjectives': row['learningObjectives'].split(','),
#                 'fees': row['fees'],
#                 'schedule': row['schedule']
#             })
#     return courses

# # Write enrollment to CSV
# def write_enrollment_to_csv(enrollment):
#     with open(ENROLLMENTS_CSV_FILE, 'a', newline='') as file:
#         fieldnames = ['username', 'course_id']
#         writer = csv.DictWriter(file, fieldnames=fieldnames)
#         writer.writerow({'username': enrollment['username'], 'course_id': enrollment['course_id']})

# # Initialize users, courses, and enrollments
# users = read_users_from_csv()
# courses = read_courses_from_csv()
# enrollments = []

# @app.route('/verify_login', methods=['POST'])
# def verify_login():
#     data = request.json
#     username = data.get('username')
#     password = data.get('password')

#     if username in users and users[username]['password'] == password:
#         return jsonify({"success": True, "role": users[username]['role']})
#     else:
#         return jsonify({"success": False})

# @app.route('/api/courses', methods=['GET'])
# def get_courses():
#     return jsonify(courses)

# @app.route('/api/enroll', methods=['POST'])
# def enroll_course():
#     data = request.json
#     username = data['username']
#     course_id = data['courseId']

#     for enrollment in enrollments:
#         if enrollment['username'] == username and enrollment['course_id'] == course_id:
#             return jsonify({"message": "Already enrolled in this course"}), 409

#     enrollments.append({'username': username, 'course_id': course_id})
#     write_enrollment_to_csv({'username': username, 'course_id': course_id})

#     return jsonify({"message": "Enrollment successful", "data": data}), 200

# @app.route('/api/enrollments', methods=['GET'])
# def get_enrollments():
#     detailed_enrollments = []
#     for enrollment in enrollments:
#         course = next((c for c in courses if c["id"] == enrollment["course_id"]), None)
#         if course:
#             detailed_enrollments.append({'username': enrollment['username'], 'course_name': course['name']})
#     return jsonify(detailed_enrollments)

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

# File paths
USERS_CSV_FILE = 'users.csv'
ENROLLMENTS_CSV_FILE = 'enrollments.csv'
COURSES_CSV_FILE = 'courses.csv'

def read_users_from_csv():
    users = {}
    with open(USERS_CSV_FILE, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            users[row['username']] = {'password': row['password'], 'role': row['role']}
    return users

def read_courses_from_csv():
    courses = []
    with open(COURSES_CSV_FILE, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            courses.append({
                'id': int(row['id']),
                'name': row['name'],
                'description': row['description'],
                'image': row['image'],
                'duration': row['duration'],
                'learningObjectives': row['learningObjectives'].split(','),
                'fees': row['fees'],
                'schedule': row['schedule']
            })
    return courses

def read_enrollments_from_csv():
    enrollments = []
    with open(ENROLLMENTS_CSV_FILE, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            enrollments.append({'username': row['username'], 'course_id': row['course_id'], 'status': row['status'], 'paymentStatus': row.get('paymentStatus', 'unpaid')})
    return enrollments

def write_enrollment_to_csv(enrollment):
    with open(ENROLLMENTS_CSV_FILE, 'a', newline='', encoding='utf-8') as file:
        fieldnames = ['username', 'course_id', 'status', 'paymentStatus']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writerow({'username': enrollment['username'], 'course_id': enrollment['course_id'], 'status': 'pending', 'paymentStatus': 'unpaid'})

def send_email(subject, recipient, body):
    sender_email = 'mahavirkarthik27@msitprogram.net'
    sender_password = 'karthik@272'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient, msg.as_string())
        print(f"Email sent successfully to {recipient}")
    except Exception as e:
        print(f"Error sending email: {e}")
    finally:
        if server:
            server.quit()

def process_payment(username, course_id, paymentAmount):
    # Check if the course exists
    course_exists = any(course['id'] == int(course_id) for course in courses)
    if not course_exists:
        return False

    for enrollment in enrollments:
        if enrollment['username'] == username and enrollment['course_id'] == course_id:
            enrollment['paymentStatus'] = 'paid'
            
            with open(ENROLLMENTS_CSV_FILE, 'w', newline='', encoding='utf-8') as file:
                fieldnames = ['username', 'course_id', 'status', 'paymentStatus']
                writer = csv.DictWriter(file, fieldnames=fieldnames)
                writer.writeheader()
                for enrollment in enrollments:
                    writer.writerow(enrollment)
                    
            user_email = username
            subject = f"Payment Confirmation for Course ID {course_id}"
            body = f"Your payment for course ID {course_id} has been processed successfully."
            
            send_email(subject, user_email, body)
            
            return True
    return False


users = read_users_from_csv()
courses = read_courses_from_csv()
enrollments = read_enrollments_from_csv()

@app.route('/verify_login', methods=['POST'])
def verify_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in users and users[username]['password'] == password:
        return jsonify({"success": True, "role": users[username]['role']})
    else:
        return jsonify({"success": False})

@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify(courses)

@app.route('/api/enroll', methods=['POST'])
def enroll_course():
    data = request.json
    username = data['username']
    course_id = data['courseId']

    for enrollment in enrollments:
        if enrollment['username'] == username and enrollment['course_id'] == course_id:
            return jsonify({"message": "Already enrolled in this course"}), 409

    enrollments.append({'username': username, 'course_id': course_id, 'status': 'pending', 'paymentStatus': 'unpaid'})
    write_enrollment_to_csv({'username': username, 'course_id': course_id})

    return jsonify({"message": "Enrollment successful", "data": data}), 200

@app.route('/api/enrollments', methods=['GET'])
def get_enrollments():
    detailed_enrollments = []
    for enrollment in enrollments:
        course = next((c for c in courses if c["id"] == int(enrollment["course_id"])), None)
        if course:
            detailed_enrollments.append({'username': enrollment['username'], 'course_name': course['name'], 'status': enrollment['status'], 'paymentStatus': enrollment['paymentStatus']})
    return jsonify(detailed_enrollments)

@app.route('/api/enrollments/<username>/<course_id>', methods=['PUT'])
def update_enrollment_status(username, course_id):
    data = request.json
    status = data.get('status')
    paymentStatus = data.get('paymentStatus', 'unpaid')

    global enrollments  # Use global keyword to reference the global variable

    for enrollment in enrollments:
        if enrollment['username'] == username and enrollment['course_id'] == course_id:
            enrollment['status'] = status
            enrollment['paymentStatus'] = paymentStatus

    with open(ENROLLMENTS_CSV_FILE, 'w', newline='', encoding='utf-8') as file:
        fieldnames = ['username', 'course_id', 'status', 'paymentStatus']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for enrollment in enrollments:
            writer.writerow(enrollment)

    enrollments = read_enrollments_from_csv()

    user_email = data.get('userEmail')
    subject = f"Enrollment Status Update for Course ID {course_id}"
    body = f"Your enrollment for course ID {course_id} has been {status}. Payment Status: {paymentStatus}"
    
    send_email(subject, user_email, body)

    return jsonify({"message": "Enrollment status updated", "data": {'username': username, 'course_id': course_id, 'status': status, 'paymentStatus': paymentStatus}}), 200

@app.route('/api/payment', methods=['POST'])
def process_payment_endpoint():
    data = request.json
    username = data['username']
    course_id = data['courseId']
    paymentAmount = data['paymentAmount']

    if process_payment(username, course_id, paymentAmount):
        return jsonify({"message": "Payment processed successfully"}), 200
    else:
        return jsonify({"message": "Failed to process payment or course does not exist"}), 400

if __name__ == '__main__':
    app.run(debug=True)

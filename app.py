from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
#updates
# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

app = Flask(__name__)
CORS(app)
db_course=client["courses"]
db = client['my_database']
db_course1=client["courses1"]
just_courses=db_course1["courses"]
users_course=db_course['courses']
  # Replace 'my_database' with your database name
users_collection = db['users']
# Dummy user data
# users = {
#     "user1": "password123",
#     "user2": "password456",
#     "adminUser": "password456",
# }

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email=data.get("email")
    # designation=data.get("designation")
    # Check if user already exists
    if username=="adminUser":
        users_collection.insert_one({'username': username, 'password': password,"student_list":[]})
        return jsonify({"message": "User created successfully", "data": data}), 201
         
    if users_collection.find_one({'username': username}):
        return jsonify({"message": "User already exists"}), 400
    # Insert user data into MongoDB
    users_collection.insert_one({'username': username, 'password': password,"enrolled_courses":[],"pending_courses":[],"email":email})
    return jsonify({"message": "User created successfully", "data": data}), 201

# @app.route('/courses', methods=['POST'])
# def create_course():
#     data = request.json
#     courses = data.get('courses')

#     # Insert courses into the database
#     just_courses.insert_one({"courses": courses})

#     return jsonify({"message": "Courses created successfully", "data": data}), 201



@app.route('/verify_login', methods=['POST'])
def verify_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    userdata=users_collection.find_one({'username':username})
    # This is a simplified example; you should check your user database or authentication source
    if userdata is not None:
        if userdata["password"]==password:
        # Determine role; this should be based on your user data
            role = "admin" if username == "adminUser" else "student"
            return jsonify({"success": True, "role": role})
    else:
        return jsonify({"success": False})




courses = {
    
}

@app.route('/api/courses', methods=['GET'])
def get_courses():

    courses = users_course.find_one()  
    return jsonify(courses['courses'])

@app.route('/api/courses1', methods=['GET'])
def get_courses1():

    courses = just_courses.find_one()  
    return jsonify(courses['courses'])


# Dummy data structure to store enrollments
enrollments = []
@app.route('/api/enroll', methods=['POST'])
def enroll_course():
    data = request.json
    enroll_id = data.get('id')
    user_name = data.get('username')
    print(data)
    # Check if the user is already enrolled in the course
    courses = users_course.find_one() 
    courses = courses["courses"]
    
    # Get the course details for the given enrollment ID
    enrolled_course1 = courses.get(str(enroll_id))
    
    # Update the user's enrolled_course field in the collection
    # users_collection.update_one({'username': user_name}, {'$set': {'enrolled_course': enrolled_course}})
    
    admin=users_collection.find_one({"username":"adminUser"})
    print(admin)
    print(enrolled_course1)
    admin_courses=admin.get("student_list")
    admin_courses.append({"username":user_name,"course_name":enrolled_course1["name"]})
    users_collection.update_one({'username': "adminUser"}, {'$set': {'student_list': admin_courses}})
    
    return jsonify({"message": "Enrollment successful", "data": enrolled_course1}), 200


@app.route('/api/enrollments', methods=['GET'])
def get_enrollments():
    # Add course details to each enrollment
    detailed_enrollments = []
    # for enrollment in enrollments:
    #     course = next((c for c in courses if c["id"] == enrollment["course_id"]), None)
    #     if course:
    #         detailed_enrollments.append({
    #             'username': enrollment['username'],
    #             'course_name': course['name']
    #         })
    data=users_collection.find_one({"username":"adminUser"})
    detailed_enrollments=data.get("student_list")
    return jsonify(detailed_enrollments)

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

@app.route("/api/approve", methods=["POST"])
def approve():
    data = request.json
    name = data.get("username")
    course_name = data.get("course")
    
    # Access global variable just_courses
    courses = just_courses.find_one()
    courses = courses["courses"]
    enrollc = {}
    for i in courses:
        if i["name"] == course_name:
            enrollc = i
            break
    
    admin_data = users_collection.find_one({"username": "adminUser"})
    admin_data = admin_data.get("student_list")
    for i in range(len(admin_data)):
        if admin_data[i]["username"] == name:
            admin_data.pop(i)
            break
    
    enroll_course = users_collection.find_one({"username": name})
    pending_courses = enroll_course.get("pending_courses", [])
    pending_courses.append(enrollc)
    
    users_collection.update_one({'username': "adminUser"}, {'$set': {'student_list': admin_data}})
    users_collection.update_one({'username': name}, {'$set': {'pending_courses': pending_courses}})
    
    # Send email to the user
    subject = "Course Enrollment Approved"
    body = f"Hello {name},\n\nYour enrollment for the course {course_name} has been approved."
    send_email(name, subject, body)
    
    return jsonify(data)
@app.route("/api/pay",methods=["POST"])
def approve4():
    data=request.json
    name=data.get("name")
    course_name=data.get("course")
    courses = just_courses.find_one()

    conf=users_collection.find_one({"username":name})
    courses = courses["courses"]
    enrollc = {}
    for i in courses:
        if i["name"] == course_name:
            enrollc = i
            break
    enrolled=conf.get("enrolled_courses")
    enrolled.append(enrollc)
    users_collection.update_one({'username': name}, {'$set': {'enrolled_courses': enrolled}})
    return jsonify("done")




@app.route("/api/confirmed",methods=["POST"])
def approve2():
    data=request.json
    name=data.get("name")
    name=users_collection.find_one({"username":name})
    name=name.get("enrolled_courses")
    return jsonify(name)

@app.route("/api/approve1", methods=["POST"])
def approve1():
    data = request.json
    name = data.get("username")
    course_name = data.get("course")

    # Access global variable just_courses
    
    for i in courses:
        if i["name"] == course_name:
            enrollc = i
            break
    
    admin_data = users_collection.find_one({"username": "adminUser"})
    admin_data = admin_data.get("student_list")
    for i in range(len(admin_data)):
        if admin_data[i]["username"] == name:
            admin_data.pop(i)
            break
    
    
    
    users_collection.update_one({'username': "adminUser"}, {'$set': {'student_list': admin_data}})
    
    
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

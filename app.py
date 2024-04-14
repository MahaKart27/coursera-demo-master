from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
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
    # designation=data.get("designation")
    # Check if user already exists
    if users_collection.find_one({'username': username}):
        return jsonify({"message": "User already exists"}), 400

    # Insert user data into MongoDB
    users_collection.insert_one({'username': username, 'password': password,"enrolled_course":{}})
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
    
    # Check if the user is already enrolled in the course
    courses = users_course.find_one() 
    courses = courses["courses"]
    
    # Get the course details for the given enrollment ID
    enrolled_course = courses.get(str(enroll_id))
    
    # Update the user's enrolled_course field in the collection
    users_collection.update_one({'username': user_name}, {'$set': {'enrolled_course': enrolled_course}})
    
    return jsonify({"message": "Enrollment successful", "data": enrolled_course}), 200


@app.route('/api/enrollments', methods=['GET'])
def get_enrollments():
    # Add course details to each enrollment
    detailed_enrollments = []
    for enrollment in enrollments:
        course = next((c for c in courses if c["id"] == enrollment["course_id"]), None)
        if course:
            detailed_enrollments.append({
                'username': enrollment['username'],
                'course_name': course['name']
            })
    return jsonify(detailed_enrollments)


if __name__ == '__main__':
    app.run(debug=True)

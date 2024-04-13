from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy user data
users = {
    "user1": "password123",
    "user2": "password456",
    "adminUser": "password456",
}

@app.route('/verify_login', methods=['POST'])
def verify_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # This is a simplified example; you should check your user database or authentication source
    if username in users and users[username] == password:
        # Determine role; this should be based on your user data
        role = "admin" if username == "adminUser" else "student"
        return jsonify({"success": True, "role": role})
    else:
        return jsonify({"success": False})




courses = [
    {
        "id": 1,
        "name": "Introduction to Python",
        "description": "Learn the basics of Python programming.",
        "image": "https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/Banner-10.png",
        "duration": "5 weeks",
        "learningObjectives": ["Basic syntax", "Data structures", "Function definitions"],
        "fees": "$99",
        "schedule": "Mondays and Wednesdays, 7-9 PM"
    },
    {
        "id": 2,
        "name": "Web Development with Flask",
        "description": "Develop web applications using Flask.",
        "image": "https://www.schoolofit.co.za/wp-content/uploads/2020/03/Flask-courses-806x393.png",
        "duration": "6 weeks",
        "learningObjectives": ["Flask basics", "Templates", "Database integration"],
        "fees": "$120",
        "schedule": "Tuesdays and Thursdays, 6-8 PM"
    },
    {
        "id": 3,
        "name": "Advanced Machine Learning",
        "description": "Explore advanced topics in machine learning.",
        "image": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*cG6U1qstYDijh9bPL42e-Q.jpeg",
        "duration": "8 weeks",
        "learningObjectives": ["Neural networks", "Deep learning", "TensorFlow"],
        "fees": "$150",
        "schedule": "Fridays, 5-8 PM"
    },
]

@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify(courses)


# Dummy data structure to store enrollments
enrollments = []

@app.route('/api/enroll', methods=['POST'])
def enroll_course():
    data = request.json
    # Check if the user is already enrolled in the course
    print(data)
    for enrollment in enrollments:
        if enrollment['username'] == data['username'] and enrollment['course_id'] == data['courseId']:
            return jsonify({"message": "Already enrolled in this course"}), 409

    enrollments.append({
        'username': data['username'],
        'course_id': data['courseId']
    })
    return jsonify({"message": "Enrollment successful", "data": data}), 200


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

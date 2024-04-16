# import csv

# courses = [
#     {
#         "id": 1,
#         "name": "Introduction to Python",
#         "description": "Learn the basics of Python programming.",
#         "image": "https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/Banner-10.png",
#         "duration": "5 weeks",
#         "learningObjectives": "Basic syntax,Data structures,Function definitions",
#         "fees": "$99",
#         "schedule": "Mondays and Wednesdays, 7-9 PM"
#     },
#     {
#         "id": 2,
#         "name": "Web Development with Flask",
#         "description": "Develop web applications using Flask.",
#         "image": "https://www.schoolofit.co.za/wp-content/uploads/2020/03/Flask-courses-806x393.png",
#         "duration": "6 weeks",
#         "learningObjectives": "Flask basics,Templates,Database integration",
#         "fees": "$120",
#         "schedule": "Tuesdays and Thursdays, 6-8 PM"
#     },
#     {
#         "id": 3,
#         "name": "Advanced Machine Learning",
#         "description": "Explore advanced topics in machine learning.",
#         "image": "https://miro.medium.com/v2/resize:fit:720/format:webp/1*cG6U1qstYDijh9bPL42e-Q.jpeg",
#         "duration": "8 weeks",
#         "learningObjectives": "Neural networks,Deep learning,TensorFlow",
#         "fees": "$150",
#         "schedule": "Fridays, 5-8 PM"
#     }
# ]

# # CSV file path
# COURSES_CSV_FILE = 'courses.csv'

# # Write courses to CSV
# with open(COURSES_CSV_FILE, 'w', newline='') as file:
#     writer = csv.DictWriter(file, fieldnames=courses[0].keys())
#     writer.writeheader()
#     for course in courses:
#         writer.writerow(course)
import csv

# File path
USERS_CSV_FILE = 'users.csv'

# Data to be inserted into users.csv
data = [
    {'username': 'user1', 'password': 'password123', 'role': 'student'},
    {'username': 'user2', 'password': 'password456', 'role': 'student'},
    {'username': 'adminuser', 'password': 'password456', 'role': 'admin'}
]

# Write data to users.csv
def write_users_to_csv(data):
    with open(USERS_CSV_FILE, 'w', newline='', encoding='utf-8') as file:
        fieldnames = ['username', 'password', 'role']
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        # Write header
        writer.writeheader()

        # Write data
        for row in data:
            writer.writerow(row)

# Call the function to write data to users.csv
write_users_to_csv(data)

print(f"Data has been written to {USERS_CSV_FILE}")

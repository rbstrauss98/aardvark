import ant from "./images/ant.jpeg"

var bug_data = [{
    "id": 0,
    "title": "Test 0",
    "description" : "this is my first test bug",
    "image" : "https://media.istockphoto.com/id/157168347/photo/leaf-cutter-ant.jpg?s=612x612&w=0&k=20&c=4WacVJOToEqm68btRjNzCKf3EHAx2vm5NN7YR0QtLR0="
    },
    {
    "id": 1,
    "title": "Test 1",
    "description" : "this is my second test bug",
    "image" : "n/a"
    },
    {
    "id": 2,
    "title": "Test 2",
    "description" : "this is my third test bug",
    "image" : "n/a"
    },
    {
    "id": 3,
    "title": "Test 3",
    "description" : "this is my fourth test bug",
    "image" : "n/a"
    }
]

var comment_data = [{
    "id": 0,
    "text": "this is a comment",
    "isSolution" : 0,
    },
    {
    "id": 1,
    "text": "this is an answer",
    "isSolution" : 1,
    },
    {
    "id": 2,
    "text": "this is a comment",
    "isSolution" : 0,
    },
    {
    "id": 3,
    "text": "this is a comment",
    "isSolution" : 0,
    }
]

export default {bug_data, comment_data}
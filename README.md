# Blogify
Bogify is blogging app which help people to post their blogs online and other people can read those blogs and can comment on these blogs.

# Tech-Stacks:
- Node.js
- Express.js
- MySQL
- React.js
- GitHub
- Postman
- 
# Entities
### User
- userId(Primary key)
- username
- email(unique)
- password(hashed)

### Post
- postId(primary key)
- userId(foreign key)
- title
- content
- timestamp
# Entity Relation Diagram
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/ER%20Diagram.png"></img>

# Routes

## User Routes

#### Registration
- POST /user/api/registration
                  
                  Schema:{
                        id: {
                            type: DataTypes.INTEGER,
                            autoIncrement: true,
                            primaryKey: true
                        },
                        title: {
                            type: DataTypes.STRING,
                            allowNull: false
                        },
                        content: {
                            type: DataTypes.TEXT,
                            allowNull: false
                        },
                        createdAt: {
                            type: DataTypes.DATE,
                            defaultValue: DataTypes.NOW
                        },
                        userId: {
                            type: DataTypes.INTEGER,
                            allowNull: false,
                            reference: {
                                module: User,
                                key: 'id'
                            }
                        }
                  }

            Response: Registration is successfull
                        {
                            "message": "Registration is successful",
                            "user": {
                                "id": 12,
                                "name": "Indu Sanap",
                                "email": "indu@gmail.com",
                                "password": "$2b$05$oEO4JVb0eTyF6o37WUjTB.5i3gG7Z9eJRJ78DB0mFIpURkUdE6S8G",
                                "updatedAt": "2023-08-04T15:42:19.933Z",
                                "createdAt": "2023-08-04T15:42:19.933Z"
                            }
                        }

#### Login
- POST /user/api/login
                    
                    Request:{
                        "email":example@gmail.com,
                        "password":"example123"
                    }

                    Response:{
                        "msg": "Login is Successfull",
                        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2OTExNjM4Njl9.X8pj1n9NuP_svVj1c3Siot01ChilWKYyvmBDIyQ2puI"
                    }

#### Get All users
- GET /user/api/users
- Response: Get the all users data in array

## Posts Routes

#### Create a post

#### Get All posts

#### Edit All Posts

#### Delete posts


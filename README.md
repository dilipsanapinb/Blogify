# Blogify
Bogify is blogging app which help people to post their blogs online and other people can read those blogs and can comment on these blogs.

# Tech-Stacks:
- Node.js
- Express.js
- MySQL
- React.js
- GitHub
- Postman

## AWS EC2 Instance link
- http://13.53.131.66:5000/
#### blogifybackend repo link
- https://github.com/dilipsanapinb/blogifybackend
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

### Comments
- commentId(primary key)
- postId(foreign key)
- userId(foreign key)
- comment
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
- POST /post/api/create
- Protected route
                    
                    Request:{
                        "title":"Blossoming the Summer",
                        "content":"The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters."
                        }

                    Response:{
                        "message": "New post created",
                        "Post": {
                            "createdAt": "2023-08-04T16:08:02.624Z",
                            "id": 3,
                            "title": "Blossoming the Summer",
                            "content": "The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters.",
                            "userId": 11,
                            "updatedAt": "2023-08-04T16:08:02.624Z"
                            }
                        }

#### Get All posts
- GET /post/api/posts

                       Response:{
                            "message": "All posts Data",
                            "AllPosts": [
                            {
                            "id": 1,
                            "title": "Blossoming the Spring",
                            "content": "The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters.",
                            "createdAt": "2023-08-04T16:06:49.000Z",
                            "userId": 11,
                            "updatedAt": "2023-08-04T16:06:49.000Z"
                            },
                            {
                            "id": 2,
                            "title": "Blossoming the Spring",
                            "content": "The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters.",
                            "createdAt": "2023-08-04T16:07:41.000Z",
                            "userId": 11,
                            "updatedAt": "2023-08-04T16:07:41.000Z"
                            } 
                            ]
                       }

#### Get a post by id
- GET /post/api/post/:id

                        Response:{
                            "message": "Get a post by id is successfull",
                            "post": {
                            "id": 2,
                            "title": "Blossoming the Spring",
                            "content": "The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters.",
                            "createdAt": "2023-08-04T16:07:41.000Z",
                            "userId": 11,
                            "updatedAt": "2023-08-04T16:07:41.000Z"
                            }
                        }
#### Edit Post
- PATCH /post/api/post/:id
- Protected route

                        Request:{
                            // data we need to update
                            }

                        Response:{
                             "message": "Post updated successfully",
                        "post": {
                            "id": 1,
                            "title": "Updated post title",
                            "content": "The spring bloom is a strong increase in phytoplankton abundance (i.e. stock) that typically occurs in the early spring and lasts until late spring or early summer. This seasonal event is characteristic of temperate North Atlantic, sub-polar, and coastal waters.",
                            "createdAt": "2023-08-04T16:06:49.000Z",
                            "userId": 11,
                            "updatedAt": "2023-08-05T05:10:52.000Z"
                        }
                        }

#### Delete post
- DELETE /post/api/post/:id
- Protected route
                        
                        Response:{
                            "message": "Post deleted successfully"
                        }


## Comments Route

#### Create comment
- POST  /comment/api/comments
- Protected route
 

                        Request:{
                            "postId":4,
                            "comment":"have a momment"
                        }


                        Response:{
                                "message": "Comment created successfully",
                                "comment": {
                                    "createdAt": "2023-08-05T07:51:07.411Z",
                                    "id": 1,
                                    "comment": "have a momment",
                                    "postId": 4,
                                    "userId": 12,
                                    "updatedAt": "2023-08-05T07:51:07.412Z"
                                    }
                                }

#### Get All comments by Post
- GET  comment//api/commentsonpost/:postId
                         
                         Response:{
                                "message": "All comments for the post",
                                "comments": [
                                    {
                                        "id": 1,
                                        "comment": "have a momment",
                                        "createdAt": "2023-08-05T07:51:07.000Z",
                                        "userId": 12,
                                        "postId": 4,
                                        "updatedAt": "2023-08-05T07:51:07.000Z"
                                    }
                                ]
                            }

#### Get comment by id
- GET  comment/api/comments/:commentId

                            
                            Response:{
                                
                                "message": "Comment found",
                                "comment": {
                                    "id": 1,
                                    "comment": "have a momment",
                                    "createdAt": "2023-08-05T07:51:07.000Z",
                                    "userId": 12,
                                    "postId": 4,
                                    "updatedAt": "2023-08-05T07:51:07.000Z"
                                }
                            }

#### Update the comment
- PUT comment/api/comments/:commentId
                                
                                Response:{
                                        "message": "Comment updated successfully",
                                        "UpdatedCommetn": {
                                            "id": 1,
                                            "comment": "updated comment",
                                            "createdAt": "2023-08-05T07:51:07.000Z",
                                            "userId": 12,
                                            "postId": 4,
                                            "updatedAt": "2023-08-05T08:09:03.000Z"
                                        }
                                }
#### Delete the comment
- DELETE comment/api/comments/:commentId

                                Response:{
                                    "message": "Comment deleted successfully"
                                }


# Screenshots of pages
### Langing page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/Landing%20page.png" alt="landing page"/>

### Sign in page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/SignInpage.png" alt="Sign in page">

### Sign up page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/SignUp%20page.png" alt="Sign up page">

### Posts page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/Posts%20Page.png" alt="Posts page">

### Read more page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/Read%20more%20page.png" alt="Read more page">

### Create post  page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/create%20post.png" alt="Create post  page">

### Edit post page
<img src="https://github.com/dilipsanapinb/Blogify/blob/main/Images/Edit%20post%20page.png" alt="Edit post page">




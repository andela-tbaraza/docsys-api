[![Coverage Status](https://coveralls.io/repos/github/andela-tbaraza/docsys-api/badge.svg?branch=develop)](https://coveralls.io/github/andela-tbaraza/docsys-api?branch=develop)
[![Build Status](https://travis-ci.org/andela-tbaraza/docsys-api.svg?branch=develop)](https://travis-ci.org/andela-tbaraza/docsys-api)

# docsys-api

Docsys is a simple API that enables one to manage documents or notes. One is able to retrieve  their documents
once created for future reference.  You can also specify if you want your document to be public, that means that
other users can view your document.

***

## Create user
Returns json data as a single user with token details.

* **URL**
/api/users

* **METHOD**
`POST`

* **Data Params**
Required:
`type: object`
```
{
  firstname: 'Tonida',
  lastname: 'Baraza',
  username: 'tonie',
  email: 'toni@gmail.com',
  password: 'anysupercecret'

}
```

* **Success Response:**
  * **Code:** 201 Created<br />
    **Content:**   
    ```

    {
    "message": "user created",
    "user": {
            "__v": 0,
            "password": "$2a$10$YohfpQEahhnOFVeFj1Wmyuh4scu6y7vr4SpVdEpbv3PojTVQ3Xod2",
            "email": "toni@gmail.com",
            "username": "tonie",
            "_id": "57e68461b434e4572307442e",
           "title": "user",
           "name": {
                   "lastname": "Baraza",
                  "firstname": "Tonida"
           }
     },
     "tokenDetails": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx
         lb25hZCIsImVtYWlsIjoibGVvbmFkQGdtYWlsLmNvbSIsIl9pZCI6IjU3ZTY4NDYxYjQz",
        "message": "your token expires in 24 hours"
        }   
  }
  ````

***

Every request has to be made with the token provided for authentication, it can be placed on the header, on the url as a
parameter or as a query parameter.The token key is x-access-token.
For example on the header is represented as follows:   
```
x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx
                  lb25hZCIsImVtYWlsIjoibGVvbmFkQGdtYWlsLmNvbSIsIl9pZCI6IjU3ZTY4NDYxYjQz"
```

***

## Show user
Returns json data as a single user.

* **URL**
/api/user/:id

* **METHOD**
`GET`

* **URL Params:**
Required: `id = [integer]`

* **Success Response:**
  * **Code:** 200 OK<br />
    **Content:**   
    ```
    {        
       "user": {   
                "__v": 0,   
                "password": "$2a$10$YohfEahhnOFj1Wmyuh4y7vr4SpVdEpbv3PojTVQ3Xod2",   
                "email": "leonad@gmail.com",   
                "username": "leonad",   
                "_id": "57e68461b434e4572307442e",   
                "title": "user",   
                "name": {
                        "lastname": "Akech",   
                        "firstname": "Cleo"   
    }   

    ```
***

## Delete User
Returns a success message for a successful delete

* **URL**
/api/user/:id

* **METHOD**
`DELETE`

* **URL Params:**
Required: `id = [integer]`

* **Success Response:**
  * **Code:** 200 OK<br />
    **Content:**  
    ```
    {
      message: 'successfully deleted the user'
    }
    ```
***

## Create a document

Returns json data as a single user with document details.

* **URL**
/api/documents

* **METHOD**
`POST`

* **Data Params**
Required:
`type: object`
```
{
  title: 'Tonida',
  content: 'Baraza',
}
```
Optionally you can change the view permission to public as default is private.
`view: 'public'`

* **Success Response:**
  * **Code:** 201 Created<br />
    **Content:**   
    ```
    "document":
    {
      "_id": "57e3a41fab0377fc025d976b",
      "updatedAt": "2016-09-22T09:27:59.414Z",
      "createdAt": "2016-09-22T09:27:59.414Z",
      "ownerId": "57d965b3d743819d32f08802",
      "content": "Baraza",
      "title": "Tonida",
      "__v": 0,
      "view": "private"

    ```

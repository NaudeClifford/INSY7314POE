# INSY7314POE
ST10258513 Clifford 
Naude Group 1 
INSY7314 POE PART 1 
ARCHITECTURE 
Report 
1   
Made by ST10258513 Clifford Naude 
2   Made by ST10258513 Clifford Naude 
Contents 
Architecture Diagram .......................................................................................... 3 

Report ................................................................................................................ 4 

Introduction ........................................................................................................ 4 

System Overview ................................................................................................ 4 

System Architecture ........................................................................................... 5 

Client Layer (Frontend) .................................................................................... 5 

Application Layer (Backend) ............................................................................ 5 

Data Layer (Database) ..................................................................................... 5 

System Boundaries ............................................................................................. 6 

Outside System ............................................................................................... 6 

Inside System .................................................................................................. 6 

External Services ............................................................................................. 6 

Security Features ................................................................................................ 7 

HTTPS (Hypertext Transfer Protocol Secure) .................................................... 7 

JSON Web Token (JWT) ..................................................................................... 7 

SQL Injection and NoSQL Injection .................................................................. 7 

Password Hashing ........................................................................................... 7 

Input Validation ............................................................................................... 8 

Cross-Origin Resource Sharing (CORS) ............................................................ 8 

Rate Limiting ................................................................................................... 8 

Environment Variables ..................................................................................... 8 

Software Requirements ...................................................................................... 8 

Required Packages .............................................................................................. 9 

Backend .......................................................................................................... 9 

Frontend .......................................................................................................... 9 

Installation Procedure ........................................................................................ 9 

Backend .......................................................................................................... 9 

Frontend .......................................................................................................... 9 

System Workflow ................................................................................................ 9 

Conclusion ....................................................................................................... 10 

References ....................................................................................................... 11 

Architecture Diagram 
<img width="646" height="2423" alt="INSY7314_POE_PART1_Architecture_ST10258513_CliffordNaude_Gr1PIC" src="https://github.com/user-attachments/assets/dda9988c-eaaf-4dcb-be2c-771a7bdaecf5" />

Report 
Introduction 
This project is a web-based application for HustleHub to have a freelance marketplace 
platform. The website will allow for services to be booked and other features. We use 
three tier architecture of presentation, application and data layer. Incorporates multiple 
security methods. We use node.js, React.js, MongoDB and Express.js for this project. 
Including an online database and multiple security features. 

System Overview 
App is built using 
MongoDB: This is a document-oriented database that is an alternative to relational 
databases, (MongoDB, 2026). It allows for JSON documents that maps objects in the 
classes. We use this database for storing information about the clients, bookings made 
and any other information meant to be used for the application. It has a cloud version 
that can also be used as this is the local database 

Express.js: This is a minimal and flexible node.js framework for web applications, 
(express, 2026). It provides thin layer of features to web applications without conflicting 
with node.js. It is a lightweight routing framework with minimal features using express 
middleware modules. This framework is used for developing the API for our application. 

React.js: This is a component-based JavaScript library used for creating user interfaces, 
(geeksforgeeks, 2026). It is used for creating reusable UI components. Fast 
development, scalable. We will use this for our application to have a user-friendly UI 
while keeping the code reusable and organized. 

Node.js: This is an open source and cross platform JavaScript runtime environment that 
is used as our primary tool for our project, (Node.js, 2026). It runs in a single process 
and provides asynchronous I/O primitives in its library. This allows for background 
running while the application runs and improves performance since the application can 
continue while it waits for a request to be processed. 

System follows the MERN architecture, (geeksforgeeks, 2026), is a full stack JavaScript 
framework used for modern and scalable web applications using one programming 
language for both frontend and backend. It connects the frontend, backend and 
database together. This includes NodeJS (Frontend), ExpressJS (backend), MongoDB 
(Database) and React (Frontend Library). Its highly scalable, high performance, 
developer friendly and large ecosystem with npm and other packages. 

System Architecture 
Client Layer (Frontend) 
The frontend is a visual representation of the application (User Interface (UI)) for users 
using React.js 
Following Responsibilities for Frontend includes: 
• Showing the web pages 
• Handling user inputs 
• Input validation on the client side 
• Protects authentication routes 
• Manages user authentication 
• Sends HTTP requests to the API 

Application Layer (Backend) 
Backend is a central processing unit for the application where the core logic runs. Built 
using Node.js and Express.js 
The backend Handles the following:  
• Incoming API requests 
• Authenticates users usings information from database 
• Validates uses input data as while as frontend 
• Includes business logic 
• Communicates with local and online databases like MongoDB and firebase 
• Returns JSON responses to the API requests 
• Does CRUD operations 

Data Layer (Database) 
MongoDB uses documents and collections for storing structured and semi-structured 
data. 
This layer stores the application data and is responsible for: 
• Application settings 
• User accounts 
• Products 
• Orders 
• Reviews 

System Boundaries 
System boundaries separate the internal components of applications into more 
manageable and user-friendly format for easier readability and useability. 

Outside System 

• Web Browser 
• Internet 
• External Users 
Inside System 
• React frontend 
• MongoDB database 
• Note.js 
• Express API server 

External Services 
• Email services 
• Cloud storage 
• Payment Gateway 

Security Features 
We will be using the Open Web Application Security Project Guide for ensuring security 
for our application, (Dhananjaya, 2025) used for this section. 

HTTPS (Hypertext Transfer Protocol Secure) 
HTTPS ensures that data exchanged between client and server is secure but enforcing 
HTTPS in Express, (Patel, 2024). 
Express does not secure HTTP headers by default and that is why we will be using 
Helmet middleware to mitigate the risk with security headers. Helmet sets headers to 
prevent clickjacking and cross-site scripting. 

JSON Web Token (JWT) 
This is a way to authenticate user’s identity while ensuring that only certain users can 
access certain sensitive data, (Patel, 2024). This is a stateless authentication. 

SQL Injection and NoSQL Injection 
Using (Tanner, 2025), SQL injection is where code is exploited for its vulnerabilities 
through injecting SQL code into input fields allowing them access to databases. We can 
use Query builders to have type safety and automatic parameterization. Prisma reduces 
the SQL injection risk in APIs. Drizzle ORM is also used for SQL-like syntax development. 
Input validation and sanitization is the best defence since it catches the data before it 
gets to the database. 

Password Hashing 
Hashing is converting given key into another value. Password hashing is converting 
password input into strings of characters, (Dennis Temoye Charity, 2024). This process 
is a one-way function using Bcrypt. This is a cryptographic algorithm for securely storing 
passwords. Bycrypt includes Salting, it adds random number called salt that is unique 
to each password and is attached before hashing. 

Input Validation 
We validate what the user put in using an express validator, (Patel, 2024). This prevents 
Cross-Site Scripting (XSS) and a Content Security Policy (CSP) 

Cross-Origin Resource Sharing (CORS) 
This is an HTTP-header mechanism that allows a server to indicate origins that are not 
its own, (mozilla, 2026). Its uses preflight request to the server hosting the resource to 
check if the server will permit the request. Works by adding HTTP headers that let 
servers describe which origins can be read. Default, browsers block cross-origin 
requests to prevent unauthorized access to data. This allows for third party domains to 
share resources. 

Rate Limiting 
To prevent DDoS and brute-force attacks, we limit the number of requests made by a 
client by using express-rate-limit, (Patel, 2024). We can use express-rate-limit to prevent 
brute-force attacks. We can also use Cross-Site Request Forgery (CSRF) to prevent 
CSRF attacks. Express session is also used for secure Session Storage. 

Environment Variables 
This protects sensitive information in Node.js applications, (Crudu & Team, 2026), By 
separating configuration details from the code and reduces risk of exposing sensitive 
data in version control systems like GitHub. It does centralize config data as while 
making development easier. This avoids hardcoded sensitive data and exposing 
variables in logs. Dotenv is a simplified local environment setup, but online cloud 
services have their own solutions. 

Software Requirements 
• Node.js 
• Command Prompt 
• GitHub 
• Visual Studio Code 
• MongoDB 

Required Packages 
Backend 
• Express.js 
• JSON Web Token 
• Helmet 
• BCrypt 
• Mongoose 
• Dotenv 
• CORS 
• Express Rate Limit 
• Nodemon 

Frontend 
• React 
• React Router DOM 
• Axios 

Installation Procedure 
Backend 
1. Create server directory 
2. Initialise project with (npm init) 
3. Install Express, Mongoose, JWT, bcrypt, Helmet, CORS, and Rate limiter 
4. Configure .env File 
5. Start using npm run dev

Frontend 
1. Create React Application 
2. Install Axios and React Router DOM 
3. Configure API endpoints 
4. Start using npm start

System Workflow 
1. User accesses the website using the web browser 
2. React frontend loads UI 
3. User submits request to login in using login credentials and is validated by 
frontend before sent for input validation 
4. Request is sent securely to Express API 
5. Backend validates the request 
6. JWT is verified 
7. Backend retrieves and stores information to the database (MongoDB) 
8. A response is returned to frontend from the API 
9. React updates the UI and the requested information gets displayed.

Conclusion 
The project setup is best for performance, security and industry standard approaches to 
developing an application. The web-based application uses node.js, MongoDB, React 
and express. We created a backend, frontend and linked the API to a database using 
MongoDB. We will integrate security measures to ensure that the application is safe 
from unauthorized access. The use of MERN architecture and OWASP guidelines to 
make an robust industry standard web-based application for freelancers to create 
bookings online with clients.  

References 
Crudu, V., & Team, M. R. (2026, June 15). Enhancing Node.js Application Security with 
Environment Variables. Retrieved from MoldStud: 
https://moldstud.com/articles/p-enhancing-nodejs-application-security-with
environment-variables 
Dennis Temoye Charity. (2024, April 3). How to Hash Passwords with bcrypt in Node.js. 
Retrieved from freeCodeCamp: https://www.freecodecamp.org/news/how-to
hash-passwords-with-bcrypt-in-nodejs/ 
Dhananjaya, K. (2025, February 8). Implementing Security in a Node.js Express Server: 
An OWASP Guide. Retrieved from Medium: 
https://medium.com/@kumar62.shivu/implementing-security-in-a-node-js
express-server-an-owasp-guide-8d4c62733164 
express. (2026, January 1). Home Page. Retrieved from expressjs: 
https://expressjs.com/ 
geeksforgeeks. (2026, June 3). MERN Stack. Retrieved from geeksforgeeks: 
https://www.geeksforgeeks.org/mern/understand-mern-stack/ 
geeksforgeeks. (2026, June 29). React Introduction. Retrieved from geeksforgeeks: 
https://www.geeksforgeeks.org/reactjs/reactjs-introduction/ 
MongoDB. (2026, January 1). MongoDB Atlas: Multi-Cloud Database Service. Retrieved 
from MongoDB: https://www.mongodb.com/docs/ 
mozilla. (2026, January 1). Cross-Origin Resource Sharing (CORS). Retrieved from 
mozilla: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS 
Node.js. (2026, January 1). Introduction to Node.js. Retrieved from Node.js: 
https://nodejs.org/learn/getting-started/introduction-to-nodejs#introduction-to
nodejs 
Patel, R. (2024, November 27). Top 5 Ways to Secure Your Express.js APIs. Retrieved 
from DEV: https://dev.to/rigalpatel001/top-5-ways-to-secure-your-expressjs
apis-13i5 
Tanner, M. (2025, August 25). Node.js SQL Injection Guide: Examples and Prevention. 
Retrieved from StackHawk: https://www.stackhawk.com/blog/node-js-sql
injection-guide-examples-and-prevention/ 

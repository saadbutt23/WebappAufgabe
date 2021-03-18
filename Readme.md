### http://localhost:3330/Tage/<number of days before and after the present date>
For Example: http://localhost:3330/Tage/30 will give the user the option to enter a date that is one month before and after the current date

### http://locahost:3330/homepage

It would allow the user to generate Unix Time stamp and submit it to the database, in the POST request. 
Note: The task 1 was not clear to me, the puropse behind 
"das Datum wird per json als Unix-Timestamp im POST-Body übergeben. ({"datum": 123456789})?"


### Basic architecture

I have conceptualize the task based on a Nodejs application, using MVC(Model/View/Architecture) and all values are stored in the Database MongoDB

### How to run the application
1) Please clone the repository from the github using
git clone https://github.com/saadbutt23/WebappAufgabe.git

2) In the terminal enter "npm start" to run the application

3) Go to the browser and enter the routes (first two ones from above) to test its functionality
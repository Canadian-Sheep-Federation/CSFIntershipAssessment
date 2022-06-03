# CSFIntershipAssessment - Software Developer Assessment - COVID-19 Canada Survey/Data Collection Web Application

Table of Contents
1. [About this Project](#about)
   - [Demo](#demo)
   - [Web Application](#pages)
   - [Built With](#built)
2. [Running the Application](#runapp)
3. [Contact](#contact)

<a name=about></a>
## About this Project:

<a name=demo></a>
### Demo:
   
   https://user-images.githubusercontent.com/93673736/171939001-83a9135b-e952-47a4-899a-4c859f6412b3.mov

<a name=pages></a>
### Web Application:

   1. Home / Main Page:
      
      This is the main page of the application and the data for the data table is obtained using the following public API: https://api.covid19tracker.ca/docs/1.0/vaccinations. Users can select a province and the table will display the total number of cases, fatalities, tests, and vaccinations for a certain date.
      
      <img width="800" alt="Screen Shot 2022-06-03 at 2 54 30 PM" src="https://user-images.githubusercontent.com/93673736/171932247-d5d7cfcd-255d-4afe-9d5c-8def326e998a.png">

   2. Survey / Form Page:

      The following page allows users to fill out a survey where the information will be stored in a SQL database. 
      
      <img width="800" alt="Screen Shot 2022-06-03 at 2 54 44 PM" src="https://user-images.githubusercontent.com/93673736/171932271-178ac4de-e5ce-4911-add2-3cd8c6baee84.png">

   3. Acess Survey Data Page:

      Users can use this page to access the data stored in the SQL database for everyone who has filled out the survey or they can view the survey of a particular user based on the survey ID. Clicking each button will load the following pages respectively: 
      
      <img width="800" alt="Screen Shot 2022-06-03 at 2 54 55 PM" src="https://user-images.githubusercontent.com/93673736/171932284-351ae8a1-2725-446d-9800-68cc438ad946.png">

      Clicking each button above will load the following pages respectively: 
      
      I. All Survey Data:
   
         <img width="800" alt="Screen Shot 2022-06-03 at 2 55 03 PM" src="https://user-images.githubusercontent.com/93673736/171932297-75668a7f-9f5e-4369-a521-80d08ac80933.png">

      II. Data by Id:
   
         <img width="800" alt="Screen Shot 2022-06-03 at 2 55 12 PM" src="https://user-images.githubusercontent.com/93673736/171932315-8283228e-6275-484f-8b70-08448c244745.png">

<a name=built></a>
### Built With:
  - [MySQL](https://www.mysql.com/)
  - [Prisma](https://www.prisma.io/)
  - [Node.js](https://nodejs.org/en/)
  - [React](https://reactjs.org/)

<a name=runapp></a>
## Running the Application:

   1. Prerequisite
      
      Install the following:
      - Visual Code Studio 
      - MySQL 
      - Prisma
      - Node.js
      - React
      - Postman
    
   2. API Folder
      
      - Using terminal, enter the api folder and run the following: npm install
      - Afterwards run the following, in order to download the necessary dependencies: npm install express cors body-parser morgan
      - Create a new database using MySQL
      - Create a .env file and fill the DATABASE_URL string with the correct password and root information for the database that was just newly created
     
        <img width="800" alt="Screen Shot 2022-06-03 at 3 56 48 PM" src="https://user-images.githubusercontent.com/93673736/171941278-781f5a60-7357-4b2e-a124-3cefaca7e11a.png">
      - Run the following: prisma migrate dev --name init and prisma generate
      - Try running the api in the index.js file using the command: nodemon index.js
      - Once the api is running, try testing to see if it works using Postman
  
  3. Client Folder
  
     - Using terminal, enter the client folder and run the following: npm install
     - Run the following to install bootstrap dependencies: npm i bootstrap
     - Run the following to install font-awesome dependencies: npm i @fortawesome/fontawesome-free
     - Run the following to install mdbreact dependencies: npm i mdbreact
     - To start the react web application, input the following commmand in terminal: npm start
      

<a name=contact></a>
## Contact

Work email: kelvinsiu8888work@gmail.com

School email: siu.ka@northeastern.edu

Github Link: https://github.com/kelvin8888siu/

Linkedin: https://www.linkedin.com/in/kelvin-siu-7b6297160/


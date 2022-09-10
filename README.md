# Assignment details

Frontend is done in react app.\
Material UI is the framework used for design purpose.\
Backend is done in node js with express and mysql.\

## Running frontend

Run `npm install` from the project directory.\
After the installation is complete, please run `npm start` to start the UI application.\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running backend

Run `npm install` from the server folder inside project directory.\
After the installation is complete, please run `node index.js` to start the backend application.\
The application runs in 3001 port.\

Create a folder named files inside the server folder. This is the temp location to store files. The files will be removed once uploaded.\

The database used is the mysql.\

In the repositories folder, please update the userReposity file with the username/pass of the mysql. \
The name of database used is `user_records`.\
The table created is users with id, name and age
`CREATE TABLE user_records.users ('id' INT NOT NULL AUTO_INCREMENT,'name' VARCHAR(45) NOT NULL,'age' INT NOT NULL, PRIMARY KEY ('id'));`

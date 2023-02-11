
---------------------How to install the app-----------------------


- create new folder called "sec2_gr9_src" in your prefer destination

- go to that folder and create react app called "demo"

npx create-react-app demo

- After that, open a sec2_gr9_src.zip file. Copy "sec2_gr9_src"
folder to the created "sec2_gr9_src" folder and overwrite everything

***** if prompt click overwrite everything ******


- please excute "sec2_gr9_src\sec2_gr9_database.sql"  in mysql (even if you have the database from phrase II)

- please add user:
	username: "test"
	password: "Testing123-"
in mysql  (server-->User and Privileges)

- After that just install all of the nodejs dependencies

	"dependencies": {
		"body-parser": "^1.20.0",
		"cors": "^2.8.5",
		"dotenv": "^16.0.0",
		"express": "^4.17.3",
		"mysql2": "^2.3.3",
		"nodemon": "^2.0.15",
		"path": "^0.12.7"
	}

- Also install react js dependencies in "demo/" folder

	-- react-helmet
	-- react-router-dom
	-- styled-components

cd demo
npm i --save react-helmet
npm install --save react-router-dom@6
npm install --save styled-components


After you finished all of the installation your folder should look like this

sec2_gr9_src (node.js folder)/
├─ demo (React.js folder)/
│  ├─ public/
│  ├─ src/
│  ├─ package.json
├─ package.json
├─ index.js
├─ process.env




open 2 terminal

1. first terminal at "/sec2_gr9_src" type "npm start"
2. second terminal at "sec2_gr9_src/demo" type "npm start"


if there is no error then, congratulation you have successfully install the project

----------------------------------------------------------------------------

--------------------------How to run the app--------------------------------

type: "localhost:3000" in your browser

***** you can also find some example of movie and user data
in "testing/" folder 
 - movies.json
 - user.json

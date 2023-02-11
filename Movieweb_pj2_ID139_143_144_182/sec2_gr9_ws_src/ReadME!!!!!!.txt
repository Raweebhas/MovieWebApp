------FIRST-------
- All of the html and js are in /public/ folder

- the nodejs file is in /sec2_gr9_ws_src/ folder called "index.js"

- sql file is in /sec2_gr9_ws_src/ folder called "sec2_gr9_database.sql"

- please add user:
	username: "test"
	password: "Testing123-"
in mysql  (server-->User and Privileges)

- to run, stay in root project folder (folder that have package.json) and npm start
then type "localhost:3030" in the browser


------SECOND--------
- "localhost:3030" will redirect to homepage
- "localhost:3030/search" will redirect to search page
- "localhost:3030/login" will redirect to login page
- "localhost:3030/aboutus" will redirect to about us page

- * Alternative: use navigation bar




------THIRD----------
- test for login page

type "1" in username field
type "2" in password field

this will prompt the invalid login.

type "dark1x" username field
type "passw12123322" in password field

this will alert "Hello, {username}" signailing that login is sucessful, then it will redirect to search page.




- test for search page

1. type in the query or not (not input query will return all of the result)
2. select the criteria box 
* all is checked by default. If you want to search only movie, first, uncheck all. Second, check movie.
(if the check all is checked it will return all of the criteria. uncheck all first then select criteria later)

3. after submit, The form will return the list of movie in table format.
4. clicking at the movie name, for example, literally clicking at "Belle" in movie name column will sent you to the result page.
5. result page will show the detail of the movie that you just click.



------FORTH---------

-API use 
1. Google map API (used in about us page)
2. OMdb API (https://www.omdbapi.com/) (use in result page to fetch the movie poster)






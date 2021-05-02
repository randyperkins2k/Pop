
pop^ - Project README [*Draft 1*]

# pop^

This application (pronounced "pop-up") functions as a one-stop resource for locating and subscribing to pop-up businesses
found in a particular search area. The search area can be limited to a few city blocks, a neigborhood, or even a whole metro
area. Once subscribed to a few pop-up merchants, the user may choose to receive notifications as to upcoming services and events,
such as a food vendor's anticipated menu and opening hours, or a pop-up merchant's wares.

The pop^ app minimizes the distinction between user and vendor by design: any user may become a pop-up vendor, and vendors are
encouraged to utilize the app and in turn subscribe to other vendors, thus strengthening the ecosystem. 

This application uses React Google Maps. The npm package for this may be found at the following address:
https://www.npmjs.com/package/react-google-maps

# Starting application

Using a code editor or IDE, navigate to the pop^ directory, and execute the following steps in the terminal:
	1. Make sure a MySQL service is running by entering ‘mysql.server start’.
	2. Type ’npm install’ to install dependencies for this application.
	3. Enter ’npm run build’ to start the compile process with Webpack.
	4. In a separate terminal, enter ‘npm start’. This will execute the file ‘server/index.js’ via Nodemon, 
	    followed by the message: ‘Server listening at http://127.0.0.1:8080'. Hold down ‘command’ and click
	    on this message, and the app should open up in a new browser window. 
	5. In a third teminal window, enter ‘node server/seed.js’ to seed the database with initial data.

# Configuring API Access

For full functionality, you will need to acquire API keys. They are to be stored in a ‘.env’ file within the main directory. 
You can generate unique keys for each service by accessing the following links:

Google Client:
(acquire ID and secret)

Google Callback URL [*does user need this?*]

React Maps API Key:
https://developers.google.com/maps/documentation/javascript/get-api-key

# Other API Information

[*if needed*]

# Authentication

This application uses Google OAuth. Upon clicking the ‘login’ button when opening the app, the user is redirected
to a Google authentication page, which requires entering the user’s email and password. After successful authentication, 
user is automatically redirected to the main map view page. 

# Tech Stack

Node.js / Javascript
Nodemon
Express
Axios
AWS - EC2

MySQL2
Sequelize

React
React Native
React Router
React Google Maps
React Bootstrap
Styled Components
File/Style/CSS-loader

Google OAuth / Passport
Gimp
Cloudinary

Webpack / DotEnv / Babel
[* more tech to be added in final two weeks.*]

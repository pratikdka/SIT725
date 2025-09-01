1. ## Prerequisites to run the Test class
* Node.js with version 18+
* npm packages
* MongoDB running locally for normal app use

2. Installing the node modules packages
* npm install

3. Installing EJS for EJS views
* npm install ejs

3) Project Structure (key files)
.
├─ server.js
├─ controllers/
│  └─ projectController.js
├─ models/
│  └─ project.js
├─ routes/
│  └─ projectRoutes.js
├─ public/
│  ├─ js/main.js
│  └─ js/socket-client.js
├─ views/
│  └─ index.ejs or index.html
└─ tests/
   └─ test-classes.test.js

4. Run the application
* npm start

5. Run the tests
* npm start test / npm test
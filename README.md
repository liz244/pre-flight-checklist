Pre-Flight Checklist
Description
Pre-Flight Checklist is a React application designed to create, view, edit, and delete checklists. It provides a simple and efficient user experience with an intuitive interface tailored for both mobile and desktop use.

Features
Create Checklists: Add a title, description, and tasks.
Edit Checklists: Update checklist details and tasks.
Delete Checklists: Remove a checklist with a confirmation step.
Change Task Status: Mark tasks as "done" or "not done."
Responsive Interface: Optimized for mobile and desktop screens.
Technologies Used
React: For building the user interface.
React Router Dom: For managing navigation and routes.
Axios: For API calls.
CSS Modules: For modular and scoped styling.
Figma: For creating design prototypes.
Installation
Clone the repository:

bash
Copier le code
git clone https://github.com/liz244/pre-flight-checklist.git
cd pre-flight-checklist
Install dependencies:

bash
npm install
Set up environment variables:

Create a .env file in the root directory with the following content:
env
REACT_APP_API_URL=https://greenvelvet.alwaysdata.net/pfc/subscribe
REACT_APP_API_TOKEN=your_api_token
Start the application:

bash
npm start
Access the application in your browser at http://localhost:3000.

Project Structure
plaintext
pre-flight-checklist/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── ChecklistDetail.jsx
│   │   ├── ChecklistForm.jsx
│   ├── services/
│   │   └── api.js
│   ├── index.css
│   └── App.js
├── .env
├── package.json
├── README.md
Designs and Prototypes
Zoning: Designed in Canva.
Wireframes: Created in Canva.
Mockups: Designed in Figma. View Figma Mockups.
Deployment
This project can be deployed using platforms like Netlify, Vercel, or GitHub Pages.

Build the project:

bash
npm run build
Deploy:

Follow the deployment instructions for your chosen platform and upload the build folder.
Development Journal
The development process is documented in a separate journal file, covering:

Design and prototyping steps.
Setting up the React application.
Adding and integrating features.
Debugging and resolving issues.
Contribution
Contributions are welcome! If you have any suggestions or ideas, feel free to open an issue or submit a pull request.

Author
Name: Liz
GitHub: liz244
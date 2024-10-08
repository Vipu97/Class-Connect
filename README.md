# Class Connect

## Overview

This project is a full-stack web application developed using MERN stack (MongoDB, Express.js, React.js, Node.js). It provides the core functionality of  a virtual classroom platform like wooclap or similar, allowing users to step into a world of virtual learning with our platform, combining live classes and interactive assessments to create an immersive educational journey tailored to modern students' needs.

## Getting Started

1. **Clone the Repository:**

   ```bash
   https://github.com/Vipu97/Virtual-Classroom.git

   ```

2. **Install dependencies:**

   Navigate to client directory and install frontend dependencies using npm

   ```
   npm install
   ```

   Similary navigate to server folder and install backend dependencies

   ```
   npm install
   ```

3. **ENV variables:**

   - Create env variables according to .env.example file in both client and server directories 

4. **Run project:**
   - Open terminal, navigate to client directory and run below command to start frontend
   ```
       npm run dev
   ```
   - Open another terminal, navigate to api directory and run this command to start backend server
   ```
       npm start or nodemon index.js
   ```

## Features

- **User Authentication:** Users can sign up, log in through email or google and log out securely. Passwords are securely store using firebase auth.

- **Create or View Events:**  User can create events and share the event code to student so that students can participate in it.
- **Create Questions:** Each event can contain different questions like mcq, poll, open, slide, sorting  to which student will respond.

- **Analysing or Visualizing Reponses:** Once users participated in an event and submitted their responses, then event organiser can either view the summary of all the responses or also can view each of the participators response seperately.

- **Create meeting:** User can also start meeting or live classes and share a meeting code to audience and they can join that meeting using that meeting code.

## Technologies Used

- **MongoDB:** NoSQL database for storing data related to user,events,questions.
- **Express.js:** Web application framework for building the backend server.
- **React.js:** JavaScript library for building the user interface.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Tailwind CSS:** A utility-first CSS framework
- **Chakra-UI:** For pre built components.
- **AWS S3:** Cloud-based image management for storing and serving images of a slide.
- **VIDEO_SDK:** For live conferencing features.

## 💥 Issues

For major changes, you are welcome to [open an issue](https://github.com/EddieHubCommunity/LinkFree/issues/new/choose) about what you would like to contribute. Enhancements are always encouraged and appreciated.

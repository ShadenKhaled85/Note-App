# 📝 Note App

A simple yet powerful **Angular Note-Taking Application** that allows users to **Create, Read, Update, and Delete (CRUD)** notes.  
The app also includes **authentication guards** to protect routes and a clean UI with a sidebar for navigation.  

---

## 🚀 Features

- **User Authentication**
  - Sign up for a new account
  - Sign in with existing credentials
  - Protected routes using Angular guards
  - Demo account for quick testing (see below 👇)

- **Guards**
  - `AuthGuard` → Ensures only logged-in users can access protected pages (like Home and Notes).
  - `LoggedGuard` → Prevents logged-in users from accessing login/signup pages again.

- **Notes Management**
  - ➕ Add new note
  - 📝 Edit existing note
  - ❌ Delete a note
  - 📄 View all notes

- **UI & Navigation**
  - Sidebar with:
    - **My Notes** → list of user notes
    - **Add New Note** → quick access to note creation
  - Responsive and user-friendly interface

---

## 🧑‍💻 Demo Account

You can try the app without creating a new account.  
Use the following credentials on the login page:
**Username: testtt@gmail.com**
**Password: Test@123**

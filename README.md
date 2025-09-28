# Backend API

---

## Table of Contents

1. [Authentication & Authorization](#authentication--authorization)
2. [User Management](#user-management)
3. [Notification System](#notification-system)
4. [Database & Models Updates](#database--models-updates)
5. [Seed Data](#seed-data)
6. [API Endpoints](#api-endpoints)
7. [Email Verification](#email-verification)
8. [Swagger, JWT Integration & Live Demo](#swagger-jwt-integration--live-demo)

---

## Authentication & Authorization

* User login (Login) and registration (Register) using JWT.
* User roles:

  * Admin for administrative tasks.
  * User for personal access.
* Password Change (ChangePassword) for users.
* Email verification added for new users.

---

## User Management

* View and edit user profile:

  * GetProfile → View user information.
  * EditProfile → Edit personal information, including Location (string).
* Admin tasks:

  * GetAllUsers → View all users and their Location.

---

## Notification System

* Add notifications for users:

  * Title → Notification title.
  * Message → Notification text.
  * CreatedAt → Creation time.
  * IsRead → Read status.
  * UserId → Target user.

---

## Database & Models Updates

* Configured tables for Users and Notifications.
* CreatedAt is automatically set (GETUTCDATE()).
* One-to-Many relationships:

  * Users ↔️ Notifications
* Added email verification fields in Users table:

  * IsEmailVerified → bool
  * EmailVerificationToken → string
  * EmailVerificationTokenExpiry → datetime

---

## Seed Data

* Initial Roles: Admin, User.
* Default Admin User:

  * Name: System Admin
  * Email: admin@greeneye.com
  * Password: hashed for production (currently plain text for seed)
  * Location: "Aga" (stored as a string field in the User entity)
  * Profile Image: direct link to the image

---

## API Endpoints

| Method | URL                      | Description                                                   | Authorization    |
| ------ | ------------------------ | --------------------------------------------------------      | ---------------- |
| POST   | /api/Auth/Register       | Register a new user (sends verification email with token)     | No               |
| GET    | /api/Auth/VerifyEmail    | Verify user email using token + email, then redirect to login | No               |
| POST   | /api/Auth/Login          | User login and receive JWT token                              | No               |
| POST   | /api/Auth/Logout         | Logout user                                                   | Yes (JWT)        |
| POST   | /api/Auth/ForgotPassword | Request password reset link                                   | No               |
| POST   | /api/Auth/ResetPassword  | Reset password using token                                    | No               |
| DELETE | /api/Auth/DeleteAccount  | Delete user account                                           | Yes (JWT)        |
| POST   | /api/Auth/ChangePassword | Change user password                                          | Yes (JWT)        |
| GET    | /api/User/Profile        | Get current user profile                                      | Yes (JWT)        |
| PUT    | /api/User/Profile        | Edit current user profile (including Location as string)      | Yes (JWT)        |
| GET    | /MyNotifications         | Get all notifications for current user                        | Yes (JWT)        |
| PUT    | /MarkAsRead              | Mark specific notification(s) as read                         | Yes (JWT)        |
| POST   | /Send                    | Send a notification (usually Admin only)                      | Yes (JWT)        |
| GET    | /api/Admin/Users         | Get all users (Admin only)                                    | Yes (JWT, Admin) |


---

## Email Verification

* Flow:

  1. User registers using /api/Auth/Register.
  2. System generates a unique verification token with 24-hour expiry and sends it to the user's email.
  3. User clicks verification link :/api/Auth/VerifyEmail?token={token}&email={email}.
  4. API checks:
     * If the user exists.
     * If the email is not already verified.
     * If the token matches and is not expired.
  5. If valid → sets IsEmailVerified = true and clears the token + expiry.
  6. User is then redirected automatically to the frontend login page.

---

## Swagger, JWT Integration & Live Demo

* Swagger integrated with JWT support.
* All secured endpoints require a valid JWT token.
* Enter the token in Swagger as: Bearer {your_token}.
* Live Deployment / Demo: [Green Eye API Swagger](https://greenfootprint.runasp.net/Swagger/index.html)

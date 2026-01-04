# Admin Panel Setup Guide

## Changes Made

### 1. Fixed Signup Flow ✅
- **Before**: Signup automatically logged users in and redirected to dashboard
- **After**: Signup shows success message and redirects to login page
- Users must now login after creating an account

### 2. Added Admin Panel ✅
- Complete admin dashboard for managing users
- View all user accounts with details
- Delete users (except self)
- Change user roles (admin/user)
- User statistics and analytics

### 3. Added Dedicated Admin Login Section ✅
- **Three-tab login interface**: User Login | Admin Login | Sign Up
- **Admin Login Tab**: Special interface for admin authentication
- **Admin Validation**: Verifies user has admin role before allowing access
- **Visual Distinction**: Purple theme for admin login, blue for user, green for signup

### 4. Default Admin Account ✅
- **Email**: `admin@careermentra.com`
- **Password**: `admin123`
- **Auto-created**: Default admin account created on server startup
- Any new user registering with `admin@careermentra.com` becomes admin

## How to Test

### Test User Signup Flow:
1. Go to http://localhost:5173
2. Click "Sign Up" tab
3. Create a new account
4. ✅ Should show success message and switch to "User Login" tab
5. Login with your credentials to access dashboard

### Test Admin Login:
1. Go to http://localhost:5173
2. Click "Admin Login" tab
3. Use credentials: `admin@careermentra.com` / `admin123`
4. ✅ Should login and show "Admin Panel" in sidebar
5. Click Admin Panel to manage users

### Test Admin Access Control:
1. Try logging into "Admin Login" with regular user credentials
2. ✅ Should show "Access denied. Admin privileges required."

## Login Interface Features

### User Login Tab:
- **Theme**: Blue gradient
- **Purpose**: Regular student/user access
- **Features**: Remember me, standard login

### Admin Login Tab:
- **Theme**: Purple gradient with shield icons
- **Purpose**: Administrative access only
- **Features**: Admin credential validation, role verification
- **Helper Text**: Shows admin access requirements

### Sign Up Tab:
- **Theme**: Green gradient
- **Purpose**: New account creation
- **Features**: Full name field, email validation

## Admin Features

### User Management:
- **View Users**: See all registered users with details
- **User Stats**: Total users, admin count, regular user count
- **Delete Users**: Remove users from system (cannot delete self)
- **Role Management**: Promote users to admin or demote to regular user

### Security:
- Admin-only endpoints protected with middleware
- JWT tokens include user role
- Frontend shows admin features only to admin users
- Admin login validates role before access

## Default Credentials

### Admin Account:
- **Email**: `admin@careermentra.com`
- **Password**: `admin123`
- **Role**: admin
- **Auto-created**: Yes (on server startup)

## API Endpoints

```
GET /api/admin/users - Get all users (admin only)
DELETE /api/admin/users/:id - Delete user (admin only)  
PUT /api/admin/users/:id/role - Change user role (admin only)
```

Your Career Mantra AI now has a complete admin login system with dedicated interface and proper access control!
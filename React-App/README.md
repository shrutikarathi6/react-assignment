📚 LearnHub - Learning Management System
LearnHub is a modern learning management system built with React, Vite, and Tailwind CSS. It provides an interactive platform for exploring courses, tracking learning progress, and managing educational content.


🚀 Quick Start
Prerequisites
1. Node.js 16 or higher
2. npm, yarn, or pnpm

Installation
1. Create and setup the project
2. Configure Tailwind CSS
3. Start development server
4. Open your browser:


🏗️ Project Structure
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── CourseExplorer/
│   │   ├── Sidebar.jsx
│   │   └── ContentRenderer.jsx
│   ├── Admin/
│   │   └── UserList.jsx
│   └── CourseCreation/
│       └── CourseForm.jsx
├── pages/
│   ├── CourseExplorer.jsx
│   ├── Admin.jsx
│   └── CourseCreation.jsx
├── context/
│   └── CourseContext.jsx
├── data/
│   ├── courses.json
│   └── users.json
├── App.jsx
└── main.jsx


✅ Features

Core Features
--> Course Explorer - Browse courses, topics, and subtopics
--> Markdown Support - Rich content rendering with code highlighting
--> Progress Tracking - Mark lessons as completed with localStorage persistence
--> Search & Filter - Find courses and topics quickly
Responsive Design - Works on all device sizes

Admin Features
--> User Management - View users and their roles
--> Statistics Dashboard - See user counts and distributions

Course Management
--> Create Courses - Build new courses with topics and subtopics
--> Import/Export - Backup and restore your data
--> Local Storage - Save custom courses locally

Nice-to-Have Features
--> Deep Linking - URLs remember your position
--> Keyboard Navigation - Accessible for all users
--> Progress Visualization - See completion percentages
--> Breadcrumb Navigation - Always know where you are


🎯 How to Use

Exploring Courses:
--> Click on courses in the sidebar to expand topics
--> Select topics to view subtopics
--> Read content in the main area
--> Mark subtopics as completed

Admin Panel:
--> Click "Admin" in navigation
--> View user list and statistics
--> Read-only user management

Creating Courses:
--> Click "Create Course" in navigation
--> Fill in course details
--> Add topics and subtopics
--> Save to localStorage


🔧 Technical Details

State Management
--> Uses React Context API for global state
--> Tracks course progress in localStorage
--> Manages course data and user information

Data Flow
--> Courses loaded from JSON files
--> User progress saved automatically
--> Real-time updates across components

Dependencies
--> React 18 - UI framework
--> Vite - Build tool and dev server
--> Tailwind CSS - Styling
--> React Router - Navigation
--> React Markdown - Content rendering
--> React Syntax Highlighter - Code blocks


🐛 Known Issues
--> Data Structure - Courses JSON needs array format instead of wrapper object
--> Missing IDs - Some data lacks unique identifiers
--> Error Handling - Limited validation for imported data
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
1. Course Explorer - Browse courses, topics, and subtopics
2. Markdown Support - Rich content rendering with code highlighting
3. Progress Tracking - Mark lessons as completed with localStorage persistence
4. Search & Filter - Find courses and topics quickly
5. Responsive Design - Works on all device sizes

Admin Features
1. User Management - View users and their roles
2. Statistics Dashboard - See user counts and distributions

Course Management
1. Create Courses - Build new courses with topics and subtopics
2. Import/Export - Backup and restore your data
3. Local Storage - Save custom courses locally

Nice-to-Have Features
1. Deep Linking - URLs remember your position
2. Keyboard Navigation - Accessible for all users
3. Progress Visualization - See completion percentages
4. Breadcrumb Navigation - Always know where you are


🎯 How to Use

Exploring Courses:
1. Click on courses in the sidebar to expand topics
2. Select topics to view subtopics
3. Read content in the main area
4. Mark subtopics as completed

Admin Panel:
1. Click "Admin" in navigation
2. View user list and statistics
3. Read-only user management

Creating Courses:
1. Click "Create Course" in navigation
2. Fill in course details
3. Add topics and subtopics
4. Save to localStorage


🔧 Technical Details

State Management
1. Uses React Context API for global state
2. Tracks course progress in localStorage
3. Manages course data and user information

Data Flow
1. Courses loaded from JSON files
2. User progress saved automatically
3. Real-time updates across components

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

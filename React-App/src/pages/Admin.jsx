import React from 'react';
import UserList from '../components/Admin/UserList';
import usersData from '../../../src/users.json';

const Admin = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users and view system information</p>
      </div>
      
      <UserList users={usersData} />
      
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{usersData.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructors</h3>
          <p className="text-3xl font-bold text-green-600">
            {usersData.filter(u => u.role === 'teacher').length}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
          <p className="text-3xl font-bold text-purple-600">
            {usersData.filter(u => u.role === 'student').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
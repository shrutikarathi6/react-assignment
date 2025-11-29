import React from 'react';

const UserList = ({ users }) => {
    const getRoleBadge = (role) => {
        const roleStyles = {
            INSTRUCTOR: 'bg-purple-100 text-purple-800',
            STUDENT: 'bg-green-100 text-green-800',
            ADMIN: 'bg-red-100 text-red-800'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleStyles[role] || 'bg-gray-100 text-gray-800'}`}>
                {role}
            </span>
        );
    };

    if (!users || users.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500">No users found</div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Users Management</h2>
                <p className="text-gray-600 text-sm mt-1">Read-only user list</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Courses
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.id}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getRoleBadge(user.role)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.role === "student" && (
                                        <div className="text-sm">
                                            {user.enrolledCourses ? (
                                                Array.isArray(user.enrolledCourses) ? (
                                                    <div>
                                                      
                                                        <span className="text-gray-500 ml-2">
                                                            ({user.enrolledCourses.join(', ')})
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-900">{user.enrolledCourses}</span>
                                                )
                                            ) : (
                                                <span className="text-gray-400">0</span>
                                            )}
                                        </div>
                                    )}
                                    {user.role === "teacher" && (
                                        <div className="text-sm">
                                            {user.authoredCourses ? (
                                                Array.isArray(user.authoredCourses) ? (
                                                    <div>
                                                        
                                                        <span className="text-gray-500 ml-2">
                                                            ({user.authoredCourses.join(', ')})
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-900">{user.authoredCourses}</span>
                                                )
                                            ) : (
                                                <span className="text-gray-400">0</span>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                    Showing {users.length} user{users.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    );
};

export default UserList;
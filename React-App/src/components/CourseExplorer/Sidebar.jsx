import React, { useState } from 'react';

const Sidebar = ({ 
  courses, 
  selectedCourse, 
  selectedTopic, 
  onCourseSelect, 
  onTopicSelect,
  searchTerm,
  onSearchChange 
}) => {
  const [expandedCourses, setExpandedCourses] = useState(new Set());

  const toggleCourse = (courseId) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.topics.some(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search courses or topics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Courses List */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Courses</h2>
        <div className="space-y-2">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border bg-blue-100/50 border-gray-200 rounded-lg">
              {/* Course Header */}
              <button
                onClick={() => toggleCourse(course.id)}
                className={`w-full px-3 py-3 text-left flex justify-between items-center hover:bg-gray-50 rounded-t-lg ${
                  selectedCourse?.id === course.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <span className="font-medium text-gray-900">{course.title}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    expandedCourses.has(course.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Topics List */}
              {expandedCourses.has(course.id) && (
                <div className="border-t border-gray-200">
                  {course.topics.map((topic) => (
                    <div key={topic.id} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => onTopicSelect(course, topic)}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                          selectedTopic?.id === topic.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="font-medium text-sm text-gray-800">{topic.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{topic.description}</div>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No courses found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
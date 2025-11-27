import React from 'react';
import CourseForm from '../components/CourseCreation/CourseForm';
import { useCourseContext } from '../context/CourseContext';

const CourseCreation = () => {
  const { addCourse, resetCourses } = useCourseContext();

  const handleSave = (course) => {
    addCourse(course);
    alert('Course created successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This will restore default courses.')) {
      resetCourses();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Creation</h1>
          <p className="text-gray-600 mt-2">Create and manage your learning courses</p>
        </div>

        <CourseForm onSave={handleSave} onReset={handleReset} />
      </div>
    </div>
  );
};

export default CourseCreation;
import React, { createContext, useContext, useState, useEffect } from 'react';
import coursesData from '../../../src/courses.json';

const CourseContext = createContext();

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  // Extract courses from the data structure
  const extractCourses = (data) => {
    // If data has a 'courses' property, use that array
    if (data && data.courses && Array.isArray(data.courses)) {
      return data.courses;
    }
    // If data is already an array, use it directly
    if (Array.isArray(data)) {
      return data;
    }
    // Fallback to empty array
    console.error('Invalid courses data structure:', data);
    return [];
  };

  useEffect(() => {
    const savedCourses = localStorage.getItem('learnhub-courses');
    
    if (savedCourses) {
      try {
        const parsed = JSON.parse(savedCourses);
        setCourses(extractCourses(parsed));
      } catch (error) {
        console.error('Error loading saved courses:', error);
        setCourses(extractCourses(coursesData));
      }
    } else {
      setCourses(extractCourses(coursesData));
    }
  }, []);

  // ... rest of your context methods remain the same
  const updateSubtopicCompletion = (courseId, topicId, subtopicId, completed) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? {
        ...course,
        topics: course.topics.map(topic =>
          topic.id === topicId ? {
            ...topic,
            subtopics: topic.subtopics.map(subtopic =>
              subtopic.id === subtopicId ? { ...subtopic, completed } : subtopic
            )
          } : topic
        )
      } : course
    ));
  };

  const addCourse = (course) => {
    // Ensure new course has an ID
    const courseWithId = {
      ...course,
      id: Date.now(), // Generate a unique ID
      topics: course.topics.map(topic => ({
        ...topic,
        id: Date.now() + Math.random(), // Generate unique topic IDs
        subtopics: topic.subtopics.map((subtopic, index) => ({
          ...subtopic,
          id: Date.now() + Math.random() + index // Generate unique subtopic IDs
        }))
      }))
    };
    setCourses(prev => [...prev, courseWithId]);
  };

  const resetCourses = () => {
    setCourses(extractCourses(coursesData));
    localStorage.removeItem('learnhub-courses');
    localStorage.removeItem('learnhub-progress');
  };

  const exportData = () => {
    const data = {
      courses: courses,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `learnhub-courses-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const importedCourses = extractCourses(data);
        setCourses(importedCourses);
        alert(`Successfully imported ${importedCourses.length} courses!`);
      } catch (error) {
        alert('Error parsing JSON file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  const value = {
    courses,
    updateSubtopicCompletion,
    addCourse,
    resetCourses,
    exportData,
    importData
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};
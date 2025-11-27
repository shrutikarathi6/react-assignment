import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/CourseExplorer/Sidebar';
import ContentRenderer from '../components/CourseExplorer/ContentRenderer';
import { useCourseContext } from '../context/CourseContext';

const CourseExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { courses, updateSubtopicCompletion } = useCourseContext();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load from URL params
  useEffect(() => {
    const courseId = searchParams.get('course');
    const topicId = searchParams.get('topic');
    const subtopicId = searchParams.get('subtopic');

    if (courseId) {
      const course = courses.find(c => c.id === parseInt(courseId));
      if (course) {
        setSelectedCourse(course);
        
        if (topicId) {
          const topic = course.topics.find(t => t.id === parseInt(topicId));
          if (topic) {
            setSelectedTopic(topic);
            
            if (subtopicId) {
              const subtopic = topic.subtopics.find(st => st.id === parseInt(subtopicId));
              if (subtopic) {
                setSelectedSubtopic(subtopic);
              }
            }
          }
        }
      }
    }
  }, [courses, searchParams]);

  // Update URL when selection changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCourse) {
      params.set('course', selectedCourse.id);
      if (selectedTopic) {
        params.set('topic', selectedTopic.id);
        if (selectedSubtopic) {
          params.set('subtopic', selectedSubtopic.id);
        }
      }
    }
    setSearchParams(params);
  }, [selectedCourse, selectedTopic, selectedSubtopic, setSearchParams]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
  };

  const handleTopicSelect = (course, topic) => {
    setSelectedCourse(course);
    setSelectedTopic(topic);
    setSelectedSubtopic(topic.subtopics[0] || null);
  };

  const handleSubtopicComplete = (subtopicId, completed) => {
    if (selectedCourse && selectedTopic) {
      updateSubtopicCompletion(selectedCourse.id, selectedTopic.id, subtopicId, completed);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar
         courses={Array.isArray(courses) ? courses : []}
        selectedCourse={selectedCourse}
        selectedTopic={selectedTopic}
        onCourseSelect={handleCourseSelect}
        onTopicSelect={handleTopicSelect}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="flex-1">
        <ContentRenderer
          course={selectedCourse}
          topic={selectedTopic}
          subtopic={selectedSubtopic}
          onSubtopicComplete={handleSubtopicComplete}
        />
      </div>
    </div>
  );
};

export default CourseExplorer;
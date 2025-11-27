import React, { useState } from 'react';

const CourseForm = ({ onSave, onReset }) => {
  const [course, setCourse] = useState({
    title: '',
    subtitle: '',
    description: '',
    difficulty: 'BEGINNER',
    learningObjectives: [''],
    coverImageUrl: '',
    topics: []
  });

  const [newTopic, setNewTopic] = useState({
    title: '',
    description: '',
    subtopics: ['']
  });

  const addLearningObjective = () => {
    setCourse(prev => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, '']
    }));
  };

  const updateLearningObjective = (index, value) => {
    const updated = [...course.learningObjectives];
    updated[index] = value;
    setCourse(prev => ({ ...prev, learningObjectives: updated }));
  };

  const removeLearningObjective = (index) => {
    const updated = course.learningObjectives.filter((_, i) => i !== index);
    setCourse(prev => ({ ...prev, learningObjectives: updated }));
  };

  const addSubtopic = () => {
    setNewTopic(prev => ({
      ...prev,
      subtopics: [...prev.subtopics, '']
    }));
  };

  const updateSubtopic = (index, value) => {
    const updated = [...newTopic.subtopics];
    updated[index] = value;
    setNewTopic(prev => ({ ...prev, subtopics: updated }));
  };

  const removeSubtopic = (index) => {
    const updated = newTopic.subtopics.filter((_, i) => i !== index);
    setNewTopic(prev => ({ ...prev, subtopics: updated }));
  };

  const addTopic = () => {
    if (newTopic.title.trim() && newTopic.subtopics.some(st => st.trim())) {
      const topic = {
        id: Date.now(),
        title: newTopic.title,
        description: newTopic.description,
        orderIndex: course.topics.length + 1,
        subtopics: newTopic.subtopics
          .filter(st => st.trim())
          .map((content, index) => ({
            id: Date.now() + index,
            title: `Subtopic ${index + 1}`,
            content,
            orderIndex: index + 1
          }))
      };

      setCourse(prev => ({
        ...prev,
        topics: [...prev.topics, topic]
      }));

      setNewTopic({
        title: '',
        description: '',
        subtopics: ['']
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCourse = {
      ...course,
      id: Date.now(),
      authorId: 1,
      learningObjectives: course.learningObjectives.filter(lo => lo.trim())
    };
    onSave(finalCourse);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Course Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={course.title}
                onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Full Stack Web Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={course.difficulty}
                onChange={(e) => setCourse(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={course.subtitle}
              onChange={(e) => setCourse(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the course"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={course.description}
              onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed course description..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={course.coverImageUrl}
              onChange={(e) => setCourse(prev => ({ ...prev, coverImageUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Objectives</h3>
          {course.learningObjectives.map((objective, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={objective}
                onChange={(e) => updateLearningObjective(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What will students learn?"
              />
              <button
                type="button"
                onClick={() => removeLearningObjective(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLearningObjective}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Learning Objective
          </button>
        </div>

        {/* Topics */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Topics</h3>
          
          {/* Add New Topic */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Topic</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic Title *
                </label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., JavaScript Fundamentals"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic Description
                </label>
                <textarea
                  value={newTopic.description}
                  onChange={(e) => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this topic..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtopics Content
                </label>
                {newTopic.subtopics.map((subtopic, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={subtopic}
                      onChange={(e) => updateSubtopic(index, e.target.value)}
                      rows={3}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Markdown content for this subtopic..."
                    />
                    <button
                      type="button"
                      onClick={() => removeSubtopic(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubtopic}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Subtopic
                </button>
              </div>

              <button
                type="button"
                onClick={addTopic}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
              >
                Add Topic to Course
              </button>
            </div>
          </div>

          {/* Existing Topics */}
          {course.topics.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Course Topics ({course.topics.length})</h4>
              <div className="space-y-3">
                {course.topics.map((topic, index) => (
                  <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-900">{topic.title}</h5>
                      <span className="text-sm text-gray-500">
                        {topic.subtopics.length} subtopic{topic.subtopics.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onReset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
          >
            Reset Form
          </button>
          
          <button
            type="submit"
            disabled={!course.title.trim() || course.topics.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
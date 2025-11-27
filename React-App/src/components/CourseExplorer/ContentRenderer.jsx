import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const ContentRenderer = ({ course, topic, subtopic, onSubtopicComplete }) => {
  if (!course) {
    return (
     <div className="flex items-center justify-center h-64">
  <div className="text-center">
    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to LearnHub</h3>
    <p className="text-gray-500">Select a course and topic to start learning</p>
  </div>
</div>
    );
  }

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-500">Select a topic to view its content</p>
        </div>
      </div>
    );
  }

  const currentSubtopicIndex = topic.subtopics.findIndex(st => st.id === subtopic?.id);
  const currentSubtopic = topic.subtopics[currentSubtopicIndex];

  const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const code = String(children).replace(/\n$/, '');

      if (!inline && language) {
        return (
          <SyntaxHighlighter
            style={atomDark}
            language={language}
            PreTag="div"
            className="rounded-lg my-4"
            {...props}
          >
            {code}
          </SyntaxHighlighter>
        );
      }

      return (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white p-4">
        <nav className="flex space-x-2 text-sm">
          <span className="text-gray-500">{course.title}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">{topic.title}</span>
          {subtopic && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">{subtopic.title}</span>
            </>
          )}
        </nav>
      </div>

      {/* Subtopic Navigation */}
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {subtopic?.title || topic.title}
            </h1>
            {subtopic && (
              <p className="text-gray-600 mt-1">
                {currentSubtopicIndex + 1} of {topic.subtopics.length} in {topic.title}
              </p>
            )}
          </div>

          {subtopic && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onSubtopicComplete(subtopic.id, !subtopic.completed)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  subtopic.completed
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {subtopic.completed ? 'Completed ✓' : 'Mark Complete'}
              </button>

             
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {subtopic ? (
            <article className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={CodeBlock}
              >
                {subtopic.content}
              </ReactMarkdown>
            </article>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-8">{topic.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topic.subtopics.map((subtopic, index) => (
                  <div
                    key={subtopic.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                    onClick={() => {/* Handle subtopic selection */}}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Lesson {index + 1}
                      </span>
                      {subtopic.completed && (
                        <span className="text-green-600 text-sm">✓ Completed</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900">{subtopic.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentRenderer;
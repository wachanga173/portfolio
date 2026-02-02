import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCertificate, FaTrophy } from 'react-icons/fa';
import api from '../api/axios';

interface ResumeSection {
  id: number;
  section_name: string;
  content: any;
  updated_at: string;
}

const Resume: React.FC = () => {
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeSections();
  }, []);

  const fetchResumeSections = async () => {
    try {
      const response = await api.get('/resume');
      setSections(response.data);
    } catch (error) {
      console.error('Failed to fetch resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSection = (name: string) => {
    return sections.find((s) => s.section_name === name);
  };

  const renderSection = (section: ResumeSection | undefined, icon: any, title: string) => {
    if (!section) return null;
    const Icon = icon;
    const content = section.content;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon className="text-3xl text-primary-500" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        {/* Summary Section */}
        {section.section_name === 'summary' && content.text && (
          <p className="text-gray-300 leading-relaxed">{content.text}</p>
        )}

        {/* Experience/Education Section */}
        {(section.section_name === 'experience' || section.section_name === 'education') &&
          content.items?.map((item: any, idx: number) => (
            <div key={idx} className="mb-6 last:mb-0">
              <h3 className="text-xl font-semibold text-primary-400">{item.title}</h3>
              <p className="text-gray-400">
                {item.company || item.institution} • {item.period}
              </p>
              <p className="text-gray-300 mt-2">{item.description}</p>
            </div>
          ))}

        {/* Skills Section */}
        {section.section_name === 'skills' && content.categories && (
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(content.categories).map(([category, skills]: [string, any]) => (
              <div key={category}>
                <h3 className="font-semibold text-primary-400 mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-primary-500/20 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects/Certifications/Awards - List Format */}
        {(section.section_name === 'projects' ||
          section.section_name === 'certifications' ||
          section.section_name === 'awards') &&
          content.items?.map((item: any, idx: number) => (
            <div key={idx} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-primary-400">{item.title || item.name}</h3>
              <p className="text-gray-300">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline text-sm"
                >
                  View →
                </a>
              )}
            </div>
          ))}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-dark-900">
      <div className="container-custom py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          My Resume
        </motion.h1>

        <div className="max-w-4xl mx-auto">
          {renderSection(getSection('summary'), FaBriefcase, 'Professional Summary')}
          {renderSection(getSection('experience'), FaBriefcase, 'Work Experience')}
          {renderSection(getSection('education'), FaGraduationCap, 'Education')}
          {renderSection(getSection('skills'), FaBriefcase, 'Skills')}
          {renderSection(getSection('projects'), FaBriefcase, 'Notable Projects')}
          {renderSection(getSection('certifications'), FaCertificate, 'Certifications')}
          {renderSection(getSection('awards'), FaTrophy, 'Awards & Recognition')}

          {sections.length === 0 && (
            <div className="card text-center">
              <p className="text-gray-400 text-lg">Resume content coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;

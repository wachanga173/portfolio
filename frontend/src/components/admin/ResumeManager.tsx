import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import api from '../../api/axios';
import { toast } from 'react-toastify';

interface ResumeSection {
  id: number;
  section_name: string;
  content: any;
  updated_at: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

const ResumeManager: React.FC = () => {
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [activeTab, setActiveTab] = useState<
    'summary' | 'experience' | 'education' | 'certifications' | 'awards' | 'languages'
  >('summary');
  const [loading, setLoading] = useState(false);

  // Summary
  const [summary, setSummary] = useState('');

  // Experience
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  // Education
  const [educations, setEducations] = useState<EducationItem[]>([]);

  // Certifications
  const [certifications, setCertifications] = useState<string[]>([]);

  // Awards
  const [awards, setAwards] = useState<string[]>([]);

  // Languages
  const [languages, setLanguages] = useState<string[]>([]);

  const loadActiveTabData = useCallback(() => {
    const section = sections.find((s) => s.section_name === activeTab);
    if (!section) return;

    switch (activeTab) {
      case 'summary':
        setSummary(section.content?.text || '');
        break;
      case 'experience':
        setExperiences(section.content?.items || []);
        break;
      case 'education':
        setEducations(section.content?.items || []);
        break;
      case 'certifications':
        setCertifications(section.content?.items || []);
        break;
      case 'awards':
        setAwards(section.content?.items || []);
        break;
      case 'languages':
        setLanguages(section.content?.items || []);
        break;
    }
  }, [activeTab, sections]);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    loadActiveTabData();
  }, [activeTab, sections, loadActiveTabData]);

  const fetchSections = async () => {
    try {
      const response = await api.get('/resume');
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let content: any;

      switch (activeTab) {
        case 'summary':
          content = { text: summary };
          break;
        case 'experience':
          content = { items: experiences };
          break;
        case 'education':
          content = { items: educations };
          break;
        case 'certifications':
          content = { items: certifications };
          break;
        case 'awards':
          content = { items: awards };
          break;
        case 'languages':
          content = { items: languages };
          break;
      }

      await api.put(`/resume/${activeTab}`, { content });
      toast.success('Section saved successfully!');
      fetchSections();
    } catch (error) {
      toast.error('Error saving section');
    } finally {
      setLoading(false);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { title: '', company: '', period: '', description: '' }]);
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducations([...educations, { degree: '', institution: '', year: '', description: '' }]);
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, '']);
  };

  const updateCertification = (index: number, value: string) => {
    const updated = [...certifications];
    updated[index] = value;
    setCertifications(updated);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addAward = () => {
    setAwards([...awards, '']);
  };

  const updateAward = (index: number, value: string) => {
    const updated = [...awards];
    updated[index] = value;
    setAwards(updated);
  };

  const removeAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    setLanguages([...languages, '']);
  };

  const updateLanguage = (index: number, value: string) => {
    const updated = [...languages];
    updated[index] = value;
    setLanguages(updated);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };
  return (
    <div className="card">
      <h2 className="section-title text-left mb-6">Resume Manager</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {['summary', 'experience', 'education', 'certifications', 'awards', 'languages'].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Professional Summary
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Write a brief professional summary about yourself..."
            />
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Experience {index + 1}
                </h3>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Period (e.g., 2020-2023)"
                  value={exp.period}
                  onChange={(e) => updateExperience(index, 'period', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows={3}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
                />
              </div>
            </div>
          ))}
          <button onClick={addExperience} className="btn-secondary flex items-center gap-2">
            <FaPlus /> Add Experience
          </button>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Education {index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2020)"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
                />
                <textarea
                  placeholder="Description"
                  value={edu.description}
                  onChange={(e) => updateEducation(index, 'description', e.target.value)}
                  rows={2}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white md:col-span-2"
                />
              </div>
            </div>
          ))}
          <button onClick={addEducation} className="btn-secondary flex items-center gap-2">
            <FaPlus /> Add Education
          </button>
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Certification name"
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => removeCertification(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button onClick={addCertification} className="btn-secondary flex items-center gap-2">
            <FaPlus /> Add Certification
          </button>
        </div>
      )}

      {/* Awards Tab */}
      {activeTab === 'awards' && (
        <div className="space-y-3">
          {awards.map((award, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Award name"
                value={award}
                onChange={(e) => updateAward(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => removeAward(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button onClick={addAward} className="btn-secondary flex items-center gap-2">
            <FaPlus /> Add Award
          </button>
        </div>
      )}

      {/* Languages Tab */}
      {activeTab === 'languages' && (
        <div className="space-y-3">
          {languages.map((language, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Language (e.g., English - Fluent)"
                value={language}
                onChange={(e) => updateLanguage(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => removeLanguage(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button onClick={addLanguage} className="btn-secondary flex items-center gap-2">
            <FaPlus /> Add Language
          </button>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ResumeManager;

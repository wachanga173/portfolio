import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaTools } from 'react-icons/fa';
import api from '../api/axios';
import { toast } from 'react-toastify';

interface Skill {
  id?: number;
  name: string;
  category: string;
  proficiency: number;
}

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

  const emptySkill: Skill = {
    name: '',
    category: 'Frontend',
    proficiency: 50,
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingSkill) return;

    try {
      if (editingSkill.id) {
        await api.put(`/skills/${editingSkill.id}`, editingSkill);
        toast.success('Skill updated successfully!');
      } else {
        await api.post('/skills', editingSkill);
        toast.success('Skill created successfully!');
      }
      fetchSkills();
      setEditingSkill(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Failed to save skill');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await api.delete(`/skills/${id}`);
      toast.success('Skill deleted successfully!');
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-20">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <FaTools className="text-4xl text-indigo-600 dark:text-indigo-400" />
            <h1 className="section-title text-left mb-0">Manage Skills</h1>
          </div>
          <button
            onClick={() => {
              setEditingSkill({ ...emptySkill });
              setIsAdding(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus /> Add Skill
          </button>
        </div>

        {/* Edit/Add Form */}
        {editingSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {isAdding ? 'Add New Skill' : 'Edit Skill'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., React, Node.js"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Proficiency: {editingSkill.proficiency}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingSkill.proficiency}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <FaSave /> Save
              </button>
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setIsAdding(false);
                }}
                className="btn-secondary flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Skills List */}
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {skill.name}
                      </h3>
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsAdding(false);
                        }}
                        className="btn-secondary flex items-center gap-2 text-sm"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => skill.id && handleDelete(skill.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;

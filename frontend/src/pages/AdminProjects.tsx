import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaProjectDiagram,
} from 'react-icons/fa';
import api from '../api/axios';
import { toast } from 'react-toastify';

interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string;
  github_url?: string;
  live_url?: string;
  image_url?: string;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const emptyProject: Project = {
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: '',
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      if (editingProject.id) {
        await api.put(`/projects/${editingProject.id}`, editingProject);
        toast.success('Project updated successfully!');
      } else {
        await api.post('/projects', editingProject);
        toast.success('Project created successfully!');
      }
      fetchProjects();
      setEditingProject(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl">Loading projects...</div>
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
            <FaProjectDiagram className="text-4xl text-indigo-600 dark:text-indigo-400" />
            <h1 className="section-title text-left mb-0">Manage Projects</h1>
          </div>
          <button
            onClick={() => {
              setEditingProject({ ...emptyProject });
              setIsAdding(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus /> Add Project
          </button>
        </div>

        {/* Edit/Add Form */}
        {editingProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Project Description / Explanation
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Explain your project in detail - what it does, key features, technologies used, challenges overcome, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, technologies: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="React, TypeScript, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Project Image URL
                </label>
                <input
                  type="url"
                  value={editingProject.image_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, image_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://i.imgur.com/example.jpg"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  💡 Upload your image to{' '}
                  <a
                    href="https://imgur.com/upload"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Imgur
                  </a>{' '}
                  or{' '}
                  <a
                    href="https://cloudinary.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Cloudinary
                  </a>
                  , then paste the direct image URL here
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={editingProject.github_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, github_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Live URL
                </label>
                <input
                  type="url"
                  value={editingProject.live_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, live_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <FaSave /> Save
              </button>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsAdding(false);
                }}
                className="btn-secondary flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects List */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card">
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(typeof project.technologies === 'string'
                  ? JSON.parse(project.technologies)
                  : project.technologies || []
                ).map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setIsAdding(false);
                  }}
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => project.id && handleDelete(project.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;

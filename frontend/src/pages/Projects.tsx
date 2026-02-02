import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../api/axios';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          My Projects
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:shadow-2xl hover:shadow-primary-500/20"
            >
              {project.image_url && (
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60"></div>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-3 gradient-text">{project.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies &&
                  (() => {
                    try {
                      // If it's already an array, return it
                      if (Array.isArray(project.technologies)) {
                        return project.technologies;
                      }
                      // If it's a string, try parsing as JSON first
                      if (typeof project.technologies === 'string') {
                        try {
                          return JSON.parse(project.technologies);
                        } catch {
                          // If JSON parse fails, it's a comma-separated string
                          return project.technologies.split(',').map((t: string) => t.trim());
                        }
                      }
                      // Fallback to empty array
                      return [];
                    } catch {
                      return [];
                    }
                  })().map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm border border-primary-500/30"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <FaGithub /> Code
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;

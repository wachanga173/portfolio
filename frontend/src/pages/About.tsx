import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
  FaTiktok,
  FaTelegram,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from 'react-icons/fa';
import api from '../api/axios';

const About: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetchProfile();
    fetchSocialLinks();
    fetchSkills();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await api.get('/social');
      setSocialLinks(response.data);
    } catch (error) {
      console.error('Failed to fetch social links:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };

  const getIcon = (platform: string) => {
    const iconMap: any = {
      linkedin: FaLinkedin,
      github: FaGithub,
      twitter: FaTwitter,
      facebook: FaFacebook,
      instagram: FaInstagram,
      tiktok: FaTiktok,
      telegram: FaTelegram,
    };
    return iconMap[platform.toLowerCase()] || FaGithub;
  };

  const groupedSkills = skills.reduce((acc: any, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400"
        >
          About Me
        </motion.h1>

        {/* Profile Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 mb-12">
            {/* Left Column - Image and Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <img
                src={
                  profile?.image_url ||
                  'https://media.licdn.com/dms/image/v2/D5603AQHbSqdCaNFd5A/profile-displayphoto-scale_200_200/B56Zql_kN0HYAc-/0/1763721497836?e=1771459200&v=beta&t=_HmRulZ_luxgrMdg9EnQDSzdh9EvHtvXnk71HA4xzoU'
                }
                alt={profile?.name}
                className="rounded-2xl shadow-2xl border-4 border-indigo-500/50 w-full h-auto object-cover"
              />

              {/* Contact Info Below Image */}
              <div className="space-y-3 bg-gray-800/50 p-6 rounded-xl border border-indigo-500/20">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Contact Me</h3>
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <FaEnvelope className="text-indigo-500 text-lg" />
                    <span className="text-sm">{profile.email}</span>
                  </a>
                )}
                {profile?.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <FaPhone className="text-indigo-500 text-lg" />
                    <span className="text-sm">{profile.phone}</span>
                  </a>
                )}
                {profile?.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <FaWhatsapp className="text-green-500 text-lg" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                )}
              </div>

              {/* Social Links Below Contact */}
              <div className="bg-gray-800/50 p-6 rounded-xl border border-indigo-500/20">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Connect With Me</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link) => {
                    const Icon = getIcon(link.platform);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
                        title={link.platform}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Name, Title, Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {profile?.name || 'Peter Wachanga'}
              </h2>
              <h3 className="text-xl md:text-2xl text-purple-400">
                {profile?.title || 'Full-Stack Developer'}
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4 text-base md:text-lg">
                {profile?.bio ? (
                  profile.bio.split('\n').map((paragraph: string, index: number) =>
                    paragraph.trim() ? (
                      <p key={index} className="text-gray-300">
                        {paragraph}
                      </p>
                    ) : null
                  )
                ) : (
                  <p>
                    Passionate full-stack developer with expertise in React, TypeScript, Node.js,
                    and modern web technologies. Building scalable applications and solving complex
                    problems.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Skills & Expertise
          </h2>
          <div className="space-y-8">
            {Object.keys(groupedSkills).map((category) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {groupedSkills[category].map((skill: any) => (
                    <div key={skill.id} className="card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-indigo-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

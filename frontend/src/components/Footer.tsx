import React, { useEffect, useState } from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTelegram,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await api.get('/social');
      setSocialLinks(response.data);
    } catch (error) {
      console.error('Failed to fetch social links:', error);
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
    const Icon = iconMap[platform.toLowerCase()] || FaGithub;
    return <Icon />;
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">Peter Wachanga</h3>
            <p className="text-gray-400">
              Full Stack Developer crafting beautiful and functional web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-200">Connect With Me</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 hover:text-primary-500 transition-all duration-300 transform hover:scale-110"
                  title={link.platform}
                >
                  {getIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Peter Wachanga. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

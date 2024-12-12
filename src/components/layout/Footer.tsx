import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About VisaPort</h3>
            <p className="text-gray-400 mb-4">
              Making visa applications simple and hassle-free with AI-powered assistance and expert support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Track Application</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Support Center</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Popular Visas</h3>
            <ul className="space-y-2">
              <li><Link to="/visa/dubai" className="hover:text-white transition-colors">Dubai Visa</Link></li>
              <li><Link to="/visa/singapore" className="hover:text-white transition-colors">Singapore Visa</Link></li>
              <li><Link to="/visa/uk" className="hover:text-white transition-colors">UK Visa</Link></li>
              <li><Link to="/visa/usa" className="hover:text-white transition-colors">USA Visa</Link></li>
              <li><Link to="/visa/schengen" className="hover:text-white transition-colors">Schengen Visa</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>123 Business Avenue, Mumbai, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+91 073148 52914</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>support@visaport.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 VisaPort. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-sm hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
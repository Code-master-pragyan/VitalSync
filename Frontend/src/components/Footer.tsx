import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id='contact' className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <img src="/vitalsync logo.png" alt="logo" height={35} width={35} />
                <span className="text-xl font-bold">VitalSync</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming healthcare through innovative AI-powered solutions. 
                Your health, our priority - accessible, reliable, and personalized care for everyone.
              </p>
              <div className="flex space-x-4">
                <SocialLink href="#" icon={Facebook} label="Facebook" />
                <SocialLink href="#" icon={Twitter} label="Twitter" />
                <SocialLink href="#" icon={Instagram} label="Instagram" />
                <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                <SocialLink href="#" icon={Youtube} label="YouTube" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <nav className="space-y-3">
                <FooterLink href="#about">About Us</FooterLink>
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#ratings">Patient Reviews</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
                <FooterLink href="#careers">Careers</FooterLink>
                <FooterLink href="#blog">Health Blog</FooterLink>
              </nav>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Our Services</h3>
              <nav className="space-y-3">
                <FooterLink href="#ai-checker">AI Symptom Checker</FooterLink>
                <FooterLink href="#encyclopedia">Disease Encyclopedia</FooterLink>
                <FooterLink href="#scanner">Medicine Scanner</FooterLink>
                <FooterLink href="#telemedicine">Telemedicine</FooterLink>
                <FooterLink href="#appointments">Online Appointments</FooterLink>
                <FooterLink href="#emergency">Emergency Support</FooterLink>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-400">
                    <p>123 Healthcare Avenue</p>
                    <p>Medical District, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div className="text-gray-400">
                    <p>+1 (555) 123-4567</p>
                    <p className="text-sm">24/7 Emergency Hotline</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <div className="text-gray-400">
                    <p>support@healthcare.com</p>
                    <p className="text-sm">General Inquiries</p>
                  </div>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2">Medical Emergency?</h4>
                <p className="text-red-300 text-sm mb-2">
                  For life-threatening emergencies, call 911 immediately.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Emergency Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated with Health Tips</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest health insights, tips, and platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 HealthCare Platform. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#cookies">Cookie Policy</FooterLink>
              <FooterLink href="#accessibility">Accessibility</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => {
  return (
    <a
      href={href}
      className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-200 group"
      aria-label={label}
    >
      <Icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200 block"
    >
      {children}
    </a>
  );
};

export default Footer;
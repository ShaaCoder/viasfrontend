import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MessageSquare,
  FileText,
  HelpCircle,
  Book,
  Video,
  Bot,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  TicketIcon
} from 'lucide-react';
import { AIAssistant } from '../components/ai/AIAssistant';
import { DocumentScanner } from '../components/ai/DocumentScanner';
import { DocumentVerifier } from '../components/ai/DocumentVerifier';
import { TranslationAssistant } from '../components/ai/TranslationAssistant';
import { SupportTicketForm } from '../components/support/SupportTicketForm';

const commonQuestions = [
  {
    category: 'Application Process',
    questions: [
      'How long does visa processing take?',
      'What documents do I need?',
      'How can I track my application?'
    ]
  },
  {
    category: 'Document Requirements',
    questions: [
      'What are the photo requirements?',
      'Do I need to translate my documents?',
      'How to get document verification?'
    ]
  },
  {
    category: 'Payment & Fees',
    questions: [
      'What payment methods are accepted?',
      'Are there any additional fees?',
      'What is your refund policy?'
    ]
  }
];

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeAITool, setActiveAITool] = useState<string | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleAIAssistantClick = () => {
    setShowAIChat(true);
    setActiveAITool('assistant');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {[
            { icon: Bot, label: 'AI Assistant', tool: 'assistant', action: handleAIAssistantClick },
            { icon: FileText, label: 'Document Scanner', tool: 'scanner' },
            { icon: HelpCircle, label: 'Document Verifier', tool: 'verifier' },
            { icon: Book, label: 'Translation Helper', tool: 'translator' },
            { icon: TicketIcon, label: 'Raise Ticket', tool: 'ticket' }
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (action.action) {
                  action.action();
                } else if (action.tool === 'ticket') {
                  setShowTicketForm(true);
                  setActiveAITool(null);
                } else {
                  setActiveAITool(action.tool);
                  setShowTicketForm(false);
                }
              }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <action.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <span className="font-medium">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Categories */}
          <div className="lg:col-span-2">
            {showTicketForm ? (
              <SupportTicketForm />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Help Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: FileText, title: 'Visa Applications', count: 25 },
                    { icon: MessageSquare, title: 'Support & Help', count: 18 },
                    { icon: Video, title: 'Video Guides', count: 12 },
                    { icon: Book, title: 'Documentation', count: 30 }
                  ].map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <category.icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.count} articles</p>
                    </motion.div>
                  ))}
                </div>

                {/* Common Questions */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Common Questions</h2>
                  {commonQuestions.map((category) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedCategory(
                          expandedCategory === category.category ? null : category.category
                        )}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                      >
                        <span className="font-medium">{category.category}</span>
                        {expandedCategory === category.category ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      {expandedCategory === category.category && (
                        <div className="px-6 pb-4">
                          <ul className="space-y-3">
                            {category.questions.map((question) => (
                              <li key={question}>
                                <a
                                  href="#"
                                  className="flex items-center text-blue-600 hover:text-blue-700"
                                >
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  {question}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Contact & Resources */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Contact Support</h3>
              <div className="space-y-4">
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                >
                  <Phone className="w-5 h-5" />
                  <span>+1 (234) 567-890</span>
                </a>
                <a
                  href="mailto:support@example.com"
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5" />
                  <span>support@example.com</span>
                </a>
              </div>
            </div>

            {/* AI Tools Section */}
            {activeAITool && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activeAITool === 'assistant' && <AIAssistant isOpen={showAIChat} />}
                {activeAITool === 'scanner' && <DocumentScanner />}
                {activeAITool === 'verifier' && <DocumentVerifier />}
                {activeAITool === 'translator' && <TranslationAssistant />}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
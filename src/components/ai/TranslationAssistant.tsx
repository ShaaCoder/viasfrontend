import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' }
];

export function TranslationAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = () => {
    // Simulate translation
    setTimeout(() => {
      setTranslatedText(`[Translated to ${selectedLanguage.name}]: ${text}`);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold mb-2">Real-time Translation</h3>
      <p className="text-gray-600 mb-6">
        Translate visa requirements and documents instantly
      </p>

      <div className="space-y-4">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-3 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <span>{selectedLanguage.name}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 p-3 hover:bg-gray-50 transition-colors"
                >
                  {language.code === selectedLanguage.code && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                  <span>{language.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={() => handleTranslate()}
          placeholder="Type or paste text to translate..."
          className="w-full h-32 p-3 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
        />

        {translatedText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <h4 className="font-medium text-sm text-gray-500 mb-2">Translation:</h4>
            <p className="text-gray-800">{translatedText}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
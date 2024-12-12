import React, { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calendar, FileText, CheckCircle, Shield, Clock } from 'lucide-react';

interface TimelineStep {
  icon: typeof Calendar | typeof FileText | typeof CheckCircle | typeof Shield | typeof Clock;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

export function VisaTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps: TimelineStep[] = [
    {
      icon: Calendar,
      title: 'Application Started',
      description: 'Share travel details and make secure payment',
      date: 'Today',
      status: 'completed'
    },
    {
      icon: Shield,
      title: 'Document Verification',
      description: 'Expert review of your documents',
      date: 'Today + 1 day',
      status: 'current'
    },
    {
      icon: FileText,
      title: 'Embassy Submission',
      description: 'Application submitted to embassy',
      date: 'Today + 2 days',
      status: 'upcoming'
    },
    {
      icon: Clock,
      title: 'Processing',
      description: 'Application under embassy review',
      date: 'Today + 3-5 days',
      status: 'upcoming'
    },
    {
      icon: CheckCircle,
      title: 'Visa Delivered',
      description: 'Ready for your journey',
      date: 'Today + 7 days',
      status: 'upcoming'
    }
  ];

  return (
    <div className="relative py-16" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-blue-500 origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline Steps */}
        <div className="relative space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content */}
              <div className="w-[calc(50%-2rem)]">
                <motion.div
                  className={`bg-white p-6 rounded-xl shadow-sm border-2 ${
                    step.status === 'completed' ? 'border-green-500' :
                    step.status === 'current' ? 'border-blue-500' :
                    'border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'current' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      <step.icon className={`w-6 h-6 ${
                        step.status === 'completed' ? 'text-green-600' :
                        step.status === 'current' ? 'text-blue-600' :
                        'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {step.status === 'current' && (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm text-blue-600 font-medium">In Progress</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Timeline Point */}
              <div className="w-16 flex justify-center items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.2 + 0.1 }}
                  className={`w-4 h-4 rounded-full ring-4 ${
                    step.status === 'completed' ? 'bg-green-500 ring-green-100' :
                    step.status === 'current' ? 'bg-blue-500 ring-blue-100' :
                    'bg-gray-300 ring-gray-100'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Labels */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.5 }}
          className="absolute left-0 top-1/4 -translate-x-full pr-8"
        >
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            🔒 100% Safe & Secure
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.7 }}
          className="absolute right-0 top-1/2 translate-x-full pl-8"
        >
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            ✨ AI-Powered Assistance
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.9 }}
          className="absolute right-0 bottom-1/4 translate-x-full pl-8"
        >
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            📱 Real-time Updates
          </div>
        </motion.div>
      </div>
    </div>
  );
}
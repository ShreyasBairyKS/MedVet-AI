import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Database, Zap, Shield, Github, Twitter, Linkedin, Mail, Heart, Star, Award, Users, Target, Sparkles } from 'lucide-react';

const About = () => {
  const technologies = [
    { name: 'OpenAI GPT-4o', icon: Brain, color: 'from-purple-500 to-purple-600', desc: 'Advanced language models' },
    { name: 'LangFlow', icon: Activity, color: 'from-blue-500 to-blue-600', desc: 'Visual AI orchestration' },
    { name: 'Astra DB', icon: Database, color: 'from-teal-500 to-teal-600', desc: 'Vector embeddings' },
    { name: 'React', icon: Zap, color: 'from-cyan-500 to-cyan-600', desc: 'Modern UI framework' },
    { name: 'Medical KB', icon: Shield, color: 'from-indigo-500 to-indigo-600', desc: 'Clinical knowledge base' },
  ];

  const features = [
    {
      icon: Target,
      title: 'Multi-Modal Analysis',
      desc: 'Combines image recognition and symptom analysis for comprehensive diagnosis',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      desc: 'Leverages GPT-4o and specialized medical models for accurate assessments',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      title: 'Urgency Triage',
      desc: 'Smart RED/YELLOW/GREEN classification helps prioritize medical attention',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Multi-Species Support',
      desc: 'Designed for humans, dogs, and cats with species-specific analysis',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { icon: Activity, label: 'AI Models', value: '5+' },
    { icon: Database, label: 'Knowledge Articles', value: '1000+' },
    { icon: Star, label: 'Accuracy Rate', value: '95%' },
    { icon: Users, label: 'Species Supported', value: '3' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 via-purple-600 to-pink-500">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
            x: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Award className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">AI-Powered Medical Diagnostics</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About MedVet AI
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              A cutting-edge medical diagnostic platform that combines artificial intelligence, 
              computer vision, and clinical knowledge to provide instant health analysis for 
              humans and pets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To democratize access to preliminary medical insights using advanced AI technology, 
              helping individuals make informed decisions about seeking professional medical care 
              for themselves and their pets.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08, y: -10, rotate: 3 }}
                className="bg-gradient-to-br from-white via-cyan-50 to-blue-50 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-cyan-300"
              >
                <stat.icon className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">What makes MedVet AI unique</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-cyan-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600">Powered by cutting-edge AI and medical technology</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl -z-10"
                     style={{ background: `linear-gradient(to right, ${tech.color})` }} />
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center">
                  <div className={`w-14 h-14 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <tech.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Architecture */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">System Architecture</h2>
            <p className="text-xl text-gray-600">A multi-stage AI pipeline for comprehensive analysis</p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Input Processing',
                  desc: 'Images are encoded and symptoms are parsed through GPT-4o Vision',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  step: '2',
                  title: 'Knowledge Retrieval',
                  desc: 'Astra DB vector store queries medical knowledge base for relevant context',
                  color: 'from-teal-500 to-teal-600'
                },
                {
                  step: '3',
                  title: 'AI Analysis',
                  desc: 'Multiple LLM chains process diagnosis, medications, and urgency assessment',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  step: '4',
                  title: 'Report Generation',
                  desc: 'Comprehensive markdown report with RED/YELLOW/GREEN triage classification',
                  color: 'from-pink-500 to-pink-600'
                }
              ].map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-6"
                >
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${stage.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {stage.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{stage.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{stage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-12 h-12 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Medical Disclaimer</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  MedVet AI is an AI-powered educational tool designed to provide preliminary health insights. 
                  It is <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Always seek the advice of your physician, veterinarian, or other qualified health provider 
                  with any questions you may have regarding a medical condition. Never disregard professional 
                  medical advice or delay in seeking it because of information provided by this tool.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  In case of a medical emergency, call your doctor or emergency services immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact/Social Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-teal to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-xl text-white/90 mb-8">
              Questions or feedback? We'd love to hear from you
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { icon: Github, label: 'GitHub', gradient: 'from-gray-700 to-gray-900' },
                { icon: Twitter, label: 'Twitter', gradient: 'from-cyan-400 to-blue-500' },
                { icon: Linkedin, label: 'LinkedIn', gradient: 'from-blue-600 to-indigo-700' },
                { icon: Mail, label: 'Email', gradient: 'from-pink-500 to-purple-600' }
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.15, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${social.gradient} text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all`}
                >
                  <social.icon className="w-5 h-5" />
                  {social.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

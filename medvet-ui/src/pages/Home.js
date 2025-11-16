import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Image, FileText, Zap, Shield, Clock, ArrowRight, Star, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Image,
      title: 'Image Analysis',
      description: 'AI-powered visual diagnosis from photos',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Symptom Checker',
      description: 'Comprehensive text-based evaluation',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get analysis in seconds',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Medical Grade',
      description: 'Backed by clinical knowledge',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Clock,
      title: 'Urgency Triage',
      description: 'Smart priority assessment',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Activity,
      title: 'Multi-Species',
      description: 'Humans, dogs, and cats',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { label: 'Diagnoses', value: '50K+' },
    { label: 'Accuracy', value: '95%' },
    { label: 'Response Time', value: '<5s' },
    { label: 'Species', value: '3' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg mb-8"
            >
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-700">AI-Powered Medical Diagnostics</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                style={{ backgroundSize: '300% 300%' }}
              >
                Smart Health
              </motion.span>
              <br />
              <span className="text-gray-800">Analysis in Seconds</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Advanced AI diagnostics for humans and pets. Upload an image or describe symptoms for instant medical insights with urgency triage.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/diagnose">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 10px 40px rgba(6, 182, 212, 0.3)',
                      '0 10px 60px rgba(139, 92, 246, 0.4)',
                      '0 10px 40px rgba(6, 182, 212, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-2xl transition-all flex items-center space-x-2 glow-hover"
                >
                  <span>Start Free Diagnosis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -8, rotate: 2 }}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-cyan-300"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need for smart medical analysis</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.05, rotate: -2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl -z-10" 
                     style={{ background: `linear-gradient(to right, ${feature.color})` }} />
                <motion.div
                  whileHover={{ borderColor: '#1AD0C4' }}
                  className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to get your diagnosis</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Upload or Describe', desc: 'Share an image or type symptoms' },
              { step: '02', title: 'AI Analysis', desc: 'Advanced algorithms process your input' },
              { step: '03', title: 'Get Results', desc: 'Detailed report with urgency level' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                <motion.div
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  className="text-8xl font-bold bg-gradient-to-br from-cyan-500/20 to-purple-500/20 bg-clip-text text-transparent absolute -top-8 -left-4 -z-10"
                >
                  {item.step}
                </motion.div>
                <div className="bg-gradient-to-br from-white via-cyan-50 to-blue-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-cyan-300">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg"
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <motion.div whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.3 }}>
                    <CheckCircle className="w-6 h-6 text-teal mt-4" />
                  </motion.div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-600 to-pink-500 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
            style={{ backgroundSize: '300% 300%' }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"
            />
            <h2 className="text-4xl font-bold text-white mb-6 relative z-10">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 relative z-10">
              Join thousands who trust MedVet AI for smart health analysis
            </p>
            <Link to="/diagnose">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative z-10"
              >
                Start Your Free Diagnosis Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

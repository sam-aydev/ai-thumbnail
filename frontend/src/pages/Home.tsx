import { motion } from "motion/react";
import {
  ArrowRight,
  Zap,
  Image as ImageIcon,
  Shield,
  Sparkles,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-brand-dark selection:bg-brand-yellow selection:text-black font-sans">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-full mt-20 z-10">
        <div className="absolute top-[-10%] left-[-10%] size-125 blur-[120px] mix-blend-screen bg-brand-yellow/10 rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] size-125 bg-purple-500/10 blur-[120px] mix-blend-screen rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-brand-dark/50  backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center md:px-20">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-brand-yellow rounded-lg flex items-center justify-center">
              <Sparkles className="text-black size-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              THUMB<span className="text-brand-yellow">GEN</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/auth"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link to="/auth">
              <button className="cursor-pointer bg-brand-yellow textblack px-3 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95">
                Start Creating
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="flex size-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-full w-full rounded-full bg-green-500"></span>
            </span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1">
            Stop Designing. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-yellow via-yellow-200 to-orange-500">
              Start Generating
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto  leading-relaxed"
          >
            The world's most advanced AI thumbnail Architect. Just type your
            title, and our AI directs, composes and renders viral thumbnails in
            seconds.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth" className="w-full sm:w-auto">
              <button className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-brand-yellow text-black rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all hover:-translate-y-1 shadow-[0_0_40px_-10px_rgba(250,204,21,0.5)]">
                Generate for Free <ArrowRight className="size-5" />
              </button>
            </Link>
            <button className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl text-lg font-bold items-center flex justify-center gap-2 hover:bg-white/10 transition-all">
              <PlayCircle className="size-5" /> Watch Demo
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-32">
          {[
            {
              icon: <Zap className="size-6 text-brand-yellow" />,
              title: "Instant Rendering",
              desc: "From prompt to pixel-perfect 4K image in under 10seconds using Open AI.",
            },
            {
              icon: <ImageIcon className="size-6 text-brand-yellow" />,
              title: "Text Accuracy",
              desc: "Unlike older models, our AI spells text correctly on signboards and screen.",
            },
            {
              icon: <Shield className="size-6 text-brand-yellow" />,
              title: "Copyright Owned",
              desc: "You own 100% of the intellectual property. Use it commercially anywhere.",
            },
          ].map((feature, i): any => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-yellow/30 transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="size-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed ">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-gray-500 text-sm">
        <p>&copy; 2026 ThumbGen AI. Built with React 19 & Gemini.</p>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useThumbnail } from "../hooks/useThumbnail";
import {
  Clock,
  Download,
  LayoutGrid,
  Loader2,
  Trash2,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("cyberpunk");

  const { user, logout, isLoading } = useAuth();
  const {
    generateThumbnail,
    thumbnails,
    deleteThumbnail,
    deletingThumbnail,
    generatingThumbnail,
  } = useThumbnail();

  return (
    <div className="min-h-screen bg-brand-dark text-white p-4 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <LayoutGrid className="text-brand-yellow" />
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-brand-gray px-4 py-2 rounded-full border border-gray-800 text-sm">
            Credits:{" "}
            <span className="text-brand-yellow font-bold">
              {user?.credits || 0}
            </span>
          </div>
          <button
            onClick={logout}
            className="cursor-pointer text-gray-400 hover:text-white transition"
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-6 flex items-center" />
            ) : (
              "Log out"
            )}
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto mb-20">
        <div className="bg-brand-gray border border-gray-800 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl shadow-brand-yellow/5">
          <input
            type="text"
            placeholder="The Title of Your Video"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            className="flex-1 bg-transparent p-4 outline-none text-white placeholder-gray-500"
          />

          <div className="h-full w-px bg-gray-800 hidden md:block "></div>
          <select
            className="bg-brand-gray my-5 md:my-0 md:p-4 outline-none text-white cursor-pointer hover:text-gray-400"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="Cyberpunk">Cyberpunk</option>
            <option value="Minimalist">Minimalist</option>
            <option value="3D Render">3D Render</option>
            <option value="MrBeast Style">MrBeast Style</option>
            <option value="Comic Book">Comic Book</option>
            <option value="Documentary">Documentary</option>
            <option value="Hyper-Realistic">Hyper-Realistic</option>
            <option value="3D Pixar">3D Pixar</option>
          </select>

          <button
            disabled={generatingThumbnail}
            onClick={() => generateThumbnail({ title, style })}
            className="cursor-pointer bg-brand-yellow text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-35"
          >
            {generatingThumbnail ? (
              <span className="animate-pulse">Creating</span>
            ) : (
              <>
                <Wand2 size={18} /> Generate
              </>
            )}
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-4">
          Powered by Open AI - GPT Image Model
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          {" "}
          <Clock size={20} className="text-gray-500" /> Recent Creations
        </h2>
      </div>

      {thumbnails?.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-2xl bg-brand-gray/30">
          No thumbnails yet. Create your first one above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {thumbnails?.map((thumb) => (
              <motion.div
                key={thumb._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="group relative rounded-xl overflow-hidden border border-gray-800 bg-brand-gray hover:border-brand-yellow/30 transition-colors"
              >
                <img
                  src={thumb.imageUrl}
                  alt={thumb.title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-4 text-center backdrop-blur-sm">
                  <h3 className="font-bold text-white line-clamp-1">
                    {thumb.title}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={thumb.imageUrl}
                      download
                      target="_blank"
                      title="Download"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 hover:bg-brand-yellow transition"
                    >
                      <Download size={20} />
                    </a>
                    <button
                      onClick={() => deleteThumbnail(thumb._id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 hover:bg-red-600 transition"
                    >
                      {deletingThumbnail ? (
                        <Loader2
                          size={20}
                          className="animate-spin flex items-center justify-center"
                        />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Link2, Calendar, X } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResponse(true);
      }, 2500);
    }
  };

  const handleReset = () => {
    setInput('');
    setShowResponse(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Should We Have This Meeting?
          </h1>
          <p className="text-xl text-slate-400">
            Drop your meeting link, calendar invite, or any text, and <span className="font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">AI will figure out</span> what you should do.
          </p>
          <div className="mt-4 w-48 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mx-auto"></div>
        </div>

        {isLoading ? (
          <div className="bg-slate-800 rounded-2xl shadow-xl p-12 border border-slate-700 text-center space-y-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-cyan-400 animate-spin"></div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                AI is analyzing...
              </p>
              <p className="text-slate-400">Determining if this meeting is worth your time</p>
            </div>
          </div>
        ) : !showResponse ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="w-5 h-5 text-slate-500" />
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a meeting link, calendar invite, or meeting brief…"
                className="w-full h-32 px-4 py-3 text-lg bg-slate-900 text-white placeholder-slate-500 border-2 border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 resize-none transition-all"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Analyze Meeting
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-slate-800 rounded-2xl shadow-xl p-12 border border-slate-700 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <X className="w-10 h-10 text-green-400" />
            </div>

            <h2 className="text-4xl font-bold text-white">
              No
            </h2>

            <p className="text-2xl text-slate-300">
              Continue with your day free
            </p>

            <button
              onClick={handleReset}
              className="mt-8 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 px-8 rounded-xl transition-all"
            >
              Check Another Meeting
            </button>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>"Every meeting declined is time earned." — Doctor Strange <i>after checking the multiverse of meetings</i></p>
        </div>
      </div>
    </div>
  );
}

export default App;

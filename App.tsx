
import React, { useState } from 'react';
import { Header } from './components/Header';
import { LessonForm } from './components/LessonForm';
import { LessonPreview } from './components/LessonPreview';
import { Button } from './components/Button';
import { generateLessonPlan } from './services/geminiService';
import { LessonPlan } from './types';
import { Sparkles, AlertCircle, Target, FileText, ChevronDown, GraduationCap, ArrowRight, MousePointer2, X, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSupport, setShowSupport] = useState(false);

  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateLessonPlan(formData);
      setLessonPlan(plan);
      setTimeout(() => {
        document.getElementById('results-view')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError("AI generation failed. Please refine your topic or check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGCashRedirect = () => {
    // Standard GCash P2P link format
    window.open('https://link.gcash.com/joinp2p?account_number=09163628237', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30 selection:bg-blue-600 selection:text-white relative">
      <Header onSupportClick={() => setShowSupport(true)} />
      
      <main className="flex-grow">
        {/* Modern SaaS-style Hero */}
        <section className={`pt-20 pb-16 px-6 transition-all duration-1000 no-print ${lessonPlan ? 'opacity-20 blur-[6px] translate-y-[-20px] pointer-events-none' : 'opacity-100'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-2 rounded-full shadow-xl shadow-slate-100 animate-bounce-slow">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.25em]">MATATAG ALIGNED</span>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-[900] text-slate-900 tracking-tighter leading-[0.95] md:leading-[0.9]">
                Professional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 pb-2">
                  Lesson Intelligence
                </span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                The most advanced lesson planning architect for Filipino educators. <br className="hidden md:block" />
                Crafted by <span className="text-slate-900 font-extrabold underline underline-offset-4 decoration-blue-500/30">JNB</span> to empower regional excellence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <button onClick={() => document.getElementById('config-form')?.scrollIntoView({behavior: 'smooth'})} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 flex items-center gap-3">
                 Begin Designing <ArrowRight className="w-4 h-4" />
               </button>
               <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 shadow-lg shadow-slate-100">
                 <Target className="w-4 h-4" /> View Showcase
               </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-32">
          <div className="flex flex-col gap-20">
            
            {/* Generation Form Area */}
            <div id="config-form" className="max-w-4xl mx-auto w-full">
              {error && (
                <div className="mb-10 bg-rose-50 border border-rose-100 text-rose-800 px-8 py-5 rounded-3xl flex items-center gap-5 shadow-lg shadow-rose-100/50 animate-in fade-in zoom-in-95 duration-300">
                  <div className="bg-rose-500 p-2.5 rounded-xl text-white shadow-lg shadow-rose-200">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-tight">System Message</h4>
                    <p className="text-xs font-medium opacity-90 leading-relaxed mt-1">{error}</p>
                  </div>
                </div>
              )}
              
              <LessonForm 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
                isCollapsed={!!lessonPlan} 
              />
            </div>

            {/* Content Results Area */}
            {lessonPlan && (
              <div id="results-view" className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
                <div className="mb-12 flex items-center gap-6 no-print">
                   <div className="h-[2px] bg-slate-200 flex-grow"></div>
                   <div className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-[0.25em] text-[10px] bg-white px-8 py-3 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100">
                     <MousePointer2 className="w-4 h-4 text-blue-600" />
                     Official Generated Document
                     <ChevronDown className="w-4 h-4" />
                   </div>
                   <div className="h-[2px] bg-slate-200 flex-grow"></div>
                </div>
                <LessonPreview plan={lessonPlan} onSupportClick={() => setShowSupport(true)} />
                
                <div className="mt-20 text-center no-print">
                   <Button variant="ghost" onClick={() => { setLessonPlan(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="font-black uppercase tracking-widest text-[11px] gap-3">
                     Create Another Lesson <Sparkles className="w-4 h-4" />
                   </Button>
                </div>
              </div>
            )}

            {/* Empty State Features */}
            {!lessonPlan && !isLoading && (
              <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 no-print">
                {[
                  { title: "Smart Alignment", desc: "Native understanding of 2024 MATATAG curriculum guidelines.", icon: <Target className="w-6 h-6" /> },
                  { title: "Multiple Frameworks", desc: "Choose between Standard, 5E, or 4As models seamlessly.", icon: <FileText className="w-6 h-6" /> },
                  { title: "Jade's Creative Spark", desc: "High-engagement activity engine designed by Jade N. Bucatcat.", icon: <Sparkles className="w-6 h-6" /> }
                ].map((tip, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-blue-500 transition-all duration-500 group shadow-xl shadow-slate-200/20 hover:shadow-blue-100/50 hover:translate-y-[-8px]">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-2xl group-hover:shadow-slate-300">
                      {tip.icon}
                    </div>
                    <h4 className="font-black text-slate-900 text-sm mb-3 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{tip.title}</h4>
                    <p className="text-xs text-slate-500 leading-[1.8] font-semibold">{tip.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Subtle Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 no-print animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSupport(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
             <div className="bg-slate-900 p-8 text-center space-y-4">
                <div className="inline-flex bg-white/10 p-3 rounded-2xl">
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                </div>
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Fueling Creativity</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Support the development of creative tools for fellow educators. Every contribution helps keep this service running.
                </p>
             </div>
             <div className="p-10 space-y-8">
                <div className="space-y-4">
                   <button 
                     onClick={handleGCashRedirect}
                     className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 group text-left"
                   >
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
                           <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jade N. Bucatcat</p>
                           <p className="text-sm font-black text-slate-900 tracking-tight">0916 362 8237</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">Donate via GCash</span>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          Redirect to App <ExternalLink className="w-2.5 h-2.5" />
                        </div>
                      </div>
                   </button>
                </div>
                
                <div className="text-center space-y-2">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Salamat po, Teacher!</p>
                   <p className="text-[9px] text-slate-400 italic font-medium">Your kindness fuels our pedagogical engine.</p>
                </div>

                <button 
                  onClick={() => setShowSupport(false)}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  Close
                </button>
             </div>
             <button 
                onClick={() => setShowSupport(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 py-20 px-8 no-print border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">MATATAG AI <span className="text-slate-500">INTELLIGENCE</span></h3>
             </div>
             <p className="text-slate-400 text-sm max-w-sm font-medium leading-relaxed">
               Built specifically for the hardworking Filipino teacher. An elite educational architecture created by <span className="text-white font-black border-b-2 border-blue-600 pb-0.5">JNB</span>.
             </p>
          </div>
          <div className="flex flex-col md:items-end gap-6 text-[10px]">
            <div className="flex gap-8 text-slate-400 font-black uppercase tracking-[0.2em]">
              <button onClick={() => setShowSupport(true)} className="hover:text-rose-400 transition-all flex items-center gap-2">
                <Heart className="w-3 h-3 fill-rose-500/20" /> Support the Developer
              </button>
              <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
            </div>
            <p className="text-slate-600 font-black tracking-widest">
              JNB INNOVATIONS • ADVANCED EDU-CORE PHILIPPINES.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

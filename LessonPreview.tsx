
import React, { useState } from 'react';
import { LessonPlan } from '../types';
import { Button } from './Button';
import { exportToDocx } from '../services/docxExportService';
import { FileDown, Printer, Copy, Info, Clock, CheckCircle, Zap, Share2, Download, AlertTriangle, ShieldAlert, Sparkles, Heart } from 'lucide-react';

interface LessonPreviewProps {
  plan: LessonPlan;
  onSupportClick: () => void;
}

export const LessonPreview: React.FC<LessonPreviewProps> = ({ plan, onSupportClick }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      await exportToDocx(plan);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  const copyToClipboard = () => {
    const text = document.getElementById('lesson-content-area')?.innerText || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SectionHeader = ({ index, title }: { index: string; title: string }) => (
    <div className="flex items-center gap-5 mb-8 mt-14 first:mt-0">
      <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-slate-200 italic">{index}</span>
      <h3 className="font-extrabold uppercase text-xl border-b-[3px] border-slate-900 flex-grow pb-2 tracking-tight text-slate-900">{title}</h3>
    </div>
  );

  const SubHeader = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => (
    <div className="mb-4">
      <div className="flex items-start gap-4">
        <span className="font-black text-blue-600 shrink-0 text-base">{label}.</span>
        <h4 className="font-extrabold text-slate-900 uppercase tracking-wide text-sm">{title}</h4>
      </div>
      {subtitle && <p className="ml-9 text-[10px] text-slate-400 font-black uppercase tracking-widest leading-tight mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      <aside className="lg:sticky lg:top-24 w-full lg:w-72 space-y-6 no-print order-2 lg:order-1">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
          <div className="space-y-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Output Actions</h3>
            <p className="text-[11px] text-slate-500 font-medium">Export or share your official plan</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <Button variant="primary" onClick={handleExportDocx} isLoading={isExporting} className="w-full h-12 shadow-slate-300">
              <Download className="w-4 h-4" />
              Microsoft Word
            </Button>
            <Button variant="outline" onClick={handlePrint} className="w-full h-12 border-slate-200">
              <Printer className="w-4 h-4" />
              Print Document
            </Button>
            <Button variant="ghost" onClick={copyToClipboard} className="w-full h-12">
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Text Content'}
            </Button>
          </div>
          
          <div className="h-px bg-slate-100"></div>
          
          <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex gap-4 group cursor-pointer hover:bg-indigo-50 transition-all" onClick={onSupportClick}>
             <div className="bg-indigo-100 p-2 rounded-xl shrink-0 h-fit group-hover:scale-110 transition-transform">
               <Heart className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
             </div>
             <div className="space-y-1">
               <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest">Support Jade</h4>
               <p className="text-[10px] text-indigo-700 leading-relaxed font-semibold">Help keep this intelligence engine free for all educators.</p>
             </div>
          </div>
          
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
             <div className="bg-amber-100 p-2 rounded-xl shrink-0 h-fit">
               <ShieldAlert className="w-4 h-4 text-amber-700" />
             </div>
             <div className="space-y-1">
               <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Review Required</h4>
               <p className="text-[10px] text-amber-700 leading-relaxed font-semibold">AI content must be reviewed for curriculum accuracy before submission.</p>
             </div>
          </div>
          
          <Button variant="secondary" className="w-full h-12 gap-3">
             <Share2 className="w-4 h-4" /> Share Link
          </Button>
        </div>
      </aside>

      <div id="lesson-content-area" className="flex-grow w-full order-1 lg:order-2">
        <article className="paper-document p-10 md:p-20 aptos-font text-slate-900 leading-relaxed min-h-[1100px] mx-auto max-w-[900px] rounded-3xl">
          
          <div className="flex justify-between items-start border-b-[3px] border-slate-900 pb-12 mb-14">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-lg mb-2 uppercase tracking-widest">Official Document</div>
              <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-3">Detailed Lesson Plan</h1>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg">{plan.subject}</p>
                <div className="flex items-center gap-2 text-slate-500 border-l border-slate-200 pl-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{plan.duration} Session</span>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2.5 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500/20" />
                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Methodology: {plan.instructionalModel}</span>
              </div>
            </div>
            <div className="text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] leading-loose space-y-1 pt-4">
              <p className="text-slate-900">Quarter {plan.quarter.split(' ')[0]}</p>
              <p>Week No. {plan.week}</p>
              <p>Day No. {plan.day}</p>
            </div>
          </div>

          <section>
            <SectionHeader index="I" title="Curriculum Content, Standards, & Competencies" />
            <div className="ml-16 space-y-8">
              <div>
                <SubHeader label="A" title="Content Standard" />
                <p className="text-sm italic text-slate-700 bg-slate-50/80 p-6 rounded-2xl border border-slate-100 leading-relaxed shadow-inner">{plan.curriculumContent.contentStandards}</p>
              </div>
              <div>
                <SubHeader label="B" title="Performance Standards" />
                <p className="text-sm italic text-slate-700 bg-slate-50/80 p-6 rounded-2xl border border-slate-100 leading-relaxed shadow-inner">{plan.curriculumContent.performanceStandards}</p>
              </div>
              <div>
                <SubHeader label="C" title="Learning Competencies and Objectives" />
                <div className="space-y-6">
                  <div className="bg-white p-1 rounded-2xl">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-3 pl-2">Target Learning Competencies:</span>
                    <ul className="space-y-3">
                      {plan.curriculumContent.learningCompetencies.map((c, i) => (
                        <li key={i} className="flex gap-4 text-sm bg-blue-50/30 p-4 rounded-xl border border-blue-50/50">
                          <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                          <span className="font-medium text-slate-800">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-1 rounded-2xl">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-3 pl-2">Specific Learning Objectives:</span>
                    <ul className="space-y-3">
                      {plan.curriculumContent.learningObjectives.map((o, i) => (
                        <li key={i} className="flex gap-4 text-sm p-4 border-b border-slate-50 last:border-none">
                          <span className="text-blue-500 font-black shrink-0">0{i+1}.</span>
                          <span className="text-slate-700">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <SubHeader label="D" title="Content Domain" />
                <div className="p-6 rounded-2xl border-[2px] border-blue-100 bg-blue-50/20 shadow-sm">
                  <p className="text-sm font-extrabold text-blue-900 uppercase tracking-tight">{plan.curriculumContent.contentDetails}</p>
                </div>
              </div>
              <div>
                <SubHeader label="E" title="Integration & Links" />
                <p className="text-sm italic text-slate-600 bg-slate-50 p-5 rounded-2xl border border-slate-100">{plan.curriculumContent.integration}</p>
              </div>
            </div>
          </section>

          <section>
            <SectionHeader index="II" title="Learning Resources" />
            <div className="ml-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-black block mb-4 uppercase text-[10px] text-slate-400 tracking-[0.2em]">Curriculum References</span>
                <ul className="list-decimal ml-5 space-y-2 text-xs font-medium text-slate-700">
                  {plan.learningResources.references.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="font-black block mb-4 uppercase text-[10px] text-slate-400 tracking-[0.2em]">Instructional Materials</span>
                 <ul className="list-disc ml-5 space-y-2 text-xs font-medium text-slate-700">
                  {plan.learningResources.materials.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <SectionHeader index="III" title="Teaching and Learning Procedure" />
            <div className="ml-16 space-y-12 text-sm">
              {plan.instructionalModel === 'MATATAG Standard' && (
                <>
                  <div className="relative">
                    <SubHeader label="A" title="Activating Prior Knowledge" subtitle="Engagement activity & Prior learning review" />
                    <div className="pl-8 border-l-[3px] border-slate-100 ml-2">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{plan.procedures.activatingPriorKnowledge}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <SubHeader label="B" title="Establishing Lesson Purpose" subtitle="Foundation for content comprehension" />
                    <div className="space-y-6 pl-8 border-l-[3px] border-slate-100 ml-2">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">1. Lesson Objectives Purpose</span>
                        <p className="text-slate-700 italic font-medium">{plan.procedures.establishingPurpose?.lessonPurpose}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">2. Content Vocabulary Focus</span>
                        <div className="flex flex-wrap gap-3">
                          {plan.procedures.establishingPurpose?.vocabulary.map((v, i) => (
                            <span key={i} className="bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-xl text-[11px] font-black text-blue-700 shadow-sm">{v}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <SubHeader label="C" title="Developing & Deepening Understanding" subtitle="Direct instruction & Instructional practice" />
                    <div className="space-y-10 pl-8 border-l-[3px] border-blue-200 ml-2">
                      <div className="relative">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">1. Instructional Explicitation</span>
                        <p className="text-slate-700 leading-relaxed">{plan.procedures.developingDeepening?.explicitation}</p>
                      </div>
                      <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-3">2. Pedagogical Worked Example</span>
                        <p className="leading-relaxed font-medium text-slate-100 text-base">{plan.procedures.developingDeepening?.workedExample}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">3. Collaborative Lesson Activity</span>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{plan.procedures.developingDeepening?.lessonActivity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <SubHeader label="D" title="Making Generalization" subtitle="Synthesizing understanding" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-8 border-l-[3px] border-slate-100 ml-2">
                       <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest block mb-3">a. Learner Takeaways</span>
                        <p className="text-slate-700 leading-relaxed italic text-xs">{plan.procedures.makingGeneralization?.takeaways}</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">b. Metacognitive Reflection</span>
                        <p className="text-slate-700 leading-relaxed italic text-xs">{plan.procedures.makingGeneralization?.reflectionOnLearning}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {plan.instructionalModel === '5E Model' && (
                <div className="space-y-10 pl-8 border-l-[3px] border-indigo-400 ml-2">
                  {['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate'].map((step, idx) => (
                    <div key={step}>
                      <SubHeader label={String.fromCharCode(97 + idx)} title={step} />
                      <p className="text-slate-700 leading-relaxed font-medium">{(plan.procedures.fiveE as any)?.[step.toLowerCase()] || 'Content missing'}</p>
                    </div>
                  ))}
                </div>
              )}

              {plan.instructionalModel === '4As Model' && (
                <div className="space-y-10 pl-8 border-l-[3px] border-emerald-400 ml-2">
                  {['Activity', 'Analysis', 'Abstraction', 'Application'].map((step, idx) => (
                    <div key={step}>
                      <SubHeader label={String.fromCharCode(97 + idx)} title={step} />
                      <p className="text-slate-700 leading-relaxed font-medium">{(plan.procedures.fourAs as any)?.[step.toLowerCase()] || 'Content missing'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section>
            <SectionHeader index="IV" title="Evaluating Learning & Reflection" />
            <div className="ml-16 space-y-12 text-sm">
              <div>
                <SubHeader label="A" title="Evaluating Learning" subtitle={`Official Quiz Format • ${plan.assessmentConfig.itemCount} Items`} />
                <div className="bg-slate-50 border-2 border-slate-100 p-10 rounded-[2rem] shadow-inner whitespace-pre-wrap font-mono text-[13px] text-slate-800 leading-[1.8] tracking-tight overflow-x-auto">
                  {plan.evaluatingLearning.assessment}
                </div>
              </div>

              <div>
                <SubHeader label="B" title="Teacher's Reflective Practice" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['learnerStats', 'strategies', 'difficulties', 'innovation'].map((key) => (
                    <div key={key} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-100">
                      <span className="font-black block text-[10px] uppercase text-slate-400 mb-3 tracking-[0.2em]">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <p className="text-xs text-slate-700 leading-relaxed italic font-medium">{(plan.evaluatingLearning.teacherReflection as any)[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Jade's Creative Spark Section */}
          <section>
            <SectionHeader index="V" title="Jade's Creative Spark" />
            <div className="ml-16 p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-900 text-white shadow-2xl shadow-blue-200 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                 <Sparkles className="w-24 h-24" />
               </div>
               <div className="relative z-10 space-y-4">
                 <div className="flex items-center gap-3">
                   <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                     <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                   </div>
                   <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">Exclusive Integration Idea by Jade N. Bucatcat</h4>
                 </div>
                 <p className="text-base font-medium leading-relaxed italic text-blue-50/90">
                   "{plan.jadeCreativeIdea}"
                 </p>
                 <div className="pt-2 flex items-center gap-2">
                   <div className="h-px bg-blue-400/30 flex-grow"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-300/60">Creative Pedagogical Engine</span>
                   <div className="h-px bg-blue-400/30 flex-grow"></div>
                 </div>
               </div>
            </div>
          </section>

          {/* AI Disclaimer Section */}
          <div className="mt-16 ml-16 p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50 flex gap-5 items-start">
             <div className="bg-slate-200 p-2.5 rounded-xl">
               <ShieldAlert className="w-5 h-5 text-slate-600" />
             </div>
             <div>
               <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Professional Review Disclaimer</h5>
               <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                 This lesson plan was generated by MATATAG AI Intelligence and is intended as a high-quality pedagogical draft. 
                 It is <span className="text-slate-900 underline underline-offset-2">mandatory</span> for the assigned educator to review, modify, and validate all content 
                 (especially competencies and assessment items) before official implementation to ensure accuracy and alignment with classroom context.
               </p>
             </div>
          </div>

          <div className="mt-20 pt-16 border-t-[3px] border-slate-900 grid grid-cols-3 gap-12 text-center">
            {[
              { role: 'Teacher', meta: 'DLP Preparer' },
              { role: 'Master Teacher / Dept. Head', meta: 'Curriculum Reviewer' },
              { role: 'Principal', meta: 'Final Approver' }
            ].map((signer) => (
              <div key={signer.role} className="space-y-2">
                <div className="w-full border-b-2 border-slate-900 h-14 mb-4"></div>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">{signer.role}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{signer.meta}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

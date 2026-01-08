
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { SUBJECTS, QUARTERS, GradeLevel, LessonDuration, InstructionalModel, QuestionType } from '../types';
import { FileEdit, School, Lightbulb, CalendarRange, ChevronDown, Zap, Clock, BookOpen, ClipboardCheck, Save, Trash2, Plus, Sparkles, Filter } from 'lucide-react';

interface LessonFormProps {
  onGenerate: (data: any) => void;
  isLoading: boolean;
  isCollapsed?: boolean;
}

const GRADE_LEVELS: GradeLevel[] = [
  'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 
  'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'
];

const QUESTION_TYPES: QuestionType[] = ['Multiple Choice', 'Short Answer', 'Essay'];

const QUICK_TEMPLATES = [
  {
    label: "G1 English: Rhymes",
    data: {
      gradeLevel: 'Grade 1',
      subject: 'English',
      topic: 'Phonological Awareness: Identifying Rhyming Words',
      quarter: '1st Quarter',
      week: '1',
      day: '1',
      duration: '45 Minutes' as LessonDuration,
      instructionalModel: 'MATATAG Standard' as InstructionalModel,
      assessmentConfig: { itemCount: 5, questionTypes: ['Multiple Choice'] as QuestionType[] },
      additionalContext: 'Include interactive games.'
    }
  },
  {
    label: "G7 Science: Cells",
    data: {
      gradeLevel: 'Grade 7',
      subject: 'Science',
      topic: 'Biological Organization: The Cell',
      quarter: '2nd Quarter',
      week: '5',
      day: '1',
      duration: '1 Hour' as LessonDuration,
      instructionalModel: '5E Model' as InstructionalModel,
      assessmentConfig: { itemCount: 10, questionTypes: ['Multiple Choice', 'Short Answer'] as QuestionType[] },
      additionalContext: 'Microscopy focus.'
    }
  }
];

export const LessonForm: React.FC<LessonFormProps> = ({ onGenerate, isLoading, isCollapsed }) => {
  const [formData, setFormData] = useState({
    gradeLevel: 'Grade 1',
    subject: 'English',
    topic: '',
    quarter: '1st Quarter',
    week: '1',
    day: '1',
    duration: '45 Minutes' as LessonDuration,
    instructionalModel: 'MATATAG Standard' as InstructionalModel,
    assessmentConfig: {
      itemCount: 5,
      questionTypes: ['Multiple Choice'] as QuestionType[]
    },
    additionalContext: ''
  });

  const [savedTemplates, setSavedTemplates] = useState<{name: string, data: any}[]>([]);
  const [templateName, setTemplateName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('matatag_user_templates');
    if (stored) {
      try {
        setSavedTemplates(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored templates", e);
      }
    }
  }, []);

  const saveToLocalStorage = (templates: {name: string, data: any}[]) => {
    localStorage.setItem('matatag_user_templates', JSON.stringify(templates));
    setSavedTemplates(templates);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert("Please enter a template name.");
      return;
    }
    const newTemplate = {
      name: templateName.trim(),
      data: { ...formData }
    };
    const updated = [...savedTemplates, newTemplate];
    saveToLocalStorage(updated);
    setTemplateName('');
  };

  const handleDeleteTemplate = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedTemplates.filter((_, i) => i !== index);
    saveToLocalStorage(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'itemCount') {
      setFormData(prev => ({
        ...prev,
        assessmentConfig: { ...prev.assessmentConfig, itemCount: parseInt(value) || 0 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleQuestionTypeToggle = (type: QuestionType) => {
    setFormData(prev => {
      const current = prev.assessmentConfig.questionTypes;
      const next = current.includes(type) 
        ? current.filter(t => t !== type) 
        : [...current, type];
      if (next.length === 0) return prev;
      return {
        ...prev,
        assessmentConfig: { ...prev.assessmentConfig, questionTypes: next }
      };
    });
  };

  return (
    <div className={`transition-all duration-700 ease-in-out no-print ${isCollapsed ? 'opacity-30 blur-[4px] pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-10 py-5 flex items-center justify-between">
          <h2 className="text-white font-extrabold flex items-center gap-3.5">
            <span className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
              <FileEdit className="w-5 h-5 text-blue-400" />
            </span>
            Lesson Configuration
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">MATATAG v2.1</span>
          </div>
        </div>
        
        {/* Template Management Section */}
        <div className="px-10 pt-8 pb-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presets & Library</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {QUICK_TEMPLATES.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(ex.data)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-95"
                  >
                    {ex.label}
                  </button>
                ))}
                {savedTemplates.map((template, idx) => (
                  <div key={`user-${idx}`} className="group relative">
                    <button
                      type="button"
                      onClick={() => setFormData(template.data)}
                      className="px-4 py-2 pr-10 rounded-xl border border-indigo-200 bg-indigo-50/20 text-[11px] font-bold text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all active:scale-95 flex items-center"
                    >
                      {template.name}
                    </button>
                    <button 
                      onClick={(e) => handleDeleteTemplate(idx, e)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-indigo-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 shadow-inner">
               <input 
                 type="text" 
                 placeholder="Save current as..." 
                 value={templateName}
                 onChange={(e) => setTemplateName(e.target.value)}
                 className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-700 w-36 px-2"
               />
               <button 
                 onClick={handleSaveTemplate}
                 title="Save current config"
                 className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
               >
                 <Save className="w-4 h-4" />
               </button>
            </div>
          </div>
          <div className="h-px bg-slate-100 w-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="px-10 py-8 space-y-10 pt-4">
          {/* Academic Classification */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <School className="w-4.5 h-4.5 text-blue-600" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Academic Standards</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Grade Level</label>
                <div className="relative group">
                  <select name="gradeLevel" value={formData.gradeLevel} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none appearance-none cursor-pointer transition-all hover:bg-white hover:border-blue-300">
                    {GRADE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Learning Area</label>
                <div className="relative group">
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none appearance-none cursor-pointer transition-all hover:bg-white hover:border-blue-300">
                    {SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content & Model */}
          <div className="space-y-5">
             <div className="flex items-center gap-2.5">
              <Lightbulb className="w-4.5 h-4.5 text-amber-500" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Lesson Parameters</h3>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topic / Lesson Focus</label>
              <input required type="text" name="topic" value={formData.topic} onChange={handleChange} placeholder="e.g., Cellular Respiration, Filipino National Heroes..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all hover:bg-white focus:border-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pedagogical Model</label>
                <div className="relative group">
                  <select name="instructionalModel" value={formData.instructionalModel} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-black focus:ring-4 focus:ring-blue-100 outline-none appearance-none cursor-pointer text-indigo-700 transition-all hover:bg-white">
                    <option value="MATATAG Standard">MATATAG Standard</option>
                    <option value="5E Model">5E Model</option>
                    <option value="4As Model">4As Model</option>
                  </select>
                  <BookOpen className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session Duration</label>
                <div className="relative group">
                  <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-black focus:ring-4 focus:ring-blue-100 outline-none appearance-none cursor-pointer text-blue-700 transition-all hover:bg-white">
                    <option value="45 Minutes">45 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                  </select>
                  <Clock className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Configuration */}
          <div className="space-y-5">
             <div className="flex items-center gap-2.5">
              <ClipboardCheck className="w-4.5 h-4.5 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Formative Evaluation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Assessment Items (1-20)</label>
                 <input 
                    type="number" name="itemCount" min="1" max="20" 
                    value={formData.assessmentConfig.itemCount} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all hover:bg-white" 
                  />
               </div>
               <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Question Modality</label>
                 <div className="flex flex-wrap gap-2">
                   {QUESTION_TYPES.map(type => (
                     <button
                        key={type} type="button" 
                        onClick={() => handleQuestionTypeToggle(type)}
                        className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border transition-all duration-300 ${formData.assessmentConfig.questionTypes.includes(type) ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-emerald-300 hover:bg-white active:scale-95'}`}
                     >
                       {type}
                     </button>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-5">
             <div className="flex items-center gap-2.5">
              <CalendarRange className="w-4.5 h-4.5 text-slate-600" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Timeline Mapping</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2 text-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Quarter</label>
                <select name="quarter" value={formData.quarter} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-xs font-black focus:ring-4 focus:ring-blue-100 outline-none transition-all hover:bg-white">
                  {QUARTERS.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
              <div className="space-y-2 text-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Week</label>
                <input type="number" min="1" max="10" name="week" value={formData.week} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-xs font-black text-center outline-none transition-all hover:bg-white" />
              </div>
              <div className="space-y-2 text-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Day</label>
                <input type="number" min="1" max="5" name="day" value={formData.day} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-xs font-black text-center outline-none transition-all hover:bg-white" />
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Additional Context / Integration</label>
            <textarea 
              name="additionalContext"
              value={formData.additionalContext}
              onChange={handleChange}
              rows={3}
              placeholder="Incorporate localization, gender sensitivity, or specific learning styles..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none resize-none transition-all hover:bg-white"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full py-7 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 bg-slate-900 hover:bg-blue-700 transition-all duration-500" isLoading={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-3"><Sparkles className="w-5 h-5 animate-pulse" /> Orchestrating Lesson...</span>
              ) : (
                <span className="flex items-center gap-3">Generate Official MATATAG Plan <Sparkles className="w-4 h-4" /></span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

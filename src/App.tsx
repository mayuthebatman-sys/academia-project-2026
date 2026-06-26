import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  FileText, 
  Layers, 
  Sparkles, 
  ClipboardList, 
  Building2, 
  Globe, 
  HelpCircle, 
  RotateCcw,
  BookOpen,
  Sliders,
  Check,
  Compass
} from 'lucide-react';
import { AssignmentRequest, AssignmentType, GenerationResult } from './types';
import { SUBJECT_TEMPLATES, SUPPORTED_SUBJECTS } from './data/subjects';
import ReportViewer from './components/ReportViewer';
import PresentationViewer from './components/PresentationViewer';
import StudyCompanion from './components/StudyCompanion';

const REFERENCING_STYLES = [
  "Harvard",
  "APA (7th edition)",
  "Chicago",
  "MLA (9th edition)",
  "Vancouver",
  "IEEE"
];

const LOADING_PHASES = [
  "Reviewing your assignment brief and assessment syllabus...",
  "Running comprehensive SWOT, PESTLE, and competitor analysis...",
  "Synthesizing academic literature reviews and scholarly models...",
  "Formulating strategic business recommendations...",
  "Mapping content sections to Pass, Merit, and Distinction criteria...",
  "Formatting verified bibliography citations...",
  "Final proofreading for authentic academic tone..."
];

export default function App() {
  // Main assignment inputs
  const [subject, setSubject] = useState(SUPPORTED_SUBJECTS[0]);
  const [assignmentBrief, setAssignmentBrief] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState('');
  const [assessmentCriteria, setAssessmentCriteria] = useState('');
  const [wordCount, setWordCount] = useState<number>(1500);
  const [referencingStyle, setReferencingStyle] = useState(REFERENCING_STYLES[0]);
  
  // Search state for templates
  const [searchTerm, setSearchTerm] = useState('');
  
  // Optional parameters
  const [companyName, setCompanyName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [lecturerInstructions, setLecturerInstructions] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // UI States
  const [assignmentType, setAssignmentType] = useState<AssignmentType>('report');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhaseIdx, setLoadingPhaseIdx] = useState(0);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [studyTopic, setStudyTopic] = useState<{ topic: string; context: string } | null>(null);

  // Set default word/slide target based on type
  useEffect(() => {
    if (assignmentType === 'report') {
      setWordCount(1500);
    } else {
      setWordCount(12); // slides count
    }
  }, [assignmentType]);

  // Load predefined template
  const handleLoadTemplate = (subjectName: string) => {
    const template = SUBJECT_TEMPLATES[subjectName];
    if (template) {
      setSubject(template.name);
      setAssignmentBrief(template.brief);
      setTaskDescription(template.taskDescription);
      setLearningOutcomes(template.learningOutcomes);
      setAssessmentCriteria(template.assessmentCriteria);
      setReferencingStyle(template.referencingStyle);
      setCompanyName(template.companyName);
      setIndustry(template.industry);
      setCountry(template.country);
      setLecturerInstructions(template.lecturerInstructions);
      if (assignmentType === 'report') {
        setWordCount(template.wordCount);
      } else {
        setWordCount(12);
      }
    }
  };

  // Load default template on start
  useEffect(() => {
    handleLoadTemplate(SUPPORTED_SUBJECTS[0]);
  }, []);

  // Loading animation phases
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingPhaseIdx((prev) => (prev + 1) % LOADING_PHASES.length);
      }, 3500);
    } else {
      setLoadingPhaseIdx(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Generate Submission API Handler
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setStudyTopic(null);

    const requestBody: AssignmentRequest = {
      subject,
      assignmentBrief,
      taskDescription,
      learningOutcomes,
      assessmentCriteria,
      wordCount,
      referencingStyle,
      companyName: companyName || undefined,
      brandName: brandName || undefined,
      industry: industry || undefined,
      country: country || undefined,
      lecturerInstructions: lecturerInstructions || undefined,
      additionalNotes: additionalNotes || undefined,
    };

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: assignmentType,
          request: requestBody
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error during generation.');
      }

      const responseData = await response.json();
      
      setResult({
        type: responseData.type,
        report: responseData.type === 'report' ? responseData.data : undefined,
        presentation: responseData.type === 'presentation' ? responseData.data : undefined,
      });

    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Failed to generate your coursework. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset workspace
  const handleReset = () => {
    setResult(null);
    setStudyTopic(null);
  };

  // Update report state if sections get expanded
  const handleUpdateReport = (updatedReport: any) => {
    if (result) {
      setResult({
        ...result,
        report: updatedReport
      });
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Premium Header */}
      <header className="bg-white border-b border-slate-200 h-16 px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
            <GraduationCap className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="font-sans font-semibold text-slate-800 tracking-tight text-base flex items-center gap-1.5">
              Academia<span className="text-indigo-600">AI</span>
              <span className="text-[10px] bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded uppercase tracking-wider">Business Core</span>
            </h1>
          </div>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Generate New Assignment</span>
          </button>
        )}
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 overflow-hidden p-6 md:p-8 flex flex-col min-h-0">
        
        {/* State A: Loading Screen with Animated Phases */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 max-w-xl mx-auto text-center space-y-6">
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Glow */}
              <div className="absolute w-24 h-24 bg-indigo-50/60 rounded-full animate-ping" />
              {/* Spinning loading frame */}
              <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin relative" />
            </div>
            
            <div className="space-y-2 animate-fade-in">
              <h3 className="font-sans font-bold text-slate-800 text-base">Generating Coursework</h3>
              <p className="text-sm font-semibold text-indigo-600 font-sans tracking-wide min-h-[40px] px-4 transition-all duration-500">
                {LOADING_PHASES[loadingPhaseIdx]}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2">
                This takes approximately 45-60 seconds as we formulate rigorous academic arguments, real references, and P/M/D mappings.
              </p>
            </div>
          </div>
        )}

        {/* State B: User Config & Parameters Input (Default State) */}
        {!isLoading && !result && (
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Hand: Subject template pre-selectors (Quick Start Guide) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  Subject Templates
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Select a business subject. Gold starred templates pre-populate realistic coursework parameters:
                </p>

                {/* Search Box */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search templates (e.g. CSR, Marketing)..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                  />
                </div>
                
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {SUPPORTED_SUBJECTS.filter((subName) => 
                    subName.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((subName) => {
                    const isSelected = subject === subName;
                    const hasPreset = !!SUBJECT_TEMPLATES[subName];
                    return (
                      <button
                        key={subName}
                        onClick={() => handleLoadTemplate(subName)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-center justify-between border ${
                          isSelected 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {hasPreset && <span className="text-amber-500" title="Syllabus template loaded">⭐️</span>}
                          <span className="truncate">{subName}</span>
                        </div>
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
                        ) : hasPreset ? (
                          <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 font-sans shrink-0 font-bold">Preset</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Design Philosophy Note */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Authentic Academic Tone</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our system produces assignments modeled around Level 4–7 university expectations. By intentionally omitting robotic transitional cliches and using diversified sentence structures, the generated reports look organically prepared by diligent students.
                </p>
              </div>
            </div>

            {/* Right Hand: Detailed Config Forms */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
              <form onSubmit={handleGenerate} className="space-y-6">
                
                {/* 1. Header & Switcher */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-5 gap-4">
                  <div>
                    <h2 className="font-sans font-semibold text-slate-800 text-base tracking-tight">Assignment Configuration</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Specify task outcomes, grading criteria, and contextual parameters.</p>
                  </div>

                  {/* Task Type Switcher */}
                  <div className="flex bg-slate-50 border border-slate-200 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setAssignmentType('report')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
                        assignmentType === 'report' 
                          ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Academic Report</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssignmentType('presentation')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition ${
                        assignmentType === 'presentation' 
                          ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Presentation Slides</span>
                    </button>
                  </div>
                </div>

                {/* 2. Main Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Subject Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Subject Name</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Strategic Management"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Word Count / Slides count */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">
                      {assignmentType === 'report' ? 'Target Word Count' : 'Slide Deck Count'}
                    </label>
                    <input
                      type="number"
                      required
                      min={assignmentType === 'report' ? 500 : 5}
                      max={assignmentType === 'report' ? 8000 : 30}
                      value={wordCount}
                      onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Brief Title */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Assignment Brief / Title</label>
                    <input
                      type="text"
                      required
                      value={assignmentBrief}
                      onChange={(e) => setAssignmentBrief(e.target.value)}
                      placeholder="e.g. Corporate Social Responsibility audit of Nestlé S.A."
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Task Description */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Task Description</label>
                    <textarea
                      required
                      rows={3}
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      placeholder="Detail the specific analysis parameters required for this coursework assignment..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none transition-colors"
                    />
                  </div>

                  {/* Learning Outcomes */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Learning Outcomes (LOs)</label>
                    <textarea
                      required
                      rows={3}
                      value={learningOutcomes}
                      onChange={(e) => setLearningOutcomes(e.target.value)}
                      placeholder="Syllabus outputs e.g. LO1: Evaluate macro external factors..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none transition-colors"
                    />
                  </div>

                  {/* Assessment Grading Criteria */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Assessment Rubric (Pass / Merit / Distinction)</label>
                    <textarea
                      required
                      rows={3}
                      value={assessmentCriteria}
                      onChange={(e) => setAssessmentCriteria(e.target.value)}
                      placeholder="Criteria e.g. P1: Describe PESTLE. M1: Compare matrices. D1: Justify growth..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Company & Industry Parameters (Optional segment for analysis) */}
                <div className="border-t border-slate-100 pt-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Company & Corporate Details (Optional)</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Tesla, Inc."
                        className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brand / Product</label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Model Y"
                        className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry Sector</label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="Automotive"
                        className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Country Location</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="United States"
                        className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Formatting / References and Lecturer Guidance */}
                <div className="border-t border-slate-100 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Bibliography Citation Style</label>
                    <select
                      value={referencingStyle}
                      onChange={(e) => setReferencingStyle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      {REFERENCING_STYLES.map((style) => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Lecturer Instructions / Remarks</label>
                    <input
                      type="text"
                      value={lecturerInstructions}
                      onChange={(e) => setLecturerInstructions(e.target.value)}
                      placeholder="e.g. Include Carroll's pyramid model..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-slate-150">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Generate Academic {assignmentType === 'report' ? 'Report' : 'Presentation Slides'}</span>
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

        {/* State C: Split Layout with Active Assignment Viewer & Study Guide Sidebar */}
        {!isLoading && result && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
            
            {/* Main Coursework Display Panel (LHS) */}
            <div className="lg:col-span-8 flex flex-col overflow-hidden h-full min-h-0">
              {result.type === 'report' && result.report ? (
                <ReportViewer
                  report={result.report}
                  onUpdateReport={handleUpdateReport}
                  onSelectTopic={(topic, context) => setStudyTopic({ topic, context })}
                />
              ) : result.type === 'presentation' && result.presentation ? (
                <PresentationViewer
                  presentation={result.presentation}
                  onSelectTopic={(topic, context) => setStudyTopic({ topic, context })}
                />
              ) : (
                <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-slate-200 p-8">
                  <p className="text-slate-400">An unexpected formatting error occurred. Please try regenerating.</p>
                </div>
              )}
            </div>

            {/* Smart Study Guide Sidebar Panel (RHS) */}
            <div className="lg:col-span-4 flex flex-col overflow-hidden h-full min-h-0">
              <StudyCompanion
                studyGuide={
                  result.type === 'report' && result.report
                    ? result.report.studyGuide
                    : result.presentation!.studyGuide
                }
                learningOutcomesMapping={
                  result.type === 'report' && result.report
                    ? result.report.learningOutcomesMapping
                    : result.presentation!.learningOutcomesMapping
                }
                assignmentContext={
                  result.type === 'report' && result.report
                    ? result.report.executiveSummary
                    : result.presentation!.slides[0].speakerNotes
                }
                preselectedTopic={studyTopic?.topic}
                onClearPreselectedTopic={() => setStudyTopic(null)}
              />
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

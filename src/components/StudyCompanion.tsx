import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Award, 
  BookOpen, 
  TrendingUp, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { StudyGuide, LearningOutcomeMapping } from '../types';

interface StudyCompanionProps {
  studyGuide: StudyGuide;
  learningOutcomesMapping: LearningOutcomeMapping[];
  assignmentContext: string;
  preselectedTopic?: string;
  onClearPreselectedTopic?: () => void;
}

interface CustomExplanation {
  explanation: string;
  whyItMatters: string;
  studyTip: string;
}

export default function StudyCompanion({ 
  studyGuide, 
  learningOutcomesMapping, 
  assignmentContext,
  preselectedTopic,
  onClearPreselectedTopic
}: StudyCompanionProps) {
  const [activeTab, setActiveTab] = useState<'tutor' | 'defense' | 'frameworks' | 'rubric'>('tutor');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [customAnswer, setCustomAnswer] = useState<CustomExplanation | null>(null);

  // Oral prep simulator states for advanced game mode
  const [defenseSubMode, setDefenseSubMode] = useState<'browse' | 'simulator'>('browse');
  const [gameIndex, setGameIndex] = useState(0);
  const [gameRevealed, setGameRevealed] = useState(false);
  const [userGameAnswer, setUserGameAnswer] = useState('');
  const [gameGrades, setGameGrades] = useState<Record<number, 'good' | 'partial' | 'poor'>>({});

  const handleGradeCard = (idx: number, status: 'good' | 'partial' | 'poor') => {
    setGameGrades(prev => ({
      ...prev,
      [idx]: status
    }));
  };

  // Quick prep templates for prompt helper
  const handleAskPreselected = async (topicText: string) => {
    setIsAnswering(true);
    setCustomAnswer(null);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicText,
          context: assignmentContext
        })
      });

      if (!response.ok) throw new Error('Explain call failed');
      const data = await response.json();
      setCustomAnswer(data);
    } catch (err) {
      console.error(err);
      alert('Tutor is currently offline. Please try again.');
    } finally {
      setIsAnswering(false);
    }
  };

  // Trigger ask customized query
  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || isAnswering) return;
    const q = customQuestion;
    setCustomQuestion('');
    await handleAskPreselected(q);
  };

  return (
    <div id="study-companion-panel" className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col h-full shadow-sm">
      
      {/* Header Banner */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-200">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
          <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-sans font-bold text-slate-800 text-sm">Study Companion & AI Tutor</h3>
          <p className="text-xs text-slate-500">Master coursework theories & prep for defense</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-50 border border-slate-200 p-1 rounded-lg gap-1 my-4">
        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'tutor' 
              ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          AI Tutor
        </button>
        <button
          onClick={() => setActiveTab('defense')}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'defense' 
              ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Oral Prep
        </button>
        <button
          onClick={() => setActiveTab('frameworks')}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'frameworks' 
              ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Models
        </button>
        <button
          onClick={() => setActiveTab('rubric')}
          className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-md transition ${
            activeTab === 'rubric' 
              ? 'bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          LO Rubric
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1">
        
        {/* 1. Interactive Tutor Chat */}
        {activeTab === 'tutor' && (
          <div className="space-y-4 flex flex-col h-full justify-between">
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/40 rounded-lg border border-indigo-100 text-xs text-indigo-800">
                <p className="font-semibold">Ask Academic Questions</p>
                <p className="text-indigo-600 mt-0.5">Type any business model or ask how specific paragraphs relate to real-world strategy.</p>
              </div>

              {/* Preselected Topic helper */}
              {preselectedTopic && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Tutor Topic Selected</span>
                    {onClearPreselectedTopic && (
                      <button 
                        onClick={onClearPreselectedTopic}
                        className="text-[10px] text-amber-600 font-semibold hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-1 italic">"{preselectedTopic}"</p>
                  <button
                    onClick={() => handleAskPreselected(preselectedTopic)}
                    disabled={isAnswering}
                    className="w-full mt-2.5 bg-amber-600 text-white hover:bg-amber-700 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    {isAnswering ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <MessageSquare className="w-3.5 h-3.5" />}
                    Tutor Me On This
                  </button>
                </div>
              )}

              {/* Custom Answer Display */}
              {customAnswer && (
                <div className="space-y-3.5 animate-fade-in border-t border-slate-100 pt-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-800 block mb-1">The Core Idea</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">{customAnswer.explanation}</p>
                  </div>
                  
                  <div className="p-3 bg-green-50/40 rounded-lg border border-green-150">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-800 block mb-1">Why It Matters in Business</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">{customAnswer.whyItMatters}</p>
                  </div>

                  <div className="p-3 bg-amber-50/30 rounded-lg border border-amber-150">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block mb-1">Professors Speaking Tip</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium italic">"{customAnswer.studyTip}"</p>
                  </div>
                </div>
              )}

              {isAnswering && (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                  <span className="text-xs">Preparing explanation. Analysing theories...</span>
                </div>
              )}
            </div>

            {/* Form Input */}
            <form onSubmit={handleAskTutor} className="flex gap-2 border-t border-slate-100 pt-3 mt-4">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Ask e.g. Why is SWOT useful here?"
                disabled={isAnswering}
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isAnswering || !customQuestion.trim()}
                className="p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. Oral Defense Prep Cards */}
        {activeTab === 'defense' && (
          <div className="space-y-4">
            {/* Sub-navigation for Oral Prep */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-500">
              <button
                onClick={() => setDefenseSubMode('browse')}
                className={`flex-1 text-center py-1 rounded transition-all ${defenseSubMode === 'browse' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'hover:text-slate-800'}`}
              >
                Question Browser
              </button>
              <button
                onClick={() => setDefenseSubMode('simulator')}
                className={`flex-1 text-center py-1 rounded transition-all ${defenseSubMode === 'simulator' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'hover:text-slate-800'}`}
              >
                Viva Defense Simulator 🎯
              </button>
            </div>

            {defenseSubMode === 'browse' ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                  <span className="font-bold text-slate-700 block mb-1">Professors' Viva Prep</span>
                  Prepare for standard Q&As professors ask to verify you wrote the work. Tap any questions below to study.
                </div>

                {studyGuide.oralPrepQuestions.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:border-slate-300 transition duration-200">
                    <div className="bg-slate-50/70 p-3.5 border-b border-slate-200 flex items-start gap-2">
                      <HelpCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">{item.question}</h4>
                    </div>
                    <div className="p-3.5 space-y-2.5">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Your Key Answer</span>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.answer}</p>
                      </div>
                      <div className="bg-amber-50/30 border border-amber-150 rounded-lg p-2.5 text-[11px] text-amber-800 italic">
                        <span className="font-bold not-italic block mb-0.5">Speaking Strategy Tip</span>
                        "{item.tip}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* INTERACTIVE VIVA SIMULATOR GAME */
              <div className="space-y-4 animate-fade-in">
                {studyGuide.oralPrepQuestions.length === 0 ? (
                  <p className="text-xs text-slate-500">No questions generated yet. Try generating a report first!</p>
                ) : (
                  (() => {
                    const currentQuestion = studyGuide.oralPrepQuestions[gameIndex];
                    if (!currentQuestion) return null;
                    return (
                      <div className="border border-indigo-150 rounded-xl overflow-hidden bg-white shadow-sm">
                        {/* Game Status Header */}
                        <div className="bg-indigo-900 text-white p-3 px-4 flex justify-between items-center text-xs">
                          <span className="font-semibold uppercase tracking-wider text-[10px]">Active Exam Simulation</span>
                          <span className="font-mono bg-indigo-800 px-2.5 py-0.5 rounded-full text-[10px]">
                            Question {gameIndex + 1} of {studyGuide.oralPrepQuestions.length}
                          </span>
                        </div>

                        {/* Interactive Stage */}
                        <div className="p-4 space-y-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Professor's Question</span>
                            <h4 className="text-xs font-bold text-slate-800 leading-relaxed font-sans">
                              {currentQuestion.question}
                            </h4>
                          </div>

                          {/* Student Draft input */}
                          {!gameRevealed ? (
                            <div className="space-y-2">
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Draft your answer (Optional)</label>
                              <textarea
                                value={userGameAnswer}
                                onChange={(e) => setUserGameAnswer(e.target.value)}
                                placeholder="Write down 1-2 points you'd mention in your defense..."
                                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 h-20 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
                              />
                              <button
                                onClick={() => setGameRevealed(true)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg text-xs transition"
                              >
                                Reveal Advisor Model Answer & Strategy
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4 animate-fade-in border-t border-slate-100 pt-3">
                              {userGameAnswer && (
                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase">Your Practiced Notes</span>
                                  <p className="text-xs text-slate-600 italic font-sans">{userGameAnswer}</p>
                                </div>
                              )}

                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider block">Model Advisor Answer</span>
                                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                                  {currentQuestion.answer}
                                </p>
                              </div>

                              <div className="bg-amber-50/50 border border-amber-150 rounded-lg p-3 text-[11px] text-amber-950 leading-relaxed">
                                <span className="font-bold text-amber-800 block mb-0.5">Presentation Tip</span>
                                "{currentQuestion.tip}"
                              </div>

                              {/* Grading self-evaluation buttons */}
                              <div className="space-y-2 border-t border-slate-100 pt-3">
                                <span className="text-[9px] font-bold text-slate-400 uppercase block text-center">Rate Your Preparation</span>
                                <div className="grid grid-cols-3 gap-2">
                                  <button
                                    onClick={() => handleGradeCard(gameIndex, 'good')}
                                    className={`py-1.5 rounded-lg text-[10px] font-semibold transition border ${
                                      gameGrades[gameIndex] === 'good' 
                                        ? 'bg-green-600 border-green-600 text-white font-extrabold' 
                                        : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                                    }`}
                                  >
                                    Nailed It! ⭐️
                                  </button>
                                  <button
                                    onClick={() => handleGradeCard(gameIndex, 'partial')}
                                    className={`py-1.5 rounded-lg text-[10px] font-semibold transition border ${
                                      gameGrades[gameIndex] === 'partial' 
                                        ? 'bg-amber-500 border-amber-500 text-white font-extrabold' 
                                        : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                                    }`}
                                  >
                                    Almost 🌗
                                  </button>
                                  <button
                                    onClick={() => handleGradeCard(gameIndex, 'poor')}
                                    className={`py-1.5 rounded-lg text-[10px] font-semibold transition border ${
                                      gameGrades[gameIndex] === 'poor' 
                                        ? 'bg-rose-500 border-rose-500 text-white font-extrabold' 
                                        : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                                    }`}
                                  >
                                    Need Study 🔄
                                  </button>
                                </div>
                              </div>

                              {/* Progression controls */}
                              <div className="flex justify-between items-center pt-2">
                                <button
                                  onClick={() => {
                                    setGameRevealed(false);
                                    setUserGameAnswer('');
                                    setGameIndex((prev) => Math.max(0, prev - 1));
                                  }}
                                  disabled={gameIndex === 0}
                                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-40"
                                >
                                  Previous
                                </button>
                                <button
                                  onClick={() => {
                                    setGameRevealed(false);
                                    setUserGameAnswer('');
                                    if (gameIndex < studyGuide.oralPrepQuestions.length - 1) {
                                      setGameIndex((prev) => prev + 1);
                                    } else {
                                      alert("Simulator Session Completed! Excellent job preparing for your viva defense.");
                                      setGameIndex(0);
                                    }
                                  }}
                                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                  {gameIndex === studyGuide.oralPrepQuestions.length - 1 ? 'Finish & Reset' : 'Next Question'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. Business Strategic Models Index */}
        {activeTab === 'frameworks' && (
          <div className="space-y-3.5">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 mb-1">
              Check out the conceptual core models applied in your coursework.
            </div>

            {studyGuide.frameworksUsed.map((framework, i) => (
              <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{framework.name}</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans mb-2.5">{framework.description}</p>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">How We Applied This</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{framework.howApplied}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. Learning Outcomes Rubrics Verification */}
        {activeTab === 'rubric' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 mb-1">
              Verify compliance with each Pass, Merit, or Distinction rubric criterion automatically.
            </div>

            {learningOutcomesMapping.map((item, idx) => {
              const isDistinction = item.status.toLowerCase() === 'distinction';
              const isMerit = item.status.toLowerCase() === 'merit';
              const isPass = item.status.toLowerCase() === 'pass';
              
              const badgeBg = isDistinction ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : isMerit ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : isPass ? 'bg-green-50 text-green-800 border-green-200'
                            : 'bg-slate-100 text-slate-800 border-slate-200';

              return (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 border rounded-full ${badgeBg}`}>
                        {item.criterion} ({item.status})
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 font-sans leading-tight mt-1">{item.description}</p>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{item.metExplanation}</p>
                    <div className="text-[10px] font-semibold text-indigo-700 pt-1 flex items-center gap-1 font-sans">
                      <BookOpen className="w-3 h-3" />
                      <span>Fulfill Location: {item.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

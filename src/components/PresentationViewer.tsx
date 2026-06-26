import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Image, 
  BarChart, 
  Grid, 
  Layers, 
  Award,
  BookOpen,
  Download
} from 'lucide-react';
import { GeneratedPresentation, PresentationSlide } from '../types';

interface PresentationViewerProps {
  presentation: GeneratedPresentation;
  onSelectTopic: (topic: string, context: string) => void;
}

export default function PresentationViewer({ presentation, onSelectTopic }: PresentationViewerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [showGridView, setShowGridView] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleDownloadWordPresentation = () => {
    const title = slides[0]?.title || "Academic Presentation";
    const slidesData = presentation.slides;

    let html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <title>Presentation Outline: ${title}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 8.5in 11in;
          margin: 1.0in 1.0in 1.0in 1.0in;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #333333;
        }
        .header-title {
          font-size: 24pt;
          font-weight: bold;
          color: #1E293B;
          margin-bottom: 5px;
        }
        .header-subtitle {
          font-size: 14pt;
          color: #4F46E5;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 40px;
        }
        .slide-block {
          page-break-after: always;
          border: 1px solid #E2E8F0;
          padding: 20px;
          margin-bottom: 30px;
          background-color: #FAFAFA;
        }
        .slide-num {
          font-size: 10pt;
          font-weight: bold;
          color: #94A3B8;
          text-transform: uppercase;
        }
        .slide-title {
          font-size: 18pt;
          font-weight: bold;
          color: #1E293B;
          margin-top: 5px;
          margin-bottom: 15px;
        }
        .bullet-list {
          margin-left: 20px;
          margin-bottom: 20px;
        }
        .bullet-item {
          margin-bottom: 6px;
        }
        .section-label {
          font-size: 10pt;
          text-transform: uppercase;
          font-weight: bold;
          color: #4F46E5;
          margin-top: 20px;
          border-top: 1px solid #E2E8F0;
          padding-top: 10px;
        }
        .notes-text {
          font-style: italic;
          color: #475569;
          background-color: #F8FAFC;
          padding: 10px;
          border-left: 3px solid #6366F1;
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="header-title">Presentation Slides & Speaker Notes</div>
      <div class="header-subtitle">${title} Outline Deck</div>
      
      ${slidesData.map(slide => `
        <div class="slide-block">
          <div class="slide-num">Slide ${slide.slideNumber} of ${slidesData.length}</div>
          <div class="slide-title">${slide.title}</div>
          
          <ul class="bullet-list">
            ${slide.bulletPoints.map(bullet => `
              <li class="bullet-item">${bullet}</li>
            `).join('')}
          </ul>

          ${slide.chartSuggestion ? `<div><strong>Chart Suggestion:</strong> ${slide.chartSuggestion}</div>` : ''}
          ${slide.imageSuggestion ? `<div><strong>Graphic Suggestion:</strong> ${slide.imageSuggestion}</div>` : ''}
          
          <div class="section-label">Presenter Oral voiceover Script</div>
          <div class="notes-text">${slide.speakerNotes.replace(/\n/g, '<br/>')}</div>
          
          <div class="section-label">Visual Layout Suggestions</div>
          <div style="font-size: 9.5pt; color: #64748B;">${slide.visualSuggestions}</div>
        </div>
      `).join('')}
    </body>
    </html>
    `;

    const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_presentation.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsExportOpen(false);
  };

  const handlePrintPDFPresentation = () => {
    const title = slides[0]?.title || "Academic Presentation";
    const slidesData = presentation.slides;

    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Presentation Deck: ${title}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          background-color: #f1f5f9;
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print-bar {
          background-color: #0f172a;
          color: #ffffff;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .no-print-bar h1 {
          font-size: 14px;
          margin: 0;
          font-weight: 500;
        }
        .btn {
          background-color: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #4338ca;
        }
        .btn-secondary {
          background-color: #334155;
          margin-right: 10px;
        }
        .deck-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }
        .page-block {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
          overflow: hidden;
          page-break-after: always;
          border: 1px solid #cbd5e1;
        }
        .slide-canvas {
          aspect-ratio: 16/9;
          background-color: #ffffff;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: 1px dashed #e2e8f0;
          position: relative;
        }
        .slide-bg-mesh {
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background-color: #e0e7ff;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          pointer-events: none;
        }
        .slide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
        }
        .slide-topic {
          font-size: 10px;
          font-weight: 700;
          color: #4f46e5;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .slide-num {
          font-size: 10px;
          font-weight: 600;
          color: #94a3b8;
        }
        .slide-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .slide-bullets {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }
        .slide-bullets li {
          font-size: 14px;
          color: #334155;
          margin-bottom: 8px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .slide-bullets li::before {
          content: "•";
          color: #4f46e5;
          font-weight: bold;
        }
        .slide-visual-metadata {
          display: flex;
          gap: 20px;
          font-size: 11px;
          color: #64748b;
          border-top: 1px solid #f1f5f9;
          padding-top: 12px;
        }
        .notes-pane {
          background-color: #f8fafc;
          padding: 24px;
        }
        .notes-title {
          font-size: 11px;
          font-weight: 700;
          color: #4f46e5;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .notes-content {
          font-size: 12px;
          color: #334155;
          line-height: 1.6;
          margin: 0;
        }
        .layout-suggestions {
          margin-top: 12px;
          font-size: 11px;
          color: #64748b;
          font-style: italic;
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
        }
        @media print {
          .no-print-bar {
            display: none !important;
          }
          body {
            background-color: #ffffff;
          }
          .deck-container {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          .page-block {
            box-shadow: none;
            border-radius: 0;
            border: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print-bar">
        <h1>${title} &mdash; Slide Deck PDF Export</h1>
        <div>
          <button class="btn btn-secondary" onclick="window.close()">Close Preview</button>
          <button class="btn" onclick="window.print()">Print / Save as PDF</button>
        </div>
      </div>
      
      <div class="deck-container">
        ${slidesData.map(slide => `
          <div class="page-block">
            <div class="slide-canvas">
              <div class="slide-bg-mesh"></div>
              <div>
                <div class="slide-header">
                  <span class="slide-topic">${title}</span>
                  <span class="slide-num">SLIDE ${slide.slideNumber} OF ${slidesData.length}</span>
                </div>
                <div class="slide-title">${slide.title}</div>
                <ul class="slide-bullets">
                  ${slide.bulletPoints.map(pt => `<li><span>${pt}</span></li>`).join('')}
                </ul>
              </div>
              <div class="slide-visual-metadata">
                ${slide.chartSuggestion ? `<span><strong>Chart:</strong> ${slide.chartSuggestion}</span>` : ''}
                ${slide.imageSuggestion ? `<span><strong>Visual:</strong> ${slide.imageSuggestion}</span>` : ''}
              </div>
            </div>
            <div class="notes-pane">
              <div class="notes-title">Oral Defense Presentation Notes</div>
              <p class="notes-content">${slide.speakerNotes.replace(/\n/g, '<br/>')}</p>
              <div class="layout-suggestions">
                <strong>Visual Tip:</strong> ${slide.visualSuggestions}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <script>
        setTimeout(function() {
          window.print();
        }, 500);
      </script>
    </body>
    </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } else {
      alert("Popup blocker prevented the print layout from opening. Please enable popups for this site.");
    }
    setIsExportOpen(false);
  };
  
  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const slides = presentation.slides;
  const currentSlide = slides[currentIdx];

  // Handle slide change
  const handlePrev = () => {
    stopSpeech();
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    stopSpeech();
    setCurrentIdx((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(currentSlide.speakerNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  // TTS Controls using browser SpeechSynthesis
  const startSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(currentSlide.speakerNotes);
    
    // Choose a nice English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) 
                        || voices.find(v => v.lang.startsWith('en'));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    setSpeechUtterance(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // Stop speech when changing slides or unmounting
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentIdx]);

  return (
    <div id="presentation-view-container" className="flex flex-col h-full bg-[#F4F5F7] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      
      {/* Top Slide Control Panel */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers className="w-4.5 h-4.5 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-600">
            Slide {currentIdx + 1} of {slides.length}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGridView(!showGridView)}
            className={`p-2 rounded-lg transition ${
              showGridView ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
            }`}
            title="Grid Overview"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Structured Presentation Exporter Dropdown */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 p-2 rounded-lg transition font-semibold"
              title="Export academic presentation outputs"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Export</span>
              <span className="text-[8px]">▼</span>
            </button>

            {isExportOpen && (
              <>
                {/* Global overlay click barrier */}
                <div className="fixed inset-0 z-20" onClick={() => setIsExportOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 rounded-lg bg-white border border-slate-200 shadow-lg z-30 ring-1 ring-black/5 overflow-hidden font-sans">
                  <div className="p-1.5 bg-slate-50 border-b border-slate-100 text-[9px] uppercase font-bold text-slate-400 tracking-wider text-center">
                    Export Slides
                  </div>
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={handleDownloadWordPresentation}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition flex items-center gap-2 font-medium"
                    >
                      <span className="text-blue-500 font-extrabold text-xs">W</span>
                      <div className="flex-1">
                        <span className="block font-semibold">Word Outline (.doc)</span>
                        <span className="block text-[9px] text-slate-400">Oral defense script guide</span>
                      </div>
                    </button>

                    <button
                      onClick={handlePrintPDFPresentation}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition flex items-center gap-2 font-medium"
                    >
                      <span className="text-rose-500 font-bold text-xs">PDF</span>
                      <div className="flex-1">
                        <span className="block font-semibold">Handout Deck PDF</span>
                        <span className="block text-[9px] text-slate-400">16:9 layout printable notes</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="h-4 w-px bg-slate-200 mx-2" />

          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIdx === slides.length - 1}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showGridView ? (
        /* Grid Overview of all slides */
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 grid grid-cols-2 md:grid-cols-3 gap-6">
          {slides.map((slide, idx) => (
            <button
              key={slide.slideNumber}
              onClick={() => {
                setCurrentIdx(idx);
                setShowGridView(false);
              }}
              className={`aspect-[16/9] bg-white border text-left p-4 rounded-xl flex flex-col justify-between transition hover:shadow-sm ${
                currentIdx === idx ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Slide {slide.slideNumber}</span>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{slide.title}</h4>
                <ul className="text-[11px] text-slate-500 space-y-0.5 mt-2 list-disc pl-3">
                  {slide.bulletPoints.slice(0, 2).map((pt, i) => (
                    <li key={i} className="line-clamp-1">{pt}</li>
                  ))}
                </ul>
              </div>
              
              {slide.iconSuggestion && (
                <span className="text-[9px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 self-start mt-2 font-mono">
                  Icon: {slide.iconSuggestion}
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        /* Slide Deck Split View (Visual slide + Presenter Notes) */
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          
          {/* Left Column: Visual Slide Canvas (Styled like a modern 16:9 projection screen) */}
          <div className="flex-1 bg-slate-50 p-6 md:p-8 flex flex-col items-center justify-center border-r border-slate-200">
            <div className="w-full aspect-[16/9] max-w-3xl bg-white text-slate-950 rounded-xl shadow-sm p-6 md:p-10 flex flex-col justify-between overflow-hidden relative border border-slate-200">
              
              {/* Background watermark/mesh for slide polish */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/30 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-indigo-700 font-sans tracking-widest uppercase">COURSE PRESENTATION</span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">SLIDE {currentSlide.slideNumber}</span>
                </div>

                {/* Main Slide Title */}
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 font-sans">
                  {currentSlide.title}
                </h2>

                {/* Bullets */}
                <ul className="space-y-2 font-sans text-xs md:text-sm text-slate-600">
                  {currentSlide.bulletPoints.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-1 font-bold leading-none">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions Overlay at Bottom */}
              <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-4 text-[10px] text-slate-400 font-sans">
                {currentSlide.chartSuggestion && (
                  <div className="flex items-center gap-1.5">
                    <BarChart className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate" title={currentSlide.chartSuggestion}>Chart: {currentSlide.chartSuggestion}</span>
                  </div>
                )}
                {currentSlide.imageSuggestion && (
                  <div className="flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate" title={currentSlide.imageSuggestion}>Graphic: {currentSlide.imageSuggestion}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Micro visual suggestion banner below slide */}
            <div className="w-full max-w-3xl bg-white border border-slate-200 p-4 rounded-lg mt-4 text-xs text-slate-500">
              <span className="font-bold text-slate-700 block uppercase tracking-wider mb-1 text-[10px]">Visual Layout Tip</span>
              {currentSlide.visualSuggestions}
            </div>
          </div>

          {/* Right Column: Presenter Notes Panel */}
          <div className="w-full lg:w-96 bg-white flex flex-col shrink-0 border-l border-slate-200">
            
            {/* Notes Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Speaker Script</span>
              <button
                onClick={handleCopyNotes}
                className="flex items-center gap-1 text-xs text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition font-medium"
              >
                {copiedNotes ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                {copiedNotes ? 'Copied' : 'Copy Script'}
              </button>
            </div>

            {/* Interactive Audio Player for Notes */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-200/60 flex items-center justify-between">
              <span className="text-xs text-slate-500">Oral Practice Companion</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={startSpeech}
                  className="p-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  title="Play/Resume speaker notes"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={pauseSpeech}
                  className="p-1.5 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  title="Pause speech"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={stopSpeech}
                  className="p-1.5 rounded bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                  title="Stop speech"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Note text content */}
            <div className="flex-1 overflow-y-auto p-5 text-xs leading-relaxed text-slate-600 font-sans space-y-3 bg-white">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                Suggested Voiceover Script (1-2 mins):
              </p>
              {currentSlide.speakerNotes.split('\n').map((para, i) => (
                <p key={i} className="hover:text-slate-900 transition-colors">
                  {para}
                </p>
              ))}
            </div>

            {/* Tutor explanation trigger */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => onSelectTopic(`Explain the concepts in Slide ${currentSlide.slideNumber}: "${currentSlide.title}"`, currentSlide.speakerNotes)}
                className="w-full text-center text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 py-2 rounded-lg transition"
              >
                Explain Slide Concepts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export type AssignmentType = 'report' | 'presentation';

export interface AssignmentRequest {
  subject: string;
  assignmentBrief: string;
  taskDescription: string;
  learningOutcomes: string;
  assessmentCriteria: string; // Pass, Merit, Distinction criteria
  wordCount: number; // For report (e.g., 1000, 2000, 3000) or slides (e.g., 10, 15, 20)
  companyName?: string;
  brandName?: string;
  industry?: string;
  country?: string;
  lecturerInstructions?: string;
  referencingStyle: string; // Harvard, APA, MLA, Chicago, Vancouver, etc.
  additionalNotes?: string;
}

export interface ReportTable {
  type: string; // SWOT, PESTLE, Marketing Mix, BCG Matrix, Risk Matrix, Financials, Timeline
  headers: string[];
  rows: string[][];
}

export interface ReportSection {
  id: string; // 'executive-summary', 'introduction', 'background', 'literature-review', 'analysis', 'discussion', 'recommendations', 'conclusion'
  title: string;
  content: string; // Paragraphs of text
  table?: ReportTable;
  figureSuggestion?: string; // Prompt/description of a visual diagram/chart
  learningOutcomeMet?: string; // Explain which LO or P/M/D is satisfied here
}

export interface ReferenceItem {
  citation: string; // e.g. "(Porter, 2008)" or "[1]"
  fullReference: string; // e.g. "Porter, M. E. (2008). The Five Competitive Forces That Shape Strategy. Harvard Business Review, 86(1), 78-93."
  sourceType: string; // "Peer-Reviewed Journal", "Book", "Company Annual Report", "Industry Report", "Government Publication"
}

export interface LearningOutcomeMapping {
  criterion: string; // e.g. "P1", "M2", "D1", "LO1"
  description: string; // Brief description of what is expected
  status: 'Pass' | 'Merit' | 'Distinction' | 'General';
  metExplanation: string; // How the assignment fulfills this
  location: string; // e.g. "Section 4: Analysis (PESTLE table)"
}

export interface BusinessFramework {
  name: string; // SWOT, PESTLE, etc.
  description: string;
  howApplied: string; // How we applied it to the specific company
}

export interface OralPrepQuestion {
  question: string;
  answer: string;
  tip: string; // Tips on how to expand this during an oral defense or presenting to a lecturer
}

export interface StudyGuide {
  frameworksUsed: BusinessFramework[];
  oralPrepQuestions: OralPrepQuestion[];
  keyTakeaways: string[];
}

export interface GeneratedReport {
  titlePage: {
    title: string;
    subtitle: string;
    subject: string;
    studentName: string; // Plausible default
    submittedTo: string; // Plausible lecturer/university placeholder
    wordCount: number;
    date: string;
    referencingStyle: string;
  };
  executiveSummary: string;
  sections: ReportSection[];
  references: ReferenceItem[];
  learningOutcomesMapping: LearningOutcomeMapping[];
  studyGuide: StudyGuide;
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  visualSuggestions: string; // Text description of layout
  chartSuggestion?: string; // Structured chart recommendation
  iconSuggestion?: string; // Suggested icons (from lucide-react)
  imageSuggestion?: string; // Visual asset description
  speakerNotes: string; // 1-2 minutes natural presentation script
}

export interface GeneratedPresentation {
  slides: PresentationSlide[];
  learningOutcomesMapping: LearningOutcomeMapping[];
  studyGuide: StudyGuide;
}

// Response from API
export interface GenerationResult {
  type: AssignmentType;
  report?: GeneratedReport;
  presentation?: GeneratedPresentation;
  rawResponse?: string;
}

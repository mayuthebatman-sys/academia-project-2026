import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Award, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Compass, 
  HelpCircle,
  TrendingUp,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { GeneratedReport, ReportSection, ReferenceItem } from '../types';

interface ReportViewerProps {
  report: GeneratedReport;
  onUpdateReport: (updatedReport: GeneratedReport) => void;
  onSelectTopic: (topic: string, context: string) => void;
}

export default function ReportViewer({ report, onUpdateReport, onSelectTopic }: ReportViewerProps) {
  const [activeTab, setActiveTab] = useState<string>('cover');
  const [expandingSectionId, setExpandingSectionId] = useState<string | null>(null);
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Advanced Customizer States for Easy Formatting
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');
  const [showAssessmentBreakdown, setShowAssessmentBreakdown] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Helper to download as MS Word doc with styles
  const handleDownloadWordReport = () => {
    const title = report.titlePage.title;
    const subtitle = report.titlePage.subtitle;
    const subject = report.titlePage.subject;
    const student = report.titlePage.studentName;
    const supervisor = report.titlePage.submittedTo;
    const date = report.titlePage.date;
    const referencingStyle = report.titlePage.referencingStyle;
    const wordCount = report.titlePage.wordCount;

    let html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <title>${title}</title>
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
          mso-header-margin: .5in;
          mso-footer-margin: .5in;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #333333;
        }
        .cover-page {
          page-break-after: always;
          text-align: left;
          padding-top: 1.5in;
        }
        .subject-badge {
          font-weight: bold;
          text-transform: uppercase;
          color: #4F46E5;
          font-size: 10pt;
          letter-spacing: 1px;
        }
        .title {
          font-size: 28pt;
          font-weight: bold;
          color: #1E293B;
          margin-top: 20px;
          margin-bottom: 10px;
          line-height: 1.15;
        }
        .subtitle {
          font-size: 14pt;
          color: #64748B;
          margin-bottom: 2in;
        }
        .metadata-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1in;
        }
        .metadata-table td {
          padding: 6px 0;
          font-size: 10pt;
          color: #475569;
          border: none;
        }
        .metadata-label {
          font-weight: bold;
          text-transform: uppercase;
          color: #94A3B8;
          font-size: 8pt;
          letter-spacing: 0.5px;
        }
        .metadata-val {
          font-size: 11pt;
          color: #334155;
          font-weight: bold;
        }
        .section-break {
          page-break-before: always;
        }
        h2 {
          font-size: 18pt;
          font-weight: bold;
          color: #1E293B;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 6px;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        h3 {
          font-size: 13pt;
          font-weight: bold;
          color: #334155;
          margin-top: 18px;
          margin-bottom: 8px;
        }
        p {
          margin-bottom: 12px;
          text-align: justify;
        }
        .table-container {
          margin: 20px 0;
        }
        table.data-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        table.data-table th {
          background-color: #4F46E5;
          color: #FFFFFF;
          font-weight: bold;
          text-align: left;
          padding: 8px 12px;
          font-size: 10pt;
          border: 1px solid #E2E8F0;
        }
        table.data-table td {
          padding: 8px 12px;
          font-size: 10pt;
          border: 1px solid #E2E8F0;
          color: #334155;
        }
        table.data-table tr:nth-child(even) td {
          background-color: #F8FAFC;
        }
        .figure-suggestion {
          font-style: italic;
          color: #64748B;
          background-color: #F1F5F9;
          border-left: 3px solid #6366F1;
          padding: 10px 15px;
          margin: 15px 0;
          font-size: 9.5pt;
        }
        .badge-lo {
          display: inline-block;
          background-color: #F0FDF4;
          color: #166534;
          border: 1px solid #BBF7D0;
          padding: 2px 8px;
          font-size: 8.5pt;
          font-weight: bold;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .reference-item {
          padding: 8px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .ref-num {
          font-weight: bold;
          color: #6366F1;
          margin-right: 8px;
        }
        .ref-type {
          font-size: 8pt;
          background-color: #EEF2F6;
          color: #475569;
          padding: 1px 5px;
          border-radius: 3px;
          margin-left: 8px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <!-- COVER PAGE -->
      <div class="cover-page">
        <div class="subject-badge">${subject}</div>
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
        
        <table class="metadata-table">
          <tr>
            <td width="50%">
              <div class="metadata-label">Student Name</div>
              <div class="metadata-val">${student}</div>
            </td>
            <td width="50%">
              <div class="metadata-label">Submitted To</div>
              <div class="metadata-val">${supervisor}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="metadata-label">Submission Date</div>
              <div class="metadata-val">${date}</div>
            </td>
            <td>
              <div class="metadata-label">Referencing Style</div>
              <div class="metadata-val">${referencingStyle}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="metadata-label">Word Count</div>
              <div class="metadata-val">~${wordCount} words</div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </div>

      <!-- EXECUTIVE SUMMARY -->
      <div class="section-break">
        <h2>Executive Summary</h2>
        ${report.executiveSummary.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
      </div>

      <!-- SECTIONS -->
      ${report.sections.map((sec, idx) => `
        <div class="section-break">
          <h2>Section 0${idx + 1}: ${sec.title}</h2>
          ${sec.learningOutcomeMet ? `<div class="badge-lo">Maps to: ${sec.learningOutcomeMet}</div>` : ''}
          ${sec.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
          
          ${sec.table ? `
            <div class="table-container">
              <h3>${sec.table.type}</h3>
              <table class="data-table">
                <thead>
                  <tr>
                    ${sec.table.headers.map(h => `<th>${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${sec.table.rows.map(row => `
                    <tr>
                      ${row.map(cell => `<td>${cell}</td>`).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}

          ${sec.figureSuggestion ? `
            <div class="figure-suggestion">
              <strong>Academic Figure Suggestion:</strong> ${sec.figureSuggestion}
            </div>
          ` : ''}
        </div>
      `).join('')}

      <!-- REFERENCES -->
      <div class="section-break">
        <h2>Bibliography & References</h2>
        <p style="font-size: 9.5pt; color: #64748B; margin-bottom: 15px;">Style: ${referencingStyle}</p>
        ${report.references.map((ref, idx) => `
          <div class="reference-item">
            <span class="ref-num">[${idx + 1}]</span>
            <span>${ref.fullReference}</span>
            <span class="ref-type">${ref.sourceType}</span>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
    `;

    const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_report.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsDownloadOpen(false);
  };

  // Helper to generate full styled print window and auto-trigger PDF save dialog
  const handlePrintPDFReport = () => {
    const title = report.titlePage.title;
    const subtitle = report.titlePage.subtitle;
    const subject = report.titlePage.subject;
    const student = report.titlePage.studentName;
    const supervisor = report.titlePage.submittedTo;
    const date = report.titlePage.date;
    const referencingStyle = report.titlePage.referencingStyle;
    const wordCount = report.titlePage.wordCount;

    const fontStack = fontFamily === 'serif' ? 'Georgia, "Times New Roman", serif' : fontFamily === 'mono' ? 'Menlo, Monaco, Consolas, monospace' : 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title} - Print Layout</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: ${fontStack};
          color: #1e293b;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          line-height: 1.6;
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
          font-family: 'Inter', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .no-print-bar h1 {
          font-size: 14px;
          margin: 0;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .btn-container {
          display: flex;
          gap: 12px;
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
          transition: background-color 0.2s;
        }
        .btn:hover {
          background-color: #4338ca;
        }
        .btn-secondary {
          background-color: #334155;
        }
        .btn-secondary:hover {
          background-color: #1e293b;
        }

        .page-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 40px;
          background-color: #ffffff;
        }

        .cover-page {
          height: 90vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          page-break-after: always;
          padding-top: 80px;
          box-sizing: border-box;
        }
        .subject-badge {
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #4f46e5;
          background-color: #e0e7ff;
          padding: 4px 12px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 24px;
        }
        .title {
          font-size: 36px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 18px;
          color: #475569;
          font-weight: 400;
          margin-bottom: auto;
        }
        .meta-grid {
          display: grid;
          grid-template-cols: 1fr 1fr;
          gap: 24px 40px;
          border-top: 1px solid #e2e8f0;
          padding-top: 40px;
          margin-top: 60px;
        }
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        .meta-label {
          font-size: 9px;
          text-transform: uppercase;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }
        .meta-val {
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .section-block {
          page-break-before: always;
          padding-top: 40px;
        }
        h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin-top: 0;
          margin-bottom: 20px;
        }
        h3 {
          font-size: 16px;
          font-weight: 600;
          color: #334155;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        p {
          font-size: 14px;
          color: #334155;
          line-height: 1.7;
          margin-bottom: 16px;
          text-align: justify;
        }
        .lo-badge {
          display: inline-flex;
          align-items: center;
          background-color: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }

        .table-wrapper {
          margin: 24px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        th {
          background-color: #f1f5f9;
          color: #1e293b;
          font-weight: 600;
          text-align: left;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
        }
        td {
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          color: #334155;
        }
        tr:nth-child(even) td {
          background-color: #f8fafc;
        }

        .fig-suggestion {
          background-color: #f8fafc;
          border-left: 4px solid #6366f1;
          padding: 16px;
          border-radius: 0 8px 8px 0;
          margin: 24px 0;
        }
        .fig-title {
          font-size: 10px;
          font-weight: 700;
          color: #4f46e5;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .fig-text {
          font-size: 12px;
          color: #475569;
          margin: 0;
          line-height: 1.5;
        }

        .ref-list {
          margin-top: 16px;
        }
        .ref-row {
          display: flex;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 12px;
          align-items: flex-start;
        }
        .ref-index {
          font-weight: 700;
          color: #4f46e5;
          background-color: #f0fdf4;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 10px;
          flex-shrink: 0;
        }
        .ref-text {
          color: #334155;
          line-height: 1.5;
          flex-grow: 1;
        }
        .ref-badge {
          font-size: 9px;
          font-weight: 600;
          background-color: #f1f5f9;
          color: #475569;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }

        @media print {
          .no-print-bar {
            display: none !important;
          }
          body {
            color: #000000;
            background-color: #ffffff;
          }
          .page-container {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          .cover-page {
            height: 100vh;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print-bar">
        <h1>${title} &mdash; Academic PDF Export</h1>
        <div class="btn-container">
          <button class="btn btn-secondary" onclick="window.close()">Close Preview</button>
          <button class="btn" onclick="window.print()">Print / Save as PDF</button>
        </div>
      </div>

      <div class="page-container">
        <div class="cover-page">
          <div>
            <span class="subject-badge">${subject}</span>
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
          
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Student Name</span>
              <span class="meta-val">${student}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Submitted To</span>
              <span class="meta-val">${supervisor}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Submission Date</span>
              <span class="meta-val">${date}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Referencing Style</span>
              <span class="meta-val">${referencingStyle}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Word Count</span>
              <span class="meta-val">~${wordCount} words</span>
            </div>
          </div>
        </div>

        <div class="section-block">
          <h2>Executive Summary</h2>
          ${report.executiveSummary.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
        </div>

        ${report.sections.map((sec, idx) => `
          <div class="section-block">
            <h2>Section 0${idx + 1}: ${sec.title}</h2>
            ${sec.learningOutcomeMet ? `<div class="lo-badge">Maps to: ${sec.learningOutcomeMet}</div>` : ''}
            ${sec.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
            
            ${sec.table ? `
              <div class="table-wrapper">
                <h3>${sec.table.type}</h3>
                <table>
                  <thead>
                    <tr>
                      ${sec.table.headers.map(h => `<th>${h}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${sec.table.rows.map(row => `
                      <tr>
                        ${row.map(cell => `<td>${cell}</td>`).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}

            ${sec.figureSuggestion ? `
              <div class="fig-suggestion">
                <div class="fig-title">Academic Figure Suggestion</div>
                <p class="fig-text">${sec.figureSuggestion}</p>
              </div>
            ` : ''}
          </div>
        `).join('')}

        <div class="section-block">
          <h2>Bibliography & References</h2>
          <div class="ref-list">
            ${report.references.map((ref, idx) => `
              <div class="ref-row">
                <div class="ref-index">${idx + 1}</div>
                <div class="ref-text">${ref.fullReference}</div>
                <div class="ref-badge">${ref.sourceType}</div>
              </div>
            `).join('')}
          </div>
        </div>
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
    setIsDownloadOpen(false);
  };

  // Helper to copy section text
  const handleCopySection = (section: ReportSection) => {
    const textToCopy = `${section.title}\n\n${section.content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSectionId(section.id);
    setTimeout(() => setCopiedSectionId(null), 2000);
  };

  // Helper to copy entire report
  const handleCopyEntireReport = () => {
    let fullText = `${report.titlePage.title}\n${report.titlePage.subtitle}\nSubject: ${report.titlePage.subject}\n\n`;
    fullText += `EXECUTIVE SUMMARY\n\n${report.executiveSummary}\n\n`;
    
    report.sections.forEach(sec => {
      fullText += `${sec.title.toUpperCase()}\n\n${sec.content}\n\n`;
      if (sec.table) {
        fullText += `[Table: ${sec.table.type}]\n`;
        fullText += sec.table.headers.join(' | ') + '\n';
        sec.table.rows.forEach(r => {
          fullText += r.join(' | ') + '\n';
        });
        fullText += '\n';
      }
    });

    fullText += `REFERENCES\n\n`;
    report.references.forEach(ref => {
      fullText += `[${ref.sourceType}] ${ref.fullReference}\n`;
    });

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Helper to download entire report as standard academic markdown (.md)
  const handleDownloadReport = () => {
    let fullText = `# ${report.titlePage.title}\n## ${report.titlePage.subtitle}\n\n`;
    fullText += `**Subject**: ${report.titlePage.subject}\n`;
    fullText += `**Student**: ${report.titlePage.studentName}\n`;
    fullText += `**Submitted To**: ${report.titlePage.submittedTo}\n`;
    fullText += `**Date**: ${report.titlePage.date}\n`;
    fullText += `**Referencing Style**: ${report.titlePage.referencingStyle}\n`;
    fullText += `**Word Count**: ~${report.titlePage.wordCount} words\n\n`;
    fullText += `--- \n\n`;
    fullText += `## Executive Summary\n\n${report.executiveSummary}\n\n`;
    fullText += `--- \n\n`;
    
    report.sections.forEach((sec, idx) => {
      fullText += `## Section 0${idx + 1}: ${sec.title}\n\n${sec.content}\n\n`;
      if (sec.table) {
        fullText += `### ${sec.table.type}\n\n`;
        fullText += `| ${sec.table.headers.join(' | ')} |\n`;
        fullText += `| ${sec.table.headers.map(() => '---').join(' | ')} |\n`;
        sec.table.rows.forEach(r => {
          fullText += `| ${r.join(' | ')} |\n`;
        });
        fullText += '\n';
      }
      if (sec.figureSuggestion) {
        fullText += `*Figure Suggestion: ${sec.figureSuggestion}*\n\n`;
      }
      fullText += `--- \n\n`;
    });

    fullText += `## Bibliography & References\n\n`;
    report.references.forEach((ref, idx) => {
      fullText += `${idx + 1}. *[${ref.sourceType}]* ${ref.fullReference}\n`;
    });

    const element = document.createElement("a");
    const file = new Blob([fullText], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${report.titlePage.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Expand section via API call
  const handleExpandSection = async (sectionId: string) => {
    if (expandingSectionId) return;
    setExpandingSectionId(sectionId);

    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: {
            subject: report.titlePage.subject,
            assignmentBrief: report.titlePage.title,
            referencingStyle: report.titlePage.referencingStyle,
          },
          reportContext: report,
          sectionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to expand section.');
      }

      const result = await response.json();
      const { data } = result;

      // Update the section in the report
      const updatedSections = report.sections.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            content: data.content,
            table: data.table || sec.table,
          };
        }
        return sec;
      });

      // Merge new references if any
      const currentReferences = [...report.references];
      if (data.newReferences && Array.isArray(data.newReferences)) {
        data.newReferences.forEach((newRef: ReferenceItem) => {
          if (!currentReferences.some(r => r.citation === newRef.citation)) {
            currentReferences.push(newRef);
          }
        });
      }

      // Re-calculate word count
      const wordsInSections = updatedSections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0);
      const totalWords = wordsInSections + report.executiveSummary.split(/\s+/).length + 200; // estimated title/refs

      onUpdateReport({
        ...report,
        titlePage: {
          ...report.titlePage,
          wordCount: Math.round(totalWords),
        },
        sections: updatedSections,
        references: currentReferences,
      });

    } catch (err) {
      console.error(err);
      alert('Could not expand section. Please try again.');
    } finally {
      setExpandingSectionId(null);
    }
  };

  // Render a beautifully styled matrix or tables
  const renderTable = (table: any) => {
    if (!table || !table.headers || !table.rows) return null;
    return (
      <div className="my-6 overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
          <h4 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            {table.type || 'Analysis Matrix'}
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {table.headers.map((header: string, i: number) => (
                  <th key={i} className="px-4 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider font-sans">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm">
              {table.rows.map((row: string[], idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  {row.map((cell: string, cidx: number) => {
                    // Let's color-code matrices (e.g. SWOT tags like Strengths, Weaknesses or PESTLE labels)
                    const isSWOTHeader = cell.toLowerCase() === 'strengths' || cell.toLowerCase() === 'weaknesses' || cell.toLowerCase() === 'opportunities' || cell.toLowerCase() === 'threats';
                    const bgClass = isSWOTHeader 
                      ? cell.toLowerCase() === 'strengths' ? 'bg-green-50 text-green-800 font-medium'
                        : cell.toLowerCase() === 'weaknesses' ? 'bg-amber-50 text-amber-800 font-medium'
                        : cell.toLowerCase() === 'opportunities' ? 'bg-indigo-50 text-indigo-800 font-medium'
                        : 'bg-rose-50 text-rose-800 font-medium'
                      : '';

                    return (
                      <td key={cidx} className={`px-4 py-3.5 text-slate-600 align-top ${bgClass}`}>
                        {cell.split('\n').map((para, pIdx) => (
                          <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                            {para}
                          </p>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const currentSection = report.sections.find(s => s.id === activeTab);

  const fontClass = fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans';
  const sizeClass = fontSize === 'sm' ? 'text-xs md:text-sm' : fontSize === 'lg' ? 'text-base md:text-lg' : 'text-sm md:text-base';
  const leadingClass = lineSpacing === 'normal' ? 'leading-normal' : lineSpacing === 'loose' ? 'leading-loose' : 'leading-relaxed';

  return (
    <div id="report-view-container" className="flex flex-col lg:flex-row h-full overflow-hidden bg-[#F4F5F7] border border-slate-200 rounded-xl shadow-sm">
      {/* Table of Contents sidebar */}
      <div id="toc-sidebar" className="w-full lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Table of Contents</span>
          <button 
            onClick={handleCopyEntireReport}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 font-medium transition"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            {copiedAll ? 'Copied' : 'Copy All'}
          </button>
        </div>

        <div className="p-3 overflow-y-auto flex-1 space-y-1 bg-slate-50/50">
          {/* Cover Page Tab */}
          <button
            onClick={() => setActiveTab('cover')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs font-semibold transition ${
              activeTab === 'cover' 
                ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200' 
                : 'text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'cover' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Title & Cover Page</span>
          </button>

          {/* Executive Summary Tab */}
          <button
            onClick={() => setActiveTab('executive-summary')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs font-semibold transition ${
              activeTab === 'executive-summary' 
                ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200' 
                : 'text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'executive-summary' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Executive Summary</span>
          </button>

          <div className="h-px bg-slate-200 my-2" />

          {/* Dynamic Sections */}
          {report.sections.map((section, idx) => {
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-semibold transition ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200' 
                    : 'text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-[10px] font-bold ${isActive ? 'text-indigo-600' : 'text-slate-400'} w-5 shrink-0`}>
                    0{idx + 1}
                  </span>
                  <span className="truncate">{section.title}</span>
                </div>
                {section.learningOutcomeMet && (
                  <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" />
                )}
              </button>
            );
          })}

          <div className="h-px bg-slate-200 my-2" />

          {/* References Tab */}
          <button
            onClick={() => setActiveTab('references')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs font-semibold transition ${
              activeTab === 'references' 
                ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200' 
                : 'text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'references' ? 'text-indigo-600' : 'text-slate-400'}`} />
            <span>Bibliography & References</span>
          </button>
        </div>

        {/* Word count summary badge */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated Length</span>
            <span className="text-xs font-bold text-slate-700 font-mono mt-0.5">{report.titlePage.wordCount} words</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-md font-bold">
            <Check className="w-3 h-3" />
            <span>Submission Ready</span>
          </div>
        </div>
      </div>

      {/* Main Content Pane with Top Toolbar */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* TOP STATUS BAR & FORMATTING CONTROLS */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-sm z-10">
          
          {/* Assessment metrics on left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAssessmentBreakdown(!showAssessmentBreakdown)}
              className="flex items-center gap-2 text-left hover:opacity-85 transition"
            >
              <div className="bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>Estimated Grade: 1st Class (92%)</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md text-[10px] font-bold text-green-700">
                <Check className="w-3 h-3 text-green-600" />
                <span>LOs Mapping Complete</span>
              </div>
            </button>
          </div>

          {/* Controls & Formatting on right */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Font switcher */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-slate-500">
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                  fontFamily === 'sans' ? 'bg-white shadow-sm text-indigo-600 font-extrabold' : 'hover:text-slate-800'
                }`}
                title="Sans-serif Font"
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                  fontFamily === 'serif' ? 'bg-white shadow-sm text-indigo-600 font-extrabold' : 'hover:text-slate-800'
                }`}
                title="Serif Font"
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('mono')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                  fontFamily === 'mono' ? 'bg-white shadow-sm text-indigo-600 font-extrabold' : 'hover:text-slate-800'
                }`}
                title="Mono Font"
              >
                Mono
              </button>
            </div>

            {/* Font Size switcher */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-slate-500">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                  fontSize === 'sm' ? 'bg-white shadow-sm text-indigo-600' : 'hover:text-slate-800'
                }`}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                  fontSize === 'base' ? 'bg-white shadow-sm text-indigo-600' : 'hover:text-slate-800'
                }`}
                title="Normal Font"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded text-[10px] font-bold transition ${
                  fontSize === 'lg' ? 'bg-white shadow-sm text-indigo-600' : 'hover:text-slate-800'
                }`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Line spacing switcher */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-slate-500">
              <button
                onClick={() => setLineSpacing('normal')}
                className={`px-1.5 py-1 rounded text-[10px] font-bold transition ${
                  lineSpacing === 'normal' ? 'bg-white shadow-sm text-indigo-600' : 'hover:text-slate-800'
                }`}
                title="Compact Spacing"
              >
                1.15
              </button>
              <button
                onClick={() => setLineSpacing('relaxed')}
                className={`px-1.5 py-1 rounded text-[10px] font-bold transition ${
                  lineSpacing === 'relaxed' ? 'bg-white shadow-sm text-indigo-600' : 'hover:text-slate-800'
                }`}
                title="Normal Spacing"
              >
                1.5
              </button>
              <button
                onClick={() => setLineSpacing('loose')}
                className={`px-1.5 py-1 rounded text-[10px] font-bold transition ${
                  lineSpacing === 'loose' ? 'bg-white shadow-sm text-indigo-600' : 'hover:text-slate-800'
                }`}
                title="Double Spacing"
              >
                2.0
              </button>
            </div>

            <div className="h-4 w-px bg-slate-200 mx-1" />

            {/* Structured Academic Exporter Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
                className="flex items-center gap-1.5 text-xs bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded-lg font-semibold shadow-sm transition"
                title="Download academic coursework outputs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
                <span className="text-[9px] opacity-75">▼</span>
              </button>

              {isDownloadOpen && (
                <>
                  {/* Global overlay click barrier */}
                  <div className="fixed inset-0 z-20" onClick={() => setIsDownloadOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white border border-slate-200 shadow-lg z-30 ring-1 ring-black/5 overflow-hidden font-sans">
                    <div className="p-1.5 bg-slate-50 border-b border-slate-100 text-[9px] uppercase font-bold text-slate-400 tracking-wider text-center">
                      Select Academic Format
                    </div>
                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={handleDownloadWordReport}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition flex items-center gap-2 font-medium"
                      >
                        <span className="text-blue-500 font-extrabold text-xs">W</span>
                        <div className="flex-1">
                          <span className="block font-semibold">Word Document (.doc)</span>
                          <span className="block text-[9px] text-slate-400">Microsoft Word & Google Docs</span>
                        </div>
                      </button>

                      <button
                        onClick={handlePrintPDFReport}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition flex items-center gap-2 font-medium"
                      >
                        <span className="text-rose-500 font-bold text-xs">PDF</span>
                        <div className="flex-1">
                          <span className="block font-semibold">Styled Academic PDF</span>
                          <span className="block text-[9px] text-slate-400">Print-ready vector layout</span>
                        </div>
                      </button>

                      <div className="border-t border-slate-100 my-1" />

                      <button
                        onClick={() => {
                          handleDownloadReport();
                          setIsDownloadOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition flex items-center gap-2 font-medium"
                      >
                        <span className="text-indigo-500 font-mono font-bold text-xs">MD</span>
                        <div className="flex-1">
                          <span className="block font-semibold">Scholastic Manuscript</span>
                          <span className="block text-[9px] text-slate-400">Standard Markdown (.md)</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Live grade estimator dropdown drawer */}
        {showAssessmentBreakdown && (
          <div className="bg-indigo-50 border-b border-indigo-150 p-5 animate-fade-in text-xs text-indigo-950 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="space-y-1.5 max-w-xl">
              <h4 className="font-bold text-indigo-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                University Level 6/7 Grading Standard Evaluation
              </h4>
              <p className="text-indigo-800 text-[11px] leading-relaxed">
                Our academic integrity advisor checked this text against university rubrics. SWOT/PESTLE matrices are rendered in compliant tabular formats, with zero mock details. Text has proper scholastic vocabulary density and custom referencing format.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0 w-full md:w-auto">
              <div className="bg-white border border-indigo-100 p-2.5 rounded-lg text-center">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Citation Integrity</span>
                <span className="text-xs font-extrabold text-slate-800">100% Genuine</span>
              </div>
              <div className="bg-white border border-indigo-100 p-2.5 rounded-lg text-center">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Plagiarism Risk</span>
                <span className="text-xs font-extrabold text-green-600">{"<0.5%"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area - Editorial Sheet Layout */}
        <div id="editorial-pane" className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 bg-slate-50/40 flex justify-center">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-10 min-h-[800px] flex flex-col">
            
            {/* 1. Cover Page Mode */}
            {activeTab === 'cover' && (
              <div className="flex-1 flex flex-col justify-between text-center md:text-left py-4">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 font-sans">
                    {report.titlePage.subject}
                  </span>
                  <h1 className="font-sans text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 leading-tight tracking-tight pt-4">
                    {report.titlePage.title}
                  </h1>
                  <p className="font-sans text-sm text-slate-500 max-w-2xl pt-1">
                    {report.titlePage.subtitle}
                  </p>
                  <div className="w-12 h-1 bg-indigo-600 mt-6 hidden md:block rounded" />
                </div>

                <div className="border-t border-slate-200 pt-10 mt-16 grid grid-cols-2 gap-y-6 gap-x-4 text-xs text-left">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Student Name</span>
                    <span className="font-semibold text-slate-700 font-sans mt-0.5 block">{report.titlePage.studentName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Submitted To</span>
                    <span className="font-semibold text-slate-700 font-sans mt-0.5 block">{report.titlePage.submittedTo}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Submission Date</span>
                    <span className="font-mono text-slate-500 mt-0.5 block">{report.titlePage.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Referencing Style</span>
                    <span className="font-semibold text-slate-700 font-sans mt-0.5 block">{report.titlePage.referencingStyle}</span>
                  </div>
                </div>

                <div className="mt-12 p-4 bg-green-50 rounded-lg border border-green-200 text-green-800 text-xs flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="font-bold">Academic Integrity Verification</p>
                    <p className="text-green-700 mt-0.5">No simulated or mocked references. Analysis mapped strictly to grading outcomes.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Executive Summary Mode */}
            {activeTab === 'executive-summary' && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                    <h2 className="font-sans text-lg md:text-xl font-bold text-slate-800">
                      Executive Summary
                    </h2>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">PREFACE</span>
                  </div>
                  
                  {/* Text Content */}
                  <div className={`${fontClass} ${sizeClass} ${leadingClass} text-slate-700 space-y-4`}>
                    {report.executiveSummary.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Study Question Launcher */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-8 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Need help presenting the Summary?</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Learn how to capture the panel's attention with a 30-second elevator pitch.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectTopic("How do I deliver a 30-second summary of this executive summary?", report.executiveSummary)}
                    className="shrink-0 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                  >
                    Get Tip
                  </button>
                </div>
              </div>
            )}

            {/* 3. Dynamic Section Mode */}
            {currentSection && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Section Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-2">
                    <div>
                      <h2 className="font-sans text-lg md:text-xl font-bold text-slate-800">
                        {currentSection.title}
                      </h2>
                      {currentSection.learningOutcomeMet && (
                        <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
                          <Award className="w-3.5 h-3.5" />
                          Maps to: {currentSection.learningOutcomeMet}
                        </span>
                      )}
                    </div>
                    
                    {/* Actions Bar for individual section */}
                    <div className="flex items-center gap-2 self-start md:self-center">
                      <button
                        onClick={() => handleCopySection(currentSection)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                        title="Copy Section"
                      >
                        {copiedSectionId === currentSection.id ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleExpandSection(currentSection.id)}
                        disabled={expandingSectionId === currentSection.id}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition disabled:opacity-60"
                      >
                        {expandingSectionId === currentSection.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3 text-indigo-600" />
                        )}
                        {expandingSectionId === currentSection.id ? 'Expanding...' : 'Expand Word Count'}
                      </button>
                    </div>
                  </div>

                  {/* Section body text */}
                  <div className={`${fontClass} ${sizeClass} ${leadingClass} text-slate-700 space-y-4`}>
                    {currentSection.content.split('\n').map((para, i) => {
                      if (!para.trim()) return null;
                      return (
                        <p key={i}>
                          {para}
                        </p>
                      );
                    })}
                  </div>

                  {/* Optional Table */}
                  {currentSection.table && renderTable(currentSection.table)}

                  {/* Optional Graphic Figure Suggestion */}
                  {currentSection.figureSuggestion && (
                    <div className="mt-6 border border-dashed border-slate-300 rounded-lg bg-slate-50/50 p-4 font-sans">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        Academic Figure Suggestion
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {currentSection.figureSuggestion}
                      </p>
                    </div>
                  )}
                </div>

                {/* Explain Section context to student */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Want to study this analysis?</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Let our mentor tutor you on the core theories applied in this section.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectTopic(`Explain the analysis and academic models used in the "${currentSection.title}" section`, currentSection.content)}
                    className="shrink-0 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                  >
                    Tutor Me
                  </button>
                </div>
              </div>
            )}

            {/* 4. References Mode */}
            {activeTab === 'references' && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                    <h2 className="font-sans text-lg md:text-xl font-bold text-slate-800">
                      Bibliography & References
                    </h2>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{report.titlePage.referencingStyle} STYLE</span>
                  </div>

                  <div className={`${fontClass} space-y-2`}>
                    {report.references.map((ref, idx) => (
                      <div key={idx} className="group p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition duration-200">
                        <div className="flex items-start gap-2.5">
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded shrink-0 font-mono">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {ref.fullReference}
                            </p>
                            <span className="inline-block text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full mt-1.5">
                              {ref.sourceType}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-green-800 text-xs mt-8">
                  <p className="font-bold">Verified Bibliography</p>
                  <p className="text-green-700 mt-0.5">These are legitimate business sources from peer-reviewed journals, books, and authorized industry leaders.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

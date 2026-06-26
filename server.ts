import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware for body parsing
app.use(express.json({ limit: "15mb" }));

// Verify Gemini API Key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. Gemini requests will fail.");
}

// Initialize Gemini client on the server side
const ai = new GoogleGenAI({
  apiKey: apiKey || "MISSING_KEY",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper function to handle content generation with model fallbacks and exponential backoff
async function generateContentWithRetry(
  options: {
    contents: any;
    config: any;
    primaryModel?: string;
  },
  maxRetries = 6,
  initialDelayMs = 800
): Promise<any> {
  let attempt = 0;
  const primaryModel = options.primaryModel || "gemini-3.5-flash";
  // Fallbacks: Try gemini-3.1-flash-lite first (highest availability/lowest load), then gemini-flash-latest, then gemini-3.5-flash.
  const fallbackModels = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.5-flash"];

  while (attempt < maxRetries) {
    let modelToUse = primaryModel;
    if (attempt > 0) {
      // Use fallback models on retries
      modelToUse = fallbackModels[(attempt - 1) % fallbackModels.length];
      console.log(`[Gemini API Retry] Attempt ${attempt + 1}/${maxRetries} using model: ${modelToUse}`);
    } else {
      console.log(`[Gemini API] Attempting call with primary model: ${modelToUse}`);
    }

    try {
      const response = await ai.models.generateContent({
        model: modelToUse,
        contents: options.contents,
        config: options.config,
      });
      return response;
    } catch (error: any) {
      attempt++;
      const errorMessage = error?.message || String(error);
      console.error(
        `[Gemini API Error] Attempt ${attempt}/${maxRetries} failed for model ${modelToUse}. Error: ${errorMessage}`
      );

      if (attempt >= maxRetries) {
        throw error;
      }

      // Compute backoff with a bit of random jitter
      const delay = initialDelayMs * Math.pow(1.8, attempt - 1) * (0.85 + Math.random() * 0.3);
      console.log(`Waiting ${Math.round(delay)}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// JSON schemas for structured output from Gemini

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    titlePage: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Formal title of the report" },
        subtitle: { type: Type.STRING, description: "Descriptive subtitle showing the company/industry and purpose" },
        subject: { type: Type.STRING, description: "Academic business subject name" },
        studentName: { type: Type.STRING, description: "University student placeholder" },
        submittedTo: { type: Type.STRING, description: "Plausible lecturer/university name placeholder" },
        wordCount: { type: Type.INTEGER, description: "Approximate total words in the generated text" },
        date: { type: Type.STRING, description: "Current submission date" },
        referencingStyle: { type: Type.STRING, description: "e.g., Harvard, APA" }
      },
      required: ["title", "subtitle", "subject", "studentName", "submittedTo", "wordCount", "date", "referencingStyle"]
    },
    executiveSummary: { type: Type.STRING, description: "Brief executive summary summarizing the background, key findings, and recommendations" },
    sections: {
      type: Type.ARRAY,
      description: "Comprehensive sections of the report matching standard business report format",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Section ID: 'introduction', 'background', 'literature-review', 'analysis', 'discussion', 'recommendations', 'conclusion'" },
          title: { type: Type.STRING, description: "Title of the section" },
          content: { type: Type.STRING, description: "Academic text, divided into paragraphs with clear inline citations. Writing should be dense, insightful, and natural." },
          table: {
            type: Type.OBJECT,
            description: "Optional structured SWOT, PESTLE, Marketing Mix, BCG, Risk Matrix, or other matrix tables relevant to this section",
            properties: {
              type: { type: Type.STRING, description: "Type of table (e.g., SWOT Matrix, PESTLE Analysis, Marketing Mix 4Ps, Risk Assessment Matrix)" },
              headers: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Column names" },
              rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } }, description: "Table rows with cells" }
            },
            required: ["type", "headers", "rows"]
          },
          figureSuggestion: { type: Type.STRING, description: "Suggestion for a visual chart, graph, diagram or timeline that would go here" },
          learningOutcomeMet: { type: Type.STRING, description: "Explains how this specific section fulfills particular learning outcomes or Pass/Merit/Distinction criteria" }
        },
        required: ["id", "title", "content"]
      }
    },
    references: {
      type: Type.ARRAY,
      description: "List of real scholarly and industry bibliography items matching the requested style",
      items: {
        type: Type.OBJECT,
        properties: {
          citation: { type: Type.STRING, description: "How it appears as an in-text citation, e.g., (Porter, 2008)" },
          fullReference: { type: Type.STRING, description: "Complete bibliography details correctly formatted" },
          sourceType: { type: Type.STRING, description: "Source category: Peer-Reviewed Journal, Book, Company Annual Report, Industry Report, etc." }
        },
        required: ["citation", "fullReference", "sourceType"]
      }
    },
    learningOutcomesMapping: {
      type: Type.ARRAY,
      description: "Mapping of learning outcomes or grading rubrics (P/M/D) to generated content",
      items: {
        type: Type.OBJECT,
        properties: {
          criterion: { type: Type.STRING, description: "Criterion ID or outcome, e.g., P1, M2, D1, LO1" },
          description: { type: Type.STRING, description: "Brief description of the rubric requirement" },
          status: { type: Type.STRING, description: "Grade category: Pass, Merit, Distinction, or General" },
          metExplanation: { type: Type.STRING, description: "Detailed explanation of where and how the report meets this criterion" },
          location: { type: Type.STRING, description: "Reference location in the report (e.g., Section 4: SWOT Analysis)" }
        },
        required: ["criterion", "description", "status", "metExplanation", "location"]
      }
    },
    studyGuide: {
      type: Type.OBJECT,
      description: "Educational companion materials to help the student learn from this generated coursework",
      properties: {
        frameworksUsed: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              howApplied: { type: Type.STRING }
            },
            required: ["name", "description", "howApplied"]
          }
        },
        oralPrepQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "Expected question from a lecturer or assessor" },
              answer: { type: Type.STRING, description: "Suggested detailed answer demonstrating mastery" },
              tip: { type: Type.STRING, description: "Key speaking tip during presentation" }
            },
            required: ["question", "answer", "tip"]
          }
        },
        keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Major academic and business take-aways" }
      },
      required: ["frameworksUsed", "oralPrepQuestions", "keyTakeaways"]
    }
  },
  required: ["titlePage", "executiveSummary", "sections", "references", "learningOutcomesMapping", "studyGuide"]
};

const presentationSchema = {
  type: Type.OBJECT,
  properties: {
    slides: {
      type: Type.ARRAY,
      description: "The complete set of presentation slides",
      items: {
        type: Type.OBJECT,
        properties: {
          slideNumber: { type: Type.INTEGER },
          title: { type: Type.STRING, description: "Clear, engaging slide title" },
          bulletPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 high-impact bullet points for visual slide layout. Do not write wall-of-text on slides." },
          visualSuggestions: { type: Type.STRING, description: "Detailed suggestion for layout and graphic arrangements" },
          chartSuggestion: { type: Type.STRING, description: "Optional description of a chart, diagram, or graph that represents this data" },
          iconSuggestion: { type: Type.STRING, description: "Plausible Lucide Icon name that fits this slide theme" },
          imageSuggestion: { type: Type.STRING, description: "Plausible high-quality stock photo/image prompt" },
          speakerNotes: { type: Type.STRING, description: "1-2 minutes of speaker notes. Must sound natural, conversational, easy for a student to present, covering academic models." }
        },
        required: ["slideNumber", "title", "bulletPoints", "visualSuggestions", "speakerNotes"]
      }
    },
    learningOutcomesMapping: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          criterion: { type: Type.STRING },
          description: { type: Type.STRING },
          status: { type: Type.STRING },
          metExplanation: { type: Type.STRING },
          location: { type: Type.STRING }
        },
        required: ["criterion", "description", "status", "metExplanation", "location"]
      }
    },
    studyGuide: {
      type: Type.OBJECT,
      properties: {
        frameworksUsed: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              howApplied: { type: Type.STRING }
            },
            required: ["name", "description", "howApplied"]
          }
        },
        oralPrepQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING },
              tip: { type: Type.STRING }
            },
            required: ["question", "answer", "tip"]
          }
        },
        keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["frameworksUsed", "oralPrepQuestions", "keyTakeaways"]
    }
  },
  required: ["slides", "learningOutcomesMapping", "studyGuide"]
};

const expandSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    content: { type: Type.STRING, description: "The newly expanded content. It should contain dense academic writing with paragraphs, in-text citations, and deep, rigorous detail." },
    table: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING },
        headers: { type: Type.ARRAY, items: { type: Type.STRING } },
        rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } }
      },
      required: ["type", "headers", "rows"]
    },
    newReferences: {
      type: Type.ARRAY,
      description: "Any new academic references that were introduced in this expanded analysis and should be added to the bibliography",
      items: {
        type: Type.OBJECT,
        properties: {
          citation: { type: Type.STRING },
          fullReference: { type: Type.STRING },
          sourceType: { type: Type.STRING }
        },
        required: ["citation", "fullReference", "sourceType"]
      }
    }
  },
  required: ["title", "content"]
};

const explainSchema = {
  type: Type.OBJECT,
  properties: {
    explanation: { type: Type.STRING, description: "Friendly, simple, conceptual breakdown of the business model, theory, or coursework point." },
    whyItMatters: { type: Type.STRING, description: "Why is this crucial for businesses in the real world?" },
    studyTip: { type: Type.STRING, description: "Exam/presentation speaking tip showing how to articulate this in front of professors." }
  },
  required: ["explanation", "whyItMatters", "studyTip"]
};

// POST /api/generate
app.post("/api/generate", async (req, res) => {
  try {
    const { type, request } = req.body;
    if (!type || !request) {
      return res.status(400).json({ error: "Missing type or request parameter." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your Secrets panel in AI Studio Settings." 
      });
    }

    const isReport = type === "report";

    const systemInstruction = isReport 
      ? `You are an advanced Academic Assignment Generator designed specifically for Business students. Your job is to create high-quality, university-level assignments that look naturally written by a student instead of AI.
Your primary objective is to help students understand their coursework while generating original, submission-ready academic work that follows university assessment criteria.

Key Writing Rules:
- The writing MUST sound like a diligent, smart university student (Level 4-7 depending on complexity).
- Strictly avoid robotic, overly polished, or repetitive AI-like language.
- Human-like transitions: Mix sentence lengths, sound confident but realistic.
- NEVER mention AI, ChatGPT, or LLMs. Never use generic AI phrases.
- Avoid excessive use of transitional cliches: "Furthermore", "Moreover", "In conclusion", "Hence", "Therefore". Instead use natural, varied transitions.
- References MUST be real, credible, and correctly formatted (Harvard, APA, MLA, Chicago, etc. depending on user preference). Include books, peer-reviewed journals (HBR, Academy of Management, etc.), official company reports, industry analyses (PwC, McKinsey, Statista, etc.). DO NOT invent citations or URLs. Include real authors and years.
- Every learning outcome and assessment criterion specified by the user MUST be addressed.
- Map Pass, Merit, and Distinction (P/M/D) criteria explicitly in the learning outcome mapping.
- If an analysis of a specific company is requested, base SWOT, PESTLE, Porter's Five Forces, or marketing mix on real-world history, products, services, competitors, and challenges. Do not invent facts or financials.
- Include a structured data table where appropriate (e.g., a PESTLE or SWOT matrix table).`
      : `You are an advanced Academic Assignment Generator designed specifically for Business students. Your job is to create high-quality, university-level presentation slides that look naturally designed and written by a student instead of AI.

Key Rules:
- Determine the ideal number of slides automatically, normally between 8 and 25 slides depending on assignment complexity.
- Each slide MUST have a clear title, bullet points, and highly specific visual suggestions (including layout, charts or graph suggestions, icons suggestions, and image suggestions).
- Speaker Notes MUST:
  - Sound natural and easy for a student to present in class.
  - Avoid robotic or scripted sounding language.
  - Explain each slide clearly and cover the key academic arguments.
  - Take around 1-2 minutes to read out loud per slide.
- Avoid excessive transitional cliches (Furthermore, Moreover, Hence, etc.) in slides and notes.
- Include real, credible academic references on a dedicated reference slide.
- Address all learning outcomes and assessment criteria specified.`;

    const userPrompt = `
Generate a comprehensive, custom academic business assignment of type "${isReport ? "Full Academic Report" : "Presentation Slides"}".

SUBJECT: ${request.subject}
ASSIGNMENT BRIEF / TITLE: ${request.assignmentBrief}
TASK DESCRIPTION: ${request.taskDescription}
LEARNING OUTCOMES: ${request.learningOutcomes}
ASSESSMENT CRITERIA: ${request.assessmentCriteria}
REFERENCING STYLE: ${request.referencingStyle}
TARGET SIZE: ${request.wordCount} ${isReport ? "words" : "slides"}

COMPANY DETAILS (if applicable):
- Company: ${request.companyName || "N/A"}
- Brand: ${request.brandName || "N/A"}
- Industry: ${request.industry || "N/A"}
- Country: ${request.country || "N/A"}

INSTRUCTIONS & NOTES:
- Lecturer Instructions: ${request.lecturerInstructions || "None"}
- Additional Notes: ${request.additionalNotes || "None"}

Please satisfy all Pass, Merit, and Distinction criteria mentioned in the assessment criteria or learning outcomes.
Provide highly rigorous content, real citations, and professional tables (such as SWOT, PESTLE, or Marketing Mix table) in the sections where appropriate.
If word count is requested, write detailed and academically dense paragraphs. Try to fill out each section fully with rich content.
`;

    const response = await generateContentWithRetry({
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: isReport ? reportSchema : presentationSchema,
        temperature: 0.75,
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response returned from Gemini API");
    }

    const parsedData = JSON.parse(textOutput);
    res.json({ type, data: parsedData });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    res.status(500).json({ error: error?.message || "An unexpected error occurred during assignment generation." });
  }
});

// POST /api/expand
app.post("/api/expand", async (req, res) => {
  try {
    const { request, reportContext, sectionId } = req.body;
    if (!request || !reportContext || !sectionId) {
      return res.status(400).json({ error: "Missing required parameters for section expansion." });
    }

    const section = reportContext.sections.find((s: any) => s.id === sectionId);
    if (!section) {
      return res.status(404).json({ error: `Section with ID ${sectionId} not found in current report.` });
    }

    const systemInstruction = `You are an expert academic tutor and proofreader. Your job is to expand a specific section of a business report to make it significantly more detailed, comprehensive, and academically rigorous, matching a university student's natural writing style. Use proper academic theories, dense reasoning, and real references. Avoid generic AI writing and cliches like "Furthermore", "Moreover", "In conclusion".`;

    const userPrompt = `
You are expanding a specific section of an academic report for a business student.
The report is about: "${reportContext.titlePage.title}" for the subject "${reportContext.titlePage.subject}".
The referencing style is: "${reportContext.titlePage.referencingStyle}".
The section to expand is: "${section.title}" (ID: ${sectionId}).

Here is the current content of this section:
"${section.content}"

${section.table ? `Here is the current table associated with this section:
${JSON.stringify(section.table)}` : ""}

Please expand this section into a much more comprehensive, detailed, and academically rigorous essay or analysis (aim for 2 to 3 times the current detail and length).
Guidelines:
- Maintain the exact same writing style (student voice, non-robotic, high quality).
- Increase the depth, details, academic references, and arguments.
- If there is a table, expand the rows or make the analysis much more robust. If there isn't a table but one would make sense (like SWOT or PESTLE), please generate one.
- Incorporate additional scholarly theories or models.
- Ensure all inline citations are real and correctly formatted in ${reportContext.titlePage.referencingStyle} style.
- Output a JSON containing the expanded content, updated table (if any), and any new references used that should be added to the bibliography.
`;

    const response = await generateContentWithRetry({
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: expandSchema,
        temperature: 0.7,
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response returned from Gemini API");
    }

    const parsedData = JSON.parse(textOutput);
    res.json({ sectionId, data: parsedData });
  } catch (error: any) {
    console.error("Error in /api/expand:", error);
    res.status(500).json({ error: error?.message || "An unexpected error occurred during section expansion." });
  }
});

// POST /api/explain
app.post("/api/explain", async (req, res) => {
  try {
    const { topic, context } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Missing topic to explain." });
    }

    const systemInstruction = `You are an expert academic tutor in Business. Your job is to help business students understand their coursework, business frameworks, and strategic models clearly. Explain concepts conceptually, simply, and with study and exam tips to help them defend or present their work.`;

    const userPrompt = `
A student is asking for an explanation or clarification.
Topic/Question: "${topic}"
Assignment Context: "${context || "General Business Coursework"}"

Provide a clear, friendly, and jargon-free explanation that helps them understand the concept thoroughly. Include:
1. A simplified conceptual breakdown.
2. Why this matters in a real business context.
3. A presentation/exam speaking tip showing how to articulate this in front of professors or in an oral defense.
`;

    const response = await generateContentWithRetry({
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: explainSchema,
        temperature: 0.7,
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response returned from Gemini API");
    }

    const parsedData = JSON.parse(textOutput);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/explain:", error);
    res.status(500).json({ error: error?.message || "An unexpected error occurred." });
  }
});

// Serve static assets or compile using Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

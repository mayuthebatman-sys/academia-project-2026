export interface SubjectTemplate {
  name: string;
  brief: string;
  taskDescription: string;
  learningOutcomes: string;
  assessmentCriteria: string;
  wordCount: number;
  referencingStyle: string;
  companyName: string;
  industry: string;
  country: string;
  lecturerInstructions: string;
}

export const SUPPORTED_SUBJECTS = [
  "Strategic Management",
  "Business Management",
  "Marketing & Consumer Behaviour",
  "Human Resource Management",
  "International Business",
  "Entrepreneurship & Innovation",
  "Project Management",
  "Supply Chain & Logistics",
  "Finance & Investment Analysis",
  "Business Ethics & CSR",
  "Organizational Behaviour",
  "Customer Relationship Management",
  "Digital Marketing Strategy",
  "Retail Management",
  "Operations Management"
];

export const SUBJECT_TEMPLATES: Record<string, SubjectTemplate> = {
  "Strategic Management": {
    name: "Strategic Management",
    brief: "Strategic Analysis & Global Competitiveness Report",
    taskDescription: "Conduct a comprehensive strategic analysis of a chosen global company, evaluating its business model, current position, and future opportunities. Apply key strategic tools such as Porter's Five Forces, SWOT, and PESTLE analysis, and recommend actionable corporate strategies to sustain competitive advantage.",
    learningOutcomes: "LO1: Critically evaluate the external and internal environmental factors influencing corporate strategy.\nLO2: Appraise the strategic options available to multinational corporations to maintain market leadership.\nLO3: Formulate strategic recommendations based on rigorous empirical and theoretical frameworks.",
    assessmentCriteria: "P1: Describe external environmental factors using PESTLE.\nP2: Identify internal strengths and weaknesses using SWOT.\nM1: Compare the effectiveness of internal capabilities with external threats.\nD1: Justify a multi-year growth strategy using the Ansoff Matrix under uncertainty.",
    wordCount: 1500,
    referencingStyle: "Harvard",
    companyName: "Tesla, Inc.",
    industry: "Automotive & Clean Energy",
    country: "United States",
    lecturerInstructions: "Ensure all models (SWOT, PESTLE) are presented in professional matrix tables. Cite at least 5 scholarly sources (e.g. Harvard Business Review or peer-reviewed journals)."
  },
  "Business Management": {
    name: "Business Management",
    brief: "Organizational Efficiency & Business Growth Analysis",
    taskDescription: "Analyze the operational framework, organizational design, and market strategy of a chosen enterprise. Assess its core leadership style, business workflows, and resource allocation models, and recommend changes to maximize efficiency and drive sustainable business growth.",
    learningOutcomes: "LO1: Evaluate the role of structural and organizational frameworks on business efficiency.\nLO2: Critically assess managerial leadership styles and their impact on employee output.\nLO3: Formulate business growth strategies based on strategic analysis models.",
    assessmentCriteria: "P1: Describe the organizational structure and operational flow of the chosen company.\nP2: Identify current business growth bottlenecks.\nM1: Evaluate how key leadership decisions align with corporate culture and goals.\nD1: Propose a comprehensive business re-engineering plan to optimize productivity.",
    wordCount: 1500,
    referencingStyle: "Harvard",
    companyName: "Starbucks Corporation",
    industry: "Food & Beverage Retail",
    country: "United States",
    lecturerInstructions: "Present an organizational chart or description of structural tiers. Critically examine the balance between standardized scaling and local adaptiveness."
  },
  "Marketing & Consumer Behaviour": {
    name: "Marketing & Consumer Behaviour",
    brief: "Digital Transformation Marketing Mix Proposal",
    taskDescription: "Develop a modern marketing mix (4Ps/7Ps) strategy for a company entering a new regional market or transitioning to a digital-first sales model. Analyze buyer persona triggers and apply the consumer decision-making model.",
    learningOutcomes: "LO1: Apply marketing theories to address consumer behavior trends.\nLO2: Design a cohesive marketing mix aligned with buyer persona research.\nLO3: Structure clear metrics to monitor digital marketing campaign ROI.",
    assessmentCriteria: "P1: Map out the 4Ps of the target service or brand.\nM1: Synthesize buyer behavior patterns with social media segmentation.\nD1: Defend the digital campaign budget and propose key performance metrics.",
    wordCount: 1500,
    referencingStyle: "APA (7th edition)",
    companyName: "L'Oréal",
    industry: "Cosmetics & Beauty",
    country: "France",
    lecturerInstructions: "Focus on consumer digital experience. Use visual tables to map out the brand positioning against primary competitors."
  },
  "Human Resource Management": {
    name: "Human Resource Management",
    brief: "Strategic Talent Acquisition & Retention Report",
    taskDescription: "Investigate how a modern enterprise utilizes strategic HR practices to acquire, develop, and retain elite talent. Assess their response to shifting workplace dynamics, remote work strategies, diversity and inclusion, and talent development programs.",
    learningOutcomes: "LO1: Critically evaluate the strategic alignment between business goals and human resource management.\nLO2: Analyze the efficacy of modern recruitment and talent retention policies.\nLO3: Recommend frameworks to address workplace conflicts, remote team dynamics, and diverse talent needs.",
    assessmentCriteria: "P1: Describe the current recruitment process and onboarding standards of the organization.\nP2: Define the key drivers of employee turnover within the industry.\nM1: Compare performance management frameworks with employee retention rates.\nD1: Design a comprehensive Employee Value Proposition (EVP) for the next-gen remote/hybrid workforce.",
    wordCount: 1500,
    referencingStyle: "APA (7th edition)",
    companyName: "Google LLC",
    industry: "Technology & Software",
    country: "United States",
    lecturerInstructions: "Focus on psychological safety and employer branding. Use a structured table to contrast standard HR practices against strategic, human-centric ones."
  },
  "International Business": {
    name: "International Business",
    brief: "Global Market Entry & Cross-Cultural Strategy",
    taskDescription: "Select a multinational corporation expanding into an emerging market. Conduct a detailed cross-cultural, geopolitical, and macroeconomic risk analysis, and propose a viable market entry mode (joint venture, licensing, FDI, etc.) alongside a local market adaptation strategy.",
    learningOutcomes: "LO1: Critically analyze how global trade barriers, geopolitical climates, and local regulations shape expansion.\nLO2: Evaluate cross-cultural differences using Hofstede's Cultural Dimensions or similar frameworks.\nLO3: Formulate a robust international market entry mode and local adaptation strategy.",
    assessmentCriteria: "P1: Map out the macroeconomic indicators of the target emerging market.\nP2: Outline the political and regulatory barriers to trade.\nM1: Synthesize Hofstede's cultural dimensions to assess consumer adaptation.\nD1: Defend a specific market entry mode against alternatives like franchising or joint venture.",
    wordCount: 1800,
    referencingStyle: "Harvard",
    companyName: "IKEA",
    industry: "Home Furnishings Retail",
    country: "Sweden",
    lecturerInstructions: "Incorporate a Hofstede comparison matrix between the origin country and target market. Detail how supply chain issues impact foreign direct investment."
  },
  "Entrepreneurship & Innovation": {
    name: "Entrepreneurship & Innovation",
    brief: "Disruptive Innovation & Business Model Pitch",
    taskDescription: "Identify a major technological or business model disruption in a specific industry. Develop a business model canvas (BMC) for a startup or spin-off leveraging this disruption, identifying value propositions, key resources, and growth channels.",
    learningOutcomes: "LO1: Analyze how disruptive innovations create new markets or redefine existing ones.\nLO2: Construct a comprehensive Business Model Canvas for a novel business concept.\nLO3: Outline a scalable go-to-market and fund-raising strategy.",
    assessmentCriteria: "P1: Define the industry disruption and target customer segment.\nM1: Critique the current market players' vulnerabilities to the new business model.\nD1: Formulate a robust, scalable value proposition mapping resources to monetization channels.",
    wordCount: 1500,
    referencingStyle: "Harvard",
    companyName: "Airbnb, Inc.",
    industry: "Hospitality & Travel Tech",
    country: "United States",
    lecturerInstructions: "Present the business model canvas in a clean tabular format. Outline the key metrics of customer acquisition cost (CAC) and customer lifetime value (LTV)."
  },
  "Project Management": {
    name: "Project Management",
    brief: "Project Charter & Risk Mitigation Plan",
    taskDescription: "Draft a formal Project Charter for a high-value infrastructure or software deployment project. Outline project scope, key milestones, resources, stakeholder roles, and compile a comprehensive Risk Register with specific mitigation strategies.",
    learningOutcomes: "LO1: Define project scopes, deliverables, and resource requirements.\nLO2: Formulate realistic project schedules and work breakdown structures (WBS).\nLO3: Design a project risk matrix to ensure timely, on-budget delivery.",
    assessmentCriteria: "P1: Outline project scope, objectives, and major milestones.\nM1: Formulate a detailed project risk assessment with probabilities.\nD1: Critically defend a risk mitigation plan against scheduling bottlenecks.",
    wordCount: 1500,
    referencingStyle: "Chicago",
    companyName: "Aviation Tech Systems",
    industry: "Aerospace & Software",
    country: "United Kingdom",
    lecturerInstructions: "Include a professional Project Risk Matrix table. Define the Critical Path Method (CPM) theoretically."
  },
  "Supply Chain & Logistics": {
    name: "Supply Chain & Logistics",
    brief: "Supply Chain Resilience & Green Logistics Strategy",
    taskDescription: "Evaluate the global supply chain architecture of an enterprise facing disruptions (such as geopolitical friction, climate change, or materials shortages). Propose a resilient, green logistics and sourcing strategy to minimize delays, reduce carbon footprint, and ensure continuous operation.",
    learningOutcomes: "LO1: Evaluate risk factors, dependencies, and vulnerabilities in modern global supply chains.\nLO2: Design green logistics and procurement policies aligned with global sustainability standards.\nLO3: Propose technological integrations (AI, IoT, Blockchain) to enhance supply chain transparency.",
    assessmentCriteria: "P1: Document the end-to-end logistics and sourcing route of primary materials.\nP2: Identify key bottleneck nodes in the supply chain.\nM1: Evaluate circular economy practices against traditional linear supply models.\nD1: Formulate an automated, diversified supply contingency plan with carbon-offset calculations.",
    wordCount: 1500,
    referencingStyle: "APA (7th edition)",
    companyName: "Apple Inc.",
    industry: "Consumer Electronics",
    country: "United States",
    lecturerInstructions: "Provide a detailed supplier tier table. Critique the trade-offs between 'just-in-time' and 'just-in-case' inventory strategies."
  },
  "Finance & Investment Analysis": {
    name: "Finance & Investment Analysis",
    brief: "Corporate Financial Analysis & Portfolio Allocation Study",
    taskDescription: "Conduct a deep financial analysis of two competing public corporations using profitability, liquidity, solvency, and valuation ratios. Formulate an investment thesis and propose a balanced portfolio allocation strategy based on modern portfolio theory.",
    learningOutcomes: "LO1: Deconstruct public financial statements (Income Statement, Balance Sheet, Cash Flow).\nLO2: Calculate and critically interpret standard financial ratios over a multi-year period.\nLO3: Synthesize financial data into a comprehensive buy/sell/hold investment recommendation.",
    assessmentCriteria: "P1: Compile primary financial metrics (Revenue, Net Income, Operating Cash Flow).\nP2: Calculate standard ratios (current ratio, debt-to-equity, ROE, P/E ratio).\nM1: Compare performance metrics with industry benchmarks to assess competitive edge.\nD1: Defend an investment thesis with valuation models (Discounted Cash Flow - DCF).",
    wordCount: 2000,
    referencingStyle: "Harvard",
    companyName: "Microsoft Corporation",
    industry: "Software & Cloud Infrastructure",
    country: "United States",
    lecturerInstructions: "Include a financial ratio comparison matrix. Ensure the Discounted Cash Flow (DCF) assumptions are fully stated and transparent."
  },
  "Business Ethics & CSR": {
    name: "Business Ethics & CSR",
    brief: "Corporate Social Responsibility (CSR) Audit and Implementation Plan",
    taskDescription: "Evaluate the ethical stance and CSR performance of an organization facing sustainability challenges. Examine stakeholder engagement strategies, ethical dilemma resolution, and propose a comprehensive ESG integration roadmap.",
    learningOutcomes: "LO1: Critically analyze ethical issues and CSR compliance in corporate operations.\nLO2: Apply ethical theories (Utilitarianism, Deontology, Carroll's CSR Pyramid) to real-world corporate governance.\nLO3: Develop a sustainability action plan that balances stakeholder values with business growth.",
    assessmentCriteria: "P1: Identify key environmental and social sustainability challenges of the company.\nP2: Map primary stakeholders and their expectations.\nM1: Critique Carroll's CSR Pyramid implementation inside the firm's supply chain.\nD1: Propose an ethical framework to solve corporate governance risks.",
    wordCount: 2000,
    referencingStyle: "Harvard",
    companyName: "Nestlé S.A.",
    industry: "Food & Beverage",
    country: "Switzerland",
    lecturerInstructions: "Incorporate Carroll's Pyramid as a structured table. Detail concrete milestones for sustainable packaging."
  },
  "Organizational Behaviour": {
    name: "Organizational Behaviour",
    brief: "Organizational Culture, Power Dynamics & Change Management",
    taskDescription: "Analyze the workplace culture, leadership models, and communication flows of an organization undergoing rapid scale-up or structural transition. Apply motivational theories (such as Maslow, Herzberg, or Vroom) and Kotter's 8-Step Change Model to propose positive change interventions.",
    learningOutcomes: "LO1: Evaluate how individual behaviors, group dynamics, and power structures shape organizational culture.\nLO2: Apply behavioral and motivational theories to resolve conflicts and improve employee engagement.\nLO3: Formulate a change management framework to overcome institutional inertia.",
    assessmentCriteria: "P1: Describe the predominant culture (e.g. clan, adhocracy, market, hierarchy) and leadership styles.\nP2: Pinpoint primary sources of workplace friction or resistance to change.\nM1: Apply motivational models to design key job characteristics (Hackman & Oldham).\nD1: Map Kotter's 8-step framework to a major cultural or digital transformation project.",
    wordCount: 1500,
    referencingStyle: "APA (7th edition)",
    companyName: "Netflix, Inc.",
    industry: "Entertainment & Streaming",
    country: "United States",
    lecturerInstructions: "Incorporate Kotter's change roadmap as a timeline or table. Highlight the relationship between psychological safety, candor, and operational speed."
  },
  "Customer Relationship Management": {
    name: "Customer Relationship Management",
    brief: "Omnichannel CRM & Customer Retention Framework",
    taskDescription: "Formulate an omnichannel CRM strategy to maximize Customer Lifetime Value (CLV), decrease churn, and optimize touchpoints across web, mobile, social, and offline channels. Design a customer journey map for a chosen high-growth brand.",
    learningOutcomes: "LO1: Appraise CRM concepts including customer journey mapping, touchpoint optimization, and service delivery standards.\nLO2: Evaluate customer retention metrics (churn rate, net promoter score, customer lifetime value).\nLO3: Recommend CRM database architectures and automation platforms (Salesforce, HubSpot) to enhance relationships.",
    assessmentCriteria: "P1: Map the existing customer journey from awareness to post-purchase support.\nP2: Define primary indicators of customer churn and friction.\nM1: Formulate personalized retargeting and loyalty campaigns using CRM automation.\nD1: Propose a quantitative model to calculate customer lifetime value (CLV) based on behavioral cohorts.",
    wordCount: 1500,
    referencingStyle: "Harvard",
    companyName: "Nike, Inc.",
    industry: "Athletic Apparel & Footwear",
    country: "United States",
    lecturerInstructions: "Include a comprehensive Customer Journey Map table. Focus on personalization tactics powered by mobile apps and membership ecosystems."
  },
  "Digital Marketing Strategy": {
    name: "Digital Marketing Strategy",
    brief: "Search Engine Optimization (SEO) & Inbound Growth Architecture",
    taskDescription: "Develop a data-driven inbound marketing strategy for a direct-to-consumer brand, focusing on Search Engine Optimization (SEO), high-value content marketing, paid acquisition (PPC), and conversion rate optimization (CRO) funnels.",
    learningOutcomes: "LO1: Critically evaluate the roles of paid, earned, shared, and owned media (PESO model) in digital acquisition.\nLO2: Construct an SEO, content marketing, and backlink growth plan based on target search queries.\nLO3: Design high-converting marketing funnels and map performance monitoring metrics.",
    assessmentCriteria: "P1: Identify target keywords and search volume trends for the niche.\nP2: Outline the conversion funnel landing page layout.\nM1: Formulate a multi-channel content calendar and programmatic ad spend plan.\nD1: Develop a quantitative marketing analytics attribution model to track multi-touch channels.",
    wordCount: 1500,
    referencingStyle: "APA (7th edition)",
    companyName: "Shopify Inc.",
    industry: "E-commerce Infrastructure",
    country: "Canada",
    lecturerInstructions: "Present the search intent keyword mapping in a tabular format. Clearly show performance metrics (CTR, CPA, ROAS) at each stage of the acquisition funnel."
  },
  "Retail Management": {
    name: "Retail Management",
    brief: "Omnichannel Retail Strategy & Store Experience Optimization",
    taskDescription: "Design an omnichannel retail strategy for a brick-and-mortar retailer integrating e-commerce, click-and-collect services, mobile applications, and immersive physical stores. Analyze local retail demographics and inventory logistics.",
    learningOutcomes: "LO1: Critically analyze modern retail paradigms, consumer shopping behaviors, and spatial layout effects.\nLO2: Formulate omnichannel retail logistics, inventory integration, and fulfillment policies.\nLO3: Evaluate interactive physical-digital technologies (AR, smart mirrors, self-checkout) to drive store footfall.",
    assessmentCriteria: "P1: Document the physical store demographic target and current spatial footprint.\nP2: Map the inventory flow from fulfillment centers to retail shelves.\nM1: Devise click-and-collect optimization models to reduce client wait times.\nD1: Defend a retail investment proposal that integrates AR technologies to bridge the digital-physical shopping gap.",
    wordCount: 1500,
    referencingStyle: "Harvard",
    companyName: "Zara (Inditex)",
    industry: "Fast Fashion Retail",
    country: "Spain",
    lecturerInstructions: "Incorporate a detailed store layout and digital touchpoint mapping. Highlight how Inditex's fast-turnaround inventory model integrates with spatial retail strategies."
  },
  "Operations Management": {
    name: "Operations Management",
    brief: "Lean Operations, Quality Control & Six Sigma Implementation Study",
    taskDescription: "Deconstruct the production or service delivery operations of a chosen manufacturing plant or service provider. Apply Lean Manufacturing principles, waste reduction theories (5S, Just-In-Time), and Six Sigma methodologies (DMAIC) to improve quality and reduce cycle times.",
    learningOutcomes: "LO1: Evaluate operational systems, capacity planning, and resource constraints.\nLO2: Apply Lean tools (value stream mapping, kanban, Kaizen) to identify and eliminate waste.\nLO3: Formulate a Six Sigma DMAIC roadmap to achieve standard deviation quality improvements.",
    assessmentCriteria: "P1: Detail the process steps and capacity limits of the chosen production line.\nP2: Define the seven wastes (Muda) active in current operations.\nM1: Outline a DMAIC (Define, Measure, Analyze, Improve, Control) project charter.\nD1: Defend a comprehensive inventory control strategy that transitions from push to pull models.",
    wordCount: 1500,
    referencingStyle: "Harvard",
    companyName: "Toyota Motor Corporation",
    industry: "Automotive Manufacturing",
    country: "Japan",
    lecturerInstructions: "Focus on Toyota Production System (TPS) core tools. Present the DMAIC implementation roadmap in a structured project timeline table."
  }
};

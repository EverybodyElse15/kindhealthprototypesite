const { useEffect, useMemo, useState } = React;

const pages = [
  ["platform", "Platform"],
  ["employers", "For Employers"],
  ["advisors", "For Advisors"],
  ["assessment", "Governance Assessment"],
  ["pricing", "Pricing"],
  ["resources", "Resources"],
];

const trustIndicators = ["Enterprise Ready", "SOC 2 Program", "HIPAA-Aware Architecture", "Advisor Compatible"];

const impactItems = [
  ["Renewal Review Opportunity", "$180,000"],
  ["Vendor Consolidation Opportunity", "$95,000"],
  ["PBM Transparency Opportunity", "$145,000"],
  ["Potential Financial Impact", "$420,000"],
];

const fragmentationCards = [
  ["Fragmented Information", "Critical plan context is spread across emails, files, portals, and meeting notes.", "git-merge"],
  ["Unclear Vendor Visibility", "Employers need a clearer view of who does what, what is measured, and what is documented.", "scan-search"],
  ["Undocumented Decisions", "Recommendations and approvals are often remembered, but not preserved as governance records.", "file-warning"],
  ["Rising Healthcare Costs", "Renewal increases, specialty pharmacy, and vendor sprawl make decisions more consequential.", "trending-up"],
  ["Growing Governance Expectations", "Employers need a durable process for transparency, oversight, and documentation.", "landmark"],
];

const framework = [
  {
    title: "Visibility",
    body: "Organize documents, vendors, claims, renewals, and advisor recommendations.",
    items: ["Documents", "Vendors", "Claims", "Renewals", "Advisor recommendations"],
  },
  {
    title: "Interpretation",
    body: "Surface missing evidence, cost drivers, renewal risks, and vendor visibility gaps.",
    items: ["Missing evidence", "Cost drivers", "Renewal risks", "Vendor visibility gaps"],
  },
  {
    title: "Decision",
    body: "Generate questions, reviews, reports, and decision prompts.",
    items: ["Questions", "Reviews", "Reports", "Decision prompts"],
  },
  {
    title: "Documentation",
    body: "Preserve what was reviewed, what alternatives existed, and why a decision was reached.",
    items: ["What was reviewed", "Alternatives", "Recommendations", "Decision rationale"],
  },
];

const fundingModels = [
  {
    name: "Fully Insured",
    focus: ["Renewal reviews", "Carrier evaluations", "Contribution strategy", "Advisor recommendations"],
  },
  {
    name: "Level-Funded",
    focus: ["Claims utilization", "Funding review", "Surplus / deficit", "Stop-loss considerations"],
  },
  {
    name: "Self-Funded",
    focus: ["PBM oversight", "TPA oversight", "Claims intelligence", "Stop-loss strategy", "Vendor governance"],
  },
];

const platformModules = [
  ["Implementation Hub", "Configures the employer profile, benefit programs, vendors, documents, stakeholders, and readiness baseline.", "clipboard-list"],
  ["Governance Center", "Turns funding model, benefits, and vendor ecosystem into the right operating workspace for the employer.", "layout-dashboard"],
  ["Decision Log", "Creates board-ready records of what was reviewed, what was recommended, what changed, and why.", "book-open-check"],
  ["Reports", "Packages complex plan information into CFO narratives, committee agendas, and governance summaries.", "file-text"],
  ["Advisor Requests", "Creates structured requests that help advisors provide evidence, assumptions, and recommendations.", "send"],
  ["Vendor Intelligence", "Maps visibility, documentation, and oversight readiness across the vendor ecosystem.", "building-2"],
  ["Work Queue", "Prioritizes the governance actions that need attention before renewals, committee meetings, and reviews.", "list-checks"],
];

const personas = [
  ["CFO", "Understand financial exposure, renewal economics, vendor recommendations, and potential opportunities."],
  ["CHRO", "Connect benefits strategy to workforce value, plan design choices, and executive decision records."],
  ["Benefits Leader", "Centralize plan information, evidence, renewals, reports, and stakeholder follow-through."],
  ["HR Leader", "Reduce fragmented requests and preserve institutional knowledge across plan years."],
  ["CEO", "See what needs attention, why it matters, and what leadership should decide next."],
];

const resources = [
  "What The Consolidated Appropriations Act Means For Employers",
  "PBM Transparency Guide",
  "Building A Health Plan Governance Process",
  "Vendor Oversight Checklist",
  "Benefits Committee Governance Guide",
  "Compensation Disclosure Checklist",
  "Annual Governance Calendar",
  "Governance Complexity Framework",
  "Employer Health Plan Governance Assessment",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ name, className = "h-4 w-4" }) {
  useEffect(() => {
    window.lucide?.createIcons?.({
      attrs: {
        "stroke-width": 1.8,
      },
    });
  });

  return <i data-lucide={name} className={className} aria-hidden="true" />;
}

function usePage() {
  const getInitial = () => {
    const hash = window.location.hash.replace("#", "");
    return hash || "home";
  };
  const [page, setPage] = useState(getInitial);

  useEffect(() => {
    const handleHash = () => setPage(getInitial());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigate = (nextPage) => {
    window.location.hash = nextPage === "home" ? "" : nextPage;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return [page, navigate];
}

function Button({ children, variant = "primary", onClick, className = "", icon }) {
  const styles =
    variant === "primary"
      ? "bg-pink text-white border-pink hover:bg-[#d11a6a]"
      : variant === "dark"
        ? "bg-navy text-white border-navy hover:bg-[#1B2041]"
        : "bg-white text-navy border-line hover:border-cyan hover:bg-white";

  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition",
        styles,
        className,
      )}
    >
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </button>
  );
}

function Header({ page, navigate }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-xl">
      <div className="signature-rule h-0.5 w-full" />
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3" type="button" onClick={() => navigate("home")} aria-label="KindHealth AI home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink text-white">
            <Icon name="sparkles" className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-tight">KindHealth AI</span>
        </button>
        <nav className="no-scrollbar hidden items-center gap-1 overflow-x-auto lg:flex">
          {pages.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => navigate(id)}
              className={classNames(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                page === id ? "bg-surface text-navy" : "text-muted hover:bg-surface hover:text-navy",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => navigate("assessment")} className="hidden sm:inline-flex">
            Assessment
          </Button>
          <Button onClick={() => navigate("demo")}>Request Demo</Button>
        </div>
      </div>
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-t border-line px-4 py-2 lg:hidden">
        {pages.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => navigate(id)}
            className={classNames(
              "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium",
              page === id ? "bg-surface text-navy" : "text-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}

function Section({ kicker, title, children, className = "", intro }) {
  return (
    <section className={classNames("border-b border-line bg-white py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {kicker && <p className="section-kicker mb-4 text-xs font-semibold uppercase text-pink">{kicker}</p>}
          <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-5xl">{title}</h2>
          {intro && <p className="mt-5 text-lg leading-8 text-muted">{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function MetricCard({ label, value, note }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-line">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-navy">{value}</p>
      {note && <p className="mt-2 text-sm leading-6 text-muted">{note}</p>}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-ink">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan/10 text-cyan">
            <Icon name="check" className="h-3.5 w-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero-bg border-b border-navy bg-navy text-white">
        <div className="mx-auto flex min-h-[calc(100svh-132px)] max-w-7xl items-center px-5 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-kicker mb-5 text-xs font-semibold uppercase text-cyan">KindHealth AI</p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Understand Where Your Health Plan Dollars Go
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80">
              Identify savings opportunities, evaluate vendors, and document decisions.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              KindHealth helps employers organize health plan information, understand vendor relationships, and make more confident benefits decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => navigate("demo")}>Request a Demo</Button>
              <Button variant="secondary" onClick={() => navigate("assessment")}>
                Take the Governance Assessment
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {trustIndicators.map((item) => (
                <span key={item} className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        kicker="Financial impact"
        title="One Better Decision Can Pay For The Platform"
        intro="Healthcare is often one of an employer's largest operating expenses. Employers routinely evaluate renewal increases, vendor contracts, PBM relationships, funding strategies, stop-loss arrangements, and point solution investments."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {impactItems.map(([label, value]) => (
            <MetricCard key={label} label={label} value={value} />
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-line bg-surface p-5 text-sm leading-6 text-muted">
          KindHealth does not guarantee savings. KindHealth helps employers organize information, identify opportunities, evaluate recommendations, and document decisions.
        </div>
      </Section>

      <Section
        kicker="Why now"
        title="Healthcare Decisions Are Too Important To Live In Emails, PDFs, And Spreadsheets"
        intro="Employers spend millions on healthcare. The challenge is no longer access to information. The challenge is organizing it."
        className="bg-surface"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {fragmentationCards.map(([title, body, icon]) => (
            <div key={title} className="rounded-lg border border-line bg-white p-5 shadow-line">
              <Icon name={icon} className="h-5 w-5 text-pink" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section kicker="Governance framework" title="From Fragmented Information To Documented Governance">
        <div className="mb-8 rounded-lg border border-line bg-navy p-6 text-white">
          <p className="text-2xl font-semibold">Visibility → Interpretation → Decision → Documentation</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {framework.map((step, index) => (
            <div key={step.title} className="rounded-lg border border-line bg-white p-6 shadow-line">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-pink text-sm font-bold text-white">{index + 1}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              <div className="mt-5">
                <CheckList items={step.items} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Funding model awareness"
        title="Different Plans Require Different Governance"
        intro="KindHealth configures the governance experience around the way the employer's plan is actually funded."
        className="bg-surface"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {fundingModels.map((model) => (
            <div key={model.name} className="rounded-lg border border-line bg-white p-6 shadow-line">
              <h3 className="text-2xl font-semibold">{model.name}</h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">Focus</p>
              <div className="mt-5">
                <CheckList items={model.focus} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Advisor compatible"
        title="Built To Work With Advisors, Not Around Them"
        intro="KindHealth creates a shared workspace where employers and advisors can organize information, track requests, document recommendations, generate reports, and preserve decision history."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-line bg-white p-8 shadow-soft">
            <p className="text-2xl font-semibold leading-9">A strong advisor becomes more valuable when the process becomes more visible.</p>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <CheckList items={["Fewer document requests", "Better transparency", "Better reporting", "Better continuity", "Stronger client relationships"]} />
          </div>
        </div>
      </Section>

      <Section
        kicker="Enterprise ready"
        title="Built For Enterprise Employers"
        intro="KindHealth was designed for organizations managing millions of dollars in annual healthcare spend. Healthcare decisions deserve more than email threads and spreadsheets."
        className="bg-surface"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Role-Based Access Controls", "Audit-Friendly Documentation", "Governance Workflows", "Advisor Collaboration", "Executive Reporting", "Secure Data Architecture"].map((item) => (
            <div key={item} className="rounded-lg border border-line bg-white p-5 text-lg font-semibold shadow-line">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        kicker="Governance"
        title="Why Health Plan Governance Matters More Than Ever"
        intro="Healthcare has become increasingly complex. Recent developments under ERISA and the Consolidated Appropriations Act have increased focus on governance, transparency, and oversight."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="text-xl font-semibold">Employers now manage</h3>
            <div className="mt-5">
              <CheckList items={["Carriers", "PBMs", "TPAs", "Stop-loss carriers", "Point solutions", "Navigation vendors", "Clinical vendors", "Advisors"]} />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-6">
            <h3 className="text-xl font-semibold">Expectations continue to evolve around</h3>
            <div className="mt-5">
              <CheckList items={["Transparency", "Vendor oversight", "Compensation disclosures", "PBM accountability", "Documentation", "Fiduciary process"]} />
            </div>
          </div>
        </div>
        <Button variant="secondary" onClick={() => navigate("resources")} className="mt-8" icon="arrow-right">
          Learn More In The Resource Center
        </Button>
      </Section>

      <Section
        kicker="Category"
        title="The Operating System For Employer Health Plan Governance"
        intro="KindHealth helps employers understand costs, evaluate vendors, document decisions, improve transparency, organize evidence, and strengthen governance."
        className="bg-navy text-white"
      >
        <p className="max-w-3xl text-2xl font-semibold leading-9 text-white">
          The future of healthcare management is not more dashboards. It is better visibility, better decisions, and better governance.
        </p>
      </Section>

      <FinalCta navigate={navigate} />
    </>
  );
}

function PlatformPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="Platform"
        title="A System Of Record For Employer Health Plan Governance"
        body="KindHealth turns plan information, vendor context, evidence, and recommendations into a durable governance record."
        button="Request Demo"
        onButton={() => navigate("demo")}
      />
      <Section title="Signals → Reviews → Evidence → Decisions → Governance Record" intro="The platform moves employers from scattered information to an operating process leadership can trust.">
        <div className="grid gap-4 lg:grid-cols-3">
          {platformModules.map(([name, body, icon]) => (
            <div key={name} className="rounded-lg border border-line bg-white p-6 shadow-line">
              <Icon name={icon} className="h-6 w-6 text-pink" />
              <h3 className="mt-5 text-xl font-semibold">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Module Mockups" intro="Each workspace is designed around executive review, evidence organization, and decision documentation." className="bg-surface">
        <div className="grid gap-5 lg:grid-cols-2">
          <ProductMock title="Governance Center" metrics={[["Readiness", "72 / 100"], ["Open Priorities", "3"], ["Missing Evidence", "7"]]} />
          <ProductMock title="Decision Log" metrics={[["Ready For Review", "4"], ["Needs Evidence", "6"], ["Approved", "12"]]} />
          <ProductMock title="Advisor Requests" metrics={[["Requests Open", "8"], ["Responses Due", "3"], ["Evidence Added", "31"]]} />
          <ProductMock title="Reports" metrics={[["CFO Narratives", "4"], ["Committee Agendas", "6"], ["Review Summaries", "11"]]} />
        </div>
      </Section>
      <FinalCta navigate={navigate} />
    </>
  );
}

function EmployersPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="For employers"
        title="Your Health Plan Deserves A Governance Process"
        body="KindHealth helps CFOs, CHROs, benefits leaders, HR leaders, and CEOs understand costs, evaluate recommendations, track decisions, and preserve institutional knowledge."
        button="Take Governance Assessment"
        onButton={() => navigate("assessment")}
      />
      <Section title="Built Around The Leadership Questions That Matter">
        <div className="grid gap-4 lg:grid-cols-5">
          {personas.map(([persona, body]) => (
            <div key={persona} className="rounded-lg border border-line bg-white p-5 shadow-line">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pink">{persona}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="What Employers Can Operationalize" className="bg-surface">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Understand costs", "Evaluate recommendations", "Track decisions", "Organize information", "Preserve institutional knowledge", "Prepare executive reporting"].map((item) => (
            <div key={item} className="rounded-lg border border-line bg-white p-6 text-lg font-semibold shadow-line">
              {item}
            </div>
          ))}
        </div>
      </Section>
      <FinalCta navigate={navigate} />
    </>
  );
}

function AdvisorsPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="For advisors"
        title="Help Clients Operationalize Health Plan Governance"
        body="KindHealth is not a broker replacement. KindHealth helps advisors organize client information, document recommendations, improve transparency, generate executive reporting, and demonstrate value."
        button="Become An Advisor Partner"
        onButton={() => navigate("demo")}
      />
      <Section title="A Shared Workspace For Better Client Governance">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-line bg-navy p-8 text-white">
            <p className="text-2xl font-semibold leading-9">Advisors stay central to the relationship. KindHealth makes the process easier to see, manage, and document.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Organize client information", "Document recommendations", "Improve transparency", "Generate executive reporting", "Demonstrate value", "Create continuity"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-white p-5 font-semibold shadow-line">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <FinalCta navigate={navigate} />
    </>
  );
}

function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    employees: "750",
    funding: "Level-Funded",
    spend: "8500000",
    vendors: "5",
    documentation: "Partial",
    governance: "Informal committee",
    advisor: "Documented annually",
    name: "",
    email: "",
    company: "",
  });

  const scores = useMemo(() => {
    const employees = Number(form.employees || 0);
    const spend = Number(form.spend || 0);
    const vendors = Number(form.vendors || 0);
    const fundingWeight = { "Fully Insured": 14, "Level-Funded": 24, "Self-Funded": 34, Mixed: 30 }[form.funding] || 16;
    const complexity = Math.min(96, 24 + fundingWeight + Math.min(18, employees / 80) + Math.min(18, vendors * 3) + Math.min(16, spend / 1000000));
    const docPenalty = form.documentation === "Mature" ? 8 : form.documentation === "Partial" ? 20 : 34;
    const governancePenalty = form.governance === "Formal committee" ? 8 : form.governance === "Informal committee" ? 18 : 30;
    const risk = Math.min(94, 28 + fundingWeight * 0.8 + docPenalty + governancePenalty + vendors * 2);
    const readiness = Math.max(22, 100 - (risk * 0.52 + complexity * 0.18));
    return {
      complexity: Math.round(complexity),
      risk: Math.round(risk),
      readiness: Math.round(readiness),
      tier: complexity >= 78 ? "Advanced" : complexity >= 60 ? "Intermediate" : "Foundational",
    };
  }, [form]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <>
      <PageHero
        kicker="Governance assessment"
        title="Take The 5-Minute Employer Health Plan Governance Assessment"
        body="Estimate governance complexity, risk, readiness, recommended tier, and top opportunities before a deeper implementation review."
      />
      <Section title="Employer Health Plan Governance Assessment" intro="Complete the mock assessment to see how KindHealth would classify the governance opportunity.">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-line bg-surface p-5">
            {["Plan profile", "Complexity", "Governance maturity", "Lead capture", "Results"].map((label, index) => (
              <div key={label} className="flex items-center gap-3 border-b border-line py-4 last:border-b-0">
                <span className={classNames("flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold", index <= step ? "bg-pink text-white" : "bg-white text-muted")}>
                  {index + 1}
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
            {step === 0 && (
              <AssessmentStep title="Plan profile">
                <Field label="Employee count" value={form.employees} onChange={(value) => update("employees", value)} />
                <SelectField label="Funding model" value={form.funding} onChange={(value) => update("funding", value)} options={["Fully Insured", "Level-Funded", "Self-Funded", "Mixed"]} />
                <Button onClick={() => setStep(1)} className="mt-4">Continue</Button>
              </AssessmentStep>
            )}
            {step === 1 && (
              <AssessmentStep title="Complexity">
                <Field label="Annual spend" value={form.spend} onChange={(value) => update("spend", value)} />
                <Field label="Vendor count" value={form.vendors} onChange={(value) => update("vendors", value)} />
                <StepButtons step={step} setStep={setStep} />
              </AssessmentStep>
            )}
            {step === 2 && (
              <AssessmentStep title="Governance maturity">
                <SelectField label="Documentation maturity" value={form.documentation} onChange={(value) => update("documentation", value)} options={["Mature", "Partial", "Limited"]} />
                <SelectField label="Governance structure" value={form.governance} onChange={(value) => update("governance", value)} options={["Formal committee", "Informal committee", "No defined structure"]} />
                <SelectField label="Advisor practices" value={form.advisor} onChange={(value) => update("advisor", value)} options={["Documented annually", "Partially documented", "Not documented"]} />
                <StepButtons step={step} setStep={setStep} />
              </AssessmentStep>
            )}
            {step === 3 && (
              <AssessmentStep title="Where should we send the assessment?">
                <Field label="Name" value={form.name} onChange={(value) => update("name", value)} />
                <Field label="Company" value={form.company} onChange={(value) => update("company", value)} />
                <Field label="Email" value={form.email} onChange={(value) => update("email", value)} />
                <div className="mt-4 flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={() => { setSubmitted(true); setStep(4); }}>Show Results</Button>
                </div>
              </AssessmentStep>
            )}
            {step === 4 && submitted && (
              <AssessmentStep title="Assessment results">
                <div className="grid gap-4 sm:grid-cols-3">
                  <MetricCard label="Governance Complexity Score" value={`${scores.complexity} / 100`} />
                  <MetricCard label="Governance Risk Score" value={`${scores.risk} / 100`} />
                  <MetricCard label="Governance Readiness Score" value={`${scores.readiness} / 100`} />
                </div>
                <div className="mt-5 rounded-lg border border-line bg-surface p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Recommended Tier</p>
                  <p className="mt-2 text-3xl font-semibold">{scores.tier}</p>
                </div>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-semibold">Top 5 Opportunities</h4>
                    <div className="mt-4">
                      <CheckList items={["Renewal governance", "Vendor inventory", "Decision documentation", "Advisor recommendation evidence", "Executive reporting cadence"]} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Next Reviews</h4>
                    <div className="mt-4">
                      <CheckList items={["Document inventory", "Vendor oversight review", "Funding model review", "Benefits committee agenda"]} />
                    </div>
                  </div>
                </div>
              </AssessmentStep>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function PricingPage({ navigate }) {
  const tiers = [
    ["Foundational", "$1,000/month", ["Renewal governance", "Documentation", "Advisor review"]],
    ["Intermediate", "$2,000-$3,000/month", ["Vendor review", "Claims review", "Renewal governance", "Decision documentation"]],
    ["Advanced", "$4,000-$6,000/month", ["PBM oversight", "TPA oversight", "Stop-loss oversight", "Vendor intelligence"]],
    ["Enterprise", "$8,000-$15,000/month", ["Advanced workflows", "Executive reporting", "Custom governance model", "Enterprise implementation"]],
  ];

  return (
    <>
      <PageHero
        kicker="Pricing"
        title="Pricing Based On Governance Complexity, Not PMPM"
        body="KindHealth is governance infrastructure. Not a benefits widget. Not a reporting tool. Not a PMPM product."
        button="Request Pricing Review"
        onButton={() => navigate("demo")}
      />
      <Section title="Governance Infrastructure Plans">
        <div className="grid gap-4 lg:grid-cols-4">
          {tiers.map(([name, price, items]) => (
            <div key={name} className="rounded-lg border border-line bg-white p-6 shadow-line">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="mt-4 text-2xl font-semibold text-pink">{price}</p>
              <div className="mt-6">
                <CheckList items={items} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-line bg-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Governance Assessment</p>
          <p className="mt-2 text-3xl font-semibold">$5,000-$15,000 one-time</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {["Governance Complexity Score", "Governance Risk Score", "Governance Readiness Score", "Vendor Inventory", "Document Inventory", "Governance Report"].map((item) => (
              <span key={item} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold">{item}</span>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <PageHero
        kicker="Resources"
        title="Health Plan Governance Resources"
        body="Guides, checklists, and frameworks for employers building a more durable health plan governance process."
      />
      <Section title="Resource Center">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource} className="rounded-lg border border-line bg-white p-6 shadow-line">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink">Guide</p>
              <h3 className="mt-4 text-xl font-semibold leading-7">{resource}</h3>
              <p className="mt-4 text-sm leading-6 text-muted">A practical resource for employer health plan oversight, documentation, and decision support.</p>
              <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                Read resource <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function DemoPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        kicker="Request demo"
        title="See What Health Plan Governance Infrastructure Looks Like"
        body="Share a few details and a member of the KindHealth team will contact you shortly."
      />
      <Section title={sent ? "Thank you." : "Request A Demo"}>
        <div className="max-w-3xl rounded-lg border border-line bg-white p-6 shadow-soft">
          {sent ? (
            <div>
              <Icon name="circle-check" className="h-10 w-10 text-cyan" />
              <p className="mt-5 text-2xl font-semibold">A member of the KindHealth team will contact you shortly.</p>
            </div>
          ) : (
            <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <Field label="Name" />
              <Field label="Company" />
              <Field label="Email" type="email" />
              <SelectField label="Role" options={["CFO", "CHRO", "Benefits Leader", "HR Leader", "CEO", "Advisor", "Other"]} />
              <SelectField label="Employer Size" options={["Under 250", "250-999", "1,000-4,999", "5,000+"]} />
              <SelectField label="Funding Model" options={["Fully Insured", "Level-Funded", "Self-Funded", "Mixed", "Not Sure"]} />
              <SelectField label="I am a" options={["Employer", "Advisor", "Vendor", "Partner"]} />
              <label className="md:col-span-2">
                <span className="text-sm font-semibold text-ink">Message</span>
                <textarea className="mt-2 min-h-28 w-full rounded-lg border border-line bg-white px-3 py-3 text-sm" />
              </label>
              <div className="md:col-span-2">
                <button className="inline-flex h-11 items-center justify-center rounded-lg border border-pink bg-pink px-5 text-sm font-semibold text-white" type="submit">
                  Request Demo
                </button>
              </div>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

function PageHero({ kicker, title, body, button, onButton }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker mb-4 text-xs font-semibold uppercase text-pink">{kicker}</p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-navy sm:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{body}</p>
            {button && <Button onClick={onButton} className="mt-8">{button}</Button>}
          </div>
          <div className="mock-grid">
            <ProductMock title="Governance Snapshot" metrics={[["Readiness", "72 / 100"], ["Open Priorities", "3"], ["Missing Evidence", "7"], ["Decisions Pending", "4"]]} compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductMock({ title, metrics, compact = false }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-line">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="rounded-lg bg-cyan/10 px-3 py-1 text-xs font-semibold text-[#16867C]">Live workspace</span>
      </div>
      <div className={classNames("mt-5 grid gap-3", compact ? "grid-cols-2" : "sm:grid-cols-3")}>
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className="mt-3 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {["Evidence request drafted", "Advisor recommendation pending", "Committee-ready report available"].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-sm">
            <span>{item}</span>
            <Icon name="arrow-right" className="h-4 w-4 text-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AssessmentStep({ title, children }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-5 grid gap-4">{children}</div>
    </div>
  );
}

function StepButtons({ step, setStep }) {
  return (
    <div className="mt-4 flex gap-3">
      <Button variant="secondary" onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
      <Button onClick={() => setStep(step + 1)}>Continue</Button>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label>
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm"
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label>
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        className="mt-2 h-11 w-full rounded-lg border border-line bg-white px-3 text-sm"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function FinalCta({ navigate }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-navy p-8 text-white shadow-soft sm:p-12">
          <p className="section-kicker text-xs font-semibold uppercase text-cyan">KindHealth AI</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">See What Health Plan Governance Infrastructure Looks Like</h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => navigate("demo")}>Request Demo</Button>
            <Button variant="secondary" onClick={() => navigate("assessment")}>Take Governance Assessment</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink text-white">
              <Icon name="sparkles" className="h-5 w-5" />
            </span>
            <span className="font-semibold">KindHealth AI</span>
          </div>
          <p className="mt-5 text-2xl font-semibold">Understand Where Your Health Plan Dollars Go</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Identify savings opportunities, evaluate vendors, and document decisions.</p>
          <p className="mt-5 text-sm font-semibold">The Operating System for Employer Health Plan Governance</p>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[["platform", "Platform"], ["employers", "Employers"], ["advisors", "Advisors"], ["assessment", "Assessment"], ["pricing", "Pricing"], ["resources", "Resources"], ["demo", "Request Demo"]].map(([id, label]) => (
              <button key={id} type="button" onClick={() => navigate(id)} className="text-left text-sm font-semibold text-muted hover:text-navy">
                {label}
              </button>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-muted">
            KindHealth provides health plan intelligence, decision support, and governance documentation support. KindHealth does not provide legal, actuarial, tax, medical, or fiduciary advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [page, navigate] = usePage();
  const activePage = page === "home" ? <HomePage navigate={navigate} /> :
    page === "platform" ? <PlatformPage navigate={navigate} /> :
    page === "employers" ? <EmployersPage navigate={navigate} /> :
    page === "advisors" ? <AdvisorsPage navigate={navigate} /> :
    page === "assessment" ? <AssessmentPage /> :
    page === "pricing" ? <PricingPage navigate={navigate} /> :
    page === "resources" ? <ResourcesPage /> :
    page === "demo" ? <DemoPage /> :
    <HomePage navigate={navigate} />;

  return (
    <div>
      <Header page={page} navigate={navigate} />
      {activePage}
      <Footer navigate={navigate} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

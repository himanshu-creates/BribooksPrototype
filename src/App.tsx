import { useEffect, useRef, useState } from "react";
import RegistrationApp from "./RegistrationApp";

const navigation = [
  { label: "Benefits", href: "#benefits" },
  { label: "How it works", href: "#journey" },
  { label: "Recognition", href: "#recognition" },
  { label: "Key dates", href: "#timeline" },
];

const mobileNavigation = [
  { id: "overview", label: "Overview" },
  { id: "key-dates", label: "Important Dates" },
  { id: "benefits", label: "Why Participate" },
  { id: "journey", label: "How It Works" },
  { id: "recognition", label: "Recognition" },
  { id: "proof", label: "Achievements" },
  { id: "jury", label: "Jury Members" },
  { id: "timeline", label: "Key Dates" },
  { id: "faq", label: "Frequently Asked Questions" },
  { id: "partners", label: "Partners" },
  { id: "registration-cta", label: "School Registration" },
];

const benefits = [
  {
    title: "Build stronger readers and writers",
    description: "Improve student reading, writing and creativity.",
    artwork: "/assets/benefits/creativity.png",
    category: "Student outcomes",
  },
  {
    title: "Compete for national honours",
    description: "Compete for prestigious national literary honours.",
    artwork: "/assets/benefits/honours.png",
    category: "Recognition",
  },
  {
    title: "Earn national media visibility",
    description: "Visibility through NDTV, Discovery Channel and BusinessWorld.",
    artwork: "/assets/benefits/media.png",
    category: "School reputation",
  },
  {
    title: "Reach international literary stages",
    description: "Opportunities at Sharjah and Singapore Literary Festivals.",
    artwork: "/assets/benefits/global.png",
    category: "Global opportunity",
  },
] as const;

const dates = [
  {
    eyebrow: "School registration",
    value: "18 Aug – 27 Nov 2026",
    accent: "orange",
    icon: "flag",
  },
  {
    eyebrow: "Student registration",
    value: "18 Aug – 06 Dec 2026",
    accent: "blue",
    icon: "calendar",
  },
  {
    eyebrow: "Book publishing",
    value: "18 Aug – 14 Jan 2027",
    accent: "violet",
    icon: "book",
  },
] as const;

const journeySteps = [
  {
    title: "School Registration",
    description: "Register your school to begin its NYAF journey.",
    artwork: "/assets/journey/school-registration.png",
  },
  {
    title: "Student Registration",
    description: "Register participating students for the NYAF program.",
    artwork: "/assets/journey/student-registration.png",
  },
  {
    title: "Writing Festival",
    description: "Students take part in the Writing Festival.",
    artwork: "/assets/journey/writing-festival.png",
  },
  {
    title: "Publishing",
    description: "Students move from writing to publishing their books.",
    artwork: "/assets/journey/publishing.png",
  },
  {
    title: "National Awards",
    description: "Published books move into the National Awards stage.",
    artwork: "/assets/journey/national-awards.png",
  },
  {
    title: "International Opportunities",
    description: "The journey extends to international literary opportunities.",
    artwork: "/assets/journey/international-opportunities.png",
  },
] as const;

const recognitionGroups = [
  {
    label: "School recognition",
    items: [
      {
        title: "Top 100 Schools",
        artwork: "/assets/recognition/top-schools.png",
      },
      {
        title: "Literary Leadership Awards",
        artwork: "/assets/recognition/literary-leadership.png",
      },
      {
        title: "Innovation Awards",
        artwork: "/assets/recognition/innovation.png",
      },
      {
        title: "Best Reading Culture",
        artwork: "/assets/recognition/reading-culture.png",
      },
    ],
  },
  {
    label: "People & participation",
    items: [
      {
        title: "Top Principals",
        artwork: "/assets/recognition/top-principals.png",
      },
      {
        title: "Top Teachers",
        artwork: "/assets/recognition/top-teachers.png",
      },
      {
        title: "Most Published Students",
        artwork: "/assets/recognition/most-published.png",
      },
    ],
  },
] as const;

const achievementPhotos = [
  {
    src: "/assets/proof/achievements/award-presentation-1.jpg",
    alt: "School leaders receiving certificates and awards on stage",
  },
  {
    src: "/assets/proof/achievements/award-presentation-2.jpg",
    alt: "School representatives displaying certificates and awards",
  },
  {
    src: "/assets/proof/achievements/award-presentation-3.jpg",
    alt: "Award recipient holding a certificate and honours on stage",
  },
  {
    src: "/assets/proof/achievements/award-presentation-4.jpg",
    alt: "School representatives displaying a certificate and trophy",
  },
] as const;

const mediaCoverage = [
  {
    name: "Outlook Business",
    logo: "/assets/proof/media/outlook-business.png",
  },
  {
    name: "Business News This Week",
    logo: "/assets/proof/media/business-news-this-week.png",
  },
  {
    name: "Republic News Today",
    logo: "/assets/proof/media/republic-news-today.png",
  },
  {
    name: "India News",
    logo: "/assets/proof/media/india-news.png",
  },
  {
    name: "Bhaskar Live",
    logo: "/assets/proof/media/bhaskar-live.png",
  },
  {
    name: "Ahmedabad Mirror",
    logo: "/assets/proof/media/ahmedabad-mirror.png",
  },
] as const;

const mediaPartners = [
  {
    category: "Business media partner",
    name: "BW Businessworld",
    logo: "/assets/partners/businessworld.png",
  },
  {
    category: "Broadcasting partner",
    name: "NDTV",
    logo: "/assets/partners/ndtv.png",
  },
  {
    category: "Knowledge media partner",
    name: "Discovery Channel",
    logo: "/assets/partners/discovery.png",
  },
] as const;

const festivalPartners = [
  {
    name: "New Delhi World Book Fair",
    logo: "/assets/partners/new-delhi-world-book-fair.png",
  },
  {
    name: "Asian Festival of Children’s Content",
    logo: "/assets/partners/asian-festival-childrens-content.png",
  },
  {
    name: "Brooklyn Book Festival",
    logo: "/assets/partners/brooklyn-book-festival.png",
  },
  {
    name: "Bath Children’s Literature Festival",
    logo: "/assets/partners/bath-childrens-literature-festival.png",
  },
  {
    name: "Sharjah Literature Festival",
    logo: "/assets/partners/sharjah-literature-festival.png",
  },
  {
    name: "Kuala Lumpur International Book Fair",
    logo: "/assets/partners/kuala-lumpur-international-book-fair.png",
  },
] as const;

const juryMembers = [
  {
    name: "Mark Janssen",
    role: "Author & Illustrator",
    portrait: "/assets/jury/mark-janssen.png",
  },
  {
    name: "Anna Höglund",
    role: "Author, Illustrator & Artist",
    portrait: "/assets/jury/anna-hoglund.png",
  },
  {
    name: "Sayoni Basu",
    role: "Co-founder, Duckbill Books",
    portrait: "/assets/jury/sayoni-basu.png",
  },
  {
    name: "Namita Gokhale",
    role: "Writer & Co-director, Jaipur Literature Festival",
    portrait: "/assets/jury/namita-gokhale.png",
  },
  {
    name: "Twinkle Khanna",
    role: "Author & Columnist",
    portrait: "/assets/jury/twinkle-khanna.png",
  },
  {
    name: "Piyush Mishra",
    role: "Actor, Writer & Lyricist",
    portrait: "/assets/jury/piyush-mishra.png",
  },
  {
    name: "Manoj Muntashir Shukla",
    role: "Lyricist & Screenwriter",
    portrait: "/assets/jury/manoj-muntashir-shukla.png",
  },
  {
    name: "Kumud Mishra",
    role: "Actor & Alumnus, National School of Drama",
    portrait: "/assets/jury/kumud-mishra.png",
  },
  {
    name: "Balaji Vittal",
    role: "Author & Film Commentator",
    portrait: "/assets/jury/balaji-vittal.png",
  },
  {
    name: "Amit Lodha",
    role: "IPS Officer & Author",
    portrait: "/assets/jury/amit-lodha.png",
  },
  {
    name: "Ruchita Ahuja",
    role: "Author & Publishing Professional",
    portrait: "/assets/jury/ruchita-ahuja.png",
  },
  {
    name: "Shubhshree Mathur",
    role: "Illustrator, Writer & Artist",
    portrait: "/assets/jury/shubhshree-mathur.png",
  },
] as const;

const completeKeyDates = [
  {
    title: "School Registration",
    detail: "General Access",
    start: "18 Aug 2026",
    end: "27 Nov 2026",
    accent: "orange",
  },
  {
    title: "Student Registration",
    detail: "General Access",
    start: "18 Aug 2026",
    end: "06 Dec 2026",
    accent: "blue",
  },
  {
    title: "Book Publishing",
    detail: "Publishing window",
    start: "18 Aug 2026",
    end: "14 Jan 2027",
    accent: "violet",
  },
  {
    title: "Jury Choice & Best-Seller League",
    detail: "Selection stage",
    start: "15 Jan 2027",
    end: "21 Feb 2027",
    accent: "pink",
  },
  {
    title: "National Awards & Exhibition",
    detail: "National stage",
    date: "27 Mar 2027",
    accent: "green",
  },
] as const;

const faqs = [
  {
    question: "How does our school begin its NYAF registration?",
    answer: (
      <>
        Select <strong>Register Your School</strong> and complete the school registration form. The
        form includes searchable dropdowns to help you find and select the relevant school details.
      </>
    ),
  },
  {
    question: "What happens after the school registration is submitted?",
    answer: (
      <>
        A confirmation email provides the student registration link and the instructions your school
        needs for the next step.
      </>
    ),
  },
  {
    question: "How do students register through their school?",
    answer: (
      <>
        Use the student registration link and follow the instructions included in the school’s
        confirmation email.
      </>
    ),
  },
  {
    question: "What are the six stages of participation?",
    answer: (
      <>
        The journey moves through <strong>School Registration</strong>,{" "}
        <strong>Student Registration</strong>, <strong>Writing Festival</strong>,{" "}
        <strong>Publishing</strong>, <strong>National Awards</strong> and{" "}
        <strong>International Opportunities</strong>.
      </>
    ),
  },
  {
    question: "What are the important dates and deadlines?",
    answer: (
      <>
        School registration runs from <strong>18 Aug to 27 Nov 2026</strong>, student registration
        from <strong>18 Aug to 06 Dec 2026</strong>, and book publishing from{" "}
        <strong>18 Aug 2026 to 14 Jan 2027</strong>. Jury Choice &amp; Best-Seller League runs from{" "}
        <strong>15 Jan to 21 Feb 2027</strong>, followed by the National Awards &amp; Exhibition on{" "}
        <strong>27 Mar 2027</strong>.
      </>
    ),
  },
  {
    question: "What recognition opportunities are part of NYAF?",
    answer: (
      <>
        Published books move into the National Awards stage. Recognition opportunities shown for the
        school community include the National Literary Excellence Awards, Top 100 Schools, Literary
        Leadership, Innovation, Best Reading Culture, Top Principals, Top Teachers and Most
        Published Students.
      </>
    ),
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <>
          <path d="M5 5l14 14" />
          <path d="M19 5L5 19" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function DateIcon({ type }: { type: "flag" | "calendar" | "book" }) {
  if (type === "flag") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 21V4m0 1h11l-2.2 3L17 11H6" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11a3 3 0 0 1 3 3v16a3 3 0 0 0-3-3H6.5A3.5 3.5 0 0 0 3 21.5z" />
      <path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H14v19a3 3 0 0 1 3-3h.5a3.5 3.5 0 0 1 3.5 3.5z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2c.8 8.5 5.5 13.2 14 14-8.5.8-13.2 5.5-14 14-.8-8.5-5.5-13.2-14-14 8.5-.8 13.2-5.5 14-14Z" />
    </svg>
  );
}

function RegistrationButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <button className={`registration-button ${className}`} onClick={onClick}>
      <span>Register Your School</span>
      <span className="button-arrow">
        <ArrowIcon />
      </span>
    </button>
  );
}

function Header({ onRegister }: { onRegister: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 900) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#overview" className="brand" aria-label="BriBooks and EducationWorld">
          <img src="/assets/brand-lockup.png" alt="BriBooks and EducationWorld present" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <RegistrationButton className="header-cta" onClick={onRegister} />

        <button
          className="menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
              <ArrowIcon />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Stat({
  icon,
  number,
  label,
}: {
  icon: "globe" | "school" | "book";
  number: string;
  label: string;
}) {
  return (
    <div className="stat">
      <span className={`stat-icon stat-icon--${icon}`} aria-hidden="true">
        {icon === "globe" && (
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c3 2.5 4.5 5.5 4.5 9S15 18.5 12 21M12 3c-3 2.5-4.5 5.5-4.5 9S9 18.5 12 21" />
          </svg>
        )}
        {icon === "school" && (
          <svg viewBox="0 0 24 24">
            <path d="M4 20V9l8-5 8 5v11M2 20h20M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01" />
          </svg>
        )}
        {icon === "book" && (
          <svg viewBox="0 0 24 24">
            <path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11a3 3 0 0 1 3 3v16a3 3 0 0 0-3-3H6.5A3.5 3.5 0 0 0 3 21.5z" />
            <path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H14v19a3 3 0 0 1 3-3h.5a3.5 3.5 0 0 1 3.5 3.5z" />
          </svg>
        )}
      </span>
      <span>
        <strong>{number}</strong>
        <small>{label}</small>
      </span>
    </div>
  );
}

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <main>
      <section className="hero" id="overview" aria-labelledby="hero-title">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-inner">
          <div className="hero-copy">
            <img
              className="event-wordmark"
              src="/assets/nyaf-wordmark.png"
              alt="National Young Authors’ Fair 2026"
            />
            <p className="hero-kicker">For schools across India</p>
            <h1 id="hero-title">
              Turn every student into a <span>published author.</span>
            </h1>
            <p className="hero-description">
              A guided writing and publishing movement that gives every student a book—and every
              school a national literary stage.
            </p>
            <div className="hero-actions">
              <RegistrationButton onClick={onRegister} />
              <a className="secondary-button" href="#key-dates">
                Explore the event
                <ArrowIcon />
              </a>
            </div>
            <div className="stats-row" aria-label="Program reach">
              <Stat icon="globe" number="32+" label="Countries" />
              <Stat icon="school" number="32,000+" label="Schools" />
              <Stat icon="book" number="1.7M+" label="Users" />
            </div>
          </div>

          <div className="hero-visual" aria-label="A colorful school, books, and creative tools">
            <div className="visual-badge">
              <span>India’s only nationally important</span>
              <strong>book writing competition</strong>
            </div>
            <span className="spark spark--one">
              <SparkIcon />
            </span>
            <span className="spark spark--two">
              <SparkIcon />
            </span>
            <img src="/assets/school-illustration.png" alt="" />
          </div>
        </div>
      </section>

      <ImportantDates />
      <SchoolBenefits />
      <NYAFJourney />
      <SchoolRecognition />
      <SchoolProof />
      <JurySection />
      <CompleteTimeline />
      <FAQSection />
      <PartnersSection />
      <RegistrationCTA onRegister={onRegister} />
      <SiteFooter />
    </main>
  );
}

function ImportantDates() {
  return (
    <section className="important-dates-wrap" id="key-dates" aria-labelledby="dates-title">
      <div className="important-dates">
        <div className="dates-heading">
          <span className="calendar-mark">
            <DateIcon type="calendar" />
          </span>
          <span>
            <small>Mark your calendar</small>
            <strong id="dates-title">Important dates</strong>
          </span>
        </div>

        <div className="date-list">
          {dates.map((date) => (
            <article className={`date-card date-card--${date.accent}`} key={date.eyebrow}>
              <span className="date-icon">
                <DateIcon type={date.icon} />
              </span>
              <span>
                <small>{date.eyebrow}</small>
                <strong>{date.value}</strong>
              </span>
            </article>
          ))}
        </div>

        <a href="#timeline" className="dates-link">
          View full timeline
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function SchoolBenefits() {
  const [leadBenefit, ...supportingBenefits] = benefits;

  return (
    <section className="benefits-section" id="benefits" aria-labelledby="benefits-title">
      <div className="benefits-inner">
        <div className="benefits-heading">
          <div>
            <span className="section-eyebrow">Why schools should participate</span>
            <h2 id="benefits-title">
              More than a competition. <span>A literary culture.</span>
            </h2>
          </div>
          <p>
            The National Young Authors’ Fair brings meaningful writing outcomes, recognition and
            wider opportunities into every participating school.
          </p>
        </div>

        <div className="benefits-editorial">
          <article className="lead-benefit">
            <div className="lead-benefit-copy">
              <span className="benefit-index">01 / {leadBenefit.category}</span>
              <h3>{leadBenefit.title}</h3>
              <p>{leadBenefit.description}</p>
              <div className="lead-benefit-outcome">
                <span>For the classroom</span>
                <strong>Creative writing &amp; reading</strong>
              </div>
            </div>
            <div className="lead-benefit-art">
              <span className="art-ring" aria-hidden="true" />
              <img src={leadBenefit.artwork} alt="" />
            </div>
          </article>

          <div className="benefits-list">
            {supportingBenefits.map((benefit, index) => (
              <article className="benefit-row" key={benefit.title}>
                <span className="benefit-row-number">0{index + 2}</span>
                <div className="benefit-row-copy">
                  <small>{benefit.category}</small>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
                <img src={benefit.artwork} alt="" />
              </article>
            ))}
          </div>
        </div>

        <div className="principal-outcomes" aria-label="Outcomes valued by school principals">
          <div className="outcomes-heading">
            <small>Why principals value NYAF</small>
            <strong>Value that reaches beyond the student</strong>
          </div>
          <div className="outcome-list">
            <div>
              <span>01</span>
              <small>Student outcomes</small>
              <strong>Creative Writing &amp; Reading</strong>
            </div>
            <div>
              <span>02</span>
              <small>School reputation</small>
              <strong>India’s Best Literary Leader Schools</strong>
            </div>
            <div>
              <span>03</span>
              <small>Teacher engagement</small>
              <strong>Best Classroom Literary Activity</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NYAFJourney() {
  return (
    <section className="journey-section" id="journey" aria-labelledby="journey-title">
      <div className="journey-inner">
        <div className="journey-heading">
          <div>
            <span className="section-eyebrow">How NYAF works</span>
            <h2 id="journey-title">
              One journey. <span>Six clear stages.</span>
            </h2>
          </div>
          <p>
            From school registration to international literary opportunities, each stage moves
            students from an idea toward a published book.
          </p>
        </div>

        <div className="journey-map" aria-label="The six stages of the NYAF journey">
          {journeySteps.map((step, index) => (
            <article className="journey-step" key={step.title}>
              <div className="journey-step-copy">
                <span>Step {String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="journey-marker">
                <img src={step.artwork} alt="" />
              </div>
            </article>
          ))}
        </div>

        <div className="journey-caption" aria-hidden="true">
          <span>Begin at your school</span>
          <span>Reach the world stage</span>
        </div>
      </div>
    </section>
  );
}

function SchoolRecognition() {
  return (
    <section className="recognition-section" id="recognition" aria-labelledby="recognition-title">
      <div className="recognition-inner">
        <div className="recognition-heading">
          <div>
            <span className="section-eyebrow">Recognition for schools</span>
            <h2 id="recognition-title">
              Recognition that reaches the <span>whole school community.</span>
            </h2>
          </div>
          <p>
            Eight ways your school, principal and teachers can be honoured on the national stage.
          </p>
        </div>

        <div className="recognition-layout">
          <article className="recognition-feature">
            <div className="recognition-feature-copy">
              <span>National recognition</span>
              <h3>National Literary Excellence Awards</h3>
              <p>One of eight ways the school community can be honoured on the national stage.</p>
            </div>
            <div className="recognition-feature-art">
              <span aria-hidden="true" />
              <img src="/assets/recognition/literary-excellence.png" alt="" />
            </div>
            <div className="recognition-feature-note">
              <small>Recognition scope</small>
              <strong>Schools, principals and teachers</strong>
            </div>
          </article>

          <div className="recognition-directory">
            {recognitionGroups.map((group) => (
              <section className="recognition-group" key={group.label} aria-label={group.label}>
                <h3>{group.label}</h3>
                <div className="recognition-list">
                  {group.items.map((item, index) => (
                    <article className="recognition-item" key={item.title}>
                      <span className="recognition-item-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <strong>{item.title}</strong>
                      <img src={item.artwork} alt="" />
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SchoolProof() {
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showAllCoverage, setShowAllCoverage] = useState(false);
  const supportingPhotos = showAllAchievements
    ? achievementPhotos.slice(1)
    : achievementPhotos.slice(1, 3);
  const visibleCoverage = showAllCoverage ? mediaCoverage : mediaCoverage.slice(0, 3);

  return (
    <section className="proof-section" id="proof" aria-labelledby="proof-title">
      <div className="proof-inner">
        <div className="proof-heading">
          <div>
            <span className="section-eyebrow">School achievements</span>
            <h2 id="proof-title">
              Real moments of <span>school achievement.</span>
            </h2>
          </div>
          <p>
            Celebrating school leaders, excellence and memorable milestones from across the country.
          </p>
        </div>

        <div className="achievement-showcase">
          <figure className="achievement-feature">
            <img src={achievementPhotos[0].src} alt={achievementPhotos[0].alt} />
            <figcaption>
              <small>National-stage recognition</small>
              <strong>Leaders of India — School Awards</strong>
            </figcaption>
          </figure>

          <div className="achievement-support">
            <div className="achievement-support-heading">
              <span>Achievement gallery</span>
              <strong>Certificates, honours and school milestones</strong>
            </div>
            <div className="achievement-photo-list">
              {supportingPhotos.map((photo, index) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} />
                  <figcaption>Recognition moment {String(index + 2).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
            <button
              className="proof-text-button"
              onClick={() => setShowAllAchievements((visible) => !visible)}
              aria-expanded={showAllAchievements}
            >
              {showAllAchievements ? "Show fewer achievements" : "View more achievements"}
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="media-showcase">
          <div className="media-intro">
            <span className="section-eyebrow">National media &amp; news</span>
            <h3>Coverage that carries the story beyond the event.</h3>
            <p>
              Publication references featured in the National Young Authors’ Fair media archive.
            </p>
            <button
              className="media-toggle"
              onClick={() => setShowAllCoverage((visible) => !visible)}
              aria-expanded={showAllCoverage}
            >
              {showAllCoverage ? "Show selected coverage" : "Explore all coverage"}
              <ArrowIcon />
            </button>
          </div>

          <div className="media-publications" aria-live="polite">
            {visibleCoverage.map((publication, index) => (
              <article className="media-publication" key={publication.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="media-logo-wrap">
                  <img src={publication.logo} alt={`${publication.name} logo`} />
                </div>
                <strong>{publication.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JuryMember({ member }: { member: (typeof juryMembers)[number] }) {
  return (
    <article className="jury-member">
      <img src={member.portrait} alt={`Portrait of ${member.name}`} />
      <div>
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </article>
  );
}

function JurySection() {
  const [juryOpen, setJuryOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!juryOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setJuryOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      triggerRef.current?.focus();
    };
  }, [juryOpen]);

  return (
    <>
      <section className="jury-section" id="jury" aria-labelledby="jury-title">
        <div className="jury-inner">
          <div className="jury-heading">
            <div>
              <span className="section-eyebrow">Jury members · NYAF 2026–27</span>
              <h2 id="jury-title">
                Meet the people behind the <span>national awards.</span>
              </h2>
            </div>
            <p>
              Authors, editors, lyricists and public figures—the people who decide the National
              Literary Excellence Awards.
            </p>
          </div>

          <div className="jury-preview">
            {juryMembers.slice(0, 6).map((member) => (
              <JuryMember member={member} key={member.name} />
            ))}
          </div>

          <div className="jury-footer">
            <span>Showing 6 of 12 jury members</span>
            <button ref={triggerRef} onClick={() => setJuryOpen(true)}>
              View all jury members
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {juryOpen && (
        <div className="jury-dialog-backdrop" onMouseDown={() => setJuryOpen(false)}>
          <section
            className="jury-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="jury-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="jury-dialog-header">
              <div>
                <span>National Young Authors’ Fair 2026–27</span>
                <h2 id="jury-dialog-title">Complete jury</h2>
              </div>
              <button ref={closeRef} onClick={() => setJuryOpen(false)} aria-label="Close jury">
                <CloseIcon />
              </button>
            </header>
            <div className="jury-dialog-list">
              {juryMembers.map((member) => (
                <JuryMember member={member} key={member.name} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function TimelineRow({
  milestone,
  index,
}: {
  milestone: (typeof completeKeyDates)[number];
  index: number;
}) {
  const isSingleDate = "date" in milestone;

  return (
    <article className={`timeline-row timeline-row--${milestone.accent}`}>
      <span className="timeline-row-number">{String(index + 1).padStart(2, "0")}</span>
      <div className="timeline-milestone">
        <small>{milestone.detail}</small>
        <h3>{milestone.title}</h3>
      </div>

      {isSingleDate ? (
        <div className="timeline-single-date">
          <small>Event date</small>
          <strong>{milestone.date}</strong>
        </div>
      ) : (
        <>
          <div className="timeline-date timeline-date--start">
            <small>Starts</small>
            <strong>{milestone.start}</strong>
          </div>
          <div className="timeline-track" aria-hidden="true">
            <span />
          </div>
          <div className="timeline-date timeline-date--end">
            <small>Ends</small>
            <strong>{milestone.end}</strong>
          </div>
        </>
      )}
    </article>
  );
}

function CompleteTimeline() {
  return (
    <section className="timeline-section" id="timeline" aria-labelledby="timeline-title">
      <div className="timeline-inner">
        <div className="timeline-heading">
          <div>
            <span className="section-eyebrow">Complete event schedule</span>
            <h2 id="timeline-title">
              Key dates <span>&amp; milestones.</span>
            </h2>
          </div>
          <p>Your roadmap from registration to the national stage.</p>
        </div>

        <div className="timeline-ledger">
          <section className="timeline-group" aria-labelledby="participation-dates">
            <header>
              <span>01</span>
              <h3 id="participation-dates">Participation &amp; publishing</h3>
            </header>
            {completeKeyDates.slice(0, 3).map((milestone, index) => (
              <TimelineRow milestone={milestone} index={index} key={milestone.title} />
            ))}
          </section>

          <section className="timeline-group" aria-labelledby="recognition-dates">
            <header>
              <span>02</span>
              <h3 id="recognition-dates">Selection &amp; recognition</h3>
            </header>
            {completeKeyDates.slice(3).map((milestone, index) => (
              <TimelineRow milestone={milestone} index={index + 3} key={milestone.title} />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-inner">
        <div className="faq-intro">
          <div>
            <span className="section-eyebrow">Before your school registers</span>
            <h2 id="faq-title">
              Frequently asked <span>questions.</span>
            </h2>
            <p>
              Clear answers for principals and coordinators preparing their school’s NYAF journey.
            </p>
          </div>

          <aside className="faq-support" aria-labelledby="faq-support-title">
            <span>Need the next step?</span>
            <h3 id="faq-support-title">Still have questions?</h3>
            <p>
              Keep your school’s confirmation email handy. It contains the student registration link
              and next-step instructions.
            </p>
          </aside>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openQuestion === index;
            const answerId = `faq-answer-${index + 1}`;
            const questionId = `faq-question-${index + 1}`;

            return (
              <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenQuestion(isOpen ? null : index)}
                  >
                    <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <span />
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-answer-grid"
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                >
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="partners-section" id="partners" aria-labelledby="partners-title">
      <div className="partners-inner">
        <div className="partners-heading">
          <div>
            <span className="section-eyebrow">Official partners</span>
            <h2 id="partners-title">
              Official partners &amp; <span>partner organizations.</span>
            </h2>
          </div>
          <p>
            Media organizations and global book festivals associated with the National Young
            Authors’ Fair.
          </p>
        </div>

        <div className="partner-group">
          <header className="partner-group-heading">
            <span>01</span>
            <h3>Powered by</h3>
            <small>Media partners</small>
          </header>
          <div className="media-partners">
            {mediaPartners.map((partner) => (
              <article className="media-partner" key={partner.name}>
                <p>{partner.category}</p>
                <div className="media-partner-logo">
                  <img src={partner.logo} alt={`${partner.name} logo`} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="partner-group partner-group--festivals">
          <header className="partner-group-heading">
            <span>02</span>
            <h3>Global book festivals partners</h3>
            <small>International literary stages</small>
          </header>
          <div className="festival-partners">
            {festivalPartners.map((partner) => (
              <article className="festival-partner" key={partner.name}>
                <div>
                  <img src={partner.logo} alt={`${partner.name} logo`} />
                </div>
                <p>{partner.name}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrationCTA({ onRegister }: { onRegister: () => void }) {
  return (
    <section
      className="closing-registration"
      id="registration-cta"
      aria-labelledby="closing-registration-title"
    >
      <div className="closing-registration-inner">
        <div className="closing-registration-copy">
          <span className="section-eyebrow">School registration</span>
          <h2 id="closing-registration-title">
            Bring your school to the <span>national literary stage.</span>
          </h2>
          <p>
            Join a guided writing and publishing movement that helps students become stronger
            readers, confident writers and published authors.
          </p>
        </div>

        <div className="closing-registration-action">
          <div className="registration-window">
            <small>Registration window</small>
            <strong>18 Aug – 27 Nov 2026</strong>
          </div>
          <p>
            Begin with your school registration. The student registration link and next-step
            instructions follow by confirmation email.
          </p>
          <RegistrationButton onClick={onRegister} />
          <span className="registration-scope-note">For schools across India</span>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            className="footer-partner-lockup"
            src="/assets/brand-lockup.png"
            alt="BriBooks and EducationWorld present"
          />
          <img
            className="footer-event-wordmark"
            src="/assets/nyaf-wordmark.png"
            alt="National Young Authors’ Fair 2026"
          />
          <p>
            A national writing and publishing movement for schools, students and young authors
            across India.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Explore NYAF">
          <h2>Explore NYAF</h2>
          <a href="#overview">Overview</a>
          <a href="#benefits">Benefits</a>
          <a href="#journey">How it works</a>
          <a href="#recognition">Recognition</a>
        </nav>

        <nav className="footer-nav" aria-label="Programme">
          <h2>Programme</h2>
          <a href="#proof">Achievements</a>
          <a href="#jury">Jury members</a>
          <a href="#timeline">Key dates</a>
          <a href="#faq">Frequently asked questions</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>National Young Authors’ Fair 2026–27</span>
        <span>Presented by BriBooks &amp; EducationWorld</span>
      </div>
    </footer>
  );
}

function MobileSectionNav() {
  const [activeSectionId, setActiveSectionId] = useState(mobileNavigation[0].id);
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sectionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = mobileNavigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let animationFrame = 0;

    const updateActiveSection = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBottom = Math.max(0, header?.getBoundingClientRect().bottom ?? 0);
      const availableHeight = window.innerHeight - headerBottom;
      const readingLine = headerBottom + availableHeight / 2;

      const sectionAtReadingLine = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });

      const fallbackSection = [...sections]
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= readingLine);
      const activeSection = sectionAtReadingLine ?? fallbackSection ?? sections[0];

      if (activeSection) {
        setActiveSectionId((current) =>
          current === activeSection.id ? current : activeSection.id,
        );
      }
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      threshold: [0, 0.15, 0.35, 0.65, 1],
    });
    sections.forEach((section) => observer.observe(section));

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const frame = window.requestAnimationFrame(() => {
      const list = sectionListRef.current;
      const activeItem = list?.querySelector<HTMLElement>('[aria-current="location"]');
      if (!list || !activeItem) return;

      const targetTop = activeItem.offsetTop - list.clientHeight / 2 + activeItem.offsetHeight / 2;
      list.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeSectionId, expanded]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const top = id === "overview" ? 0 : window.scrollY + section.getBoundingClientRect().top - 12;

    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };

  const activeSection =
    mobileNavigation.find((item) => item.id === activeSectionId) ?? mobileNavigation[0];

  return (
    <nav
      className={`mobile-section-nav${expanded ? " is-expanded" : ""}${hidden ? " is-hidden" : ""}`}
      aria-label="Page sections"
    >
      {hidden ? (
        <button
          className="section-nav-restore"
          type="button"
          aria-label="Show section navigator"
          onClick={() => setHidden(false)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </button>
      ) : expanded ? (
        <div className="section-nav-menu">
          <header>
            <div>
              <small>On this page</small>
              <strong>{activeSection.label}</strong>
            </div>
            <button
              className="section-nav-close"
              type="button"
              aria-label="Close section menu"
              onClick={() => setExpanded(false)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div className="section-nav-list" ref={sectionListRef}>
            {mobileNavigation.map((item) => {
              const isActive = activeSectionId === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={isActive ? "is-active" : ""}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.id);
                    setExpanded(false);
                  }}
                >
                  <span className="section-nav-item-dot" aria-hidden="true" />
                  <span>{item.label}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m7 4 6 6-6 6" />
                  </svg>
                </a>
              );
            })}
          </div>

          <footer>
            <button
              className="section-nav-hide"
              type="button"
              onClick={() => {
                setExpanded(false);
                setHidden(true);
              }}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10h12" />
              </svg>
              Hide section navigator
            </button>
          </footer>
        </div>
      ) : (
        <button
          className="section-nav-trigger"
          type="button"
          aria-expanded="false"
          aria-label={`Current section: ${activeSection.label}. Open section navigation`}
          onClick={() => setExpanded(true)}
        >
          <span className="section-nav-active-dot" aria-hidden="true" />
          <span>{activeSection.label}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m5 7 5 5 5-5" />
          </svg>
        </button>
      )}
    </nav>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  const handleRegister = () => {
    window.location.hash = "register";
  };

  if (route === "#register") return <RegistrationApp />;

  return (
    <div className="app-shell">
      <Header onRegister={handleRegister} />
      <Hero onRegister={handleRegister} />
      <MobileSectionNav />
      <div className="mobile-sticky-cta">
        <RegistrationButton onClick={handleRegister} />
      </div>
    </div>
  );
}

export default App;

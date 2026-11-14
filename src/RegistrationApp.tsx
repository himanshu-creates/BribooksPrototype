import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/min";
import "./registration.css";

type IconName =
  | "alert"
  | "arrow-left"
  | "building"
  | "check"
  | "chevron"
  | "close"
  | "home"
  | "inbox"
  | "link"
  | "mail"
  | "phone"
  | "search"
  | "user";

type FormErrors = Partial<
  Record<"state" | "city" | "school" | "person" | "designation" | "email" | "phone" | "otp", string>
>;

type OtpStatus = "idle" | "incomplete" | "invalid" | "resend" | "verifying";

type School = {
  city: string;
  confirmationName: string;
  name: string;
  state: string;
};

type SearchableSelectProps = {
  disabled?: boolean;
  emptyMessage: string;
  error?: boolean;
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  value: string;
};

const stateCities: Record<string, string[]> = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Amalapuram", "Amaravati", "Vijayawada", "Visakhapatnam"],
  "Arunachal Pradesh": ["Itanagar"],
  Assam: ["Balipara", "Dispur", "Guwahati"],
  Bihar: ["Gaya", "Patna"],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: ["Bhilai", "Raipur"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  Delhi: ["New Delhi"],
  Goa: ["Margao", "Panaji"],
  Gujarat: ["Ahmedabad", "Gandhinagar", "Surat", "Vadodara"],
  Haryana: ["Chandigarh", "Faridabad", "Gurugram"],
  "Himachal Pradesh": ["Dharamshala", "Shimla"],
  "Jammu and Kashmir": ["Jammu", "Srinagar"],
  Jharkhand: ["Jamshedpur", "Ranchi"],
  Karnataka: ["Bengaluru", "Mangaluru", "Mysuru"],
  Kerala: ["Kochi", "Kozhikode", "Thiruvananthapuram"],
  Ladakh: ["Kargil", "Leh"],
  Lakshadweep: ["Kavaratti"],
  "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore"],
  Maharashtra: ["Mumbai", "Nagpur", "Nashik", "Pune"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Dimapur", "Kohima"],
  Odisha: ["Bhubaneswar", "Cuttack"],
  Puducherry: ["Puducherry"],
  Punjab: ["Amritsar", "Chandigarh", "Ludhiana"],
  Rajasthan: ["Jaipur", "Jodhpur", "Kota", "Udaipur"],
  Sikkim: ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Warangal"],
  Tripura: ["Agartala"],
  "Uttar Pradesh": ["Kanpur", "Lucknow", "Noida", "Prayagraj", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar"],
  "West Bengal": ["Darjeeling", "Kolkata", "Siliguri"],
};

const indianStates = Object.keys(stateCities).sort((a, b) => a.localeCompare(b));

const demoSchools: School[] = Object.entries(stateCities).flatMap(([state, cities]) =>
  cities.map((city) => ({
    name: `${city} Community Learning School (Demo)`,
    confirmationName: `${city} Community Learning School`,
    city,
    state,
  })),
);

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const phoneCountries = getCountries()
  .map((code) => ({
    code,
    dialCode: `+${getCountryCallingCode(code)}`,
    name: countryNames.of(code) ?? code,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const designations = [
  "Principal",
  "Director",
  "School Coordinator",
  "Librarian",
  "English HOD",
  "Teacher",
  "Other",
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    alert: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6M12 17h.01" />
      </>
    ),
    "arrow-left": <path d="m15 18-6-6 6-6" />,
    building: (
      <>
        <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    inbox: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M4 14h4l2 3h4l2-3h4" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
    ),
    mail: (
      <>
        <rect width="18" height="14" x="3" y="5" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

function ErrorMessage({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <p className="error-message" role="alert">
      <Icon name="alert" size={14} />
      {children}
    </p>
  );
}

function Field({
  children,
  error,
  hint,
  label,
}: {
  children: ReactNode;
  error?: string;
  hint?: string;
  label: string;
}) {
  return (
    <div className={`field${error ? " field-error" : ""}`}>
      <label>
        {label} <span aria-label="required">*</span>
      </label>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
      {!error && hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}

function SearchableSelect({
  disabled = false,
  emptyMessage,
  error = false,
  id,
  inputRef,
  onChange,
  options,
  placeholder,
  value,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery(value);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [value]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const chooseOption = (option: string) => {
    onChange(option);
    setQuery(option);
    setOpen(false);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex((index) => (open ? Math.min(index + 1, filteredOptions.length - 1) : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && open && filteredOptions[highlightedIndex]) {
      event.preventDefault();
      chooseOption(filteredOptions[highlightedIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery(value);
    }
  };

  return (
    <div className="searchable-select" ref={rootRef}>
      <div className="control-wrap">
        <span className="control-icon control-icon-left">
          <Icon name="search" size={18} />
        </span>
        <input
          ref={inputRef}
          id={id}
          aria-autocomplete="list"
          aria-controls={`${id}-options`}
          aria-expanded={open}
          aria-invalid={error}
          aria-activedescendant={
            open && filteredOptions[highlightedIndex]
              ? `${id}-option-${highlightedIndex}`
              : undefined
          }
          autoComplete="off"
          className={`with-left-icon with-select-arrow${error ? " control-error" : ""}`}
          disabled={disabled}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={(event) => {
            setQuery(value);
            setOpen(true);
            window.requestAnimationFrame(() => event.currentTarget.select());
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          type="search"
          value={query}
        />
        <span className={`control-icon control-icon-right${open ? " is-open" : ""}`}>
          <Icon name="chevron" size={17} />
        </span>
      </div>

      {open && !disabled && (
        <div className="select-options" id={`${id}-options`} role="listbox">
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <button
                id={`${id}-option-${index}`}
                key={option}
                className={`${index === highlightedIndex ? "is-highlighted" : ""}${
                  option === value ? " is-selected" : ""
                }`}
                aria-selected={option === value}
                onMouseDown={(event) => {
                  event.preventDefault();
                  chooseOption(option);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                type="button"
              >
                <span>{option}</span>
                {option === value && <Icon name="check" size={16} />}
              </button>
            ))
          ) : (
            <div className="select-empty">
              <Icon name="search" size={18} />
              <span>{emptyMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Confirmation({
  email,
  person,
  school,
}: {
  email: string;
  person: string;
  school: School;
}) {
  return (
    <main className="confirmation-main">
      <div className="confirmation-shell">
        <div className="confirmation-brand">
          <img
            alt="National Young Authors' Fair 2026"
            className="confirmation-nyaf-logo"
            src="/brands/nyaf-2026.png"
          />
        </div>

        <section className="confirmation-hero">
          <div className="completion-mark" aria-hidden="true">
            <Icon name="check" size={25} />
          </div>
          <p className="confirmation-kicker">Prototype complete</p>
          <h1>Your registration details are ready</h1>
          <p className="congratulations">Congratulations, {person}!</p>
          <p className="registered-school">
            You completed the prototype journey for <b>{school.confirmationName}</b>, {school.city},{" "}
            {school.state}. No real registration has been submitted.
          </p>
        </section>

        <div className="confirmation-divider" />

        <section className="next-steps" aria-labelledby="next-steps-title">
          <div className="next-steps-intro">
            <p className="eyebrow">What happens next</p>
            <h2 id="next-steps-title">What would happen next</h2>
            <p>
              In the live experience, next steps would be sent to <b>{email}</b>. This prototype
              does not send email.
            </p>
          </div>

          <div className="steps-list">
            <div className="next-step">
              <div className="step-icon">
                <Icon name="inbox" size={20} />
              </div>
              <div>
                <span>01</span>
                <h3>Receive a confirmation email</h3>
                <p>A live registration would send instructions for your school coordinator.</p>
              </div>
            </div>
            <div className="next-step">
              <div className="step-icon step-icon-orange">
                <Icon name="link" size={20} />
              </div>
              <div>
                <span>02</span>
                <h3>Share the student registration link</h3>
                <p>Use the link and instructions in the email to help students register.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="confirmation-actions">
          <button
            className="primary-button confirmation-primary"
            onClick={() => {
              window.location.hash = "";
            }}
            type="button"
          >
            <Icon name="home" size={18} />
            Return to NYAF homepage
            <span className="button-arrow">
              <Icon name="chevron" size={18} />
            </span>
          </button>
          <p>
            Need help? <a href="mailto:schools@bribooks.com">Contact schools@bribooks.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function RegistrationApp() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [manualSchools, setManualSchools] = useState<School[]>([]);
  const [addSchoolOpen, setAddSchoolOpen] = useState(false);
  const [manualSchoolName, setManualSchoolName] = useState("");
  const [manualSchoolError, setManualSchoolError] = useState("");
  const [person, setPerson] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<CountryCode>("IN");
  const [phone, setPhone] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("idle");
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState<FormErrors>({});
  const [otpToast, setOtpToast] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  const stateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const personRef = useRef<HTMLInputElement>(null);
  const designationRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const otpActionRef = useRef<HTMLButtonElement>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!otpRequested || verified || timer <= 0) return;
    const interval = window.setInterval(() => setTimer((value) => value - 1), 1000);
    return () => window.clearInterval(interval);
  }, [otpRequested, timer, verified]);

  useEffect(() => {
    if (!otpToast) return;
    const timeout = window.setTimeout(() => setOtpToast(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [otpToast]);

  const availableCities = state ? (stateCities[state] ?? []) : [];
  const availableSchools = [...demoSchools, ...manualSchools].filter(
    (school) => school.state === state && school.city === city,
  );
  const selectedCountry = phoneCountries.find((item) => item.code === country)!;

  const isPhoneValid = () => {
    if (!phone.trim()) return false;
    return parsePhoneNumberFromString(phone, country)?.isValid() ?? false;
  };

  const clearError = (key: keyof FormErrors) => {
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  const resetSchool = () => {
    setSchoolName("");
    setSelectedSchool(null);
    setAddSchoolOpen(false);
    setManualSchoolName("");
    setManualSchoolError("");
  };

  const useManualSchool = () => {
    const name = manualSchoolName.trim();
    if (!name) {
      setManualSchoolError("Enter the school name.");
      return;
    }

    const school: School = {
      name,
      confirmationName: name,
      city,
      state,
    };
    setManualSchools((current) => [
      ...current.filter(
        (item) => !(item.name === school.name && item.city === city && item.state === state),
      ),
      school,
    ]);
    setSchoolName(name);
    setSelectedSchool(school);
    setAddSchoolOpen(false);
    setManualSchoolError("");
    clearError("school");
  };

  const requestOtp = () => {
    if (!isPhoneValid()) {
      setErrors((current) => ({
        ...current,
        phone: "Enter a valid phone number for the selected country.",
      }));
      phoneRef.current?.focus();
      return;
    }

    setErrors((current) => ({ ...current, phone: undefined, otp: undefined }));
    setOtpRequested(true);
    setVerified(false);
    setOtpStatus("idle");
    setOtp(["", "", "", "", "", ""]);
    setOtpToast("");
    setTimer(30);
    window.setTimeout(() => otpRefs.current[0]?.focus(), 80);
  };

  const editPhone = () => {
    setOtpRequested(false);
    setVerified(false);
    setOtpStatus("idle");
    setOtp(["", "", "", "", "", ""]);
    setOtpToast("");
    setErrors((current) => ({ ...current, otp: undefined }));
    window.setTimeout(() => phoneRef.current?.focus(), 50);
  };

  const updateOtp = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setVerified(false);
    setOtpToast("");
    if (otpStatus !== "verifying") setOtpStatus("idle");
    clearError("otp");
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedCode) return;
    event.preventDefault();
    const next = Array.from({ length: 6 }, (_, index) => pastedCode[index] ?? "");
    setOtp(next);
    setVerified(false);
    setOtpStatus("idle");
    setOtpToast("");
    clearError("otp");
    otpRefs.current[Math.min(pastedCode.length, 6) - 1]?.focus();
  };

  const verifyOtp = () => {
    if (otpStatus === "verifying") return;
    const firstEmptyIndex = otp.findIndex((digit) => !digit);

    if (firstEmptyIndex >= 0) {
      setVerified(false);
      setOtpStatus("incomplete");
      setErrors((current) => ({
        ...current,
        otp: "Enter the complete 6-digit verification code.",
      }));
      otpRefs.current[firstEmptyIndex]?.focus();
      return;
    }

    setErrors((current) => ({ ...current, otp: undefined }));
    setOtpStatus("verifying");
    window.setTimeout(() => {
      if (otp.join("") === "123456") {
        setVerified(true);
        setOtpStatus("idle");
        setTimer(0);
      } else {
        setVerified(false);
        setOtpStatus("invalid");
        setOtpToast("Incorrect verification code. Please try again.");
        setErrors((current) => ({
          ...current,
          otp: "Incorrect verification code. Please try again.",
        }));
      }
    }, 900);
  };

  const resendOtp = () => {
    if (timer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setVerified(false);
    setOtpStatus("resend");
    setOtpToast("");
    setErrors((current) => ({ ...current, otp: undefined }));
    setTimer(30);
    window.setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!state) next.state = "Select your state.";
    if (!city) next.city = "Select your city.";
    if (!selectedSchool) next.school = "Search for a school or add your school.";
    if (!person.trim()) next.person = "Enter the coordinator’s full name.";
    if (!designation) next.designation = "Select a designation.";
    if (!email.trim()) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address, such as name@school.edu.";
    }
    if (!phone) next.phone = "Enter a phone number.";
    else if (!isPhoneValid()) next.phone = "Enter a valid phone number for the selected country.";
    if (!verified) {
      if (!otpRequested) next.otp = "Send and verify the demo OTP before registering.";
      else if (otp.some((digit) => !digit)) {
        next.otp = "Enter the complete 6-digit verification code.";
      } else if (otpStatus === "invalid") {
        next.otp = "Incorrect verification code. Please try again.";
      } else next.otp = "Click Verify OTP to verify this phone number.";
    }
    setErrors(next);

    const focusOrder: Array<[keyof FormErrors, React.RefObject<HTMLElement | null>]> = [
      ["state", stateRef],
      ["city", cityRef],
      ["school", schoolRef],
      ["person", personRef],
      ["designation", designationRef],
      ["email", emailRef],
      ["phone", phoneRef],
      ["otp", { current: otpRequested ? otpRefs.current[0] : otpActionRef.current }],
    ];
    const first = focusOrder.find(([key]) => next[key]);
    first?.[1].current?.focus();
    first?.[1].current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return Object.keys(next).length === 0;
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  return (
    <div className="registration-page">
      <header className="site-header">
        <div className="header-inner">
          <img
            alt="BriBooks and EducationWorld"
            className="partner-logo"
            src="/brands/bribooks-educationworld.png"
          />
          <button
            className="back-link"
            onClick={() => {
              window.location.hash = "";
            }}
            type="button"
          >
            <Icon name="arrow-left" size={18} />
            <span>Back to homepage</span>
          </button>
        </div>
      </header>

      {otpToast && (
        <div className="otp-error-toast" role="alert">
          <Icon name="alert" size={17} />
          <span>{otpToast}</span>
        </div>
      )}

      {complete && selectedSchool ? (
        <Confirmation email={email} person={person} school={selectedSchool} />
      ) : (
        <main>
          <div className="page-shell">
            <div className="page-intro">
              <img
                alt="National Young Authors' Fair 2026"
                className="nyaf-logo"
                src="/brands/nyaf-2026.png"
              />
              <div className="intro-copy">
                <p className="eyebrow">School registration</p>
                <h1>Register your school</h1>
                <p>Complete the details below to experience the NYAF registration prototype.</p>
              </div>
            </div>

            <section className="form-card" aria-label="School registration form">
              <div className="form-heading">
                <div className="heading-icon">
                  <Icon name="building" size={24} />
                </div>
                <div>
                  <h2>School Registration</h2>
                  <p>
                    Complete each field in order. Fields marked with <span>*</span> are required.
                  </p>
                </div>
              </div>

              <form
                noValidate
                aria-busy={submitting}
                className={submitting ? "is-submitting" : ""}
                onSubmit={submitForm}
              >
                <fieldset disabled={submitting}>
                  <legend className="form-section-heading">
                    <span>01</span>
                    <span>
                      <strong>School Information</strong>
                      <small>Choose the school’s location before selecting a school.</small>
                    </span>
                  </legend>

                  <Field error={errors.state} label="State">
                    <SearchableSelect
                      id="registration-state"
                      inputRef={stateRef}
                      error={Boolean(errors.state)}
                      emptyMessage="No state or union territory matches your search."
                      onChange={(value) => {
                        setState(value);
                        setCity("");
                        resetSchool();
                        clearError("state");
                        clearError("city");
                        clearError("school");
                      }}
                      options={indianStates}
                      placeholder="Select your state"
                      value={state}
                    />
                  </Field>

                  <Field error={errors.city} label="City">
                    <SearchableSelect
                      id="registration-city"
                      inputRef={cityRef}
                      disabled={!state}
                      error={Boolean(errors.city)}
                      emptyMessage="No available city matches your search for this state."
                      onChange={(value) => {
                        setCity(value);
                        resetSchool();
                        clearError("city");
                        clearError("school");
                      }}
                      options={availableCities}
                      placeholder={state ? "Select your city" : "Select a state first"}
                      value={city}
                    />
                  </Field>

                  <Field
                    error={errors.school}
                    label="School Name"
                    hint={
                      selectedSchool ? `${selectedSchool.city}, ${selectedSchool.state}` : undefined
                    }
                  >
                    <SearchableSelect
                      id="registration-school"
                      inputRef={schoolRef}
                      disabled={!state || !city}
                      error={Boolean(errors.school)}
                      emptyMessage="No matching school found. Use “Add your school” below."
                      onChange={(value) => {
                        setSchoolName(value);
                        setSelectedSchool(
                          availableSchools.find((school) => school.name === value) ?? null,
                        );
                        clearError("school");
                      }}
                      options={availableSchools.map((school) => school.name)}
                      placeholder={city ? "Search or select your school" : "Select a city first"}
                      value={schoolName}
                    />

                    <button
                      className="add-school-action"
                      disabled={!state || !city}
                      onClick={() => {
                        setAddSchoolOpen(true);
                        setManualSchoolName("");
                        setManualSchoolError("");
                      }}
                      type="button"
                    >
                      Can&apos;t find your school? <strong>Add your school</strong>
                    </button>

                    {addSchoolOpen && (
                      <div
                        className="add-school-panel"
                        role="dialog"
                        aria-labelledby="add-school-title"
                      >
                        <div className="add-school-heading">
                          <div>
                            <h3 id="add-school-title">Add your school</h3>
                            <p>Your school details will be used for this demo registration.</p>
                          </div>
                          <button
                            aria-label="Close add school form"
                            onClick={() => setAddSchoolOpen(false)}
                            type="button"
                          >
                            <Icon name="close" size={18} />
                          </button>
                        </div>

                        <label htmlFor="manual-school-name">
                          School Name <span aria-label="required">*</span>
                        </label>
                        <input
                          id="manual-school-name"
                          aria-invalid={Boolean(manualSchoolError)}
                          className={manualSchoolError ? "control-error" : ""}
                          onChange={(event) => {
                            setManualSchoolName(event.target.value);
                            setManualSchoolError("");
                          }}
                          placeholder="Enter your school name"
                          value={manualSchoolName}
                        />
                        {manualSchoolError && <ErrorMessage>{manualSchoolError}</ErrorMessage>}

                        <div className="manual-location-grid">
                          <div>
                            <label htmlFor="manual-school-state">State</label>
                            <input id="manual-school-state" readOnly value={state} />
                          </div>
                          <div>
                            <label htmlFor="manual-school-city">City</label>
                            <input id="manual-school-city" readOnly value={city} />
                          </div>
                        </div>

                        <div className="add-school-actions">
                          <button type="button" onClick={useManualSchool}>
                            Use This School
                          </button>
                          <button type="button" onClick={() => setAddSchoolOpen(false)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </Field>
                </fieldset>

                <div className="section-divider" />

                <fieldset disabled={submitting}>
                  <legend className="form-section-heading">
                    <span>02</span>
                    <span>
                      <strong>School Coordinator Details</strong>
                      <small>
                        Enter the details of the person coordinating NYAF at your school.
                      </small>
                    </span>
                  </legend>

                  <Field error={errors.person} label="Full Name">
                    <div className="control-wrap">
                      <span className="control-icon control-icon-left">
                        <Icon name="user" size={18} />
                      </span>
                      <input
                        ref={personRef}
                        aria-invalid={Boolean(errors.person)}
                        autoComplete="name"
                        className={`with-left-icon${errors.person ? " control-error" : ""}`}
                        onChange={(event) => {
                          setPerson(event.target.value);
                          clearError("person");
                        }}
                        placeholder="Enter the coordinator’s full name"
                        type="text"
                        value={person}
                      />
                    </div>
                  </Field>

                  <Field error={errors.designation} label="Designation">
                    <SearchableSelect
                      id="registration-designation"
                      inputRef={designationRef}
                      error={Boolean(errors.designation)}
                      emptyMessage="No designation matches your search."
                      onChange={(value) => {
                        setDesignation(value);
                        clearError("designation");
                      }}
                      options={designations}
                      placeholder="Select your designation"
                      value={designation}
                    />
                  </Field>

                  <Field error={errors.email} label="Email Address">
                    <div className="control-wrap">
                      <span className="control-icon control-icon-left">
                        <Icon name="mail" size={18} />
                      </span>
                      <input
                        ref={emailRef}
                        aria-invalid={Boolean(errors.email)}
                        autoComplete="email"
                        className={`with-left-icon${errors.email ? " control-error" : ""}`}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          clearError("email");
                        }}
                        placeholder="name@school.edu"
                        type="email"
                        value={email}
                      />
                    </div>
                  </Field>

                  <Field
                    error={errors.phone}
                    label="Phone Number"
                    hint="Select a country calling code, then enter the phone number."
                  >
                    <div className="phone-row">
                      <div
                        className={`phone-control${errors.phone ? " control-error" : ""}${
                          verified ? " control-success" : ""
                        }`}
                      >
                        <div className="country-code-select">
                          <select
                            aria-label="Country calling code"
                            disabled={otpRequested}
                            onChange={(event) => {
                              setCountry(event.target.value as CountryCode);
                              setOtpRequested(false);
                              setVerified(false);
                              setOtp(["", "", "", "", "", ""]);
                              setOtpStatus("idle");
                              clearError("phone");
                              clearError("otp");
                            }}
                            value={country}
                          >
                            {phoneCountries.map((item) => (
                              <option key={item.code} value={item.code}>
                                {item.name} ({item.dialCode})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="phone-input-wrap">
                          <span className="control-icon control-icon-left">
                            <Icon name="phone" size={17} />
                          </span>
                          <input
                            ref={phoneRef}
                            aria-invalid={Boolean(errors.phone)}
                            autoComplete="tel-national"
                            className="with-left-icon"
                            disabled={otpRequested}
                            inputMode="tel"
                            maxLength={24}
                            onChange={(event) => {
                              setPhone(event.target.value.replace(/[^\d\s()-]/g, "").slice(0, 24));
                              clearError("phone");
                              setVerified(false);
                            }}
                            placeholder="Enter your phone number"
                            type="tel"
                            value={phone}
                          />
                          {verified && (
                            <span className="phone-verified-icon" aria-label="Verified">
                              <Icon name="check" size={14} />
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        ref={otpActionRef}
                        className="otp-button"
                        onClick={otpRequested ? editPhone : requestOtp}
                        type="button"
                      >
                        {otpRequested ? "Edit number" : "Send OTP"}
                      </button>
                    </div>
                  </Field>

                  {otpRequested && (
                    <div
                      className={`otp-panel${errors.otp ? " otp-panel-error" : ""}${
                        otpStatus === "verifying" ? " otp-panel-verifying" : ""
                      }`}
                    >
                      {verified ? (
                        <div className="verification-success" role="status">
                          <span className="success-icon">
                            <Icon name="check" size={17} />
                          </span>
                          <span>
                            <b>Phone number verified successfully.</b>
                            <small>You can now register your school.</small>
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="otp-panel-heading">
                            <div>
                              <b>Enter the 6-digit OTP</b>
                              <p>
                                Verify {selectedCountry.dialCode} {phone} to continue.
                              </p>
                            </div>
                            <span>OTP</span>
                          </div>

                          <div className="demo-otp-note" role="note">
                            <span>Demo verification code: 123456</span>
                            <p>No SMS will be sent. Use this code to test verification.</p>
                          </div>

                          <div className="otp-inputs" aria-label="Six digit verification code">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                ref={(element) => {
                                  otpRefs.current[index] = element;
                                }}
                                aria-label={`OTP digit ${index + 1}`}
                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                inputMode="numeric"
                                maxLength={1}
                                disabled={otpStatus === "verifying"}
                                onChange={(event) => updateOtp(index, event.target.value)}
                                onKeyDown={(event) => handleOtpKeyDown(index, event.key)}
                                onPaste={handleOtpPaste}
                                value={digit}
                              />
                            ))}
                          </div>
                          <ErrorMessage>{errors.otp}</ErrorMessage>

                          {otpStatus === "resend" && (
                            <div className="otp-resend-feedback" role="status">
                              <span className="success-icon">
                                <Icon name="check" size={14} />
                              </span>
                              Demo code reset to 123456. No SMS was sent.
                            </div>
                          )}

                          <div className="otp-verification-actions">
                            <button
                              className="verify-code-button"
                              disabled={otpStatus === "verifying"}
                              onClick={verifyOtp}
                              type="button"
                            >
                              {otpStatus === "verifying" && (
                                <span className="loading-spinner" aria-hidden="true" />
                              )}
                              {otpStatus === "verifying" ? "Verifying…" : "Verify OTP"}
                            </button>
                            <div className="resend-row">
                              <button disabled={timer > 0} onClick={resendOtp} type="button">
                                {timer > 0
                                  ? `Resend OTP in 00:${String(timer).padStart(2, "0")}`
                                  : "Resend OTP"}
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {!otpRequested && errors.otp && (
                    <div className="verification-required">
                      <Icon name="alert" size={16} />
                      <span>{errors.otp}</span>
                    </div>
                  )}
                </fieldset>

                <button
                  className="primary-button registration-submit"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? (
                    <>
                      <span className="loading-spinner" aria-hidden="true" />
                      Preparing confirmation…
                    </>
                  ) : (
                    <>
                      Register Your School
                      <span className="button-arrow">
                        <Icon name="chevron" size={18} />
                      </span>
                    </>
                  )}
                </button>

                {!verified && !submitting && (
                  <p className="registration-lock-note">
                    Complete phone verification before submitting the form.
                  </p>
                )}

                <p className="prototype-disclaimer">
                  Interactive prototype only. No registration, SMS or email will be sent.
                </p>
              </form>
            </section>

            <p className="support">
              Need help? Contact <a href="mailto:schools@bribooks.com">schools@bribooks.com</a>
            </p>
          </div>
        </main>
      )}
    </div>
  );
}

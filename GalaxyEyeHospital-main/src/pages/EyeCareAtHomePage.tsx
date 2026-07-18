import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery } from "../hooks/useQuery";
import { createHomeConsultationLead, getAwards, getContactInfo, getHospitalInfo, getHospitalStats } from "../services/api";

type EyeSelection = "Left" | "Right" | "Both";

type FormState = {
  fullName: string;
  contactNumber: string;
  whichEye: EyeSelection;
  problemDescription: string;
  sinceHowLong: string;
  preferredCallbackTime: string;
  consent: boolean;
  spamTrap: string;
};

type Errors = Partial<Record<keyof FormState | "photo", string>>;

const initialFormState: FormState = {
  fullName: "",
  contactNumber: "",
  whichEye: "Right",
  problemDescription: "",
  sinceHowLong: "",
  preferredCallbackTime: "",
  consent: false,
  spamTrap: "",
};

const faqs = [
  {
    question: "Is this really free?",
    answer: "Yes. The consultation request is free, and the hospital team will call back to guide the next step.",
  },
  {
    question: "How soon will I be contacted?",
    answer: "The page promises a response within 24 hours, and urgent cases can be prioritised by the team.",
  },
  {
    question: "What if my photo is unclear?",
    answer: "Upload the best photo you can. If the image is not enough for triage, the hospital will ask for a clearer one.",
  },
  {
    question: "Is my information kept private?",
    answer: "Yes. The lead data is stored in Supabase with row-level security, and the image is uploaded to a private storage bucket.",
  },
];

function formatPhoneInput(value: string) {
  return value.replace(/[^\d+ ]/g, "");
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function isValidIndianMobile(value: string) {
  const digits = normalizePhone(value);
  return /^[6-9]\d{9}$/.test(digits);
}

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className={`text-[hsl(var(--primary))] transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <div className="flex items-center justify-between gap-4">
        <span className="block text-sm font-medium text-gray-700">
          {label}
          {optional ? <span className="ml-2 text-gray-400 font-normal">Optional</span> : null}
        </span>
        {error ? <span className="text-xs text-red-600 font-medium">{error}</span> : null}
      </div>
      {children}
    </label>
  );
}

function inputClass(error?: string, isTextarea = false) {
  return [
    "w-full rounded-2xl border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/40 focus:border-[hsl(var(--accent))] transition-colors bg-white",
    isTextarea ? "resize-none" : "",
    error ? "border-red-300" : "border-gray-300",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function EyeCareAtHomePage() {
  const { data: hospitalInfo, loading: hospitalLoading } = useQuery(getHospitalInfo);
  const { data: contactInfo, loading: contactLoading } = useQuery(getContactInfo);
  const { data: stats, loading: statsLoading } = useQuery(getHospitalStats);
  const { data: awards, loading: awardsLoading } = useQuery(getAwards);

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const isLoading = hospitalLoading || contactLoading || statsLoading || awardsLoading;

  const spotlightStats = useMemo(() => (stats ?? []).slice(0, 3), [stats]);
  const highlightedAwards = useMemo(() => (awards ?? []).filter((award) => award.highlighted).slice(0, 3), [awards]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    setPhoto(null);

    if (!nextFile) {
      setErrors((current) => ({ ...current, photo: undefined }));
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(nextFile.type)) {
      setErrors((current) => ({ ...current, photo: "Please upload a JPG, PNG, or WebP image." }));
      return;
    }

    if (nextFile.size > 5 * 1024 * 1024) {
      setErrors((current) => ({ ...current, photo: "Image must be 5MB or smaller." }));
      return;
    }

    setErrors((current) => ({ ...current, photo: undefined }));
    setPhoto(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
  };

  const validate = () => {
    const nextErrors: Errors = {};

    if (!formState.fullName.trim()) {
      nextErrors.fullName = "Enter the patient name.";
    }

    if (!isValidIndianMobile(formState.contactNumber)) {
      nextErrors.contactNumber = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!photo) {
      nextErrors.photo = "Upload a photo of the affected eye.";
    }

    if (!formState.problemDescription.trim()) {
      nextErrors.problemDescription = "Describe the eye problem.";
    }

    if (!formState.consent) {
      nextErrors.consent = "Please confirm consent so we can contact you.";
    }

    if (formState.spamTrap.trim()) {
      nextErrors.spamTrap = "";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);

    if (!validate() || !photo) {
      return;
    }

    setSubmitting(true);

    try {
      await createHomeConsultationLead({
        fullName: formState.fullName.trim(),
        contactNumber: normalizePhone(formState.contactNumber),
        whichEye: formState.whichEye,
        problemDescription: formState.problemDescription.trim(),
        sinceHowLong: formState.sinceHowLong,
        preferredCallbackTime: formState.preferredCallbackTime,
        consent: formState.consent,
        photo,
        spamTrap: formState.spamTrap,
      });

      setSubmitted(true);
      setFormState(initialFormState);
      setPhoto(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setErrors({});
      setFormMessage("Thank you — our team will contact you within 24 hours.");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "Unable to submit the request right now.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !hospitalInfo || !contactInfo || !stats || !awards) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[hsl(var(--primary))]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[hsl(var(--accent))] font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--accent))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--accent))]" />
              </span>
              Free consultation, no visit required
            </span>
            <h1 className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Eye Care at Home</h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Send us a photo of the affected eye, tell us what is bothering you, and our team will call you back with the next best step.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href="#request-form"
                className="px-8 py-3.5 bg-white text-[hsl(var(--primary))] font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                Request Free Consultation
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <a
                href={`tel:${contactInfo.tollFree}`}
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                Call {contactInfo.tollFree}
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-4">
              {[
                { value: "24h", label: "Callback target" },
                { value: "1 upload", label: "Photo-based triage" },
                { value: "Mobile-friendly", label: "Flow" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white font-[Outfit]">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-15">
            <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white" id="request-form">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Why this works</span>
                <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] leading-tight">
                  Built for fast mobile submissions and hospital follow-up.
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                  The flow stays simple: upload, explain, submit, and receive a callback. It is designed to be practical for ad traffic and WhatsApp referrals.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(spotlightStats.length ? spotlightStats : awards.slice(0, 2)).map((item) => (
                  <div key={"label" in item ? item.id : item.title} className="rounded-2xl border border-gray-200 p-5 shadow-sm bg-gray-50/60">
                    <p className="text-3xl font-bold text-[hsl(var(--primary))]">
                      {"value" in item ? item.value : item.year ?? "Award"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{"label" in item ? item.label : item.title}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl bg-[hsl(var(--primary))] text-white p-6 md:p-8 shadow-xl shadow-[hsl(var(--primary))]/15">
                <p className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Trusted by the hospital team</p>
                <div className="mt-5 grid gap-4">
                  {highlightedAwards.slice(0, 3).map((award) => (
                    <div key={award.id} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5 5-5-5"/><path d="m17 19-5-5-5 5"/></svg>
                      </div>
                      <div>
                        <p className="font-semibold">{award.title}</p>
                        <p className="text-white/70 text-sm">{award.issuingAuthority}{award.year ? ` • ${award.year}` : ""}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-xl p-5 md:p-8">
              {submitted ? (
                <div className="min-h-[560px] flex flex-col items-center justify-center text-center space-y-5 py-12">
                  <div className="w-18 h-18 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <h2 className="font-[Outfit] text-3xl font-bold text-[hsl(var(--foreground))]">Request received</h2>
                  <p className="text-gray-600 max-w-md leading-relaxed">
                    {formMessage ?? "Thank you — our team will contact you within 24 hours."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a href={`tel:${contactInfo.tollFree}`} className="px-6 py-3 rounded-lg bg-[hsl(var(--primary))] text-white font-semibold">
                      Call {contactInfo.tollFree}
                    </a>
                    <Link to="/" className="px-6 py-3 rounded-lg border border-gray-200 font-semibold text-gray-700">
                      Back to home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Consultation request</span>
                    <h2 className="font-[Outfit] text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))]">
                      Request your free consultation
                    </h2>
                    <p className="text-gray-600">
                      Fill in the details below and upload a photo of the affected eye. All fields marked required must be completed before submission.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Full Name" error={errors.fullName}>
                      <input
                        type="text"
                        value={formState.fullName}
                        onChange={(event) => setField("fullName", event.target.value)}
                        placeholder="Your full name"
                        className={inputClass(errors.fullName)}
                      />
                    </Field>

                    <Field label="Contact Number" error={errors.contactNumber}>
                      <input
                        type="tel"
                        value={formState.contactNumber}
                        onChange={(event) => setField("contactNumber", formatPhoneInput(event.target.value))}
                        placeholder="10-digit mobile number"
                        className={inputClass(errors.contactNumber)}
                      />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Which eye?" error={errors.whichEye}>
                      <select
                        value={formState.whichEye}
                        onChange={(event) => setField("whichEye", event.target.value as EyeSelection)}
                        className={inputClass(errors.whichEye)}
                      >
                        <option value="Right">Right eye</option>
                        <option value="Left">Left eye</option>
                        <option value="Both">Both eyes</option>
                      </select>
                    </Field>

                    <Field label="Since how long?" error={errors.sinceHowLong} optional>
                      <select
                        value={formState.sinceHowLong}
                        onChange={(event) => setField("sinceHowLong", event.target.value)}
                        className={inputClass(errors.sinceHowLong)}
                      >
                        <option value="">Select a time frame</option>
                        <option value="Today">Today</option>
                        <option value="Few days">Few days</option>
                        <option value="Few weeks">Few weeks</option>
                        <option value="Longer">Longer</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Problem Description" error={errors.problemDescription}>
                    <textarea
                      rows={5}
                      value={formState.problemDescription}
                      onChange={(event) => setField("problemDescription", event.target.value)}
                      placeholder="e.g. redness, blurry vision, itching, pain, watering..."
                      className={inputClass(errors.problemDescription, true)}
                    />
                  </Field>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Preferred callback time" error={errors.preferredCallbackTime} optional>
                      <select
                        value={formState.preferredCallbackTime}
                        onChange={(event) => setField("preferredCallbackTime", event.target.value)}
                        className={inputClass(errors.preferredCallbackTime)}
                      >
                        <option value="">Any time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </Field>

                    <Field label="Eye photo" error={errors.photo}>
                      <label className="flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-6 text-center hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/5 transition-colors">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          capture="environment"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                        {previewUrl ? (
                          <div className="space-y-3">
                            <img src={previewUrl} alt="Eye photo preview" className="mx-auto h-24 w-24 rounded-2xl object-cover border border-gray-200" />
                            <p className="text-sm font-semibold text-gray-800">Photo selected</p>
                            <p className="text-xs text-gray-500">Tap to replace</p>
                          </div>
                        ) : (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center text-[hsl(var(--primary))] shadow-sm border border-gray-100">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                            </div>
                            <p className="font-semibold text-gray-800">Upload JPG, PNG, or WebP</p>
                            <p>Max size 5MB, image is compressed before upload</p>
                          </div>
                        )}
                      </label>
                    </Field>
                  </div>

                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.spamTrap}
                    onChange={(event) => setField("spamTrap", event.target.value)}
                    className="absolute -left-[9999px]"
                    aria-hidden="true"
                  />

                  <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <input
                      type="checkbox"
                      checked={formState.consent}
                      onChange={(event) => setField("consent", event.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[hsl(var(--primary))] focus:ring-[hsl(var(--accent))]"
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I agree to be contacted by Galaxy Eye Hospital regarding this request.
                      {errors.consent ? <span className="block mt-1 text-red-600 font-medium">{errors.consent}</span> : null}
                    </span>
                  </label>

                  {formMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {formMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--accent))] px-6 py-4 font-semibold text-white shadow-lg shadow-[hsl(var(--accent))]/20 transition-colors hover:bg-[hsl(var(--accent))]/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Uploading and submitting
                      </>
                    ) : (
                      <>
                        Request Free Consultation
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you help us arrange follow-up care more efficiently. Sensitive lead data stays in Supabase.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">FAQ</span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[hsl(var(--primary))]">Common questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[hsl(var(--primary))]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-center lg:text-left">
            <div className="space-y-3">
              <p className="text-[hsl(var(--accent))] font-semibold tracking-wider uppercase text-sm">Need a faster response?</p>
              <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-white">Call our team if the symptoms feel urgent.</h2>
            </div>
            <a href={`tel:${contactInfo.emergencyPhone}`} className="px-8 py-4 rounded-lg bg-white text-[hsl(var(--primary))] font-semibold inline-flex items-center justify-center gap-2 shadow-lg">
              Call {contactInfo.emergencyPhone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
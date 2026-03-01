/* ──────────────────────────────────────────────
   Services Data — Single source of truth
   Simulates a database table: services
   ────────────────────────────────────────────── */

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServicePageContent {
  heroTagline: string;
  heroDescription: string;
  heroImage: string;
  whatIsTitle: string;
  whatIsDescription: string;
  whatIsImage: string;
  benefits: ServiceBenefit[];
  process: ProcessStep[];
  faqs: FAQ[];
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // Icon identifier — mapped to SVG in components
  image: string;
  features: string[];
  duration: string;
  recoveryTime: string;
  successRate: string;
  category: "surgical" | "non-surgical" | "diagnostic";
  popular: boolean;
  pageContent: ServicePageContent;
}

export const serviceCategories = [
  "All",
  "Surgical",
  "Non-Surgical",
  "Diagnostic",
];

export const services: Service[] = [
  {
    id: 1,
    slug: "lasik-surgery",
    title: "LASIK Surgery",
    shortDescription:
      "Laser vision correction for long-term freedom from glasses.",
    fullDescription:
      "LASIK (Laser-Assisted In Situ Keratomileusis) is a refractive eye surgery that corrects nearsightedness, farsightedness, and astigmatism. Using the latest femtosecond and excimer laser technology, we reshape the cornea for crystal-clear vision. Our blade-free approach ensures maximum precision, minimal discomfort, and rapid recovery — most patients achieve 20/20 vision within 24 hours.",
    icon: "lasik",
    image: "/hero.png",
    features: [
      "Blade-free femtosecond laser",
      "Both eyes treated in under 30 minutes",
      "99%+ patient satisfaction",
      "Return to work within 24-48 hours",
      "Comprehensive pre & post-op care",
    ],
    duration: "20-30 minutes",
    recoveryTime: "24-48 hours",
    successRate: "99%+",
    category: "surgical",
    popular: true,
    pageContent: {
      heroTagline: "Advanced, safe, and patient-focused LASIK treatment designed to give you a life free from glasses and contact lenses.",
      heroDescription: "Experience crystal-clear vision with our state-of-the-art blade-free LASIK procedure — trusted by thousands of patients across Maharashtra.",
      heroImage: "/hero.png",
      whatIsTitle: "What is LASIK Surgery?",
      whatIsDescription: "LASIK (Laser-Assisted In Situ Keratomileusis) is a proven refractive eye surgery that reshapes the cornea using advanced femtosecond and excimer laser technology. It corrects nearsightedness (myopia), farsightedness (hyperopia), and astigmatism — giving you permanent freedom from glasses or contact lenses. At Galaxy Eye Hospital, our blade-free, computer-guided LASIK procedure ensures maximum precision, minimal discomfort, and rapid visual recovery. Most patients achieve 20/20 vision within 24 hours and can return to normal activities the very next day.",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "FDA-approved blade-free technology with a 99%+ success rate worldwide." },
        { title: "Quick and Effective Procedure", description: "Both eyes treated in under 30 minutes with results visible within hours." },
        { title: "Performed by Experienced Specialists", description: "Our surgeons have performed 10,000+ successful LASIK procedures." },
        { title: "Trusted by Thousands of Patients", description: "Rated 4.9/5 by patients for comfort, results, and aftercare." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Comprehensive eye evaluation including corneal topography, pachymetry, and pupil dilation to determine your LASIK eligibility and treatment plan." },
        { step: 2, title: "Procedure", description: "Blade-free femtosecond laser creates a thin corneal flap, then the excimer laser precisely reshapes the cornea. The entire process takes under 30 minutes for both eyes." },
        { step: 3, title: "Recovery & Follow-Up", description: "Rest for a few hours post-surgery. Most patients see clearly by the next morning. Follow-up visits at 1 day, 1 week, and 1 month to ensure perfect healing." }
      ],
      faqs: [
        { question: "Am I a good candidate for LASIK?", answer: "Ideal candidates are 18+ years old with a stable prescription for at least one year, healthy corneas, and no major eye diseases. A detailed pre-operative exam will confirm eligibility." },
        { question: "Is LASIK painful?", answer: "No. Numbing eye drops are used before the procedure. Most patients feel only slight pressure during the treatment. Any mild discomfort after surgery subsides within a few hours." },
        { question: "How long does the procedure take?", answer: "The actual laser treatment takes about 30 seconds per eye. The entire procedure, including preparation, is completed in under 30 minutes for both eyes." },
        { question: "When can I return to work?", answer: "Most patients return to normal activities and work within 24-48 hours after LASIK surgery." },
        { question: "Are the results permanent?", answer: "Yes, LASIK permanently reshapes the cornea. However, age-related changes like presbyopia (reading difficulty after 40) may still occur naturally." }
      ]
    },
  },
  {
    id: 2,
    slug: "cataract-surgery",
    title: "Cataract Surgery",
    shortDescription:
      "Safe, modern, stitch-free cataract procedures with fast recovery.",
    fullDescription:
      "Cataract surgery at Galaxy Eye Hospital uses advanced phacoemulsification (micro-incision) technique to remove the clouded natural lens and replace it with a premium intraocular lens (IOL). We offer monofocal, multifocal, and toric IOL options to match your lifestyle and visual needs. The surgery is painless, stitch-free, and takes less than 15 minutes per eye.",
    icon: "cataract",
    image: "/hero.png",
    features: [
      "Micro-incision phacoemulsification",
      "Premium IOL options (monofocal, multifocal, toric)",
      "Painless and stitch-free",
      "Surgery in under 15 minutes",
      "Same-day discharge",
    ],
    duration: "10-15 minutes",
    recoveryTime: "1-2 weeks",
    successRate: "98%+",
    category: "surgical",
    popular: true,
    pageContent: {
      heroTagline: "Advanced, safe, and patient-focused cataract surgery designed to restore clarity and brightness to your vision.",
      heroDescription: "Modern micro-incision, stitch-free cataract surgery with premium lens implant options — performed by experienced surgeons with a 98%+ success rate.",
      heroImage: "/hero.png",
      whatIsTitle: "What is Cataract Surgery?",
      whatIsDescription: "A cataract is the clouding of the eye's natural lens, leading to blurred vision, glare, and difficulty seeing at night. Cataract surgery involves removing the clouded lens through a tiny micro-incision using phacoemulsification (ultrasound energy) and replacing it with a clear, artificial intraocular lens (IOL). At Galaxy Eye Hospital, we offer a range of premium IOLs — monofocal, multifocal, and toric — tailored to your lifestyle and visual needs. The surgery is painless, stitch-free, takes under 15 minutes per eye, and patients are discharged the same day.",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "Micro-incision phacoemulsification with a 98%+ success rate — the gold standard worldwide." },
        { title: "Quick and Effective Procedure", description: "Painless, stitch-free surgery completed in under 15 minutes with same-day discharge." },
        { title: "Performed by Experienced Specialists", description: "Our cataract surgeons collectively have 15,000+ successful procedures to their credit." },
        { title: "Trusted by Thousands of Patients", description: "Most patients report dramatically improved vision within 24 hours of surgery." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Thorough eye examination with biometry, IOL power calculation, and discussion of lens options to plan the best outcome for your vision." },
        { step: 2, title: "Procedure or Surgery", description: "Under topical anesthesia, the clouded lens is removed via phacoemulsification and replaced with a premium IOL through a self-sealing micro-incision. No stitches needed." },
        { step: 3, title: "Recovery & Follow-Up", description: "Vision improves within hours. Prescribed eye drops for a few weeks. Follow-up visits at 1 day, 1 week, and 6 weeks post-surgery to monitor healing." }
      ],
      faqs: [
        { question: "When should I get cataract surgery?", answer: "Surgery is recommended when cataracts start affecting your daily life — difficulty driving at night, reading, or recognizing faces. Our team will advise you after a thorough evaluation." },
        { question: "What type of lens implant is best for me?", answer: "We offer monofocal (distance), multifocal (distance + near), and toric (astigmatism correction) IOLs. The best option depends on your lifestyle and visual needs, which we discuss during consultation." },
        { question: "Is cataract surgery safe?", answer: "Yes, cataract surgery is one of the safest and most commonly performed surgeries worldwide, with a 98%+ success rate. Complications are extremely rare." },
        { question: "How long does recovery take?", answer: "Most patients see significant improvement within 24 hours. Full recovery typically takes 1-2 weeks, during which medicated eye drops are used." },
        { question: "Can cataracts come back?", answer: "No. Once removed, cataracts do not return. In some cases, a thin membrane behind the IOL may become cloudy (posterior capsular opacification), which is easily treated with a quick, painless YAG laser procedure." }
      ]
    },
  },
  {
    id: 3,
    slug: "retina-care",
    title: "Retina Care",
    shortDescription:
      "Treatment for diabetic retinopathy, retinal detachment, and macular conditions.",
    fullDescription:
      "Our retina department handles all medical and surgical retinal conditions including diabetic retinopathy, age-related macular degeneration (AMD), retinal detachment, macular holes, and epiretinal membranes. We use state-of-the-art imaging (OCT, FFA, ICG angiography) for precise diagnosis and offer treatments including intravitreal injections (Anti-VEGF), retinal laser photocoagulation, and vitreoretinal surgery.",
    icon: "retina",
    image: "/hero.png",
    features: [
      "High-resolution retinal OCT imaging",
      "Anti-VEGF intravitreal injections",
      "Retinal laser photocoagulation",
      "Vitreoretinal microsurgery",
      "Diabetic eye screening programs",
    ],
    duration: "Varies by procedure",
    recoveryTime: "1-4 weeks",
    successRate: "92%+",
    category: "surgical",
    popular: true,
    pageContent: {
      heroTagline: "Advanced, safe, and patient-focused retina treatments designed to protect and restore your vision.",
      heroDescription: "Expert management of diabetic retinopathy, macular degeneration, retinal detachment, and complex vitreoretinal conditions.",
      heroImage: "/hero.png",
      whatIsTitle: "What is Retina Care?",
      whatIsDescription: "The retina is the light-sensitive layer at the back of the eye, essential for clear vision. Retinal conditions — including diabetic retinopathy, age-related macular degeneration (AMD), retinal detachment, macular holes, and epiretinal membranes — require expert diagnosis and timely intervention. At Galaxy Eye Hospital, our retina department uses state-of-the-art imaging (OCT, FFA, ICG angiography) for precise diagnosis and offers advanced treatments including intravitreal injections (Anti-VEGF), retinal laser photocoagulation, and vitreoretinal microsurgery.",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "Evidence-based treatment protocols with high-resolution imaging for precise diagnosis." },
        { title: "Quick and Effective Procedure", description: "Intravitreal injections take minutes; laser treatments are performed as outpatient procedures." },
        { title: "Performed by Experienced Specialists", description: "Our vitreoretinal surgeons specialize exclusively in retinal conditions with years of dedicated training." },
        { title: "Trusted by Thousands of Patients", description: "Comprehensive diabetic eye screening programs serving 5,000+ patients annually." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Detailed retinal examination using OCT, Fundus Fluorescein Angiography (FFA), and B-Scan ultrasonography to map your condition precisely." },
        { step: 2, title: "Procedure or Surgery", description: "Based on diagnosis: Anti-VEGF intravitreal injections for wet AMD/diabetic macular edema, retinal laser for peripheral tears, or vitreoretinal microsurgery for complex cases." },
        { step: 3, title: "Recovery & Follow-Up", description: "Post-procedure monitoring with regular OCT imaging to track healing. Most injection patients resume activities the next day. Surgical cases may need 1-4 weeks of recovery." }
      ],
      faqs: [
        { question: "What are the warning signs of retinal problems?", answer: "Sudden flashes of light, new floaters, a shadow or curtain across your vision, or sudden vision loss require immediate attention. Diabetic patients should have annual retinal screenings even without symptoms." },
        { question: "How often do I need Anti-VEGF injections?", answer: "Treatment frequency depends on your condition. Initially, injections may be monthly for 3-6 months, then gradually spaced out based on your response. Our team follows a personalized treat-and-extend protocol." },
        { question: "Is retinal laser treatment painful?", answer: "Most patients experience only mild discomfort. The procedure is performed under topical anesthesia and typically takes 10-20 minutes." },
        { question: "Can diabetic retinopathy be reversed?", answer: "Early-stage damage can often be stabilized or improved with timely treatment. Advanced stages can be managed to prevent further vision loss. Regular screening is key to catching it early." },
        { question: "How long does recovery take after vitreoretinal surgery?", answer: "Recovery varies by procedure. Simple cases may recover in 1-2 weeks, while complex surgeries (like retinal detachment repair) may require 4-6 weeks. Your surgeon will provide a detailed recovery plan." }
      ]
    },
  },
  {
    id: 4,
    slug: "glaucoma-care",
    title: "Glaucoma Care",
    shortDescription:
      "Comprehensive glaucoma screening, monitoring, and treatment.",
    fullDescription:
      "Glaucoma is a group of eye conditions that damage the optic nerve, often caused by abnormally high intraocular pressure. Our glaucoma management program includes comprehensive diagnostic testing (OCT, visual field analysis, tonometry), medical therapy with eye drops, laser treatments (SLT, YAG PI), and advanced surgical options including trabeculectomy and glaucoma drainage devices.",
    icon: "glaucoma",
    image: "/hero.png",
    features: [
      "Advanced OCT and visual field analysis",
      "Customized medical therapy plans",
      "Selective Laser Trabeculoplasty (SLT)",
      "Minimally invasive glaucoma surgery (MIGS)",
      "Lifelong monitoring and care",
    ],
    duration: "Ongoing management",
    recoveryTime: "Varies by treatment",
    successRate: "95%+",
    category: "non-surgical",
    popular: false,
    pageContent: {
      heroTagline: "Advanced, safe, and patient-focused glaucoma management designed to protect your optic nerve and preserve your vision.",
      heroDescription: "Comprehensive glaucoma screening, monitoring, and treatment using the latest diagnostic and therapeutic technologies.",
      heroImage: "/hero.png",
      whatIsTitle: "What is Glaucoma Care?",
      whatIsDescription: "Glaucoma is a group of progressive eye conditions that damage the optic nerve, often caused by elevated intraocular pressure (IOP). Known as the 'silent thief of sight,' glaucoma typically has no early symptoms and can lead to irreversible vision loss if untreated. At Galaxy Eye Hospital, our glaucoma management program includes comprehensive diagnostic testing (OCT nerve fiber analysis, visual field analysis, tonometry, gonioscopy), customized medical therapy with eye drops, laser treatments (SLT, YAG PI), and advanced surgical options including trabeculectomy, glaucoma drainage devices, and minimally invasive glaucoma surgery (MIGS).",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "Evidence-based protocols with advanced OCT and visual field monitoring for early detection." },
        { title: "Quick and Effective Procedure", description: "Laser treatments like SLT take under 10 minutes and are performed in-clinic with minimal downtime." },
        { title: "Performed by Experienced Specialists", description: "Our glaucoma specialists are trained in the latest MIGS techniques and drainage device implantation." },
        { title: "Trusted by Thousands of Patients", description: "Lifelong monitoring plans that keep your eye pressure in check and your vision safe." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Comprehensive glaucoma workup including IOP measurement, gonioscopy, OCT optic nerve analysis, corneal pachymetry, and automated visual field testing." },
        { step: 2, title: "Procedure or Surgery", description: "Treatment begins with medicated eye drops. If needed, we offer SLT laser therapy, trabeculectomy, MIGS, or glaucoma drainage device implantation based on disease severity." },
        { step: 3, title: "Recovery & Follow-Up", description: "Regular follow-up visits every 3-6 months with IOP checks and visual field monitoring. Glaucoma requires lifelong management to prevent progression." }
      ],
      faqs: [
        { question: "Can glaucoma be cured?", answer: "Glaucoma cannot be cured, but it can be effectively managed. With timely treatment and regular monitoring, further vision loss can be prevented in most cases." },
        { question: "Who is at risk for glaucoma?", answer: "Risk factors include age over 40, family history of glaucoma, high eye pressure, diabetes, severe myopia, and prolonged steroid use. Regular screening is recommended for high-risk individuals." },
        { question: "Will I need to use eye drops forever?", answer: "Many glaucoma patients use eye drops long-term. However, laser treatments (SLT) or surgery may reduce or eliminate the need for drops in some cases." },
        { question: "Is glaucoma surgery risky?", answer: "Modern glaucoma surgeries, especially MIGS procedures, are very safe with minimal complications. Your specialist will recommend surgery only when benefits clearly outweigh risks." },
        { question: "How often should I get checked for glaucoma?", answer: "Adults over 40 should have a comprehensive eye exam every 1-2 years. Those with risk factors should be checked annually. Diagnosed patients need follow-up every 3-6 months." }
      ]
    },
  },
  {
    id: 5,
    slug: "pediatric-ophthalmology",
    title: "Pediatric Ophthalmology",
    shortDescription:
      "Specialized eye care for children and developmental vision concerns.",
    fullDescription:
      "Our pediatric ophthalmology service provides comprehensive eye exams and treatments tailored for children from infancy through adolescence. We specialize in diagnosing and treating strabismus (squint), amblyopia (lazy eye), refractive errors, congenital cataracts, and other childhood eye conditions. Our child-friendly environment ensures a comfortable experience for both children and parents.",
    icon: "pediatric",
    image: "/hero.png",
    features: [
      "Child-friendly examination rooms",
      "Squint (strabismus) correction",
      "Lazy eye (amblyopia) therapy",
      "Pediatric glasses and contact lenses",
      "School vision screening programs",
    ],
    duration: "30-45 minutes (exam)",
    recoveryTime: "Varies by treatment",
    successRate: "93%+",
    category: "non-surgical",
    popular: false,
    pageContent: {
      heroTagline: "Advanced, safe, and patient-focused pediatric eye care designed to protect and develop your child's vision.",
      heroDescription: "Specialized eye care for children from infancy through adolescence — covering squint, lazy eye, refractive errors, and developmental vision concerns.",
      heroImage: "/hero.png",
      whatIsTitle: "What is Pediatric Ophthalmology?",
      whatIsDescription: "Children's eyes are still developing, making early detection and treatment of eye conditions crucial for lifelong healthy vision. Our pediatric ophthalmology service provides comprehensive eye exams and treatments tailored for children — from routine vision screenings to complex surgical corrections. We specialize in strabismus (squint), amblyopia (lazy eye), congenital cataracts, blocked tear ducts, pediatric glaucoma, and refractive errors. Our child-friendly environment with colorful examination rooms and gentle, patient staff ensures a comfortable experience for both children and parents.",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "Age-appropriate diagnostic tools and treatment protocols designed specifically for growing eyes." },
        { title: "Quick and Effective Procedure", description: "Most pediatric eye exams take 30-45 minutes. Squint surgeries are day-care procedures with quick recovery." },
        { title: "Performed by Experienced Specialists", description: "Our pediatric ophthalmologists have dedicated training in children's eye conditions and surgery." },
        { title: "Trusted by Thousands of Patients", description: "School vision screening programs serving thousands of children annually across Pune." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Child-friendly eye exam including visual acuity testing, squint evaluation, cycloplegic refraction, and fundus examination. We use games and engaging tools to keep children comfortable." },
        { step: 2, title: "Procedure or Surgery", description: "Treatment may include prescription glasses, patching therapy for lazy eye, eye exercises, or surgical correction for squint. Each plan is customized to your child's specific needs and age." },
        { step: 3, title: "Recovery & Follow-Up", description: "Regular follow-up visits to monitor progress. Amblyopia therapy requires consistent patching and exercises at home. Squint surgery recovery is typically quick with children returning to school within a week." }
      ],
      faqs: [
        { question: "At what age should my child have their first eye exam?", answer: "The first comprehensive eye exam is recommended at 6 months, then at age 3, and before starting school. After that, annual exams are advised — or sooner if you notice any concerns." },
        { question: "What are signs that my child has a vision problem?", answer: "Watch for squinting, sitting too close to screens, tilting the head, frequent eye rubbing, difficulty reading, one eye turning in/out, or complaints of headaches. Some conditions have no visible signs, which is why regular screening is important." },
        { question: "Can lazy eye (amblyopia) be treated?", answer: "Yes, amblyopia is highly treatable when caught early — ideally before age 7. Treatment includes corrective glasses and patching therapy. Older children can also benefit, though treatment takes longer." },
        { question: "Is squint surgery safe for children?", answer: "Yes, squint (strabismus) surgery is very safe and commonly performed. It is a day-care procedure done under general anesthesia, and most children recover quickly with minimal discomfort." },
        { question: "Will my child need glasses permanently?", answer: "Not necessarily. Some childhood refractive errors stabilize or improve with age. Your doctor will monitor your child's prescription over time and advise accordingly." }
      ]
    },
  },
  {
    id: 6,
    slug: "low-vision-services",
    title: "Low Vision Services",
    shortDescription:
      "Vision rehabilitation and supportive solutions for reduced eyesight.",
    fullDescription:
      "Our low vision rehabilitation program helps patients with significant vision loss maximize their remaining sight and maintain independence. We offer comprehensive low vision evaluations, prescribe specialized optical aids (magnifiers, telescopes, electronic devices), and provide training in adaptive techniques for daily activities. Our team works with patients to develop personalized strategies for reading, mobility, and quality of life improvement.",
    icon: "lowvision",
    image: "/hero.png",
    features: [
      "Comprehensive low vision evaluation",
      "Specialized optical aids & magnifiers",
      "Electronic assistive devices",
      "Adaptive technique training",
      "Personalized rehabilitation plans",
    ],
    duration: "45-60 minutes (evaluation)",
    recoveryTime: "Ongoing support",
    successRate: "88%+",
    category: "non-surgical",
    popular: false,
    pageContent: {
      heroTagline: "Advanced, compassionate, and personalized low vision rehabilitation designed to help you make the most of your remaining sight.",
      heroDescription: "Specialized vision rehabilitation, optical aids, and adaptive training to help patients with reduced eyesight maintain independence and quality of life.",
      heroImage: "/hero.png",
      whatIsTitle: "What are Low Vision Services?",
      whatIsDescription: "Low vision refers to significant vision loss that cannot be fully corrected with regular glasses, contact lenses, medication, or surgery. Conditions like advanced macular degeneration, diabetic retinopathy, glaucoma, or retinitis pigmentosa may cause permanent visual impairment. Our low vision rehabilitation program helps patients maximize their remaining sight and maintain independence. We offer comprehensive low vision evaluations, prescribe specialized optical aids (magnifiers, telescopes, electronic devices), provide training in adaptive techniques for daily activities, and work with each patient to develop personalized strategies for reading, mobility, and overall quality of life improvement.",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "Evidence-based rehabilitation protocols that have helped thousands regain functional vision." },
        { title: "Quick and Effective Solutions", description: "Same-day assessment and access to a wide range of visual aids and assistive devices." },
        { title: "Performed by Experienced Specialists", description: "Our low vision specialists have dedicated training in visual rehabilitation and assistive technology." },
        { title: "Trusted by Thousands of Patients", description: "Personalized rehabilitation plans that significantly improve daily functioning and independence." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Comprehensive low vision evaluation assessing functional vision, contrast sensitivity, reading speed, and daily activity challenges. We also review your medical history and current treatments." },
        { step: 2, title: "Aids & Devices Prescription", description: "Based on your evaluation, we prescribe specialized optical aids — magnifying glasses, handheld/stand magnifiers, telescopic lenses, electronic magnifiers (CCTV), and screen-reading software." },
        { step: 3, title: "Training & Follow-Up", description: "Hands-on training in using your visual aids effectively plus adaptive techniques for reading, cooking, mobility, and other daily tasks. Regular follow-ups to adjust devices and strategies as needed." }
      ],
      faqs: [
        { question: "Who needs low vision services?", answer: "Anyone with vision loss that cannot be fully corrected with glasses, contacts, or surgery. Common conditions include advanced macular degeneration, diabetic retinopathy, glaucoma, and retinitis pigmentosa." },
        { question: "Can low vision be cured?", answer: "While the underlying condition often cannot be reversed, low vision rehabilitation can significantly improve functional vision and quality of life through optical aids, adaptive techniques, and environmental modifications." },
        { question: "What kind of devices will I need?", answer: "This depends on your specific needs. Options range from simple handheld magnifiers to electronic video magnifiers (CCTV), telescopic glasses, and digital screen readers. We help you find what works best for your lifestyle." },
        { question: "Is low vision rehabilitation covered by insurance?", answer: "Many insurance plans cover low vision evaluations and some assistive devices. Our team will help you understand your coverage and explore all available options." },
        { question: "How long does the rehabilitation process take?", answer: "The initial evaluation takes 45-60 minutes. Learning to use aids effectively may take several sessions over a few weeks. Rehabilitation is an ongoing process with periodic adjustments as your needs change." }
      ]
    },
  },
  {
    id: 7,
    slug: "diagnostic-services",
    title: "Diagnostic Services",
    shortDescription:
      "OCT, Fundus Camera, B-Scan, Pachymetry, and advanced imaging.",
    fullDescription:
      "Galaxy Eye Hospital is equipped with cutting-edge diagnostic technology for precise and early detection of eye conditions. Our diagnostic suite includes Optical Coherence Tomography (OCT), Fundus Photography, B-Scan Ultrasonography, Corneal Pachymetry, Visual Field Analysis, Corneal Topography, and Fluorescein Angiography. These advanced tools allow our specialists to detect conditions at their earliest stages and plan the most effective treatments.",
    icon: "diagnostic",
    image: "/hero.png",
    features: [
      "Optical Coherence Tomography (OCT)",
      "Fundus Camera & angiography",
      "B-Scan ultrasonography",
      "Corneal pachymetry & topography",
      "Automated visual field analysis",
    ],
    duration: "15-30 minutes per test",
    recoveryTime: "No recovery needed",
    successRate: "99%+ accuracy",
    category: "diagnostic",
    popular: false,
    pageContent: {
      heroTagline: "Advanced, precise, and comprehensive diagnostic imaging designed to detect eye conditions at their earliest stages.",
      heroDescription: "Cutting-edge diagnostic technology including OCT, Fundus Camera, B-Scan, Pachymetry, and advanced imaging for accurate and early detection.",
      heroImage: "/hero.png",
      whatIsTitle: "What are Diagnostic Services?",
      whatIsDescription: "Accurate diagnosis is the foundation of effective eye care. Galaxy Eye Hospital is equipped with a complete suite of cutting-edge diagnostic technology for precise, non-invasive assessment of your eye health. Our diagnostic services include Optical Coherence Tomography (OCT) for cross-sectional retinal imaging, Fundus Photography for detailed retinal documentation, B-Scan Ultrasonography for eyes with opaque media, Corneal Pachymetry for thickness measurement, Automated Visual Field Analysis for glaucoma and neurological assessment, Corneal Topography for surface mapping, and Fluorescein Angiography for blood vessel evaluation. These advanced tools allow our specialists to detect conditions at their earliest stages and plan the most effective treatments.",
      whatIsImage: "/hero.png",
      benefits: [
        { title: "Safe and Clinically Proven", description: "Non-invasive, painless diagnostic procedures with 99%+ accuracy in disease detection." },
        { title: "Quick and Effective Procedure", description: "Most diagnostic tests take 15-30 minutes and results are available immediately for your consultation." },
        { title: "Performed by Experienced Specialists", description: "Trained ophthalmic technicians operate the equipment, with specialist doctors interpreting every result." },
        { title: "Trusted by Thousands of Patients", description: "Our diagnostic center processes thousands of imaging studies annually with consistent precision." }
      ],
      process: [
        { step: 1, title: "Consultation & Diagnosis", description: "Your doctor identifies which diagnostic tests are needed based on your symptoms, medical history, and preliminary examination findings." },
        { step: 2, title: "Diagnostic Testing", description: "Our trained technicians perform the prescribed tests — OCT, fundus photography, visual field analysis, B-Scan, or other imaging — in our fully equipped diagnostic suite. Most tests are non-invasive and painless." },
        { step: 3, title: "Results & Treatment Plan", description: "Your specialist reviews and interprets the results during your consultation, explains findings in simple terms, and develops a personalized treatment plan based on the diagnostic data." }
      ],
      faqs: [
        { question: "Are diagnostic eye tests painful?", answer: "No. Almost all our diagnostic tests are completely non-invasive and painless. Some tests may require dilating eye drops, which can cause temporary light sensitivity and mild blurriness for 2-4 hours." },
        { question: "How long do the tests take?", answer: "Individual tests take 5-15 minutes each. A comprehensive diagnostic workup typically takes 30-60 minutes depending on the number of tests required." },
        { question: "Do I need to prepare for diagnostic tests?", answer: "Most tests require no special preparation. If dilation is needed, we recommend bringing sunglasses and arranging for someone to drive you home. Avoid wearing eye makeup on the day of your appointment." },
        { question: "How often should I get my eyes checked?", answer: "Adults should have a comprehensive eye exam every 1-2 years. Those with diabetes, glaucoma, or other risk factors should be screened more frequently as advised by their doctor." },
        { question: "Will insurance cover diagnostic tests?", answer: "Most diagnostic tests prescribed as part of your eye care treatment are covered under standard health insurance plans. Our billing team can help verify your coverage before the appointment." }
      ]
    },
  },
];

/**
 * Icon identifier mapping — components use this to render correct SVGs.
 * When migrating to a database, store icon names as strings and
 * use this map on the frontend to resolve them to components.
 */
export const serviceIconMap: Record<string, string> = {
  lasik: "Glasses",
  cataract: "Eye",
  glaucoma: "ScanEye",
  pediatric: "Baby",
  retina: "Activity",
  lowvision: "EyeOff",
  diagnostic: "MonitorCheck",
};

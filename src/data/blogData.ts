export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
  likes: number;
  image: string;
  trending: boolean;
  tags: string[];
}

export const blogCategories = [
  "All",
  "LASIK",
  "Eye Health",
  "Glaucoma",
  "Cataract",
  "Pediatric",
  "Nutrition",
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "understanding-lasik-surgery-complete-guide",
    title: "Understanding LASIK Surgery: A Complete Guide",
    excerpt:
      "Everything you need to know about LASIK — from candidacy to recovery. Learn how modern blade-free technology is transforming vision correction.",
    content: `## What Is LASIK?

LASIK (Laser-Assisted In Situ Keratomileusis) is a refractive eye surgery that corrects common vision problems such as nearsightedness, farsightedness, and astigmatism. The procedure reshapes the cornea so that light entering the eye is properly focused onto the retina, resulting in clearer vision.

Over the past two decades, LASIK has become one of the most popular elective surgeries worldwide, with millions of procedures performed each year. At Galaxy Eye Hospital, we use the latest blade-free femtosecond laser technology for maximum precision and safety.

## Am I a Good Candidate?

Not everyone is a suitable candidate for LASIK. During your comprehensive evaluation, our ophthalmologists will assess several factors including your corneal thickness, pupil size, refractive stability, and overall eye health. Generally, ideal candidates are over 18 years old, have had a stable prescription for at least one year, and do not have certain eye conditions such as keratoconus or severe dry eye.

It is also important to have realistic expectations. While LASIK has an exceptional success rate — over 96% of patients achieve 20/20 vision or better — results can vary depending on individual factors.

## The Procedure Step by Step

The entire LASIK procedure typically takes less than 30 minutes for both eyes. First, numbing eye drops are applied for comfort. The surgeon then creates a thin flap in the cornea using a femtosecond laser. This flap is gently lifted, and an excimer laser precisely reshapes the underlying corneal tissue based on your unique prescription. Finally, the flap is repositioned and begins healing naturally — no stitches required.

Most patients notice a dramatic improvement in vision within hours of the procedure. Many return to normal activities within 24 to 48 hours.

## Recovery and Aftercare

Proper aftercare is essential for optimal healing. You will be prescribed medicated eye drops to prevent infection and reduce inflammation. Avoid rubbing your eyes, swimming, and strenuous exercise for at least one week. Attend all follow-up appointments so your surgeon can monitor your healing progress.

Some patients experience temporary side effects such as dry eyes, glare, or halos around lights, particularly at night. These typically resolve within a few weeks to months as the eyes fully heal.

## Why Choose Galaxy Eye Hospital for LASIK?

With over 40 years of experience and more than 50,000 successful LASIK procedures, Galaxy Eye Hospital is a leader in vision correction. Our surgeons are fellowship-trained and use the most advanced technology available, including wavefront-guided and topography-guided treatments for truly personalized results.`,
    author: "Dr. Rajesh Dole",
    date: "February 20, 2026",
    category: "LASIK",
    readTime: "8 min read",
    views: 3420,
    likes: 187,
    image: "/hero.png",
    trending: true,
    tags: ["LASIK", "Vision Correction", "Eye Surgery", "Blade-Free", "Recovery"],
  },
  {
    id: 2,
    slug: "digital-eye-strain-protecting-your-vision",
    title: "Digital Eye Strain: How to Protect Your Vision in the Screen Age",
    excerpt:
      "Screens are everywhere — learn the warning signs of digital eye strain and practical tips to keep your eyes healthy in a digital world.",
    content: `## The Rise of Digital Eye Strain

In today's world, the average adult spends over seven hours a day looking at screens — computers, smartphones, tablets, and televisions. This prolonged exposure places significant stress on our eyes, leading to a condition known as digital eye strain or computer vision syndrome.

Symptoms include headaches, blurred vision, dry eyes, neck and shoulder pain, and difficulty focusing. While these effects are usually temporary, chronic strain can worsen existing vision problems and significantly reduce quality of life.

## Understanding Blue Light

Digital screens emit blue light, a high-energy visible light that can penetrate deep into the eye. While research on the long-term effects of blue light is still evolving, excessive exposure — particularly before bedtime — can disrupt your circadian rhythm and make it harder to fall asleep.

Blue light filtering glasses and screen protectors can help reduce exposure, but they are not a substitute for good screen habits. At Galaxy Eye Hospital, we offer comprehensive digital eye assessments to evaluate your specific risk factors.

## The 20-20-20 Rule

One of the simplest and most effective strategies to combat digital eye strain is the 20-20-20 rule: every 20 minutes, take a 20-second break and look at something at least 20 feet away. This gives your eye muscles a chance to relax and reduces the risk of fatigue.

Additionally, make a conscious effort to blink more often when using screens. We tend to blink about 66% less frequently when staring at a display, which contributes to dryness and discomfort.

## Optimizing Your Workspace

Your workspace setup plays a crucial role in eye comfort. Position your monitor at arm's length, with the top of the screen at or slightly below eye level. Adjust brightness to match your surrounding environment, and increase text size if you find yourself squinting.

Reduce glare by positioning your screen perpendicular to windows and using anti-glare coatings. Proper lighting — neither too bright nor too dim — helps reduce the contrast between your screen and surroundings.

## When to See an Eye Doctor

If you experience persistent symptoms despite following these guidelines, it may be time for a professional eye exam. You might need prescription computer glasses or other treatments. Regular comprehensive eye exams are the best way to catch and address vision problems before they become serious.`,
    author: "Dr. Priya Menon",
    date: "February 15, 2026",
    category: "Eye Health",
    readTime: "6 min read",
    views: 5210,
    likes: 243,
    image: "/hero.png",
    trending: true,
    tags: ["Digital Eye Strain", "Blue Light", "Screen Time", "Eye Health", "Workplace"],
  },
  {
    id: 3,
    slug: "early-warning-signs-of-glaucoma",
    title: "Early Warning Signs of Glaucoma You Shouldn't Ignore",
    excerpt:
      "Glaucoma is called the 'silent thief of sight' for a reason. Learn the subtle signs and why early detection is critical.",
    content: `## What Is Glaucoma?

Glaucoma is a group of eye conditions that damage the optic nerve, which is vital for good vision. This damage is often caused by abnormally high pressure in the eye (intraocular pressure). Glaucoma is one of the leading causes of irreversible blindness worldwide, particularly in people over age 60.

The most insidious aspect of glaucoma is that it typically develops slowly and without noticeable symptoms in its early stages. By the time vision loss becomes apparent, significant and permanent damage may have already occurred.

## Types of Glaucoma

The two most common types are open-angle glaucoma and angle-closure glaucoma. Open-angle glaucoma develops gradually as the eye's drainage system becomes less efficient over time. It is the most common form and often has no early warning signs.

Angle-closure glaucoma occurs when the iris bulges forward and blocks the drainage angle, causing a rapid buildup of pressure. This is a medical emergency that requires immediate treatment. Symptoms include severe eye pain, headache, nausea, blurred vision, and seeing halos around lights.

## Risk Factors

Several factors increase your risk of developing glaucoma. These include age (over 60), family history of glaucoma, elevated intraocular pressure, thin corneas, and certain medical conditions such as diabetes and high blood pressure. People of African, Asian, and Hispanic descent are at higher risk for certain types of glaucoma.

## Early Detection Saves Vision

Because glaucoma often has no early symptoms, regular comprehensive eye exams are the most important defense. During an exam, your ophthalmologist will measure your intraocular pressure, inspect the drainage angle, examine the optic nerve, test your peripheral vision, and measure corneal thickness.

At Galaxy Eye Hospital, we use advanced OCT (Optical Coherence Tomography) imaging to detect the earliest signs of optic nerve damage — often before any vision loss has occurred.

## Treatment Options

While vision lost to glaucoma cannot be restored, early treatment can slow or prevent further damage. Treatment options include prescription eye drops to reduce pressure, laser therapy (trabeculoplasty), minimally invasive glaucoma surgery (MIGS), and traditional surgical procedures for advanced cases. Your treatment plan will be tailored to your specific type and stage of glaucoma.`,
    author: "Dr. Anand Kulkarni",
    date: "February 8, 2026",
    category: "Glaucoma",
    readTime: "7 min read",
    views: 2890,
    likes: 156,
    image: "/hero.png",
    trending: false,
    tags: ["Glaucoma", "Eye Pressure", "Optic Nerve", "Early Detection", "Prevention"],
  },
  {
    id: 4,
    slug: "parents-guide-childrens-eye-health",
    title: "A Parent's Guide to Children's Eye Health",
    excerpt:
      "Children rarely complain about vision problems. Here's how to spot the signs and ensure your child's eyes develop properly.",
    content: `## Why Children's Eye Health Matters

Vision plays a critical role in a child's physical, cognitive, and social development. Approximately 80% of what children learn in school is presented visually. Undetected vision problems can lead to learning difficulties, behavioral issues, and reduced participation in activities.

The challenge is that children often don't realize their vision is abnormal — they assume everyone sees the way they do. This makes proactive screening and parental awareness essential.

## When to Schedule Eye Exams

The American Academy of Ophthalmology recommends eye screenings at birth, at 6 to 12 months of age, between ages 1 and 3, and again between ages 3 and 5. A comprehensive eye exam should be performed before starting school and then every one to two years thereafter.

At Galaxy Eye Hospital, our pediatric ophthalmologists are specially trained to examine young children using age-appropriate techniques and equipment, making the experience comfortable and even fun.

## Warning Signs to Watch For

Parents should watch for signs that may indicate a vision problem. These include squinting or closing one eye, holding books or devices very close to the face, frequent eye rubbing, tilting the head to one side, complaints of headaches or tired eyes, difficulty concentrating on schoolwork, and sitting too close to the television.

If your child's teacher reports attention or reading difficulties, an undiagnosed vision problem could be the underlying cause.

## Common Childhood Eye Conditions

Several eye conditions are more common in children. Amblyopia (lazy eye) occurs when one eye has weaker vision than the other, and the brain begins to favor the stronger eye. If caught early — ideally before age 7 — it can usually be corrected with patching, eye drops, or glasses.

Strabismus (crossed eyes) is a misalignment of the eyes that can be present from birth or develop in early childhood. Treatment may include glasses, prism lenses, vision therapy, or surgery depending on the type and severity.

Refractive errors such as myopia (nearsightedness), hyperopia (farsightedness), and astigmatism are also common and are easily corrected with glasses or contact lenses.

## Protecting Young Eyes

Encourage outdoor play — research shows that children who spend more time outdoors have a lower risk of developing myopia. Limit screen time according to age-appropriate guidelines, ensure proper lighting when reading, and always have children wear protective eyewear during sports. Sunglasses with UV protection are important for children too.`,
    author: "Dr. Sneha Patil",
    date: "January 30, 2026",
    category: "Pediatric",
    readTime: "7 min read",
    views: 1940,
    likes: 132,
    image: "/hero.png",
    trending: false,
    tags: ["Children", "Pediatric", "Eye Exam", "Amblyopia", "Myopia", "Parenting"],
  },
  {
    id: 5,
    slug: "nutrition-and-eye-health-foods-that-protect",
    title: "Nutrition and Eye Health: Foods That Protect Your Vision",
    excerpt:
      "Your diet directly impacts your eye health. Discover the nutrients and foods that can help preserve and enhance your vision.",
    content: `## The Connection Between Diet and Vision

What you eat significantly impacts the health of your eyes. Research has consistently shown that certain nutrients can reduce the risk of common eye diseases such as age-related macular degeneration, cataracts, dry eye syndrome, and glaucoma. A well-balanced diet rich in specific vitamins and minerals is one of the most effective ways to protect your vision long-term.

## Key Nutrients for Eye Health

Lutein and zeaxanthin are powerful antioxidants found in the retina and lens of the eye. They act as natural sunblock, filtering harmful blue light and protecting against oxidative damage. Kale, spinach, broccoli, and eggs are excellent sources.

Omega-3 fatty acids support the structural integrity of retinal cells and help prevent dry eye. Fatty fish like salmon, mackerel, and sardines are among the best sources. Vitamin C, found abundantly in citrus fruits, strawberries, and bell peppers, helps maintain healthy blood vessels in the eyes.

Vitamin A is essential for maintaining good night vision and a healthy cornea. It is found in sweet potatoes, carrots, mangoes, and liver. Zinc helps transport vitamin A from the liver to the retina and is found in meat, shellfish, legumes, and seeds.

## The AREDS2 Formula

The Age-Related Eye Disease Study 2 (AREDS2) identified a specific combination of nutrients that can reduce the risk of advanced macular degeneration by approximately 25%. The formula includes vitamin C (500 mg), vitamin E (400 IU), lutein (10 mg), zeaxanthin (2 mg), zinc (80 mg), and copper (2 mg).

If you are at risk for macular degeneration, speak with your eye doctor about whether AREDS2 supplements are right for you.

## Foods to Incorporate Daily

Build your eye-healthy diet around colorful fruits and vegetables — the deeper the color, the more antioxidants they typically contain. Aim for dark leafy greens at least five times per week, fatty fish two to three times per week, and a variety of colorful produce daily.

Nuts and seeds, particularly almonds and sunflower seeds, provide vitamin E. Whole grains and legumes supply zinc and other essential minerals. Stay well hydrated — adequate water intake is important for tear production and preventing dry eyes.

## Foods and Habits to Avoid

High-sugar diets increase the risk of diabetes, which is a leading cause of blindness. Excessive alcohol consumption and smoking both significantly increase the risk of cataracts and macular degeneration. Processed foods high in trans fats and sodium can contribute to elevated blood pressure, which affects blood flow to the eyes.

Making informed dietary choices today can have a profound impact on your vision health for decades to come.`,
    author: "Dr. Anand Kulkarni",
    date: "January 22, 2026",
    category: "Nutrition",
    readTime: "6 min read",
    views: 4150,
    likes: 298,
    image: "/hero.png",
    trending: true,
    tags: ["Nutrition", "Eye Health", "Vitamins", "Diet", "Prevention", "Macular Degeneration"],
  },
  {
    id: 6,
    slug: "cataract-surgery-modern-techniques-recovery",
    title: "Cataract Surgery: Modern Techniques and What to Expect",
    excerpt:
      "Cataract surgery has evolved dramatically. Learn about the latest techniques, premium lens options, and the road to clear vision.",
    content: `## Understanding Cataracts

A cataract is a clouding of the eye's natural lens, which sits behind the iris and pupil. The lens works like a camera lens, focusing light onto the retina at the back of the eye. When a cataract forms, the lens becomes opaque, causing blurred vision, faded colors, increased glare, and difficulty seeing at night.

Cataracts are primarily age-related and extremely common — by age 80, more than half of all adults will have had a cataract or cataract surgery. They are the leading cause of treatable blindness worldwide.

## When Is Surgery Needed?

Cataract surgery is recommended when the cataract significantly interferes with your daily activities such as reading, driving, or recognizing faces. In the early stages, updated glasses and brighter lighting may help. However, when these adjustments are no longer sufficient, surgery is the only effective treatment.

The good news is that cataract surgery is one of the safest and most commonly performed surgeries in the world, with a success rate exceeding 99%.

## Modern Surgical Techniques

At Galaxy Eye Hospital, we perform micro-incision cataract surgery (MICS) using phacoemulsification — a technique that uses ultrasonic energy to break up the cloudy lens through an incision smaller than 2.5 millimeters. The fragmented lens is then gently suctioned out and replaced with a clear artificial intraocular lens (IOL).

For even greater precision, we offer femtosecond laser-assisted cataract surgery, where a computer-guided laser performs key steps of the procedure with micron-level accuracy.

## Premium Lens Options

Modern IOLs offer patients more choices than ever. Monofocal lenses provide excellent distance vision, with reading glasses needed for close work. Multifocal and trifocal lenses provide clear vision at multiple distances, potentially eliminating the need for glasses altogether. Toric lenses correct astigmatism during cataract surgery. Extended depth of focus (EDOF) lenses provide a continuous range of functional vision.

Your surgeon will recommend the best lens option based on your lifestyle, visual needs, and eye anatomy.

## Recovery and Results

Recovery from cataract surgery is remarkably quick. Most patients notice improved vision within a day or two. You will use prescription eye drops for several weeks to prevent infection and control inflammation. Avoid heavy lifting and eye rubbing for at least one week.

Follow-up visits are scheduled at one day, one week, and one month after surgery. Most patients can resume driving within a few days and return to all normal activities within two to four weeks. The artificial lens is permanent and does not need to be replaced.`,
    author: "Dr. Rajesh Dole",
    date: "January 14, 2026",
    category: "Cataract",
    readTime: "7 min read",
    views: 3780,
    likes: 205,
    image: "/hero.png",
    trending: false,
    tags: ["Cataract", "Eye Surgery", "IOL", "Lens Implant", "Recovery", "Phacoemulsification"],
  },
];

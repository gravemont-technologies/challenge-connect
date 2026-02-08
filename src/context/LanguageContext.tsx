import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // App
    "app.name": "Tahqeeq",
    "app.tagline": "Operational Excellence Platform",
    "footer.rights": "All rights reserved.",

    // Settings
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",

    // Hero
    "hero.title": "Discover Tahqeeq: Unlock Efficient Ops with Local Talent",
    "hero.subtitle": "Transform operational bottlenecks into precision-matched challenges solved by pre-vetted local talent — cut costs, build your pipeline, and accelerate Qatarization. Automatically.",
    "hero.cta": "See How It Works",

    // Roles
    "role.student": "Student",
    "role.business": "Business",

    // Benefits Section
    "benefits.heading": "Why Tahqeeq",
    "benefits.tab.immediate": "Immediate",
    "benefits.tab.medium": "Medium-Term",
    "benefits.tab.long": "Long-Term",
    "benefits.side.corp": "For Corporations",
    "benefits.side.student": "For Students",

    // Immediate - Corps
    "benefits.imm.corp.cost": "20-40% Lower Cost",
    "benefits.imm.corp.cost.detail": "Save 20-40% vs. freelancers and consultants by leveraging motivated university talent for targeted operational tasks.",
    "benefits.imm.corp.onboarding": "Zero Onboarding Friction",
    "benefits.imm.corp.onboarding.detail": "Students already understand local context — no lengthy onboarding or cultural orientation needed.",
    "benefits.imm.corp.qatarization": "Instant Qatarization Progress",
    "benefits.imm.corp.qatarization.detail": "Every engagement generates audit-ready reports that count toward your Qatarization and nationalization targets.",
    "benefits.imm.corp.overload": "Reduced Internal Overload",
    "benefits.imm.corp.overload.detail": "Offload routine operational sub-tasks without the overhead of hiring additional full-time staff.",

    // Immediate - Students
    "benefits.imm.stu.experience": "Real-World Experience",
    "benefits.imm.stu.experience.detail": "Start working on live business tasks within days of signing up — no waiting for semester-long internships.",
    "benefits.imm.stu.portfolio": "Quick Portfolio Entries",
    "benefits.imm.stu.portfolio.detail": "Every completed submission becomes a verified portfolio credential you can share with future employers.",
    "benefits.imm.stu.badges": "Points & Badges",
    "benefits.imm.stu.badges.detail": "Earn visible progress markers immediately — gamified rewards that signal your growing expertise.",

    // Medium-Term - Corps
    "benefits.med.corp.conversion": "30% Intern Conversion",
    "benefits.med.corp.conversion.detail": "On average, 30% of top-performing students convert to paid interns — a pre-vetted, culture-fit talent pipeline.",
    "benefits.med.corp.ai": "AI-Driven Efficiency",
    "benefits.med.corp.ai.detail": "The platform learns from past tasks and submissions, enabling repeatable efficiency improvements over time.",
    "benefits.med.corp.pr": "Stronger PR & Morale",
    "benefits.med.corp.pr.detail": "Visible commitment to youth development boosts employer brand and internal team morale.",
    "benefits.med.corp.churn": "Lower Churn Risk",
    "benefits.med.corp.churn.detail": "Local hires retain 2x longer than expats — build sustainable teams rooted in the community.",

    // Medium-Term - Students
    "benefits.med.stu.network": "Professional Network",
    "benefits.med.stu.network.detail": "Team challenges connect you with peers and industry professionals across the GCC.",
    "benefits.med.stu.softskills": "Soft Skills Compounding",
    "benefits.med.stu.softskills.detail": "Collaboration, feedback loops, and deadlines sharpen the skills that technical courses often miss.",
    "benefits.med.stu.levelups": "Priority Challenge Access",
    "benefits.med.stu.levelups.detail": "Level-ups unlock invites to higher-quality, better-paying challenges before other students see them.",
    "benefits.med.stu.internships": "Internship Offers",
    "benefits.med.stu.internships.detail": "Consistently strong performance leads to real internship offers from the companies you've already impressed.",

    // Long-Term - Corps
    "benefits.long.corp.knowledge": "Knowledge Retention",
    "benefits.long.corp.knowledge.detail": "Local expertise stays within the ecosystem — institutional knowledge doesn't walk out the door.",
    "benefits.long.corp.pipeline": "Talent Pipeline Flywheel",
    "benefits.long.corp.pipeline.detail": "A self-reinforcing cycle: pre-vetted, culture-fit candidates ready to hire when you need them.",
    "benefits.long.corp.innovation": "Youth-Driven Innovation",
    "benefits.long.corp.innovation.detail": "Fresh perspectives from digital-native students bring competitive advantages that seasoned teams may overlook.",
    "benefits.long.corp.vision": "QNV2030 Alignment",
    "benefits.long.corp.vision.detail": "Align your brand with Qatar National Vision 2030 goals — unlock reputation advantages and potential grants access.",

    // Long-Term - Students
    "benefits.long.stu.career": "Accelerated Career Launch",
    "benefits.long.stu.career.detail": "A proven track record of delivered challenges fast-tracks you from internships to full-time roles.",
    "benefits.long.stu.resume": "GCC-Relevant Resume",
    "benefits.long.stu.resume.detail": "Build a resume and professional network specifically calibrated to the GCC job market.",
    "benefits.long.stu.confidence": "Compounding Confidence",
    "benefits.long.stu.confidence.detail": "Repeated real-world wins build the professional confidence that sets you apart in interviews.",
    "benefits.long.stu.advantage": "Lifelong Career Advantage",
    "benefits.long.stu.advantage.detail": "Early professional exposure creates a compounding head start that pays dividends throughout your career.",

    // Daily Life
    "daily.heading": "What Your Daily Life Looks Like",
    "daily.corp.title": "For Corporations",
    "daily.corp.1": "Post a challenge in minutes — just describe the business problem or task",
    "daily.corp.2": "AI matches you with pre-vetted students whose skills fit your needs",
    "daily.corp.3": "Review anonymized submissions, ensuring unbiased evaluation",
    "daily.corp.4": "Provide feedback and scores; top performers rise to the top",
    "daily.corp.5": "Offer internships or project extensions to proven talent",
    "daily.corp.6": "Track KPIs and outcomes through a clean dashboard",
    "daily.stu.title": "For Students",
    "daily.stu.1": "Browse challenges tailored to your skills and interests",
    "daily.stu.2": "Apply with one click — your profile does the talking",
    "daily.stu.3": "Work on real business problems, building portfolio-worthy experience",
    "daily.stu.4": "Receive actionable feedback from industry professionals",
    "daily.stu.5": "Earn points, badges, and climb the leaderboard",
    "daily.stu.6": "Get discovered for internships and job opportunities",

    // CTA
    "cta.heading": "Ready to see more?",
    "cta.signup": "I'm interested, sign me up!",
    "cta.demo.show": "Walk me thru the process",
    "cta.demo.hide": "Hide the walkthrough",
    "cta.form.title": "Join the Waitlist",

    // Demo
    "demo.label": "Interactive Demo",
    "demo.badge": "Simulation",
    "demo.tooltip": "This simulates the real app with rule-based interactions. Sign up to use live features with actual data and real impact.",
    "demo.welcome": "Welcome to",
    "demo.welcome.sub": "Experience the platform that connects operational excellence with emerging talent",
    "demo.role.corp": "I'm a Corporation",
    "demo.role.corp.desc": "Launch challenges, review AI-scored submissions, and convert top talent to interns",
    "demo.role.stu": "I'm a Student",
    "demo.role.stu.desc": "Match with challenges, build your portfolio, and earn internship opportunities",
    "demo.complete.title": "Demo Complete!",
    "demo.complete.desc": "You've experienced how {brand} connects corporations with student talent through precision-matched challenges. Ready to get started for real?",
    "demo.tryAnother": "Try Another Role",
    "demo.signUp": "Sign Up Now",
    "demo.badge.time": "5-15 min/cycle",
    "demo.badge.savings": "20-40% savings",
    "demo.badge.matching": "Skill-based matching",
    "demo.badge.earn": "Earn badges",

    // Generic
    "cta.getStarted": "Get Started",
    "cta.learnMore": "Learn More",
  },
  ar: {
    // App
    "app.name": "تحقيق",
    "app.tagline": "منصة التميز التشغيلي",
    "footer.rights": "جميع الحقوق محفوظة.",

    // Settings
    "settings.language": "اللغة",
    "settings.theme": "المظهر",
    "settings.light": "فاتح",
    "settings.dark": "داكن",

    // Hero
    "hero.title": "اكتشف تحقيق: أطلق العنان للكفاءة التشغيلية مع المواهب المحلية",
    "hero.subtitle": "حوّل الاختناقات التشغيلية إلى تحديات موجّهة تُحلّ بواسطة كفاءات محلية مُختارة — خفّض التكاليف، ابنِ خط المواهب، وسرّع التوطين. تلقائيًا.",
    "hero.cta": "شاهد كيف تعمل",

    // Roles
    "role.student": "طالب",
    "role.business": "شركة",

    // Benefits Section
    "benefits.heading": "لماذا تحقيق",
    "benefits.tab.immediate": "فوري",
    "benefits.tab.medium": "متوسط المدى",
    "benefits.tab.long": "طويل المدى",
    "benefits.side.corp": "للشركات",
    "benefits.side.student": "للطلاب",

    // Immediate - Corps
    "benefits.imm.corp.cost": "تكلفة أقل بـ ٢٠-٤٠٪",
    "benefits.imm.corp.cost.detail": "وفّر ٢٠-٤٠٪ مقارنة بالمستقلين والاستشاريين من خلال الاستفادة من طلاب جامعيين متحمسين للمهام التشغيلية.",
    "benefits.imm.corp.onboarding": "صفر احتكاك في التأهيل",
    "benefits.imm.corp.onboarding.detail": "الطلاب يفهمون السياق المحلي مسبقًا — لا حاجة لتأهيل أو توجيه ثقافي مطوّل.",
    "benefits.imm.corp.qatarization": "تقدم فوري في التوطين",
    "benefits.imm.corp.qatarization.detail": "كل مشاركة تولّد تقارير جاهزة للتدقيق تُحتسب ضمن أهداف التوطين والتقطير.",
    "benefits.imm.corp.overload": "تخفيف العبء الداخلي",
    "benefits.imm.corp.overload.detail": "انقل المهام التشغيلية الروتينية دون تكلفة توظيف موظفين إضافيين بدوام كامل.",

    // Immediate - Students
    "benefits.imm.stu.experience": "خبرة عملية حقيقية",
    "benefits.imm.stu.experience.detail": "ابدأ العمل على مهام حقيقية خلال أيام من التسجيل — لا انتظار لتدريب فصل دراسي كامل.",
    "benefits.imm.stu.portfolio": "إنجازات سريعة للملف",
    "benefits.imm.stu.portfolio.detail": "كل مهمة مكتملة تصبح شهادة موثقة في ملفك المهني يمكنك مشاركتها مع أصحاب العمل.",
    "benefits.imm.stu.badges": "نقاط وشارات",
    "benefits.imm.stu.badges.detail": "احصل على مؤشرات تقدم مرئية فورًا — مكافآت تفاعلية تعكس خبرتك المتنامية.",

    // Medium-Term - Corps
    "benefits.med.corp.conversion": "تحويل ٣٠٪ كمتدربين",
    "benefits.med.corp.conversion.detail": "في المتوسط، ٣٠٪ من أفضل الطلاب أداءً يتحولون إلى متدربين مدفوعي الأجر — خط مواهب مُختبر ومتوافق ثقافيًا.",
    "benefits.med.corp.ai": "كفاءة مدعومة بالذكاء الاصطناعي",
    "benefits.med.corp.ai.detail": "المنصة تتعلم من المهام والتسليمات السابقة، مما يتيح تحسينات كفاءة متكررة بمرور الوقت.",
    "benefits.med.corp.pr": "علاقات عامة ومعنويات أقوى",
    "benefits.med.corp.pr.detail": "الالتزام الواضح بتطوير الشباب يعزز العلامة التجارية كصاحب عمل ويرفع معنويات الفريق.",
    "benefits.med.corp.churn": "مخاطر استقالة أقل",
    "benefits.med.corp.churn.detail": "الموظفون المحليون يبقون ضعف مدة الوافدين — ابنِ فرقًا مستدامة متجذرة في المجتمع.",

    // Medium-Term - Students
    "benefits.med.stu.network": "شبكة مهنية متنامية",
    "benefits.med.stu.network.detail": "التحديات الجماعية تربطك بزملاء ومحترفين في مختلف دول الخليج.",
    "benefits.med.stu.softskills": "مهارات ناعمة تتراكم",
    "benefits.med.stu.softskills.detail": "التعاون وحلقات التغذية الراجعة والمواعيد النهائية تصقل المهارات التي لا تُدرّس في القاعات.",
    "benefits.med.stu.levelups": "أولوية في التحديات المتقدمة",
    "benefits.med.stu.levelups.detail": "الترقيات تفتح لك دعوات لتحديات أعلى جودة وأجرًا قبل غيرك.",
    "benefits.med.stu.internships": "عروض تدريب عملي",
    "benefits.med.stu.internships.detail": "الأداء المتسق المتميز يؤدي إلى عروض تدريب حقيقية من شركات أبهرتها بالفعل.",

    // Long-Term - Corps
    "benefits.long.corp.knowledge": "الاحتفاظ بالمعرفة المؤسسية",
    "benefits.long.corp.knowledge.detail": "الخبرة المحلية تبقى داخل المنظومة — المعرفة المؤسسية لا تغادر مع الموظفين.",
    "benefits.long.corp.pipeline": "دولاب المواهب الذاتي",
    "benefits.long.corp.pipeline.detail": "دورة تعزز نفسها: مرشحون مُختبرون ومتوافقون ثقافيًا جاهزون للتوظيف عند الحاجة.",
    "benefits.long.corp.innovation": "ابتكار بقيادة الشباب",
    "benefits.long.corp.innovation.detail": "وجهات نظر جديدة من جيل رقمي تجلب مزايا تنافسية قد تفوتها الفرق ذات الخبرة.",
    "benefits.long.corp.vision": "توافق مع رؤية ٢٠٣٠",
    "benefits.long.corp.vision.detail": "اربط علامتك التجارية بأهداف رؤية قطر الوطنية ٢٠٣٠ — واحصل على مزايا سمعة وفرص منح.",

    // Long-Term - Students
    "benefits.long.stu.career": "انطلاقة مهنية متسارعة",
    "benefits.long.stu.career.detail": "سجل حافل من التحديات المنجزة يُسرّع انتقالك من التدريب إلى الوظيفة الدائمة.",
    "benefits.long.stu.resume": "سيرة ذاتية خليجية متخصصة",
    "benefits.long.stu.resume.detail": "ابنِ سيرة ذاتية وشبكة مهنية مُعايرة خصيصًا لسوق العمل الخليجي.",
    "benefits.long.stu.confidence": "ثقة متراكمة",
    "benefits.long.stu.confidence.detail": "الإنجازات المتكررة في العالم الحقيقي تبني الثقة المهنية التي تميزك في المقابلات.",
    "benefits.long.stu.advantage": "ميزة مهنية مدى الحياة",
    "benefits.long.stu.advantage.detail": "التعرض المهني المبكر يخلق سبقًا متراكمًا يؤتي ثماره طوال مسيرتك المهنية.",

    // Daily Life
    "daily.heading": "كيف يبدو يومك مع تحقيق",
    "daily.corp.title": "للشركات",
    "daily.corp.1": "انشر تحديًا في دقائق — فقط صِف المشكلة أو المهمة التشغيلية",
    "daily.corp.2": "الذكاء الاصطناعي يطابقك مع طلاب مُختارين تناسب مهاراتهم احتياجاتك",
    "daily.corp.3": "راجع التسليمات مجهولة الهوية لضمان تقييم محايد",
    "daily.corp.4": "قدّم ملاحظات وتقييمات؛ الأفضل أداءً يرتقون للقمة",
    "daily.corp.5": "اعرض تدريبًا عمليًا أو امتدادات مشاريع للمواهب المُثبتة",
    "daily.corp.6": "تابع مؤشرات الأداء والنتائج عبر لوحة تحكم نظيفة",
    "daily.stu.title": "للطلاب",
    "daily.stu.1": "تصفّح تحديات مُصممة حسب مهاراتك واهتماماتك",
    "daily.stu.2": "قدّم بنقرة واحدة — ملفك يتحدث عنك",
    "daily.stu.3": "اعمل على مشاكل تجارية حقيقية وابنِ خبرة تستحق الإضافة لملفك",
    "daily.stu.4": "احصل على ملاحظات عملية من محترفين في المجال",
    "daily.stu.5": "اكسب نقاطًا وشارات وتسلّق لوحة المتصدرين",
    "daily.stu.6": "اكتشفك الشركات للتدريب وفرص العمل",

    // CTA
    "cta.heading": "هل أنت مستعد لمعرفة المزيد؟",
    "cta.signup": "أنا مهتم، سجّلني!",
    "cta.demo.show": "أرني كيف تعمل",
    "cta.demo.hide": "إخفاء العرض التوضيحي",
    "cta.form.title": "انضم لقائمة الانتظار",

    // Demo
    "demo.label": "عرض تفاعلي",
    "demo.badge": "محاكاة",
    "demo.tooltip": "هذا يحاكي التطبيق الحقيقي بتفاعلات مبنية على قواعد. سجّل لاستخدام الميزات الحية مع بيانات وتأثير حقيقي.",
    "demo.welcome": "مرحبًا بك في",
    "demo.welcome.sub": "اختبر المنصة التي تربط التميز التشغيلي بالمواهب الناشئة",
    "demo.role.corp": "أنا شركة",
    "demo.role.corp.desc": "أطلق تحديات، راجع تسليمات مُقيّمة بالذكاء الاصطناعي، وحوّل أفضل المواهب إلى متدربين",
    "demo.role.stu": "أنا طالب",
    "demo.role.stu.desc": "تطابق مع التحديات، ابنِ ملفك المهني، واكسب فرص تدريب",
    "demo.complete.title": "اكتمل العرض!",
    "demo.complete.desc": "لقد اختبرت كيف يربط تحقيق بين الشركات والمواهب الطلابية عبر تحديات موجّهة بدقة. هل أنت مستعد للبدء فعلًا؟",
    "demo.tryAnother": "جرّب دورًا آخر",
    "demo.signUp": "سجّل الآن",
    "demo.badge.time": "٥-١٥ دقيقة/دورة",
    "demo.badge.savings": "توفير ٢٠-٤٠٪",
    "demo.badge.matching": "مطابقة حسب المهارات",
    "demo.badge.earn": "اكسب شارات",

    // Generic
    "cta.getStarted": "ابدأ الآن",
    "cta.learnMore": "تعرف على المزيد",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (undefined === context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

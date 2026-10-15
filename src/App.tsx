import { useState, type FormEvent, type ReactNode } from "react";

type Screen =
  | "landing"
  | "auth"
  | "onboarding"
  | "dashboard"
  | "community"
  | "profile"
  | "about"
  | "contact"
  | "builder"
  | "pricing"
  | "checkout"
  | "success";

type IconName =
  | "arrow"
  | "spark"
  | "game"
  | "brain"
  | "wallet"
  | "home"
  | "grid"
  | "learn"
  | "user"
  | "bell"
  | "play"
  | "plus"
  | "check"
  | "lock"
  | "card"
  | "clock"
  | "chevron"
  | "wand"
  | "image"
  | "music"
  | "code"
  | "undo"
  | "redo"
  | "send"
  | "rocket";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  spark: <><path d="m12 3-1.2 3.8a5.8 5.8 0 0 1-4 4L3 12l3.8 1.2a5.8 5.8 0 0 1 4 4L12 21l1.2-3.8a5.8 5.8 0 0 1 4-4L21 12l-3.8-1.2a5.8 5.8 0 0 1-4-4Z" /></>,
  game: <><path d="M8.5 9.5h-3a4 4 0 0 0-3.7 5.5l1 2.5a2.5 2.5 0 0 0 4.2.7L9 16h6l2 2.2a2.5 2.5 0 0 0 4.2-.7l1-2.5a4 4 0 0 0-3.7-5.5h-3" /><path d="M12 7V3m-2 2h4M5.5 13.5h3m-1.5-1.5v3M17.5 13h.01M19 15h.01" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0 .5 5.7A3.5 3.5 0 0 0 9 18.5h1V5.8a2.3 2.3 0 0 0-.5-1.3Z" /><path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1-.5 5.7 3.5 3.5 0 0 1-3.5 5.8h-1V5.8a2.3 2.3 0 0 1 .5-1.3ZM6 9h2m8 3h2M7 16l3-2m7 2-3-2" /></>,
  wallet: <><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19v16H6.5A2.5 2.5 0 0 1 4 17.5Z" /><path d="M16 10h5v5h-5a2.5 2.5 0 0 1 0-5Z" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
  learn: <><path d="m3 7 9-4 9 4-9 4Z" /><path d="M7 9v5c0 2 2.2 4 5 4s5-2 5-4V9m4-2v6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
  play: <path d="m9 7 8 5-8 5Z" />,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  lock: <><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3 10h18M7 15h3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  wand: <><path d="m15 4 5 5L8 21l-5-5Z" /><path d="m6 14 4 4M6 3v4M4 5h4m11 9v4m-2-2h4" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="m3 17 5-4 4 3 3-2 6 5" /></>,
  music: <><path d="M9 18V5l10-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" /></>,
  code: <><path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" /></>,
  undo: <><path d="m9 7-5 5 5 5" /><path d="M20 17a7 7 0 0 0-7-7H4" /></>,
  redo: <><path d="m15 7 5 5-5 5" /><path d="M4 17a7 7 0 0 1 7-7h9" /></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  rocket: <><path d="M14 5c3-3 6-3 7-3 0 1 0 4-3 7l-4 4-5-5Z" /><path d="m9 8-5 1-2 3 6 1m6 0 1 6-3 2-1-5m-4 1c-2 0-3 1-3 3 2 0 3-1 3-3Z" /><circle cx="16" cy="7" r="1.5" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark"><Icon name="game" size={compact ? 20 : 24} /></span>
      {!compact && <strong>گیمنتیتو</strong>}
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "success";
  className?: string;
  disabled?: boolean;
}) {
  return <button disabled={disabled} className={`btn btn-${variant} ${className}`} onClick={onClick}>{children}</button>;
}

function ProgressDots({ current }: { current: number }) {
  return <div className="progress-dots">{[0, 1, 2].map((item) => <span key={item} className={item <= current ? "active" : ""} />)}</div>;
}

function Mentor({ small = false }: { small?: boolean }) {
  return (
    <div className={`mentor ${small ? "mentor-small" : ""}`} aria-label="پیکو، راهنمای گیمنتیتو">
      <span className="mentor-ear left" /><span className="mentor-ear right" />
      <span className="mentor-eye left" /><span className="mentor-eye right" />
      <span className="mentor-smile" /><span className="mentor-bolt">G</span>
    </div>
  );
}

function SupportWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="support-widget" dir="rtl">
      {open && (
        <div className="support-popover">
          <div className="support-head"><Mentor small /><div><strong>پشتیبان گیمنتیتو</strong><small>معمولاً فوری پاسخ می‌دهیم</small></div></div>
          <div className="support-message">سلام! درباره خرید، دوره‌ها یا ساخت بازی سؤالی داری؟</div>
          <div className="support-suggestions"><button>راهنمای خرید</button><button>شروع بازی‌سازی</button></div>
          <div className="support-input"><input placeholder="پیامت را بنویس..." /><button><Icon name="send" size={17} /></button></div>
        </div>
      )}
      <button className="support-fab" onClick={onToggle}><Icon name={open ? "plus" : "brain"} /><span>{open ? "بستن" : "راهنما"}</span></button>
    </div>
  );
}

const benefits = [
  { icon: "game" as IconName, title: "بازی خودت را بساز", text: "با کشیدن و رها کردن، ایده‌ات را زنده کن.", tone: "purple" },
  { icon: "brain" as IconName, title: "با AI یاد بگیر", text: "یک دستیار هوشمند همیشه کنارت است.", tone: "yellow" },
  { icon: "wallet" as IconName, title: "از خلاقیتت درآمد بساز", text: "بازی‌ات را منتشر کن و دیده شو.", tone: "coral" },
];

const plans = [
  { name: "برنزی", latin: "BRONZE", price: "۱", color: "bronze", features: ["دوره کامل بازی‌سازی", "آپدیت مادام‌العمر", "عضویت در جامعه سازندگان"] },
  { name: "نقره‌ای", latin: "SILVER", price: "۲", color: "silver", popular: true, features: ["همه امکانات برنزی", "ربات هوش مصنوعی گیمنتیتو", "بازخورد هوشمند روی پروژه"] },
  { name: "طلایی", latin: "GOLD", price: "۲.۵", color: "gold", features: ["همه امکانات نقره‌ای", "۲۰ ساعت مشاوره ماهانه", "مسیر اختصاصی کسب درآمد"] },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [selectedGoal, setSelectedGoal] = useState("game");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [experience, setExperience] = useState("new");
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [toast, setToast] = useState("");
  const [supportOpen, setSupportOpen] = useState(false);
  const [demoGame, setDemoGame] = useState<string | null>(null);
  const [demoStarted, setDemoStarted] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const submitWaitlist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const entries = JSON.parse(localStorage.getItem("gaminito-waitlist") || "[]");
    localStorage.setItem("gaminito-waitlist", JSON.stringify([...entries, { ...data, createdAt: new Date().toISOString() }]));
    setWaitlistSubmitted(true);
    event.currentTarget.reset();
  };

  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const runGame = () => {
    setIsRunning(true);
    setToast("بازی اجرا شد! قهرمانت آماده حرکت است.");
    window.setTimeout(() => setToast(""), 2800);
  };

  if (screen === "landing") {
    return (
      <main className="landing" dir="rtl">
        <div className="game-pattern" aria-hidden="true"><Icon name="game" /><Icon name="grid" /><Icon name="rocket" /><Icon name="play" /><Icon name="brain" /></div>
        <header className="landing-nav">
          <Logo />
          <nav className="desktop-links">
            <button onClick={() => navigate("landing")}>خانه</button>
            <button onClick={() => document.querySelector("#games")?.scrollIntoView({ behavior: "smooth" })}>بازی‌ها</button>
            <button onClick={() => navigate("pricing")}>بسته‌ها</button>
            <button onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}>چطور کار می‌کند؟</button>
          </nav>
          <div className="auth-actions"><Button variant="ghost" onClick={() => { setAuthMode("login"); navigate("auth"); }}>ورود</Button><Button onClick={() => { setAuthMode("signup"); navigate("auth"); }}>ثبت‌نام رایگان</Button></div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Icon name="spark" size={18} /> ایده‌ات منتظر توئه!</div>
            <h1>بازی بساز،<br /><span>آینده‌ات را بازی کن.</span></h1>
            <p>بدون حتی یک خط کدنویسی، بازی خودت را بساز، با هوش مصنوعی یاد بگیر و خلاقیتت را به درآمد تبدیل کن.</p>
            <div className="hero-actions">
              <Button onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}>ورود به لیست انتظار <Icon name="arrow" /></Button>
              <button className="watch-button" onClick={() => navigate("builder")}><span><Icon name="play" size={18} /></span> ببین چطور کار می‌کند</button>
            </div>
            <div className="trust-row">
              <div className="avatars"><span>آ</span><span>ر</span><span>س</span></div>
              <p><strong>+۲,۵۰۰</strong> بازی‌ساز نوجوان همین حالا با ما هستند</p>
            </div>
          </div>

          <div className="hero-visual" aria-label="نمایی از محیط بازی‌سازی">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="builder-card">
              <div className="mini-toolbar"><i /><i /><i /><span>بازی جدید من</span></div>
              <div className="mini-stage">
                <div className="sun" />
                <div className="cloud c1" /><div className="cloud c2" />
                <div className="mountain m1" /><div className="mountain m2" />
                <div className="ground" />
                <div className="hero-character"><span /><b /></div>
                <div className="coin coin-a">G</div><div className="coin coin-b">G</div>
              </div>
              <div className="mini-blocks"><span>وقتی بازی شروع شد</span><span>حرکت کن</span><span>۱۰ امتیاز بگیر</span></div>
            </div>
            <div className="floating-chip ai-chip"><Icon name="spark" /> دستیار AI</div>
            <div className="floating-chip income-chip"><Icon name="wallet" /> اولین درآمد!</div>
          </div>
        </section>

        <section id="how" className="benefits-section">
          <div className="section-heading"><span>از ایده تا بازی، ساده و هیجان‌انگیز</span><h2>اینجا هر ایده‌ای می‌تواند یک بازی شود</h2></div>
          <div className="benefit-grid">
            {benefits.map((item, index) => (
              <article className={`benefit-card ${item.tone}`} key={item.title}>
                <span className="step">۰{index + 1}</span>
                <div className="benefit-icon"><Icon name={item.icon} size={29} /></div>
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>
            ))}
          </div>
          <Button onClick={() => navigate("auth")}>ماجراجویی من را شروع کن <Icon name="arrow" /></Button>
        </section>
        <section id="waitlist" className="waitlist-section">
          <div className="waitlist-copy">
            <span className="small-kicker"><Icon name="spark" size={17} /> شروع زودتر از بقیه</span>
            <h2>اولین نفری باش که بازی خودش را می‌سازد</h2>
            <p>در لیست انتظار ثبت‌نام کن تا زمان شروع دوره، خبر تست‌های اولیه و یک جایزهٔ ویژه را دریافت کنی.</p>
            <div className="waitlist-perks"><span><Icon name="check" size={16} /> دسترسی زودهنگام</span><span><Icon name="check" size={16} /> تخفیف افتتاحیه</span><span><Icon name="check" size={16} /> دعوت به تست اولیه</span></div>
          </div>
          <div className="waitlist-card">
            {waitlistSubmitted ? (
              <div className="waitlist-success"><span><Icon name="check" size={27} /></span><h3>ثبت شد، ممنون!</h3><p>اطلاعاتت ذخیره شد. وقتی مرحلهٔ بعدی آماده شود، با تو تماس می‌گیریم.</p><button onClick={() => setWaitlistSubmitted(false)}>ثبت اطلاعات فرد دیگر</button></div>
            ) : (
              <form onSubmit={submitWaitlist}>
                <h3>عضویت در لیست انتظار</h3><p>کمتر از یک دقیقه زمان می‌برد.</p>
                <div className="waitlist-fields"><label><span>نام شما</span><input name="name" required placeholder="مثلاً علی یا مادر علی" /></label><label><span>نقش شما</span><select name="role" required defaultValue=""><option value="" disabled>انتخاب کنید</option><option value="parent">والد</option><option value="teen">نوجوان</option></select></label><label><span>سن نوجوان</span><select name="age" required defaultValue=""><option value="" disabled>انتخاب سن</option>{Array.from({ length: 7 }, (_, index) => <option key={index + 8} value={index + 8}>{index + 8} سال</option>)}</select></label><label><span>شماره موبایل یا ایمیل</span><input name="contact" required placeholder="۰۹۱۲... یا ایمیل" /></label><label className="waitlist-full"><span>چطور با ما آشنا شدی؟</span><select name="source" defaultValue=""><option value="" disabled>انتخاب کنید</option><option value="friend">معرفی دوستان</option><option value="social">شبکه‌های اجتماعی</option><option value="search">جست‌وجوی اینترنتی</option><option value="other">سایر</option></select></label></div>
                <label className="consent"><input type="checkbox" name="consent" value="yes" required /><span>با ثبت اطلاعات، با تماس دربارهٔ تست اولیه و اخبار Gaminito موافقم.</span></label>
                <Button>ثبت‌نام در لیست انتظار <Icon name="arrow" /></Button>
              </form>
            )}
          </div>
        </section>
        <section id="games" className="showcase-section">
          <div className="section-heading"><span>ساخته‌شده توسط بازی‌سازهای نوجوان</span><h2>این بازی‌ها از یک ایده کوچک شروع شدند</h2></div>
          <div className="game-gallery">
            {[
              ["فرار از سیاره بنفش", "آرین، ۱۲ ساله", "space"],
              ["شهر گربه‌های نینجا", "رها، ۱۰ ساله", "city"],
              ["قهرمان جنگل", "پارسا، ۱۳ ساله", "jungle"],
            ].map((game, index) => (
              <article className="gallery-card" key={game[0]} onClick={() => { setDemoGame(game[0]); setDemoStarted(false); }}>
                <div className={`gallery-art ${game[2]}`}><span className="gallery-player" /><i /><button aria-label={`نمایش دموی ${game[0]}`}><Icon name="play" /></button></div>
                <div><span>بازی شماره ۰{index + 1}</span><h3>{game[0]}</h3><p>{game[1]}</p></div>
              </article>
            ))}
          </div>
        </section>
        <section className="testimonial-section">
          <Mentor />
          <div><span className="small-kicker">حرف خانواده‌ها</span><blockquote>«قبلاً نگران زمان زیاد علی پای کامپیوتر بودم؛ حالا هر روز با هیجان چیزی می‌سازد و درباره‌اش برایمان توضیح می‌دهد.»</blockquote><p>مادر علی · عضو بسته نقره‌ای</p></div>
        </section>
        <footer className="landing-footer">
          <div className="footer-brand"><Logo /><p>جایی برای ساختن، یادگرفتن و باهم رشد کردن.</p></div>
          <div className="footer-links"><button onClick={() => navigate("about")}>درباره ما</button><button onClick={() => navigate("contact")}>ارتباط با ما</button><button onClick={() => navigate("pricing")}>تعرفه‌ها</button><button onClick={() => setSupportOpen(true)}>پشتیبانی</button></div>
          <small>© ۱۴۰۴ گیمنتیتو؛ همه حقوق محفوظ است.</small>
        </footer>
        {demoGame && (
          <div className="demo-overlay" role="dialog" aria-modal="true" aria-label={`دموی بازی ${demoGame}`}>
            <div className="demo-modal">
              <div className="demo-title"><div><span>دموی قابل بازی</span><h2>{demoGame}</h2></div><button onClick={() => setDemoGame(null)}>×</button></div>
              <div className={`demo-stage ${demoStarted ? "playing" : ""}`}>
                <span className="demo-moon" /><span className="demo-platform one" /><span className="demo-platform two" />
                <span className="demo-player" /><span className="demo-gem">G</span>
                {!demoStarted && <button className="demo-start" onClick={() => setDemoStarted(true)}><Icon name="play" /> اجرای دمو</button>}
              </div>
              <div className="demo-controls"><button onClick={() => setDemoStarted(true)}>→</button><button onClick={() => setDemoStarted(true)}>پرش</button><button onClick={() => setDemoStarted(true)}>←</button><p>{demoStarted ? "عالیه! قهرمان حرکت کرد و یک سکه گرفت." : "با کنترل‌ها یک مرحله کوتاه را امتحان کن."}</p></div>
              <Button onClick={() => navigate("builder")}>من هم بازی بسازم <Icon name="arrow" /></Button>
            </div>
          </div>
        )}
        <SupportWidget open={supportOpen} onToggle={() => setSupportOpen(!supportOpen)} />
      </main>
    );
  }

  if (screen === "auth") {
    return (
      <main className="auth-layout" dir="rtl">
        <section className="auth-panel">
          <button className="back-link" onClick={() => navigate("landing")}><Icon name="arrow" /> بازگشت به خانه</button>
          <div className="auth-box">
            <Logo />
            <div className="auth-title"><h1>{authMode === "signup" ? "بیا قهرمان بازی خودت باش!" : "خوش برگشتی، بازی‌ساز!"}</h1><p>{authMode === "signup" ? "ساخت حساب فقط یک دقیقه طول می‌کشد." : "ادامه بده؛ ایده‌های بزرگ منتظرت هستند."}</p></div>
            <div className="auth-tabs">
              <button className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>ثبت‌نام</button>
              <button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>ورود</button>
            </div>
            <div className="auth-methods">
              <button className={authMethod === "phone" ? "active" : ""} onClick={() => setAuthMethod("phone")}>شماره موبایل</button>
              <button className={authMethod === "email" ? "active" : ""} onClick={() => setAuthMethod("email")}>ایمیل</button>
            </div>
            <div className="form-stack">
              {authMode === "signup" && <label><span>اسمت چیه؟</span><input placeholder="مثلاً علی" defaultValue="علی" /></label>}
              {authMethod === "phone" ? (
                <label><span>شماره موبایل</span><div className="phone-input"><b>+۹۸</b><input inputMode="numeric" placeholder="۹۱۲ ۱۲۳ ۴۵۶۷" /></div></label>
              ) : (
                <label><span>آدرس ایمیل</span><input type="email" placeholder="name@example.com" dir="ltr" /></label>
              )}
              <label><span>رمز عبور</span><div className="password-input"><input type={showPassword ? "text" : "password"} placeholder="حداقل ۶ کاراکتر" defaultValue="12345678" /><button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "پنهان" : "نمایش"}</button></div></label>
              <Button onClick={() => navigate(authMode === "signup" ? "onboarding" : "dashboard")}>{authMode === "signup" ? "ساخت حساب و ادامه" : "ورود به گیمنتیتو"} <Icon name="arrow" /></Button>
              <p className="terms">با ادامه، <u>قوانین استفاده</u> و <u>حریم خصوصی</u> را می‌پذیری.</p>
            </div>
          </div>
        </section>
        <section className="auth-art">
          <div className="auth-art-content">
            <div className="auth-orbit"><span className="planet p1" /><span className="planet p2" /><span className="rocket-wrap"><Icon name="rocket" size={82} /></span></div>
            <blockquote>«هر بازی بزرگ، اول فقط یک ایده کوچک بوده.»</blockquote>
            <p>ایده تو چیه؟</p>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "onboarding") {
    const experiences = [
      { id: "new", icon: "spark" as IconName, title: "تازه‌کارم", desc: "تا حالا بازی نساختم" },
      { id: "some", icon: "game" as IconName, title: "یکم تجربه دارم", desc: "با چند ابزار کار کردم" },
      { id: "pro", icon: "code" as IconName, title: "حرفه‌ای‌ترم", desc: "قبلاً بازی ساخته‌ام" },
    ];
    const gameTypes = [
      { id: "adventure", icon: "rocket" as IconName, title: "ماجراجویی", desc: "کشف دنیاهای تازه" },
      { id: "platform", icon: "game" as IconName, title: "سکوبازی", desc: "پرش، سکه و مرحله" },
      { id: "story", icon: "brain" as IconName, title: "داستانی", desc: "شخصیت و انتخاب" },
    ];
    const choices = onboardingStep === 0 ? experiences : gameTypes;
    return (
      <main className="onboarding" dir="rtl">
        <header><Logo /><button onClick={() => navigate("auth")}><Icon name="arrow" /> بازگشت</button></header>
        <section className="onboarding-chat">
          <aside className="mentor-intro"><Mentor /><span>من پیکو هستم!</span><p>همراهت می‌مانم تا قدم‌به‌قدم بازی خودت را بسازی.</p></aside>
          <div className="onboarding-card">
          <ProgressDots current={onboardingStep} />
          <div className="mentor-bubble"><Mentor small /><div><small>پیکو · منتور تو</small><strong>{onboardingStep === 0 ? "اول بگو چقدر بازی‌سازی بلدی؟" : "عالیه! دوست داری چه بازی‌ای بسازی؟"}</strong></div></div>
          <p>{onboardingStep === 0 ? "جواب درست یا غلطی وجود ندارد؛ مسیرت را مناسب خودت می‌سازیم." : "بعداً می‌توانی سبک بازی را عوض کنی یا بازی تازه‌ای بسازی."}</p>
          <div className="goal-list">
            {choices.map((goal) => {
              const active = onboardingStep === 0 ? experience === goal.id : selectedGoal === goal.id;
              return (
              <button key={goal.id} className={active ? "selected" : ""} onClick={() => onboardingStep === 0 ? setExperience(goal.id) : setSelectedGoal(goal.id)}>
                <span className="goal-icon"><Icon name={goal.icon} size={26} /></span>
                <span><strong>{goal.title}</strong><small>{goal.desc}</small></span>
                <i>{active && <Icon name="check" size={17} />}</i>
              </button>
            )})}
          </div>
          <Button onClick={() => onboardingStep === 0 ? setOnboardingStep(1) : navigate("dashboard")}>{onboardingStep === 0 ? "ادامه" : "ساخت مسیر مخصوص من"} <Icon name="arrow" /></Button>
          {onboardingStep === 1 && <button className="skip" onClick={() => setOnboardingStep(0)}>مرحله قبل</button>}
          </div>
        </section>
      </main>
    );
  }

  const appNav = (
    <>
      <aside className="sidebar">
        <Logo />
        <div className="side-nav">
          <button className={screen === "dashboard" ? "active" : ""} onClick={() => navigate("dashboard")}><Icon name="home" /> خانه</button>
          <button className={screen === "builder" ? "active" : ""} onClick={() => navigate("builder")}><Icon name="grid" /> بازی‌های من</button>
          <button onClick={() => navigate("dashboard")}><Icon name="learn" /> آکادمی</button>
          <button className={screen === "community" ? "active" : ""} onClick={() => navigate("community")}><Icon name="user" /> جامعه و رتبه‌ها</button>
          <button className={screen === "pricing" ? "active" : ""} onClick={() => navigate("pricing")}><Icon name="wallet" /> کسب درآمد</button>
        </div>
        <div className="sidebar-upgrade">
          <span><Icon name="spark" /></span><strong>قدرت بیشتر می‌خوای؟</strong><p>دستیار AI را فعال کن</p>
          <button onClick={() => navigate("pricing")}>دیدن بسته‌ها</button>
        </div>
        <button className="profile-mini" onClick={() => navigate("profile")}><span>ع</span><div><strong>علی محمدی</strong><small>سطح ۳ · بازی‌ساز</small></div><Icon name="chevron" size={16} /></button>
      </aside>
      <nav className="mobile-nav">
        <button className={screen === "dashboard" ? "active" : ""} onClick={() => navigate("dashboard")}><Icon name="home" /><span>خانه</span></button>
        <button className={screen === "builder" ? "active" : ""} onClick={() => navigate("builder")}><Icon name="grid" /><span>بازی‌ها</span></button>
        <button className="mobile-create" onClick={() => navigate("builder")}><Icon name="plus" size={25} /></button>
        <button onClick={() => navigate("community")}><Icon name="user" /><span>جامعه</span></button>
        <button onClick={() => navigate("profile")}><Icon name="learn" /><span>پروفایل</span></button>
      </nav>
    </>
  );

  if (screen === "dashboard") {
    return (
      <main className="app-shell" dir="rtl">
        {appNav}
        <section className="app-content">
          <header className="app-header">
            <div><span className="mobile-logo"><Logo compact /></span><h1>سلام علی! آماده‌ای چیزی بسازی؟</h1><p>امروز یک قدم کوچک، فردا یک بازی بزرگ.</p></div>
            <div className="header-actions"><button className="coin-pill"><span>G</span> ۳۴۰ سکه</button><button className="streak"><span>۳</span> روز پیاپی</button><button className="icon-button"><Icon name="bell" /><i /></button></div>
          </header>

          <section className="dashboard-hero">
            <div>
              <span className="hero-label"><Icon name="spark" size={17} /> مرحله بعدی تو · ۵۰ سکه</span>
              <h2>علی، بیا قهرمان بازی‌ات را حرکت بدهیم!</h2>
              <p>پیکو کنارت است؛ این مرحله فقط ۸ دقیقه طول می‌کشد.</p>
              <Button variant="dark" onClick={() => navigate("builder")}><Icon name="play" /> شروع ساخت</Button>
            </div>
            <div className="dashboard-scene">
              <span className="d-cloud dc1" /><span className="d-cloud dc2" />
              <span className="d-island"><i /><b /></span>
              <span className="d-character"><i /><b /></span>
              <span className="d-coin">G</span>
            </div>
          </section>

          <section className="learning-hub">
            <div className="learning-path">
              <div className="path-heading"><div><span>مسیر بازی ماجراجویی من</span><h2>قدم بعدی را بردار</h2></div><strong>۲ از ۶</strong></div>
              <div className="path-steps">
                <button className="done"><span><Icon name="check" /></span><div><strong>ایده‌ات را انتخاب کن</strong><small>+۲۰ سکه دریافت شد</small></div></button>
                <button className="done"><span><Icon name="check" /></span><div><strong>قهرمانت را بساز</strong><small>+۳۰ سکه دریافت شد</small></div></button>
                <button className="current" onClick={() => navigate("builder")}><span><Icon name="play" /></span><div><strong>به قهرمان حرکت بده</strong><small>مرحله امروز · ۸ دقیقه</small></div><b>+۵۰ G</b></button>
                <button className="locked"><span><Icon name="lock" /></span><div><strong>سکه‌ها را جمع کن</strong><small>بعد از مرحله ۳ باز می‌شود</small></div></button>
              </div>
            </div>
            <div className="mentor-chat-card">
              <div className="chat-card-head"><Mentor small /><div><strong>با پیکو بساز</strong><small>دستیار بازی‌سازی تو</small></div><i /></div>
              <div className="chat-bubble-ai">سلام علی! دوست داری امروز به بازی‌ات دشمن اضافه کنیم یا یک قدرت ویژه؟</div>
              <div className="quick-replies"><button>دشمن اضافه کنیم</button><button>قدرت ویژه</button></div>
              <div className="chat-compose"><input placeholder="ایده‌ات را بگو..." /><button onClick={() => setToast("پیکو دارد برای ایده تو یک مرحله می‌سازد...")}><Icon name="send" size={17} /></button></div>
            </div>
          </section>

          <div className="content-title"><div><h2>ادامه بده</h2><p>پروژه‌ها و درس‌هایی که شروع کردی</p></div><button>مشاهده همه <Icon name="arrow" size={17} /></button></div>
          <div className="continue-grid">
            <article className="project-card" onClick={() => navigate("builder")}>
              <div className="project-preview">
                <span className="preview-land" /><span className="preview-player" />
                <button><Icon name="play" /></button>
              </div>
              <div className="card-body"><span className="type-tag">پروژه من</span><h3>فرار از جزیره مرموز</h3><div className="progress-line"><i style={{ width: "65%" }} /></div><p><span>۶۵٪ تکمیل شده</span><span>آخرین ویرایش: دیروز</span></p></div>
            </article>
            <article className="lesson-card">
              <div className="lesson-icon"><Icon name="brain" size={35} /></div>
              <div><span className="type-tag yellow-tag">درس پیشنهادی</span><h3>هوش مصنوعی چطور فکر می‌کند؟</h3><p><Icon name="clock" size={16} /> ۱۲ دقیقه · سطح مقدماتی</p><button>ادامه یادگیری <Icon name="arrow" size={16} /></button></div>
            </article>
          </div>

          <div className="stats-row">
            <div><span className="stat-icon purple"><Icon name="game" /></span><p>بازی‌های ساخته‌شده<strong>۳</strong></p></div>
            <div><span className="stat-icon yellow"><Icon name="clock" /></span><p>زمان خلاقیت<strong>۴.۵ ساعت</strong></p></div>
            <div><span className="stat-icon coral"><Icon name="spark" /></span><p>امتیاز تجربه<strong>۷۸۰ XP</strong></p></div>
          </div>
          <SupportWidget open={supportOpen} onToggle={() => setSupportOpen(!supportOpen)} />
          {toast && <div className="toast"><Icon name="check" /> {toast}</div>}
        </section>
      </main>
    );
  }

  if (screen === "community") {
    const leaders = [
      ["۱", "رها کریمی", "۲۳ بازی", "ر"],
      ["۲", "آرین رضایی", "۱۹ بازی", "آ"],
      ["۳", "کیان مرادی", "۱۶ بازی", "ک"],
      ["۴", "علی محمدی", "۱۲ بازی", "ع"],
    ];
    return (
      <main className="app-shell" dir="rtl">
        {appNav}
        <section className="app-content community-page">
          <header className="app-header"><div><span className="small-kicker">جامعه گیمنتیتو</span><h1>باهم بازی‌های بهتری می‌سازیم</h1><p>بازی کن، بازخورد بده و از ایده‌های هم یاد بگیرید.</p></div><button className="coin-pill"><span>G</span> ۳۴۰ سکه</button></header>
          <div className="community-grid">
            <section className="community-feed">
              <div className="feed-tabs"><button className="active">بازی‌های تازه</button><button>دنبال‌شده‌ها</button><button>گفت‌وگوها</button></div>
              {[
                ["رها کریمی", "شهر گربه‌های نینجا", "برای مرحله دوم دنبال یک ایده هیجان‌انگیزم. شما چی پیشنهاد می‌کنید؟", "city"],
                ["پارسا احمدی", "قهرمان جنگل", "نسخه جدید منتشر شد! حالا می‌توانید قدرت پرواز را هم پیدا کنید.", "jungle"],
              ].map((post, index) => (
                <article className="community-post" key={post[1]}>
                  <div className="post-author"><span>{post[0][0]}</span><div><strong>{post[0]}</strong><small>{index + 1} ساعت پیش · بازی منتشرشده</small></div><button>•••</button></div>
                  <div className={`post-game ${post[3]}`}><span className="gallery-player" /><button><Icon name="play" /></button><div><small>بازی کن</small><strong>{post[1]}</strong></div></div>
                  <p>{post[2]}</p>
                  <div className="post-actions"><button><span>♡</span> {24 + index * 13} پسند</button><button><Icon name="user" size={16} /> {8 + index * 4} نظر و ایده</button><button><Icon name="send" size={16} /> اشتراک</button></div>
                  <div className="comment-box"><span>ع</span><input placeholder="یک پیشنهاد دوستانه بنویس..." /><button><Icon name="send" size={16} /></button></div>
                </article>
              ))}
            </section>
            <aside className="leaderboard-card">
              <div className="leaderboard-head"><span><Icon name="spark" /></span><div><strong>جدول بازی‌سازها</strong><small>بیشترین بازی منتشرشده این ماه</small></div></div>
              <div className="podium"><div><span>آ</span><b>۲</b></div><div className="first"><span>ر</span><b>۱</b></div><div><span>ک</span><b>۳</b></div></div>
              <div className="leader-list">
                {leaders.map((leader) => <div className={leader[1].startsWith("علی") ? "me" : ""} key={leader[0]}><b>{leader[0]}</b><span>{leader[3]}</span><strong>{leader[1]}</strong><small>{leader[2]}</small></div>)}
              </div>
              <p>هر بازی که منتشر کنی، رتبه‌ات بالاتر می‌رود!</p>
            </aside>
          </div>
          <SupportWidget open={supportOpen} onToggle={() => setSupportOpen(!supportOpen)} />
        </section>
      </main>
    );
  }

  if (screen === "profile") {
    return (
      <main className="app-shell" dir="rtl">
        {appNav}
        <section className="app-content profile-page">
          <header className="app-header"><div><span className="small-kicker">فضای شخصی من</span><h1>پروفایل علی</h1><p>اینجا نشان می‌دهی چه جور بازی‌سازی هستی.</p></div><Button variant={profileSaved ? "success" : "secondary"} onClick={() => { setProfileSaved(true); setToast("تغییرات پروفایل با موفقیت ذخیره شد"); }}><Icon name="check" /> {profileSaved ? "تغییرات ذخیره شد" : "ذخیره تغییرات"}</Button></header>
          <section className="profile-hero">
            <div className="profile-avatar"><span>ع</span><button><Icon name="image" size={16} /></button></div>
            <div><h2>علی محمدی</h2><p>بازی‌ساز ماجراجو · سطح ۳</p><div className="profile-xp"><i /><span>۷۸۰ از ۱۰۰۰ XP تا سطح بعد</span></div></div>
            <div className="profile-coins"><span>G</span><div><strong>۳۴۰</strong><small>سکه قابل استفاده</small></div><button>فروشگاه جایزه‌ها</button></div>
          </section>
          <div className="profile-grid">
            <section className="profile-form">
              <h2>درباره من</h2>
              <div className="form-row"><label><span>نام نمایشی</span><input defaultValue="علی گیمر" /></label><label><span>سن</span><input defaultValue="۱۲ سال" /></label></div>
              <label><span>سبک بازی موردعلاقه</span><input defaultValue="ماجراجویی و سکوبازی" /></label>
              <label><span>یک جمله درباره خودت</span><input defaultValue="دوست دارم بازی‌هایی بسازم که هیچ‌کس پایانشان را حدس نزند!" /></label>
              <h2>حریم خصوصی</h2>
              <div className="privacy-row"><div><strong>نمایش بازی‌ها در جامعه</strong><small>بقیه می‌توانند بازی‌هایت را ببینند و نظر بدهند.</small></div><button className="toggle active"><i /></button></div>
              <div className="privacy-row"><div><strong>دریافت پیام از دوستان</strong><small>فقط افرادی که دنبال می‌کنی می‌توانند پیام بدهند.</small></div><button className="toggle active"><i /></button></div>
            </section>
            <aside className="achievement-card"><h2>نشان‌های من</h2><div className="badges"><span><Icon name="game" /><small>اولین بازی</small></span><span><Icon name="spark" /><small>۳ روز فعال</small></span><span><Icon name="user" /><small>منتقد خوب</small></span><span className="locked"><Icon name="lock" /><small>۱۰ بازی</small></span></div><div className="next-reward"><Mentor small /><p><strong>فقط ۲۲۰ XP مانده!</strong><br />در سطح ۴ یک لباس تازه برای پیکو می‌گیری.</p></div></aside>
          </div>
          <SupportWidget open={supportOpen} onToggle={() => setSupportOpen(!supportOpen)} />
          {toast && <div className="toast"><Icon name="check" /> {toast}</div>}
        </section>
      </main>
    );
  }

  if (screen === "builder") {
    return (
      <main className="builder-page" dir="rtl">
        <header className="builder-header">
          <div><button className="square-button" onClick={() => navigate("dashboard")}><Icon name="arrow" /></button><Logo compact /><div className="project-name"><strong>فرار از جزیره مرموز</strong><span>ذخیره شد</span></div></div>
          <div className="history-actions"><button><Icon name="undo" /></button><button><Icon name="redo" /></button></div>
          <div><Button variant="secondary"><Icon name="send" /> انتشار</Button><Button onClick={runGame}><Icon name="play" /> اجرا</Button></div>
        </header>
        <section className="builder-workspace">
          <aside className="tools-panel">
            <button className="active"><Icon name="grid" /><span>بلوک‌ها</span></button>
            <button><Icon name="image" /><span>ظاهر</span></button>
            <button><Icon name="music" /><span>صدا</span></button>
            <button><Icon name="wand" /><span>هوش مصنوعی</span></button>
          </aside>
          <aside className="blocks-panel">
            <h2>بلوک‌های حرکت</h2><p>بلوک‌ها را بکش و رها کن</p>
            <div className="code-block blue">۱۰ قدم حرکت کن</div>
            <div className="code-block blue">۱۵ درجه بچرخ</div>
            <div className="code-block purple">وقتی بازی شروع شد</div>
            <div className="code-block yellow">اگر به سکه رسیدی</div>
            <div className="code-block coral">۱ امتیاز اضافه کن</div>
          </aside>
          <section className="code-canvas">
            <div className="canvas-grid" />
            <div className="block-stack">
              <div className="code-block purple">وقتی بازی شروع شد</div>
              <div className="code-block blue attached">همیشه ۱۰ قدم حرکت کن</div>
              <div className="code-block yellow attached">اگر به سکه رسیدی</div>
              <div className="code-block coral nested">۱ امتیاز اضافه کن</div>
            </div>
            <div className="zoom-controls"><button>+</button><span>۱۰۰٪</span><button>−</button></div>
          </section>
          <section className="stage-panel">
            <div className="stage-top"><strong>صحنه بازی</strong><button onClick={runGame}><Icon name="play" /></button></div>
            <div className={`game-stage ${isRunning ? "running" : ""}`}>
              <span className="game-sun" /><span className="stage-cloud sc1" /><span className="stage-cloud sc2" />
              <span className="stage-mountain sm1" /><span className="stage-mountain sm2" /><span className="stage-ground" />
              <span className="stage-hero"><i /><b /></span><span className="stage-coin">G</span>
              <span className="score">امتیاز: {isRunning ? "۱" : "۰"}</span>
            </div>
            <div className="sprites"><button className="selected"><span className="sprite-character" /><small>قهرمان</small></button><button><span className="sprite-coin">G</span><small>سکه</small></button><button><Icon name="plus" /><small>شخصیت</small></button></div>
          </section>
        </section>
        <button className="ai-assistant" onClick={() => setToast("من اینجام! بگو دوست داری چه چیزی به بازی اضافه کنیم؟")}><Icon name="spark" /><span><strong>کمک می‌خوای؟</strong><small>از دستیار AI بپرس</small></span></button>
        {toast && <div className="toast"><Icon name="check" /> {toast}</div>}
      </main>
    );
  }

  if (screen === "about" || screen === "contact") {
    const isAbout = screen === "about";
    return (
      <main className="info-page" dir="rtl">
        <header className="simple-header"><Logo /><div className="auth-actions"><button onClick={() => navigate("landing")}>خانه</button><Button onClick={() => navigate("auth")}>شروع رایگان</Button></div></header>
        <section className="info-hero">
          <span className="small-kicker"><Icon name={isAbout ? "spark" : "user"} /> {isAbout ? "داستان ما" : "کنار شما هستیم"}</span>
          <h1>{isAbout ? "اسکرین‌تایم را به زمان ساختن تبدیل می‌کنیم" : "هر سؤالی داری از ما بپرس"}</h1>
          <p>{isAbout ? "گیمنتیتو ساخته شده تا بچه‌ها فقط مصرف‌کننده بازی نباشند؛ خالق دنیایی شوند که در ذهنشان دارند." : "برای سؤال‌های خرید، آموزش یا همکاری، تیم ما آماده پاسخ‌گویی است."}</p>
        </section>
        {isAbout ? (
          <section className="value-grid">
            <article><span><Icon name="game" /></span><h2>ساختن به‌جای تماشا</h2><p>هر درس با ساخت یک بخش واقعی از بازی تمام می‌شود.</p></article>
            <article><span><Icon name="brain" /></span><h2>AI امن و آموزشی</h2><p>هوش مصنوعی نقش راهنما دارد، نه جایگزین خلاقیت کودک.</p></article>
            <article><span><Icon name="user" /></span><h2>طراحی‌شده برای خانواده</h2><p>محیط امن، مسیر روشن و امکان همراهی والدین.</p></article>
          </section>
        ) : (
          <section className="contact-card">
            <div><h2>پیام برای گیمنتیتو</h2><label><span>نام شما</span><input placeholder="نام و نام خانوادگی" /></label><label><span>شماره تماس</span><input placeholder="۰۹۱۲..." /></label><label><span>پیام</span><textarea placeholder="چطور می‌توانیم کمک کنیم؟" /></label><Button>ارسال پیام <Icon name="send" /></Button></div>
            <aside><Mentor /><h2>جواب سریع می‌خواهی؟</h2><p>پیکو همین حالا می‌تواند به سؤال‌های رایج درباره بسته‌ها و شروع دوره جواب دهد.</p><Button variant="secondary" onClick={() => setSupportOpen(true)}>باز کردن پشتیبانی</Button><ul><li>شنبه تا پنجشنبه</li><li>۹ صبح تا ۸ شب</li><li>support@gaminito.com</li></ul></aside>
          </section>
        )}
        <SupportWidget open={supportOpen} onToggle={() => setSupportOpen(!supportOpen)} />
      </main>
    );
  }

  if (screen === "pricing") {
    return (
      <main className="pricing-page" dir="rtl">
        <header className="simple-header"><Logo /><button onClick={() => navigate("dashboard")}><Icon name="arrow" /> بازگشت به داشبورد</button></header>
        <section className="pricing-heading">
          <span className="small-kicker"><Icon name="spark" size={17} /> سرمایه‌گذاری روی خلاقیت</span>
          <h1>قدرت ساختن را انتخاب کن</h1>
          <p>هر بسته، یک مسیر تازه برای یادگیری و ساختن. هر زمان خواستی می‌توانی ارتقا بدهی.</p>
          <div className="audience-toggle"><button className="active">برای بازی‌سازها</button><button>برای والدین</button></div>
        </section>
        <section className="plan-grid">
          {plans.map((plan, index) => (
            <article key={plan.name} className={`plan-card ${plan.color} ${plan.popular ? "popular" : ""} ${selectedPlan === index ? "selected-plan" : ""}`} onClick={() => setSelectedPlan(index)}>
              {plan.popular && <span className="popular-badge">محبوب‌ترین انتخاب</span>}
              <div className="plan-symbol"><Icon name={index === 0 ? "game" : index === 1 ? "brain" : "rocket"} size={28} /></div>
              <span className="plan-latin">{plan.latin}</span><h2>{plan.name}</h2>
              <div className="price"><strong>{plan.price}</strong><span>میلیون تومان<br /><small>پرداخت یک‌باره</small></span></div>
              <div className="plan-divider" />
              <ul>{plan.features.map((feature) => <li key={feature}><span><Icon name="check" size={16} /></span>{feature}</li>)}</ul>
              <Button variant={plan.popular ? "primary" : "secondary"} onClick={() => { setSelectedPlan(index); navigate("checkout"); }}>انتخاب بسته {plan.name}</Button>
            </article>
          ))}
        </section>
        <section className="parent-note"><span><Icon name="lock" size={25} /></span><div><strong>پرداخت امن و ضمانت ۷ روزه بازگشت وجه</strong><p>دسترسی فرزندتان بلافاصله پس از پرداخت فعال می‌شود.</p></div><button>راهنمای والدین <Icon name="chevron" size={16} /></button></section>
      </main>
    );
  }

  if (screen === "checkout") {
    const plan = plans[selectedPlan];
    return (
      <main className="checkout-page" dir="rtl">
        <header className="simple-header"><Logo /><span>پرداخت امن <Icon name="lock" size={17} /></span></header>
        <section className="checkout-wrap">
          <div className="checkout-form">
            <button className="back-link" onClick={() => navigate("pricing")}><Icon name="arrow" /> بازگشت به انتخاب بسته</button>
            <div className="checkout-title"><span>۱</span><div><h1>اطلاعات پرداخت</h1><p>رسید خرید برای این شماره ارسال می‌شود.</p></div></div>
            <label><span>شماره موبایل والد</span><input inputMode="numeric" defaultValue="۰۹۱۲۱۲۳۴۵۶۷" /></label>
            <label><span>کد تخفیف <small>(اختیاری)</small></span><div className="discount-input"><input placeholder="کد را وارد کنید" /><button>اعمال کد</button></div></label>
            <div className="payment-method">
              <span className="radio active" /><span className="card-icon"><Icon name="card" /></span>
              <div><strong>پرداخت آنلاین</strong><small>تمام کارت‌های عضو شتاب</small></div>
              <div className="bank-cards"><i /><i /><i /></div>
            </div>
            <Button className="pay-button" onClick={() => navigate("success")}>پرداخت {plan.price} میلیون تومان <Icon name="lock" size={18} /></Button>
            <p className="secure-copy"><Icon name="lock" size={15} /> اطلاعات شما با رمزنگاری امن محافظت می‌شود.</p>
          </div>
          <aside className="order-summary">
            <h2>خلاصه سفارش</h2>
            <div className={`summary-plan ${plan.color}`}><span><Icon name={selectedPlan === 0 ? "game" : selectedPlan === 1 ? "brain" : "rocket"} /></span><div><small>بسته انتخابی</small><strong>{plan.name}</strong></div><button onClick={() => navigate("pricing")}>تغییر</button></div>
            <ul>{plan.features.map((feature) => <li key={feature}><Icon name="check" size={16} />{feature}</li>)}</ul>
            <div className="summary-price"><span>مبلغ بسته</span><strong>{plan.price} میلیون تومان</strong></div>
            <div className="summary-total"><span>مبلغ نهایی</span><strong>{plan.price} میلیون تومان</strong></div>
            <div className="guarantee"><Icon name="spark" /><p><strong>با خیال راحت شروع کن</strong><br />۷ روز ضمانت بازگشت وجه</p></div>
          </aside>
        </section>
      </main>
    );
  }

  return (
    <main className="success-page" dir="rtl">
      <Logo />
      <section className="success-card">
        <div className="success-burst"><span><Icon name="check" size={38} /></span></div>
        <span className="small-kicker">پرداخت موفق</span>
        <h1>عالیه علی! آماده‌ای شروع کنیم؟</h1>
        <p>بسته {plans[selectedPlan].name} با موفقیت فعال شد. حالا همه‌چیز برای ساختن اولین بازی فوق‌العاده‌ات آماده است.</p>
        <div className="receipt"><span>کد پیگیری</span><strong>GM-۲۴۸۹۳۱</strong><button onClick={() => setToast("کد پیگیری کپی شد")}>کپی</button></div>
        <Button onClick={() => navigate("dashboard")}>رفتن به داشبورد <Icon name="arrow" /></Button>
        <button className="text-button" onClick={() => navigate("builder")}>یا مستقیم اولین بازی را بساز</button>
      </section>
      <div className="success-note"><Icon name="spark" /><p><strong>قدم بعدی</strong><br />از داشبورد، مسیر یادگیری پیشنهادی خودت را شروع کن.</p></div>
      {toast && <div className="toast"><Icon name="check" /> {toast}</div>}
    </main>
  );
}

import { useEffect, useState } from "react";

type ClassValue =
	| string
	| number
	| boolean
	| undefined
	| null
	| ClassValue[]
	| { [key: string]: boolean | undefined | null };
function cn(...inputs: ClassValue[]): string {
	const out: string[] = [];
	const walk = (v: ClassValue) => {
		if (!v && v !== 0) return;
		if (typeof v === "string" || typeof v === "number") {
			out.push(String(v));
			return;
		}
		if (Array.isArray(v)) {
			v.forEach(walk);
			return;
		}
		if (typeof v === "object") {
			for (const k in v) if (v[k]) out.push(k);
		}
	};
	inputs.forEach((wait) => walk(wait));

	return out.join(" ");
}

function useReveal() {
	useEffect(() => {
		const els = document.querySelectorAll<HTMLElement>(".reveal");
		if (!("IntersectionObserver" in window)) {
			els.forEach((el) => el.classList.add("is-visible"));
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
}

/* =============================================================
   SECTION: Data Contract (PortfolioData)
   Shared field names with the other templates where the concept
   is the same (experience.achievements, certifications.title,
   personal.role) so the converter doesn't need template-specific
   branching. Education is an array here to support multiple
   degrees — worth aligning the data-engineer template to match.
   ============================================================= */

export interface PersonalInfo {
	name: string;
	role: string; // e.g. "Full-Stack Developer"
	summary: string; // hero paragraph
	email: string;
	phone: string;
	location: string;
}

export interface AboutInfo {
	paragraphs: string[]; // rendered in order under "About Me"
}

export interface ExperienceItem {
	company: string;
	role: string;
	duration: string;
	location: string;
	achievements: string[];
}

export interface ProjectItem {
	title: string;
	description: string;
	tags: string[];
	year: string;
	// display index (01, 02...) is computed from array position, not stored
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface EducationItem {
	degree: string;
	institution: string;
	year: string;
	location: string;
}

export interface CertificationItem {
	title: string;
	issuer: string;
	date: string;
}

export interface PortfolioData {
	personal: PersonalInfo;
	about: AboutInfo;
	experience: ExperienceItem[];
	projects: ProjectItem[];
	skills: SkillGroup[];
	education: EducationItem[];
	certifications: CertificationItem[];
}

/* =============================================================
   SECTION: Default (demo) data — used by the Browse/Template
   Selection screen. The Public page must pass real mapped data.
   ============================================================= */

export const DEFAULT_DATA: PortfolioData = {
	personal: {
		name: "Riya Tiwari",
		role: "Full-Stack Developer",
		summary:
			"Crafting digital experiences with clean code and creative solutions. Passionate about building scalable applications and delivering exceptional user experiences.",
		email: "riya.tiwari@example.com",
		phone: "+91 98765 43210",
		location: "Delhi, India",
	},
	about: {
		paragraphs: [
			"I'm a full-stack developer based in Delhi with 6+ years of experience designing and shipping production-grade web applications — from pixel-perfect interfaces to robust, scalable backends. I love turning ambiguous problems into clean, well-tested code that real people use every day.",
			"My work spans TypeScript, modern frontend frameworks, distributed backend systems, and cloud infrastructure. I care deeply about developer experience, product quality, accessibility, and building things that feel genuinely useful rather than merely novel.",
		],
	},
	experience: [
		{
			company: "Flipkart Internet Pvt. Ltd.",
			role: "Senior Full-Stack Engineer",
			duration: "2023 — Present",
			location: "Bengaluru · Hybrid",
			achievements: [
				"Led migration of the seller dashboard monolith to event-driven services, cutting p95 latency by 38%",
				"Mentored a team of 5 engineers through design reviews, pairing, and quarterly OKRs",
				"Architected a multi-tenant billing engine processing 2M+ invoices monthly",
			],
		},
		{
			company: "Zomato",
			role: "Full-Stack Developer",
			duration: "2020 — 2023",
			location: "Gurugram",
			achievements: [
				"Built a real-time analytics dashboard used by 12k daily active restaurant partners",
				"Designed a GraphQL gateway consolidating 6 REST APIs into a unified schema",
				"Reduced infrastructure spend by 27% through caching and database query tuning",
			],
		},
		{
			company: "Paytm",
			role: "Software Engineer",
			duration: "2018 — 2020",
			location: "Noida",
			achievements: [
				"Shipped customer-facing features across React, Node.js, and PostgreSQL",
				"Introduced an end-to-end testing pipeline that cut production regressions by 60%",
				"Owned the internal design system used across 4 payment products",
			],
		},
	],
	projects: [
		{
			title: "BharatCart",
			description:
				"A headless storefront for small Indian merchants with UPI checkout, GST invoicing, and a Hindi/English CMS.",
			tags: ["Next.js", "TypeScript", "Razorpay", "PostgreSQL"],
			year: "2025",
		},
		{
			title: "Chai Studio",
			description:
				"A drag-and-drop portfolio builder that lets developers ship theme-able sites from a single JSON config.",
			tags: ["React", "DnD Kit", "Vite", "Tailwind"],
			year: "2024",
		},
		{
			title: "MetroMate",
			description:
				"A Delhi Metro-aware commute planner with realtime train delays, crowd heatmaps, and offline-first sync.",
			tags: ["React Native", "WebSockets", "IndexedDB", "Node.js"],
			year: "2024",
		},
		{
			title: "Sahayak AI",
			description:
				"A conversational assistant for government scheme discovery, streaming LLM responses in 11 Indian languages.",
			tags: ["Next.js", "OpenAI", "Edge Runtime", "Redis"],
			year: "2025",
		},
		{
			title: "Vidya LMS",
			description:
				"Multi-tenant learning platform for coaching institutes — courses, quizzes, live classes, and progress tracking.",
			tags: ["Remix", "Prisma", "PostgreSQL", "AWS"],
			year: "2023",
		},
	],
	skills: [
		{
			category: "Frontend",
			items: [
				"React",
				"Next.js",
				"TypeScript",
				"Tailwind CSS",
				"Framer Motion",
			],
		},
		{
			category: "Backend",
			items: ["Node.js", "Express", "tRPC", "GraphQL", "Python", "Go"],
		},
		{
			category: "Database",
			items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "SQLite"],
		},
		{
			category: "Tools",
			items: ["Git", "Docker", "Terraform", "Postman", "VS Code", "Vitest"],
		},
		{
			category: "Cloud",
			items: ["AWS", "Vercel", "GCP", "Cloudflare", "GitHub Actions"],
		},
	],
	education: [
		{
			degree: "B.Tech, Computer Science & Engineering",
			institution: "Indian Institute of Technology (IIT) Delhi",
			year: "2018",
			location: "New Delhi",
		},
	],
	certifications: [
		{
			title: "AWS Certified Solutions Architect — Associate",
			issuer: "Amazon Web Services",
			date: "2024",
		},
		{
			title: "Professional Scrum Master I (PSM I)",
			issuer: "Scrum.org",
			date: "2023",
		},
		{
			title: "Google Cloud Associate Engineer",
			issuer: "Google Cloud",
			date: "2022",
		},
		{
			title: "Meta Front-End Developer Professional Certificate",
			issuer: "Meta",
			date: "2021",
		},
	],
};

const navItems = [
	{ id: "about", label: "About" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "skills", label: "Skills" },
	{ id: "education", label: "Education" },
	{ id: "certifications", label: "Certifications" },
	{ id: "contact", label: "Contact" },
];

/* ───────────────────── COMPONENT ───────────────────────────────────────── */
// This is the real template component. `portfolioData` is required —
// callers (Browse screen, Public page) must always pass it explicitly.
export function FullStackProTemplate({
	portfolioData,
}: {
	portfolioData: PortfolioData;
}) {
	const {
		personal,
		about,
		experience,
		projects,
		skills,
		education,
		certifications,
	} = portfolioData;

	useReveal();
	const [active, setActive] = useState<string>("about");
	const [scrolled, setScrolled] = useState(false);
	const [navOpen, setNavOpen] = useState(false);

	useEffect(() => {
		const sections = navItems
			.map((n) => document.getElementById(n.id))
			.filter((el): el is HTMLElement => el !== null);
		const io = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setActive(visible[0].target.id);
			},
			{ rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
		);
		sections.forEach((s) => io.observe(s));
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setNavOpen(false);
	};

	return (
		<div
			className="relative min-h-screen bg-[#fafaf9] text-[#0c0a09] antialiased selection:bg-orange-500 selection:text-white"
			style={{
				backgroundImage:
					"linear-gradient(to right, rgba(12,10,9,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,10,9,0.05) 1px, transparent 1px)",
				backgroundSize: "64px 64px",
			}}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[680px] bg-gradient-to-b from-orange-500/15 via-orange-500/[0.05] to-transparent blur-2xl"
			/>

			{/* ─── NAV ─── */}
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					scrolled
						? "bg-[#fafaf9]/80 backdrop-blur-xl border-b border-stone-900/10"
						: "bg-transparent",
				)}
			>
				<nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
					<a
						href="#about"
						onClick={(e) => goTo(e, "about")}
						className="text-2xl font-black tracking-tight text-[#0c0a09]"
					>
						{personal.name.split(" ")[0]}
						<span className="text-orange-500">.</span>
					</a>

					<ul className="hidden items-center gap-8 md:flex">
						{navItems.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									onClick={(e) => goTo(e, item.id)}
									className={cn(
										"text-[15px] font-medium transition-colors",
										active === item.id
											? "text-orange-500"
											: "text-stone-600 hover:text-[#0c0a09]",
									)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>

					<button
						onClick={() => setNavOpen((o) => !o)}
						aria-label="Toggle menu"
						className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0c0a09] hover:bg-stone-900/5 md:hidden"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							{navOpen ? (
								<>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</>
							) : (
								<>
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</>
							)}
						</svg>
					</button>
				</nav>

				{navOpen && (
					<div className="border-t border-stone-900/10 bg-[#fafaf9] md:hidden">
						<ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
							{navItems.map((item) => (
								<li key={item.id}>
									<a
										href={`#${item.id}`}
										onClick={(e) => goTo(e, item.id)}
										className={cn(
											"block rounded-lg px-3 py-2.5 text-sm font-medium",
											active === item.id
												? "bg-orange-500 text-white"
												: "text-stone-700 hover:bg-stone-900/5",
										)}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				)}
			</header>

			<main className="relative">
				{/* ─── HERO ─── */}
				<section
					id="hero"
					className="relative flex min-h-screen items-center px-6 pt-32 pb-24 lg:px-10"
				>
					<div className="relative mx-auto w-full max-w-5xl text-center">
						<p className="reveal text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
							{personal.role} · {new Date().getFullYear()}
						</p>

						<h1 className="reveal mt-6 text-[clamp(3rem,10vw,9rem)] font-black leading-[0.9] tracking-[-0.045em] text-[#0c0a09]">
							{personal.name}
						</h1>

						<h2 className="reveal mt-4 text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight text-orange-500">
							{personal.role}
							<span className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.15em] animate-pulse bg-orange-500 align-middle" />
						</h2>

						<p className="reveal mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-stone-600 sm:text-xl md:text-2xl">
							{personal.summary}
						</p>

						<p className="reveal mt-8 inline-flex items-center gap-2 text-base font-medium text-stone-500">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.4"
								strokeLinecap="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							{personal.location}
						</p>

						<div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
							<a
								href="#contact"
								onClick={(e) => goTo(e, "contact")}
								className="group inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40"
							>
								Get In Touch
								<svg
									className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
								>
									<line x1="5" y1="12" x2="19" y2="12" />
									<polyline points="12 5 19 12 12 19" />
								</svg>
							</a>
						</div>
					</div>
				</section>

				{/* ─── ABOUT ─── */}
				<section
					id="about"
					className="relative scroll-mt-20 border-t border-stone-900/10 px-6 py-28 lg:px-10 lg:py-36"
				>
					<div className="mx-auto max-w-6xl">
						<div className="reveal mb-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
							<div className="lg:col-span-4">
								<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									01 — About
								</span>
								<h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#0c0a09] lg:text-6xl">
									About Me
								</h2>
							</div>
							<p className="text-base text-stone-500 lg:col-span-8 lg:text-lg">
								A short introduction to who I am, what I do, and what I care
								about as an engineer.
							</p>
						</div>

						<div className="max-w-3xl">
							<div className="reveal space-y-6">
								{about.paragraphs.map((p, i) => (
									<p
										key={i}
										className="text-lg leading-relaxed text-stone-700 sm:text-xl"
									>
										{p}
									</p>
								))}
							</div>

							<a
								href="#contact"
								onClick={(e) => goTo(e, "contact")}
								className="reveal group mt-10 inline-flex items-center gap-2 text-base font-bold text-[#0c0a09]"
							>
								<span className="draw-line inline-block">
									Let's work together
								</span>
								<svg
									className="h-4 w-4 transition-transform group-hover:translate-x-1 text-orange-500"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									strokeLinecap="round"
								>
									<line x1="5" y1="12" x2="19" y2="12" />
									<polyline points="12 5 19 12 12 19" />
								</svg>
							</a>
						</div>
					</div>
				</section>

				{/* ─── EXPERIENCE ─── */}
				<section
					id="experience"
					className="relative scroll-mt-20 border-t border-stone-900/10 bg-stone-50/50 px-6 py-28 lg:px-10 lg:py-36"
				>
					<div className="mx-auto max-w-6xl">
						<div className="reveal mb-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
							<div className="lg:col-span-5">
								<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									02 — Experience
								</span>
								<h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#0c0a09] lg:text-6xl">
									Work <span className="text-orange-500">Experience</span>
								</h2>
							</div>
							<p className="text-base text-stone-500 lg:col-span-7 lg:text-lg">
								Six years building products across Indian startups and
								large-scale consumer platforms.
							</p>
						</div>

						<ol className="relative">
							<span
								aria-hidden
								className="absolute left-0 top-0 bottom-0 w-px bg-stone-200 md:left-[180px]"
							/>
							{experience.map((item, idx) => (
								<li
									key={idx}
									className="reveal relative grid grid-cols-1 gap-6 border-b border-stone-200 py-10 md:grid-cols-[180px_1fr] md:gap-10 md:py-14"
								>
									<div className="md:pr-8">
										<span className="relative inline-block text-sm font-bold text-orange-500">
											<span className="absolute -left-[33px] top-1.5 hidden h-2 w-2 rounded-full bg-orange-500 ring-4 ring-orange-500/20 md:block" />
											{item.duration}
										</span>
										<p className="mt-1 text-xs font-medium uppercase tracking-wider text-stone-500">
											{item.location}
										</p>
									</div>
									<div>
										<h3 className="text-2xl font-black tracking-tight text-[#0c0a09] sm:text-3xl">
											{item.role}
										</h3>
										<p className="mt-1 text-base font-semibold text-stone-600">
											{item.company}
										</p>
										<ul className="mt-6 space-y-3">
											{item.achievements.map((b, i) => (
												<li
													key={i}
													className="flex items-start gap-3 text-base leading-relaxed text-stone-700"
												>
													<span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
													<span>{b}</span>
												</li>
											))}
										</ul>
									</div>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* ─── PROJECTS ─── */}
				<section
					id="projects"
					className="relative scroll-mt-20 border-t border-stone-900/10 px-6 py-28 lg:px-10 lg:py-36"
				>
					<div className="mx-auto max-w-6xl">
						<div className="reveal mb-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
							<div className="lg:col-span-6">
								<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									03 — Projects
								</span>
								<h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#0c0a09] lg:text-6xl">
									Selected <span className="text-orange-500">Projects</span>
								</h2>
							</div>
							<p className="text-base text-stone-500 lg:col-span-6 lg:text-lg lg:text-right">
								A handful of products I've designed, built, and shipped — end to
								end.
							</p>
						</div>

						<div className="divide-y divide-stone-200 border-y border-stone-200">
							{projects.map((p, idx) => (
								<div
									key={p.title}
									className="reveal group grid grid-cols-1 items-center gap-4 py-10 transition-colors hover:bg-orange-500/[0.03] sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-12"
								>
									<span className="text-sm font-black tracking-tight text-stone-400 transition-colors group-hover:text-orange-500 sm:w-16">
										{String(idx + 1).padStart(2, "0")}
									</span>

									<div className="min-w-0">
										<div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
											<h3 className="text-3xl font-black tracking-tight text-[#0c0a09] transition-colors group-hover:text-orange-500 sm:text-4xl">
												{p.title}
											</h3>
											<span className="text-sm font-semibold text-stone-400">
												/ {p.year}
											</span>
										</div>
										<p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
											{p.description}
										</p>
										<div className="mt-4 flex flex-wrap gap-2">
											{p.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-full border border-stone-300 bg-white px-3 py-0.5 text-xs font-semibold text-stone-700 transition-colors group-hover:border-orange-500 group-hover:text-orange-600"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ─── SKILLS ─── */}
				<section
					id="skills"
					className="relative scroll-mt-20 border-t border-stone-900/10 bg-stone-50/50 px-6 py-28 lg:px-10 lg:py-36"
				>
					<div className="mx-auto max-w-6xl">
						<div className="reveal mb-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
							<div className="lg:col-span-5">
								<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									04 — Skills
								</span>
								<h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#0c0a09] lg:text-6xl">
									Tools & <span className="text-orange-500">Tech</span>
								</h2>
							</div>
							<p className="text-base text-stone-500 lg:col-span-7 lg:text-lg">
								The technologies I reach for most often when building production
								software.
							</p>
						</div>

						<div className="grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
							{skills.map((group, idx) => (
								<div key={group.category} className="reveal">
									<div className="mb-6 flex items-baseline gap-4">
										<span className="text-xs font-black text-orange-500">
											0{idx + 1}
										</span>
										<span className="h-px flex-1 bg-stone-300" />
									</div>
									<h3 className="text-xl font-black tracking-tight text-[#0c0a09]">
										{group.category}
									</h3>
									<ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
										{group.items.map((item) => (
											<li
												key={item}
												className="text-base font-medium text-stone-700 transition-colors hover:text-orange-600"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ─── EDUCATION ─── */}
				<section
					id="education"
					className="relative scroll-mt-20 border-t border-stone-900/10 px-6 py-28 lg:px-10 lg:py-36"
				>
					<div className="mx-auto max-w-6xl">
						<div className="reveal mb-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
							<div className="lg:col-span-6">
								<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									05 — Education
								</span>
								<h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#0c0a09] lg:text-6xl">
									<span className="text-orange-500">Education</span>
								</h2>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-10">
							{education.map((e, idx) => (
								<div
									key={idx}
									className="reveal max-w-3xl border-t-2 border-[#0c0a09] pt-8"
								>
									<div className="flex flex-wrap items-start justify-between gap-4">
										<h3 className="text-3xl font-black leading-tight tracking-tight text-[#0c0a09] sm:text-4xl">
											{e.degree}
										</h3>
										<span className="flex-shrink-0 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
											Class of {e.year}
										</span>
									</div>
									<p className="mt-4 text-xl font-semibold text-orange-600">
										{e.institution}
									</p>
									<p className="mt-2 inline-flex items-center gap-1.5 text-base text-stone-500">
										<svg
											width="13"
											height="13"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.4"
											strokeLinecap="round"
										>
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
										{e.location}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ─── CERTIFICATIONS ─── */}
				<section
					id="certifications"
					className="relative scroll-mt-20 border-t border-stone-900/10 bg-stone-50/50 px-6 py-28 lg:px-10 lg:py-36"
				>
					<div className="mx-auto max-w-6xl">
						<div className="reveal mb-16 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
							<div className="lg:col-span-7">
								<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									06 — Certifications
								</span>
								<h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#0c0a09] lg:text-6xl">
									Certifications &{" "}
									<span className="text-orange-500">Awards</span>
								</h2>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{certifications.map((c, idx) => (
								<div key={idx} className="reveal group">
									<div className="flex items-center gap-3">
										<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-xs font-black text-white transition-transform group-hover:rotate-6">
											0{idx + 1}
										</span>
										<span className="text-xs font-bold uppercase tracking-wider text-stone-400">
											{c.date}
										</span>
									</div>
									<h3 className="mt-4 text-base font-black leading-snug tracking-tight text-[#0c0a09]">
										{c.title}
									</h3>
									<p className="mt-1 text-sm font-medium text-stone-500">
										{c.issuer}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ─── CONTACT ─── */}
				<section
					id="contact"
					className="relative scroll-mt-20 border-t border-stone-900/10 px-6 py-28 lg:px-10 lg:py-40"
				>
					<div className="mx-auto max-w-5xl text-center">
						<div className="reveal">
							<span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
								07 — Contact
							</span>
							<h2 className="mt-6 text-[clamp(2.75rem,8vw,7rem)] font-black leading-[0.92] tracking-[-0.04em] text-[#0c0a09]">
								Let's build
								<br />
								<span className="text-orange-500">something great.</span>
							</h2>
							<p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
								I'm always open to discussing new roles, interesting projects,
								or just chatting about technology. The fastest way to reach me
								is email.
							</p>
						</div>

						<div className="reveal mt-16 flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-20">
							<a
								href={`mailto:${personal.email}`}
								className="group text-center sm:text-left"
							>
								<p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									Email
								</p>
								<p className="mt-3 text-2xl font-black tracking-tight text-[#0c0a09] transition-colors group-hover:text-orange-600 sm:text-3xl">
									{personal.email}
								</p>
							</a>

							<span className="hidden h-16 w-px bg-stone-300 sm:block" />

							<a
								href={`tel:${personal.phone.replace(/\s/g, "")}`}
								className="group text-center sm:text-left"
							>
								<p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
									Phone
								</p>
								<p className="mt-3 text-2xl font-black tracking-tight text-[#0c0a09] transition-colors group-hover:text-orange-600 sm:text-3xl">
									{personal.phone}
								</p>
							</a>
						</div>
					</div>
				</section>
			</main>

			{/* ─── FOOTER ─── */}
			<footer className="border-t border-stone-900/10 bg-[#fafaf9] px-6 py-10 lg:px-10">
				<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div className="flex items-center gap-3">
						<span className="text-lg font-black tracking-tight text-[#0c0a09]">
							{personal.name.split(" ")[0]}
							<span className="text-orange-500">.</span>
						</span>
						<span className="text-sm text-stone-500">
							© {new Date().getFullYear()} · All rights reserved
						</span>
					</div>
					<a
						href="#hero"
						onClick={(e) => goTo(e, "hero")}
						className="inline-flex items-center gap-2 text-sm font-bold text-[#0c0a09]"
					>
						Back to top
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
						>
							<polyline points="18 15 12 9 6 15" />
						</svg>
					</a>
				</div>
			</footer>
		</div>
	);
}

/* Preview-only default export — renders DEFAULT_DATA so this file can be
   previewed standalone. The real app should import { FullStackProTemplate }
   and pass real portfolioData explicitly; do not rely on this wrapper. */
export default function FullStackProTemplatePreview({
	portfolioData,
}: {
	portfolioData?: PortfolioData;
}) {
	return <FullStackProTemplate portfolioData={portfolioData ?? DEFAULT_DATA} />;
}

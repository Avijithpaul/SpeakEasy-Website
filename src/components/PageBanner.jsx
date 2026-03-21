import { useLocation } from 'react-router-dom'

const bannerContent = [
  {
    match: (path) => path.startsWith('/features'),
    tag: 'Platform Highlights',
    title: 'Modern Tools for Faster Fluency',
    subtitle: 'Explore interactive modes designed for conversations, interviews, presentations, and confidence.',
    highlights: ['Conversation AI', 'Pronunciation Feedback', 'Interactive Scenarios'],
    image: 'https://picsum.photos/seed/banner-features/1400/900',
  },
  {
    match: (path) => path.startsWith('/about'),
    tag: 'Our Mission',
    title: 'Built for Real-World Communication',
    subtitle: 'We help learners move from memorizing English to speaking naturally in everyday situations.',
    highlights: ['Learner First', 'Research Driven', 'Global Community'],
    image: 'https://picsum.photos/seed/banner-about/1400/900',
  },
  {
    match: (path) => path.startsWith('/practice'),
    tag: 'Practice Zone',
    title: 'Train Your Speaking Skills',
    subtitle: 'Pick a mode, practice out loud, and improve pronunciation and confidence step by step.',
    highlights: ['Live Speaking', 'Smart Coaching', 'Track Progress'],
    image: 'https://picsum.photos/seed/banner-practice/1400/900',
  },
]

function resolveBanner(pathname) {
  return bannerContent.find((item) => item.match(pathname)) ?? null
}

function PageBanner() {
  const { pathname } = useLocation()
  const content = resolveBanner(pathname)
  const fallbackImage = 'https://picsum.photos/seed/banner-fallback/1400/900'

  if (!content) {
    return null
  }

  return (
    <section
      className="relative mt-[72px] overflow-hidden border-b border-[var(--border)]"
      style={{
        background:
          'radial-gradient(circle at 16% 22%, rgba(66, 133, 244, 0.26), transparent 40%), radial-gradient(circle at 82% 20%, rgba(234, 67, 53, 0.2), transparent 42%), radial-gradient(circle at 72% 80%, rgba(52, 168, 83, 0.2), transparent 45%), linear-gradient(125deg, #0f182d 0%, #142446 48%, #1b2f5a 100%)',
      }}
    >
      <div className="pointer-events-none absolute -left-14 -top-20 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#81b2ff,#4285f4)] opacity-55 blur-[10px]" aria-hidden="true"></div>
      <div className="pointer-events-none absolute -top-20 right-[26%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#f5968d,#ea4335)] opacity-55 blur-[10px]" aria-hidden="true"></div>
      <div className="pointer-events-none absolute -bottom-[118px] -right-[60px] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffe58a,#fbbc05)] opacity-55 blur-[10px]" aria-hidden="true"></div>
      <div className="pointer-events-none absolute -bottom-[90px] left-[40%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#90e2b0,#34a853)] opacity-55 blur-[10px]" aria-hidden="true"></div>
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(circle at 50% 40%, black 45%, transparent 100%)',
        }}
        aria-hidden="true"
      ></div>
      <div className="container relative z-10 flex items-center justify-between gap-8 px-2 py-12 max-[1024px]:flex-wrap max-[768px]:items-start max-[768px]:gap-4 max-[768px]:px-1 max-[768px]:py-8">
        <div className="flex-1">
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-[0.72rem] font-bold tracking-[0.04em] text-[#eaf2ff]"
            style={{
              background:
                'linear-gradient(90deg, rgba(66,133,244,0.9), rgba(234,67,53,0.9), rgba(251,188,5,0.9), rgba(52,168,83,0.9))',
            }}
          >
            {content.tag}
          </span>
          <h2 className="mb-2 text-[2rem] leading-[1.14] tracking-[-0.015em] text-[var(--text-primary)] [text-shadow:0_8px_30px_rgba(8,14,29,0.45)] max-[1024px]:text-[1.7rem] max-[768px]:text-[1.35rem]">
            {content.title}
          </h2>
          <p className="max-w-[760px] text-[1rem] text-[#ccdaef] max-[768px]:text-[0.92rem]">{content.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-2 max-[768px]:mt-3">
            {content.highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.77rem] font-semibold text-[#f4f7ff] backdrop-blur-[7px] max-[768px]:px-2.5 max-[768px]:py-1 max-[768px]:text-[0.7rem]"
              >
                <span className="h-2 w-2 rounded-full bg-[conic-gradient(from_180deg,#4285f4,#ea4335,#fbbc05,#34a853,#4285f4)]"></span>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex shrink-0 gap-3 max-[768px]:w-full" aria-hidden="true">
          <div className="min-w-[108px] rounded-xl border border-white/15 bg-[linear-gradient(145deg,rgba(8,13,25,0.55),rgba(25,40,73,0.7))] px-4 py-3 text-center shadow-[0_14px_26px_rgba(6,12,25,0.3)] max-[768px]:min-w-0 max-[768px]:flex-1 max-[768px]:px-2.5 max-[768px]:py-3">
            <strong className="block text-[1.15rem] text-white max-[768px]:text-[0.95rem]">50K+</strong>
            <span className="text-[0.78rem] text-[#c6d5ec] max-[768px]:text-[0.68rem]">Learners</span>
          </div>
          <div className="min-w-[108px] rounded-xl border border-white/15 bg-[linear-gradient(145deg,rgba(8,13,25,0.55),rgba(25,40,73,0.7))] px-4 py-3 text-center shadow-[0_14px_26px_rgba(6,12,25,0.3)] max-[768px]:min-w-0 max-[768px]:flex-1 max-[768px]:px-2.5 max-[768px]:py-3">
            <strong className="block text-[1.15rem] text-white max-[768px]:text-[0.95rem]">7</strong>
            <span className="text-[0.78rem] text-[#c6d5ec] max-[768px]:text-[0.68rem]">Practice Modes</span>
          </div>
          <div className="min-w-[108px] rounded-xl border border-white/15 bg-[linear-gradient(145deg,rgba(8,13,25,0.55),rgba(25,40,73,0.7))] px-4 py-3 text-center shadow-[0_14px_26px_rgba(6,12,25,0.3)] max-[768px]:min-w-0 max-[768px]:flex-1 max-[768px]:px-2.5 max-[768px]:py-3">
            <strong className="block text-[1.15rem] text-white max-[768px]:text-[0.95rem]">4.9</strong>
            <span className="text-[0.78rem] text-[#c6d5ec] max-[768px]:text-[0.68rem]">Average Rating</span>
          </div>
        </div>
        <div className="relative h-[clamp(210px,24vw,300px)] w-[min(42vw,520px)] min-w-[360px] overflow-hidden rounded-2xl border border-white/20 shadow-[0_20px_44px_rgba(4,10,24,0.35)] max-[1024px]:h-[240px] max-[1024px]:w-full max-[1024px]:min-w-0 max-[768px]:h-[190px]" aria-hidden="true">
          <img
            className="block h-full w-full scale-[1.03] object-cover"
            src={content.image}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackImage
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.42), transparent 42%), linear-gradient(135deg, rgba(66,133,244,0.26), transparent 50%)',
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default PageBanner

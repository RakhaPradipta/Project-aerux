const SectionHeading = ({ eyebrow, title, desc, center = true, light = false }) => (
  <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className={`font-display text-3xl md:text-[42px] leading-[1.15] font-semibold mt-4 ${light ? 'text-white' : 'text-ink-900'}`}>{title}</h2>
    {desc && <p className={`mt-4 text-[16px] leading-relaxed ${light ? 'text-white/70' : 'text-ink-500'}`}>{desc}</p>}
  </div>
);

export default SectionHeading;

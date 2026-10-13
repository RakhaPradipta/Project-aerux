import { Link } from 'react-router-dom';

const Logo = ({ dark = false }) => (
  <Link to="/" className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center border border-gold-500/50">
      <span className="font-display text-gold-200 text-lg font-semibold">K</span>
    </div>
    <div className="leading-none">
      <p className={`font-display text-[22px] font-semibold ${dark ? 'text-white' : 'text-ink-900'}`}>Kirana</p>
      <p className={`text-[10px] tracking-[0.28em] uppercase ${dark ? 'text-white/60' : 'text-ink-500'}`}>Clinic OS</p>
    </div>
  </Link>
);

export default Logo;

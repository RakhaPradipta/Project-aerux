const Card = ({ children, className = '', hover = false, ...props }) => (
  <div className={`card-elegant p-6 ${hover ? 'transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1' : ''} ${className}`} {...props}>
    {children}
  </div>
);

export default Card;

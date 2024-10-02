export function Card({ children, className = "", ...props }) {
    return (
      <div className={`bg-white shadow-md p-4 rounded-lg ${className}`} {...props}>
        {children}
      </div>
    );
  }
  
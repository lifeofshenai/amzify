export function Button({ children, className, variant = "default", ...props }) {
    const baseStyles = "px-4 py-2 rounded text-white font-semibold w-full";
    const variantStyles = {
      default: "bg-pink-500 hover:bg-pink-600",
      outline: "bg-gray-200 text-gray-700",
      orange: "bg-orange-500 hover:bg-orange-600",
      gray: "bg-gray-300 text-gray-500"
    };
  
    return (
      <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
  
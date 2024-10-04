export function Table({ children }) {
    return <table className="min-w-full bg-white">{children}</table>;
  }
  
  export function TableHead({ children }) {
    return <th className="px-4 py-2 text-left text-gray-600">{children}</th>;
  }
  
  export function TableBody({ children }) {
    return <tbody>{children}</tbody>;
  }
  
  export function TableRow({ children, className }) {
    return <tr className={`${className} border-b`}>{children}</tr>;
  }
  
  export function TableCell({ children }) {
    return <td className="px-4 py-2">{children}</td>;
  }
  
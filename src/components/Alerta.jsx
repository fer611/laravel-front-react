export default function Alerta({ children }) {
    return (
      <div className="text-center text-sm my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-0 rounded" role="alert">
        {children}
      </div>
    );
  }
  
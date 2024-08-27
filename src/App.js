import React from "react";
import { useState, Suspense } from "react";

// Dynamic import for SideBar component with code splitting
const SideBar = React.lazy(() => import("./component/ui/SideBar"));

function App() {
  const [open, setOpen] = useState(false);
  const closeHandler = () => setOpen(false);

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="bg-orange-500 rounded px-8 py-4 text-white text-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Add Speaker
      </button>

      {/* Suspense component to handle the fallback UI while the SideBar component is loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <SideBar open={open} onClose={closeHandler} />
      </Suspense>
    </div>
  );
}

export default App;

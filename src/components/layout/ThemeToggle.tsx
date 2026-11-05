
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const current = resolvedTheme;
  const next = current === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      className="w-9 h-9 flex items-center justify-center rounded-lg
                 border transition-colors"
      style={{
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {current === "dark" ? (
        <FiSun size={18} />
      ) : (
        <FiMoon size={18} />
      )}
    </button>
  );
}

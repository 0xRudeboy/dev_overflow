"use client";

// import { createUser } from "@/lib/actions/user.action";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // const update = async () => {
    //   const mongoUser = await createUser({
    //     clerkId: "hfudysgfyuergdfu",
    //     name: "John Doe",
    //     username: "johndoe",
    //     email: "john@gmail.com",
    //     picture: "wtvthefuckever.jpg",
    //   });

    //   console.log(mongoUser);
    // };
    // update();
    handleThemeChange();
  }, [mode]);
  // removed the "mode" variable from dependency array to avoid infinite loop

  // console.log("mode", mode);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
// useEffect(() => {
//   const update = async () => {
//     const mongoUser = await createUser({
//       clerkId: "hfudysgfyuergdfu",
//       name: "John Doe",
//       username: "johndoe",
//       email: "john@gmail.com",
//       picture: "wtvthefuckever.jpg",
//     });

//     console.log(mongoUser);
//   };
//   update();
// }, []);

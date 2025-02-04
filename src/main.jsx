import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://tbozenjxtiknhhmnayfc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRib3plbmp4dGlrbmhobW5heWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NTk0MTUsImV4cCI6MjA1MjIzNTQxNX0.OtY4aP1Y45H9oji-x63pu_ZbkzAmKvtfqldhF9IbbVg"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>
);

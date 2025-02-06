import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import { Mail } from "lucide-react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import ReminderInput from "./ReminderInput";

function Reminders() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const eventName = "Calpol 650";
  const eventDesc = "Time to take diabetes medicine";

  const session = useSession();
  const supabase = useSupabaseClient();
  console.log(session);

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      console.log(error);
      alert("Error logging in with google");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div>
      <div className="p-4 bg-[#258bff] space-y-4 rounded-md">
        <h1>Medicine Reminder</h1>
        <div className="space-y-3">
          <ReminderInput placeholder="Medicine" />

          <button className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reminders;

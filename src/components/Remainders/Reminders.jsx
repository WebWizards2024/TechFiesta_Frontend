import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import { Mail } from "lucide-react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

function Reminders() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const eventName = "Calpol 650";
  const eventDesc = "Time to take diabetes medicine";

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  console.log(session);

  if (isLoading) return <h1>Loading...</h1>;

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

  async function createCalenderEvent() {
    console.log("Creating");
    const event = {
      summary: eventName,
      description: eventDesc,
      start: {
        dateTime: start.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
        },
        body: JSON.stringify(event),
      }
    );
    const data = await res.json();
    console.log(data);
    alert("Event created");
  }

  return (
    <div>
      {!session ? (
        <button
          type="submit"
          onClick={() => googleSignIn()}
          className="w-fit py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E66E5] hover:bg-[#2E66E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Login
        </button>
      ) : (
        <div>
          <div className="pt-20 px-8 pb-8">
            {/* Basic Info */}
            <div className="flex justify-between items-start mb-6">
              <img src={session.user.user_metadata.picture} alt="" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {session.user.user_metadata.full_name}
                </h1>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>{session.user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={() => createCalenderEvent()}
            className="w-fit py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E66E5] hover:bg-[#2E66E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Add to calender
          </button>
          <div className="flex">
            <div>
              <p>Start of your event</p>
              <DateTimePicker
                onChange={setStart}
                value={start}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                calendarClassName="bg-white shadow-lg rounded-lg p-2"
                clockClassName="bg-white shadow-lg rounded-lg p-2"
              />
            </div>

            <div>
              <p>End of your event</p>
              <DateTimePicker
                onChange={setEnd}
                value={end}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                calendarClassName="bg-white shadow-lg rounded-lg p-2"
                clockClassName="bg-white shadow-lg rounded-lg p-2"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={() => signOut()}
            className="w-fit py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E66E5] hover:bg-[#2E66E5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E66E5] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Reminders;

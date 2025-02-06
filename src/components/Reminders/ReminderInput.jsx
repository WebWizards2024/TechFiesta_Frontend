import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

function ReminderInput({ placeholder }) {
  const [eventName, setEventName] = useState("");
  const [time, setTime] = useState(new Date().getTime()); // State to store selected time

  function handleEventName(e) {
    setEventName(e.target.value);
  }

  const handleTimeChange = (event) => {
    setTime(event.target.value); // Get time in HH:mm format
  };

  const getISODateTime = (time) => {
    if (!time || typeof time !== "string") {
      console.error("Invalid time input:", time);
      return null; // Handle unexpected values
    }
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number); // Extract HH and MM

    // Set hours and minutes while keeping the current date
    now.setHours(hours, minutes, 0, 0);
    console.log(now.toISOString().slice(0, 19));
    return now.toISOString().slice(0, 19); // Returns YYYY-MM-DDTHH:mm:ss
  };

  const dateTime = getISODateTime(time);

  const session = useSession();
  async function createCalenderEvent() {
    console.log("Creating");
    const event = {
      summary: eventName,
      description: "Daily reminder to take medicine.",
      start: {
        dateTime: dateTime, // Set your desired reminder time
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: getISODateTime(time, 5),
        timeZone: "Asia/Kolkata",
      },
      recurrence: ["RRULE:FREQ=DAILY"],
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 1 }],
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
    <div className="flex gap-4">
      <input
        placeholder={placeholder}
        onChange={handleEventName}
        value={eventName}
        required
        className="w-fit px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E66E5] focus:shadow-lg transition-all duration-300"
      />
      <input type="time" onChange={handleTimeChange} value={time} />
      <button
        onClick={createCalenderEvent}
        className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer"
      >
        Add To Calendar
      </button>
      <button className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer">
        X
      </button>
    </div>
  );
}

export default ReminderInput;

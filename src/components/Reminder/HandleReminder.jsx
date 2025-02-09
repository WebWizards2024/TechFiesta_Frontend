import { useSession } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { updateUser } from "../../services/apiUsers";

function HandleReminder({ eventId, status, placeholder, fieldName }) {
  const [eventName, setEventName] = useState("");
  const [time, setTime] = useState(new Date());
  const queryClient = useQueryClient();
  const healthData = queryClient.getQueryData(["auth"]);
  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: ({ id, updatedData }) => updateUser({ id, updatedData }),
  });
  const [eventData, setEventData] = useState("");
  const session = useSession();
  const [hasTaken, setHasTaken] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    async function getEvent() {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const eData = await res.json();
      setEventData(eData);
    }
    getEvent();
  }, [eventId, session]);

  function handleEventName(e) {
    setEventName(e.target.value);
  }

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const getISODateTime = (time) => {
    if (!time || typeof time !== "string") {
      console.error("Invalid time input:", time);
      return null;
    }
    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    now.setHours(hours, minutes, 0, 0);
    return now.toISOString().slice(0, 19);
  };

  const dateTime = eventId || getISODateTime(time);

  async function createCalenderEvent() {
    console.log("Creating");
    const event = {
      summary: eventName,
      description: "Daily reminder to take medicine.",
      start: {
        dateTime: dateTime,
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
    const eId = data.id;
    data.status = [];
    if (fieldName === "medic") {
      const medicStatus = {
        eventId: eId,
        status: [{ date: new Date(), hasTaken: false }],
      };
      console.log(healthData.healthData.medicReminder);
      handleUpdateUser({
        id: healthData.healthData._id,
        updatedData: {
          medicReminder: [...healthData.healthData.medicReminder, medicStatus],
        },
      });
    }
    alert("Event created");
  }

  return !eventId ? (
    <div className="flex items-center gap-2">
      <input
        placeholder={placeholder}
        onChange={handleEventName}
        value={eventName}
        required
        className="px-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="time"
        onChange={handleTimeChange}
        value={time}
        className="px-2 py-1 border border-gray-400 rounded-md"
      />
      <button
        onClick={createCalenderEvent}
        className="bg-blue-600 text-white px-3 py-1 cursor-pointer rounded-md hover:bg-blue-700"
      >
        Add To Calendar
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={hasTaken}
        onChange={() => setHasTaken(!hasTaken)}
        className="w-4 h-4"
      />
      <p>{eventData.summary}</p>
    </div>
  );
}

export default HandleReminder;

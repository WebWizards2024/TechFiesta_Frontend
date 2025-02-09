function DisplayReminder() {
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
      {eventId && (
        <button className="bg-[#2B6CB0] text-white px-4 py-2 rounded-sm font-poppins font-medium cursor-pointer">
          X
        </button>
      )}
    </div>
    )
}

export default DisplayReminder

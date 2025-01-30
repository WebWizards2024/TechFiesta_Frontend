function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  extraStyles = "",
}) {
  const baseStyles =
    "border rounded-[4px] px-4 py-2 w-full font-medium transition duration-200 ease-in-out focus:outline-none";

  const inputTheme = {
    default:
      "border-gray-300 text-gray-700 placeholder-gray-400 focus:border-[#005cbd] focus:ring-2 focus:ring-[#005cbd]",
    error:
      "border-[#e72727] text-[#e72727] placeholder-[#e72727] focus:border-red-700 focus:ring-2 focus:ring-red-700",
  };

  return (
    <div className={`flex flex-col ${extraStyles}`}>
      {label && (
        <label className="font-semibold mb-1 text-[#012d61]">{label}</label>
      )}

      {type === "file" ? (
        <label className="border border-[#012d61] text-[#012d61] cursor-pointer bg-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#004794] hover:text-white transition">
          Upload File
          <input type="file" onChange={onChange} className="hidden" />
        </label>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseStyles} ${inputTheme.default}`}
        />
      )}
    </div>
  );
}

export default Input;

function Button({ type = "primary", onClick, extraStyles = "", children }) {
  const baseStyles =
    "px-4 py-2 rounded-[4px] w-fit-content h-fit font-medium transition cursor-pointer duration-200 ease-in-out focus:outline-none";

  const btnType = {
    primary: "bg-[#005cbd] border-[#005cbd] text-white hover:bg-[#004794]",
    secondary:
      "border border-[#012d61] text-[#012d61] hover:bg-[#004794] hover:border-[#005cbd] hover:text-white",
    error: "text-white bg-[#e72727] hover:bg-red-700 ",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${btnType[type]} ${extraStyles}`}
    >
      {children}
    </button>
  );
}

export default Button;

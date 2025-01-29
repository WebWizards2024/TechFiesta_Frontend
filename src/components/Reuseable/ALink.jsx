function ALink({ href, children, extraStyles = "", newTab = false }) {
  return (
    <a
      href={href}
      className={`text-[#005cbd] font-medium hover:underline hover:text-[#004794] hover:cursor-pointer transition duration-200 ease-in-out ${extraStyles}`}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : ""}
    >
      {children}
    </a>
  );
}

export default ALink;

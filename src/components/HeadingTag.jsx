const HeadingTag = ({ children,size = "text-xl",className="" }) => {
  return <h2 className={`text-black dark:text-white ${size} ${className}`}>{children}</h2>;
};

export default HeadingTag;

interface Props {
  children: string;
  className: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <button className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;

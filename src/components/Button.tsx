interface Props {
  children: string;
  className: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => {
  const { children, ...rest } = props;
  return <button {...rest}> {children}</button>;
};

export default Button;

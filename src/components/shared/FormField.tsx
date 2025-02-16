import type { ComponentProps } from "react";

// We use `Omit<ComponentProps<"input">, "className">` to remove `className` from the inherited props
// Now we can redefine "className" as an object.
interface Props extends Omit<ComponentProps<"input">, "className"> {
  inputBeforeLable?: boolean;
  label?: string;
  className?: { container?: string; labelClass?: string; input?: string };
}

const FormField = ({
  label,
  inputBeforeLable = false,
  className = {},
  id,
  ...props
}: Props) => {
  const { container = "", labelClass = "", input = "" } = className;
  return (
    <div className={`${container}`}>
      {inputBeforeLable ? (
        <>
          <input className={input} id={id} name={id} value={id} {...props} />
          <label className={labelClass} htmlFor={id}>
            <span>{label}</span>
          </label>
        </>
      ) : (
        <>
          <label className={labelClass} htmlFor={id}>
            <span>{label}</span>{" "}
          </label>
          <input className={input} id={id} {...props} />
        </>
      )}
    </div>
  );
};

export default FormField;

// import React from "react"
// interface Props {
//   label: string;
//   type: string;
//   name: string;
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   className?: string;
//   required?: boolean;
// }

// const FormField = ({
//     label,
//     type,
//     name,
//     value,
//     onChange,
//     placeholder = "",
//     className = "",
//     required = false,
//   }: Props) => {
//     return (
//       <div className={`mb-3 ${className}`}>
//         <label htmlFor={name}>
//           <span>{label}</span>
//         </label>
//         <input
//           type={type}
//           name={name}
//           id={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className={className}
//           required={required}
//         />
//       </div>
//     );
//   };

//   export default FormField;

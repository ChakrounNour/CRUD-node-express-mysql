export default function CustomInput ({
  type,
  placeholder,
  value,
  onChange,
  inputClassName,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClassName}
    />
  );
}

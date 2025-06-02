type DropdownProps<T> = {
  options: T[];
  getKey: (item: T) => number | undefined;
  getValue: (item: T) => number | undefined;
  getLabel: (item: T) => string;
  onChange: (value: string | number, item?: T) => void;
  placeholder?: string;
  value?: string | number;
};

export const Dropdown = <T,>({
  options,
  getKey,
  getValue,
  getLabel,
  onChange,
  placeholder,
  value,
}: DropdownProps<T>) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        const value = e.target.value;
        const item = options.find((i) => String(getValue(i)) === value);
        onChange(value, item);
      }}
    >
      <option value='' disabled hidden>
        {placeholder}
      </option>
      {options.map((item) => (
        <option key={getKey(item)} value={getValue(item)}>
          {getLabel(item)}
        </option>
      ))}
    </select>
  );
};

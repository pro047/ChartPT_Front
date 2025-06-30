import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DropdownProps<T> = {
  options: T[];
  getKey: (item: T) => string;
  getValue: (item: T) => string;
  getLabel: (item: T) => string;
  onChange: (value: string, item?: T) => void;
  placeholder?: string;
  value?: string;
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
    <Select
      value={value}
      onValueChange={(val) => {
        const item = options.find((i) => String(getValue(i)) === value);
        onChange(val, item);
      }}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={getKey(item)} value={getValue(item)}>
            {getLabel(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

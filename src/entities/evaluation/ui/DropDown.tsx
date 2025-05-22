import React, { useState } from 'react';

export const DropDown = () => {
  const sampleData: string[] = ['1번', '2번', '3번'];
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  return (
    <select value={value} onChange={handleChange}>
      {sampleData.map((data, index) => (
        <option key={index} value={data}>
          {data}
        </option>
      ))}
    </select>
  );
};

import React from "react";

interface TranslationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const TranslationSelector: React.FC<TranslationSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border px-4 py-2"
    >
      <option value="english">English</option>
      <option value="urdu">Urdu</option>
      <option value="arabic">Arabic Only</option>
    </select>
  );
};

export default TranslationSelector;

// 汎用フォーム入力フィールド（ラベル・エラー表示付き）
import React from "react";

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  required = false,
  autoFocus = false,
}: InputFieldProps) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      {...(autoComplete && { autoComplete })}
      required={required}
      autoFocus={autoFocus}
      className={`form-input w-full rounded border-gray-300 focus:ring-2 focus:ring-blue-400 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default InputField;

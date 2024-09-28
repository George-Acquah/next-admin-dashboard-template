import * as React from "react";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input"; // Reuse the optimized Input component

interface _InputWithErrors {
  id: string;
  prependComponent?: React.ReactNode;
  errors: Record<string, string[] | undefined>;
}

export const InputErrors = ({
  errors,
  id,
  prependComponent = <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
}: _InputWithErrors) => {
  return errors && errors[id] ? (
    <div id={`${id}-error`} className="mt-2 text-sm text-red-500">
      {errors[id]?.map((error: string) => (
        <div className="flex space-x-2" key={error}>
          {prependComponent}
          <span>{error}</span>
        </div>
      ))}
    </div>
  ) : null;
};

export function CommonInput({
  value,
  id,
  placeholder,
  label,
  input_type,
  options,
  radio,
  type,
  disabled,
  errors,
  tooltip,
  width = "w-full",
  icon,
  onChange,
}: _IDetail) {
  const err_bool = errors && errors[id];
  const hasIcon = icon !== undefined;

  return (
    <div className={`mb-4 ${width}`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 text-sm font-medium ${
            tooltip ? "flex items-center" : "block"
          }`}
        >
          {label}
          {tooltip && (
            <span className="ml-2 text-xs text-gray-500">
              <InformationCircleIcon className="h-5 w-5" /> {tooltip}
            </span>
          )}
        </label>
      )}

      {input_type === "select" ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`block w-full p-2.5 border ${
            err_bool ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          disabled={disabled}
        >
          {options?.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : input_type === "radio" ? (
        <fieldset className="flex gap-4">
          {radio?.map((item: any) => (
            <div key={item.id} className="flex items-center">
              <input
                id={item.id}
                name={id}
                type="radio"
                value={item.value}
                checked={item.checked}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                disabled={disabled}
              />
              <label htmlFor={item.id} className="ml-2 text-sm">
                {item.label}
              </label>
            </div>
          ))}
        </fieldset>
      ) : input_type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`block w-full p-2.5 border ${
            err_bool ? "border-red-500" : "border-gray-300"
          } rounded-md`}
          disabled={disabled}
          rows={4}
        />
      ) : (
        <div className="relative">
          <Input
            type={type}
            id={id}
            value={value}
            placeholder={placeholder}
            className={`block w-full p-2.5 ${
              err_bool ? "border-red-500" : "border-gray-300"
            } rounded-md`}
            disabled={disabled}
            onChange={onChange}
          />
          {hasIcon && icon && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {icon}
            </span>
          )}
        </div>
      )}

      {errors && <InputErrors id={id} errors={errors} />}
    </div>
  );
}

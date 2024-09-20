import * as React from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { cn } from "../classes.utils";

interface _IFormFieldContextProps {
  name: string;
}
interface _IFormItemContextProps {
  id: string;
}

const Form = FormProvider;
const FormFieldContext = React.createContext<
  _IFormFieldContextProps | undefined
>(undefined);
const FormItemContext = React.createContext<_IFormItemContextProps | undefined>(
  undefined
);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItem = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

export { useFormField, FormItem };

export default Form;

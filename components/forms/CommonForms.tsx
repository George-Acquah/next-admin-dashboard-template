'use client'
import { FormField, FormItem } from "@/utils/contexts/forms.context";
import { FormLabel, FormControl, FormMessage } from "../ui/form";

export interface DynamicFormProps {
  fields: _ICommonFieldProps[];
  isPending?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, isPending }) => { 
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <input
                  {...formField}
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled={isPending || field.disabled}
                  className="form-input"
                />
              </FormControl>
              {field.description && (
                <p className="text-sm text-muted-foreground">
                  {field.description}
                </p>
              )}
              <FormMessage />
              {field.renderAfter}
            </FormItem>
          )}
        />
      ))}
    </>
  );
}


import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input as ChakraInput, Field } from '@chakra-ui/react';

function Input({ name, label, required = true, type = 'text' }) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field.Root invalid={!!errors[name]} required={required}>
      <Field.Label htmlFor={id}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <ChakraInput {...register(name)} id={id} type={type} />
      <Field.ErrorText>
        <Field.ErrorIcon />
        {errors[name]?.message}
      </Field.ErrorText>
    </Field.Root>
  );
}

export default Input;

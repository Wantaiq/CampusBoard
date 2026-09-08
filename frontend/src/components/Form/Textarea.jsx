import { Textarea as ChakraTextarea, Field } from '@chakra-ui/react';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

function Textarea({ name, label, required = true }) {
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
      <ChakraTextarea id={id} {...register(name)} />
      <Field.ErrorText>
        <Field.ErrorIcon />
        {errors[name]?.message}
      </Field.ErrorText>
    </Field.Root>
  );
}

export default Textarea;

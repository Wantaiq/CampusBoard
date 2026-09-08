import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

function Form({ onSubmit, schema, children, defaultValues = {} }) {
  const methods = useForm({
    defaultValues,
    resolver: joiResolver(schema, { allowUnknown: false }),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default Form;

import { Field, Portal, Select as ChakraSelect, createListCollection } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

function Select({ items, name, label, placeholder, required = true }) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const collection = createListCollection({
    items,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field.Root invalid={!!errors[name]} required={required}>
          <Field.Label>
            {label} <Field.RequiredIndicator />
          </Field.Label>
          <ChakraSelect.Root
            name={field.name}
            value={field.value ? [field.value] : []}
            onValueChange={({ value }) => {
              field.onChange(value[0] || '');
            }}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
          >
            <ChakraSelect.HiddenSelect />
            <ChakraSelect.Control>
              <ChakraSelect.Trigger>
                <ChakraSelect.ValueText placeholder={placeholder} />
              </ChakraSelect.Trigger>
              <ChakraSelect.IndicatorGroup>
                <ChakraSelect.Indicator />
              </ChakraSelect.IndicatorGroup>
            </ChakraSelect.Control>
            <Portal>
              <ChakraSelect.Positioner>
                <ChakraSelect.Content>
                  {collection.items.map((item) => (
                    <ChakraSelect.Item item={item} key={item.value}>
                      {item.label}
                      <ChakraSelect.ItemIndicator />
                    </ChakraSelect.Item>
                  ))}
                </ChakraSelect.Content>
              </ChakraSelect.Positioner>
            </Portal>
          </ChakraSelect.Root>
          <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  );
}

export default Select;

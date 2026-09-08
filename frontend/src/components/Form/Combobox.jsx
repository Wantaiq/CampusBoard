import {
  Combobox as ChakraCombobox,
  Field,
  Portal,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

const Combobox = ({ label, name, items, placeholder, required = true }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
    limit: 5,
  });

  return (
    <Field.Root
      required={required}
      invalid={!!errors[name]}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ChakraCombobox.Root
            collection={collection}
            value={field.value ? [field.value] : []}
            onValueChange={({ value }) => field.onChange(value[0] || '')}
            onInputValueChange={(e) => filter(e.inputValue)}
            onInteractOutside={() => field.onBlur()}>
            <ChakraCombobox.Control>
              <ChakraCombobox.Input placeholder={placeholder} />
              <ChakraCombobox.IndicatorGroup>
                <ChakraCombobox.ClearTrigger />
                <ChakraCombobox.Trigger />
              </ChakraCombobox.IndicatorGroup>
            </ChakraCombobox.Control>

            <Portal>
              <ChakraCombobox.Positioner>
                <ChakraCombobox.Content>
                  <ChakraCombobox.Empty>No results found</ChakraCombobox.Empty>
                  {collection.items.map((item) => (
                    <ChakraCombobox.Item
                      key={item.value}
                      item={item}>
                      {item.label}
                      <ChakraCombobox.ItemIndicator />
                    </ChakraCombobox.Item>
                  ))}
                </ChakraCombobox.Content>
              </ChakraCombobox.Positioner>
            </Portal>
          </ChakraCombobox.Root>
        )}
      />
      <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default Combobox;

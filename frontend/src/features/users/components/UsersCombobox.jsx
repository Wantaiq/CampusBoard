import { Combobox, Field, Portal, Spinner, createListCollection } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import useUsers from '../hooks/useUsers';

function UsersCombobox({ name, label, required = true }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { users, loading, searchByUsernameFragment } = useUsers();

  const collection = useMemo(
    () =>
      createListCollection({
        items: users,
        itemToString: (item) => item.username,
        itemToValue: (item) => item.id,
      }),
    [users],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field.Root invalid={!!errors.userId} required={required}>
          <Field.Label>
            {label} <Field.RequiredIndicator />
          </Field.Label>

          <Combobox.Root
            collection={collection}
            value={field.value ? [field.value] : []}
            onValueChange={({ value }) => {
              field.onChange(value[0] ?? '');
            }}
            onInputValueChange={({ inputValue }) => {
              searchByUsernameFragment(inputValue);
            }}
          >
            <Combobox.Control>
              <Combobox.Input placeholder="Search..." />
            </Combobox.Control>

            <Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  {loading ? (
                    <Spinner size="sm" mx="auto" />
                  ) : (
                    collection.items.map((user) => (
                      <Combobox.Item key={user.id} item={user}>
                        {user.username}
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))
                  )}

                  {!loading && <Combobox.Empty>No results</Combobox.Empty>}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </Combobox.Root>

          <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  );
}

export default UsersCombobox;

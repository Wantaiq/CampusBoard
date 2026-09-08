import { DatePicker, Field, parseDate } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

function Calendar({ name, label, minDate, required = true }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Field.Root required={required} invalid={!!errors[name]}>
      <Field.Label id={`calendar-${name}`}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker.Root
            aria-labelledby={`calendar-${name}`}
            startOfWeek="1"
            variant="flushed"
            hideOutsideDays
            inline
            size="lg"
            w="fit-content"
            minHeight="345px"
            value={field.value ? [parseDate(field.value)] : []}
            min={minDate ? parseDate(minDate) : undefined}
            onValueChange={({ value }) => {
              field.onChange(value[0]?.toString() ?? '');
            }}
          >
            <DatePicker.Content unstyled>
              <DatePicker.View view="day">
                <DatePicker.Header />
                <DatePicker.DayTable w="full" />
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Header />
                <DatePicker.MonthTable />
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Header />
                <DatePicker.YearTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Root>
        )}
      />
      <Field.ErrorText>
        <Field.ErrorIcon />
        {errors[name]?.message}
      </Field.ErrorText>
    </Field.Root>
  );
}

export default Calendar;

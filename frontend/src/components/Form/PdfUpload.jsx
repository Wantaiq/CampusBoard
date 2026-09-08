import { Box, Button, Field, FileUpload } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

function PdfUpload({ name, required = true }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Field.Root invalid={!!errors[name]} required={required}>
      <Field.Label>
        Upload document <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FileUpload.Root
            accept={['application/pdf']}
            maxFiles={1}
            minW="full"
            maxW="full"
            alignItems="stretch"
            maxFileSize={5 * 1024 * 1024}
            value={field.value ? [field.value] : []}
            onFileChange={(e) => {
              field.onChange(e.acceptedFiles[0] || null);
            }}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop file here</Box>
                <Box color="fg.muted">.pdf up to 5MB</Box>
              </FileUpload.DropzoneContent>
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  Upload file
                </Button>
              </FileUpload.Trigger>{' '}
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup>
              <FileUpload.Context>
                {({ acceptedFiles }) =>
                  acceptedFiles.map((file) => (
                    <FileUpload.Item w="fit-content" key={file.name} file={file}>
                      <FileUpload.ItemPreview />
                      <FileUpload.ItemName />
                      <FileUpload.ItemSizeText />
                      <FileUpload.ItemDeleteTrigger />
                    </FileUpload.Item>
                  ))
                }
              </FileUpload.Context>
            </FileUpload.ItemGroup>
          </FileUpload.Root>
        )}
      />
      <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
    </Field.Root>
  );
}

export default PdfUpload;

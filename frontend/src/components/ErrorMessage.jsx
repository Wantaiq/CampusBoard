import { Box, Text } from '@chakra-ui/react';

function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <Box bg="bg.error" py="2" px="4" borderRadius="lg">
      <Text color="fg" fontWeight="semibold">
        {message}
      </Text>
    </Box>
  );
}

export default ErrorMessage;

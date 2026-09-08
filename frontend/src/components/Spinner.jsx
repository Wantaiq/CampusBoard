import { VStack, Spinner as ChakraSpinner, Text } from '@chakra-ui/react';

function Spinner({ loading }) {
  if (!loading) {
    return null;
  }

  return (
    <VStack>
      <ChakraSpinner
        color="teal.600"
        size="lg"
        borderWidth="6px"
      />
      <Text
        color="teal.600"
        fontWeight="bold"
        fontSize="2xl">
        Loading...
      </Text>
    </VStack>
  );
}

export default Spinner;

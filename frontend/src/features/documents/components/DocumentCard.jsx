import { Box, Button, Flex, Text } from '@chakra-ui/react';
import useDocument from '../hooks/useDocument';

function DocumentCard({ document }) {
  const { viewDocument, removeDocument } = useDocument(document.id);

  return (
    <Flex
      gap="4"
      justifyContent="space-between"
      alignItems="center">
      <Box>
        <Text>{document.name}</Text>
      </Box>
      <Flex gap="3">
        <Button
          size="xs"
          variant="subtle"
          onClick={() => viewDocument()}>
          View
        </Button>
        <Button
          colorPalette="red"
          size="xs"
          variant="subtle"
          onClick={() => removeDocument()}>
          Remove
        </Button>
      </Flex>
    </Flex>
  );
}

export default DocumentCard;

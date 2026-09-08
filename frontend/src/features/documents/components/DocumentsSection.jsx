import { Box, Card, Separator, Skeleton, Text } from '@chakra-ui/react';
import DocumentCard from './DocumentCard';
import useDocuments from '../hooks/useDocuments';
import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

function DocumentsSection({ projectId }) {
  const { documents, fetchDocuments, loading, error } = useDocuments(projectId);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (loading) {
    return (
      <Skeleton
        variant="shine"
        w="100%"
        aspectRatio="wide"
        borderRadius="md"
      />
    );
  }

  if (error) {
    return (
      <Card.Root w="2xs">
        <Card.Header as="h2">Documents</Card.Header>
        <Card.Body>
          <Text fontWeight="bold">We could not load documents</Text>
        </Card.Body>
        <Card.Footer>
          <ErrorMessage message={error} />
        </Card.Footer>
      </Card.Root>
    );
  }

  return (
    <Card.Root w="2xs">
      <Card.Header>
        <Card.Title
          fontSize="lg"
          as="h2">
          Documents
        </Card.Title>
      </Card.Header>
      {documents.length ? (
        <Box as="ul">
          {documents.map((document) => (
            <Box
              key={`document-${document.id}`}
              as="li">
              <Card.Body key={`document-${document.id}`}>
                <DocumentCard document={document} />
              </Card.Body>
              <Separator />
            </Box>
          ))}
        </Box>
      ) : (
        <Card.Body>
          <Text>Your knowledge base is empty.</Text>
        </Card.Body>
      )}
    </Card.Root>
  );
}

export default DocumentsSection;

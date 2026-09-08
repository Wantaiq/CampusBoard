import JoiBase from '@/utils/joi';
import { Link } from 'react-router';
import { Form, Input } from '@/components/Form';
import { Card, Button, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';
import ErrorMessage from '@/components/ErrorMessage';

function RegisterForm({ handleSubmit, processing, error }) {
  const schema = JoiBase.object({
    username: JoiBase.string().trim().alphanum().min(3).required().label('Username'),
    password: JoiBase.string().trim().min(7).required().label('Password'),
  });

  return (
    <Card.Root w={{ base: 'xs', md: 'lg' }}>
      <Card.Header>
        <Card.Title fontSize="2xl" as="h1">
          Register
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} schema={schema}>
          <Stack gap="6">
            <Stack gap="4" w="full">
              <Input name="username" label="Username" />
              <Input name="password" label="Password" type="password" />
            </Stack>
            <Button
              fontWeight="bold"
              size="lg"
              type="submit"
              loading={processing}
              disabled={processing}
            >
              Register
            </Button>
          </Stack>
        </Form>
      </Card.Body>
      <Card.Footer flexDir="column" gap="3">
        <Text>
          Already have an account?
          <ChakraLink asChild colorPalette="blue" ms="1" variant="underline">
            <Link to="/auth/login">Log In</Link>
          </ChakraLink>
        </Text>
        <ErrorMessage message={error} />
      </Card.Footer>
    </Card.Root>
  );
}

export default RegisterForm;

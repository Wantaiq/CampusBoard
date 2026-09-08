import { AbsoluteCenter } from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

function PageRenderer({ loading, error, children }) {
  return (
    <>
      <AbsoluteCenter>
        <Spinner loading={loading} />
        <ErrorMessage message={error} />
      </AbsoluteCenter>
      {!error && !loading && children}
    </>
  );
}

export default PageRenderer;

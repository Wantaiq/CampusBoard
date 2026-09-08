import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="bg-primary-400">
      <h1 className="text-green-500">Looks like you got lost</h1>
      <p>
        Go back home <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;

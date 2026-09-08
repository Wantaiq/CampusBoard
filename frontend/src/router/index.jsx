import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes';

const browserRouter = createBrowserRouter(routes);

function Router() {
  return <RouterProvider router={browserRouter} />;
}

export default Router;

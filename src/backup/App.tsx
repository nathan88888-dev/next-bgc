import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { Navigation } from '@/app/components/Navigation';
import { LandingPage } from '@/app/pages/LandingPage';
import { DirectoryPage } from '@/app/pages/DirectoryPage';
import { SubmitGroupPage } from '@/app/pages/SubmitGroupPage';
import { ClaimGroupPage } from '@/app/pages/ClaimGroupPage';
import { GroupDetailPage } from '@/app/pages/GroupDetailPage';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'directory',
        element: <DirectoryPage />,
      },
      {
        path: 'submit-group',
        element: <SubmitGroupPage />,
      },
      {
        path: 'claim-group',
        element: <ClaimGroupPage />,
      },
      {
        path: 'groups/:groupId',
        element: <GroupDetailPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
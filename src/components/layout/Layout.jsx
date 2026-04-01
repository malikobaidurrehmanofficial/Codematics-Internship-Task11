import { Outlet } from 'react-router-dom';
import MovixFooter from './MovixFooter';
import MovixNavbar from './MovixNavbar';

export default function Layout() {
  return (
    <div className="bg-app text-app relative min-h-screen overflow-x-clip">
      <MovixNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MovixFooter />
    </div>
  );
}

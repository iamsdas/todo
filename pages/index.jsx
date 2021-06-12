import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Dashboard from '../components/dashboard';
import Navbar from '../components/navbar';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return <div>loading</div>;
  if (!session && !loading) {
    router.push('/api/auth/signin');
    return 'redirecting';
  }
  if (session)
    return (
      <div className='bg-gradient-to-r from-gray-200 to-gray-300'>
        <div className='sm:w-3/5 sm:px-14 mx-auto'>
          <Dashboard user={session.user} />
        </div>
      </div>
    );
}

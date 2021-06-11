import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Dashboard from '../components/dashboard';
import Navbar from '../components/navbar';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return <div>loading</div>;
  if (!session && !loading) router.push('/api/auth/signin');
  if (session)
    return (
      <div className='bg-gray-200'>
        <div className='sm:w-2/5 mx-auto'>
          <Dashboard user={session.user} />
        </div>
      </div>
    );
}

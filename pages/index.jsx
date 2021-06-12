import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Dashboard from '../components/dashboard';
import Loading from '../components/loading';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (!session && !loading) {
    router.push('/api/auth/signin');
    return 'redirecting';
  }
  return (
    <div className='bg-gradient-to-r from-gray-200 to-gray-300'>
      <div className='max-w-2xl mx-auto'>
        {loading ? <Loading /> : <Dashboard user={session.user} />}
      </div>
    </div>
  );
}

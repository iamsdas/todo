import { useSession, signIn } from 'next-auth/react';
import Dashboard from '../components/dashboard';
import Loading from '../components/loading';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (!session && !loading) {
    signIn('github');
    return 'redirecting to signin page';
  }
  return (
    <div className='min-h-screen bg-gray-900'>
      <div className='max-w-2xl mx-auto'>
        {loading ? <Loading /> : <Dashboard user={session.user} />}
      </div>
    </div>
  );
}

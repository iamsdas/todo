import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Dashboard from '../components/dashboard';
import Loading from '../components/loading';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

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

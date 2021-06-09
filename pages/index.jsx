import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Dashboard from '../components/dashboard';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return <div>loading</div>;
  if (!session && !loading) router.push('/api/auth/signin');
  if (session)
    return (
      <div>
        <Dashboard user={session.user} />
      </div>
    );
}

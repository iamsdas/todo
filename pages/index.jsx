import { signIn, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();
  if (loading) return <div>loading</div>;
  if (session) return <div>{session.user.email}</div>;
  if (!session && !loading)
    return <button onClick={() => signIn('github')}>sign in</button>;
}

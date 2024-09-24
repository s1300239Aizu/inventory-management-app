import { supabase } from '../../lib/supabaseClient';

type User = {
  id: string;
  username: string; // ここはユーザー名のカラム名に合わせてください
};

async function fetchProfiles() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const users: User[] = await fetchProfiles();

  return (
    <div>
      <h1>Profiles</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>{user.username}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

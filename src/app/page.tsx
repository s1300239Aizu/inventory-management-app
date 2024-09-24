"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type User = {
  id: number;
  username: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      if (error) {
        console.error('Error fetching profiles:', error);
      } else {
        setUsers(data);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>自己紹介</h1>
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

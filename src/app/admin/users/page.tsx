import React from 'react';
import { getAllUsers } from '@/app/actions/userActions';
import Main from './components/Main';

export const dynamic = 'force-dynamic'; // Ensure fresh data on admin load

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <>
      <Main data={users} />
    </>
  );
}
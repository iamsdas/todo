import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import Item from './item';
import Navbar from './navbar';
import NewItem from './newItem';
import Loading from './loading';

const GET_LISTS = gql`
  query getLists($email: String!) {
    lists(email: $email) {
      id
      title
      listItems {
        id
        body
      }
    }
  }
`;

const ADD_LIST = gql`
  mutation addList($email: String!, $title: String!) {
    addList(email: $email, title: $title) {
      id
      title
      listItems {
        id
        body
      }
    }
  }
`;

const Dashboard = ({ user: { email, name, image } }) => {
  const { loading, error, data } = useQuery(GET_LISTS, {
    variables: { email },
  });

  const [addList] = useMutation(ADD_LIST);
  const [newTitle, setNewTitle] = useState('');

  const addListHandler = (e) => {
    e.preventDefault();
    addList({
      variables: { email: email, title: newTitle },
      update: (cache, { data: { addList } }) => {
        const data = cache.readQuery({
          query: GET_LISTS,
          variables: { email },
        });
        cache.writeQuery({
          query: GET_LISTS,
          variables: { email },
          data: { lists: [addList, ...data.lists] },
        });
      },
    });
    setNewTitle('');
  };

  if (loading) return <Loading />;
  if (error) return 'error';

  return (
    <div class='bg-gray-800 sm:border-8 border-gray-800'>
      <Navbar name={name} image={image} />
      <div className='py-5 space-y-8'>
        <form onSubmit={addListHandler} className='px-2 sm:px-0'>
          <input
            type='text'
            value={newTitle}
            placeholder='create new list'
            onChange={(e) => setNewTitle(e.target.value)}
            className='w-full text-xl py-4 px-2 border-2 border-gray-300 hover:border-gray-400'
          />
        </form>
        {data.lists.map((list) => (
          <div key={list.id} className=' bg-gray-800 p-5 px-8'>
            <div className='text-3xl uppercase pb-4 pt-2 font-semibold text-gray-100 border-b-2 border-gray-300'>
              {list.title}
            </div>
            {list.listItems.map((item) => (
              <Item key={item.id} body={item.body} id={item.id} />
            ))}
            <div className='pt-5'>
              <NewItem id={list.id} email={email} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

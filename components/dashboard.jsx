import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import Navbar from './navbar';

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

const UPDATE_LIST = gql`
  mutation updateList($id: Int!, $title: String!) {
    updateList(id: $id, title: $title) {
      id
      title
    }
  }
`;

const ADD_ITEM = gql`
  mutation addItem($id: Int!, $body: String!) {
    addItem(id: $id, body: $body) {
      id
      body
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($id: Int!, $body: String!) {
    addItem(id: $id, body: $body) {
      id
      body
    }
  }
`;

const Dashboard = ({ user: { email, name, image } }) => {
  const { loading, error, data } = useQuery(GET_LISTS, {
    variables: { email },
  });

  const [updateList] = useMutation(UPDATE_LIST);
  const [addList] = useMutation(ADD_LIST);
  const [addItem] = useMutation(ADD_ITEM);

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

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

  const addItemHandler = (id) => (e) => {
    e.preventDefault();
    addItem({
      variables: { id, body: newBody },
      update: (cache, { data: { addItem } }) => {
        const data = cache.readQuery({
          query: GET_LISTS,
          variables: { email },
        });
        cache.writeQuery({
          query: GET_LISTS,
          variables: { email },
          data: {
            lists: data.lists.map((list) => {
              if (list.id == id) {
                const newList = { ...list };
                newList.listItems = [...list.listItems, addItem];
                return newList;
              }
              return list;
            }),
          },
        });
      },
    });
    setNewBody('');
  };

  if (loading) return 'loading';
  if (error) return 'error';

  return (
    <div>
      <Navbar name={name} image={image} />
      <div className='p-5 space-y-8'>
        <form onSubmit={addListHandler}>
          <input
            type='text'
            value={newTitle}
            placeholder='create new list'
            onChange={(e) => setNewTitle(e.target.value)}
            className='w-full px-2'
          />
        </form>
        {data.lists.map((list) => (
          <div key={list.id}>
            <div className='text-2xl capitalize pb-4'>{list.title}</div>
            {list.listItems.map((item) => (
              <div
                key={item.id}
                className='pl-2 py-2 text-lg border-t-2 border-gray-300'>
                <input type='checkbox' /> {item.body}
              </div>
            ))}
            <div className='pl-2 pt-4 border-t-2 border-gray-300'>
              <form className='flex gap-1' onSubmit={addItemHandler(list.id)}>
                <span>+</span>
                <input
                  type='text'
                  className='flex-1 px-2'
                  placeholder='add new item'
                  onChange={(e) => setNewBody(e.target.value)}
                />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

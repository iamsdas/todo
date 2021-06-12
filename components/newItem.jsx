import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_ITEM = gql`
  mutation addItem($id: Int!, $body: String!) {
    addItem(id: $id, body: $body) {
      id
      body
    }
  }
`;

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

const NewItem = ({ id, email }) => {
  const [addItem] = useMutation(ADD_ITEM);
  const [newBody, setNewBody] = useState('');

  const addItemHandler = (e) => {
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
    setNewBody(' ');
  };

  return (
    <form className='flex gap-1 w-full' onSubmit={addItemHandler}>
      <div className='flex-1'>
        <input
          type='text'
          className='w-full p-2 text-lg text-gray-800 border-2 border-gray-300 hover:border-gray-400 bg-gray-100'
          placeholder='add new item'
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='py-2 w-20 text-white bg-purple-600 hover:bg-purple-700 text-lg text-center'>
        ADD
      </button>
    </form>
  );
};

export default NewItem;

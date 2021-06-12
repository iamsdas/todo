import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPDATE_ITEM = gql`
  mutation updateItem($id: Int!, $body: String!) {
    addItem(id: $id, body: $body) {
      id
      body
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;

const Item = ({ body, id }) => {
  const [value, setValue] = useState(body);
  const [updateItem] = useMutation(UPDATE_ITEM);
  const [deleteItem] = useMutation(DELETE_ITEM);
  return (
    <div className='py-2 flex w-full gap-1 text-lg'>
      <form
        className='flex-1'
        onSubmit={(e) => {
          e.preventDefault();
          updateItem({
            variables: { id, body: value },
          });
        }}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='bg-gray-700 w-full px-2 py-2 text-gray-300 border-2 border-gray-700 hover:border-gray-800'
        />
      </form>
      <button
        className='bg-red-500 hover:bg-red-600 py-2 w-20 text-white uppercase'
        onClick={() => {
          deleteItem({
            variables: { id },
            update: (cache) => {
              const normalizedId = cache.identify({ id, __typename: 'Item' });
              cache.evict({ id: normalizedId });
              cache.gc();
            },
          });
        }}>
        del
      </button>
    </div>
  );
};

export default Item;

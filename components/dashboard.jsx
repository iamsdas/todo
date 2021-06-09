import { gql, useQuery } from '@apollo/client';

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

const Dashboard = ({ user: { email, name, image } }) => {
  const { loading, error, data } = useQuery(GET_LISTS, {
    variables: { email },
  });
  if (loading) return 'loading';
  if (error) return 'error';
  return (
    <div>
      <img src={image} alt='profile' height='50' width='50' />
      {data.lists.map((list) => (
        <div>
          {list.title}
          {list.listItems.map((item) => (
            <div>{item.body}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

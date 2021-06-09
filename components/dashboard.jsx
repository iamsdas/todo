import { gql } from '@apollo/client';

const Dashboard = ({ user: { email, name, image } }) => {
  return <div>{email}</div>;
};

export default Dashboard;

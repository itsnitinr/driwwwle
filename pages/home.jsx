const HomePage = ({ user }) => {
  return (
    <div>
      <h1>{user ? user.name : 'Anon'}</h1>
    </div>
  );
};

export default HomePage;

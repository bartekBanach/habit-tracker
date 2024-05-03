import styles from './Home.module.css';

const Home = () => {
  /*const user = useSelector(selectCurrentUser);
  const { data: habits, isLoading } = useGetHabitsByUserQuery();

  if (isLoading) return <p>Loading.....</p>;

  if (!habits || !user)
    return (
      <>
        <p>No user</p>
      </>
    );*/

  return <div className={styles.container}>Hello world</div>;
};

export default Home;

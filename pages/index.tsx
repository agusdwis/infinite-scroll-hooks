import useFetch from '../hooks/useFetch';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const Home = (props: any) => {
  const url = 'https://dog.ceo/api/breeds/image/random/30';
  const [loadMore, setLoadMore] = useState(true);

  const { loading, data } = useFetch(url, loadMore);

  useEffect(() => {
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById('list') as HTMLUListElement;
    if (props.scrollable) {
      list?.addEventListener('scroll', (e: Event) => {
        const el = e.target as HTMLElement;
        if (el?.scrollTop + el?.clientHeight === el?.scrollHeight) {
          setLoadMore(true);
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        if (
          window.scrollY + window.innerHeight ===
          list?.clientHeight + list?.offsetTop
        ) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById('list') as HTMLUListElement;

    if (list?.clientHeight <= window.innerHeight && list?.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);

  return (
    <div className="App">
      <Head>
        <title>Infinite Scroll Doggo</title>
      </Head>
      <ul id="list">
        {data?.map((img: any, i: number) => (
          <li key={i} style={{ backgroundImage: `url(${img})` }} />
        ))}
      </ul>

      <Modal show={loading} />
    </div>
  );
};

export default Home;

const Modal = (props: any) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="loader-container">
      <p className="loader-content">Please Wait</p>
    </div>
  );
};

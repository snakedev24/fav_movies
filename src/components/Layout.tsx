
import React from 'react';
import Head from 'next/head';

const Layout: React.FC<{ title: string, children:any }> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;

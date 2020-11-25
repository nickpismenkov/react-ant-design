import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const HomePage: React.FC = () => {
  return (
    <Content>
      <div>
        <h1>Welcome</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
          praesentium at totam labore necessitatibus modi deserunt accusamus
          adipisci, quo tenetur eius repellat. Optio illum ipsum provident
          magnam nam praesentium ex.
        </p>
      </div>
    </Content>
  );
};

export default HomePage;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';

function App() {
  const [choosedImage, setChoosedImage] = useState(-1);

  return (
    <div className="app">
      <Sidebar choosedImage={choosedImage} setChoosedImage={setChoosedImage} />
      <ContentArea choosedImage={choosedImage} />
    </div>
  );
}

export default App;
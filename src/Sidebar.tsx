import React, { useState } from 'react';

function getImageUrlById(id: number) {
  // if (id > 5)
  //   return { original: `https://picsum.photos/iasdd/${id}/1000/600/` }
  return `https://picsum.photos/id/${id}/1000/600/`
  // return { original: `/getocfile?file=${id}` }
}

function Sidebar({ choosedImage, setChoosedImage }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="toggle-button">
        {isOpen ? 'Скрыть' : <a href={"#image" + (choosedImage - 1)}>
          Файл
        </a>}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {
          isOpen ?
            <div className="image-list">
              {[...Array(10).keys()].map(id => (
                <img key={id} id={'image' + id} src={getImageUrlById(id + 1)} alt={`Image ${id + 1}`}
                  onClick={() => {
                    setChoosedImage(id);
                    setIsOpen(false)
                  }} style={{
                    opacity: (choosedImage == -1 || choosedImage == id) ? 1 : 0.4
                  }} />
              ))}
            </div>
            : <></>
        }
      </div>
    </>
  );
}

export default Sidebar;

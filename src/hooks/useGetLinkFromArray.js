import {useEffect, useState} from 'react';

const useGetLinkFromArray = ({imgArray, defaultIndex = 0}) => {
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {
    if (imgArray) {
      setImgLink(imgArray[2] || imgArray[defaultIndex] || '');
    }
  }, [imgArray, defaultIndex]);

  return {imgLink};
};

export default useGetLinkFromArray;

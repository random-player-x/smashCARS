import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { image1id, image2id , image1post, image2post} from './atoms/atom1';


let index= 0;
let array = [];

function getRandomNumber(n){
  for (let i = 0; i < n ;i ++ ){
    let randomnumber = Math.floor((Math.random()* n) + 1);
    if(!array.includes(randomnumber)){
      array.push(randomnumber);
    }
  }
  index++;
  return array[index%n];
}


async function Increasevotes(imageId) {
  try {
    await fetch('http://localhost:3000/votes/' + imageId, {
      method: 'GET' // or 'POST' if your API is designed to use POST for vote increments
    });
  } catch (error) {
    console.error("Error increasing votes:", error);
  }
}


export function Imagegetter1(){
    const [img1post, setImage1post] = useRecoilState(image1post);
  const [loading, setLoading] = useState(true);
  const img1id = useRecoilValue(image1id);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/images/'+ img1id);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImage1post(url);
      } else {
        console.error('Failed to fetch image');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [img1id]);

  return (
    <div className="flex items-center justify-center relative overflow-hidden ">        
      {loading ? (
        <p>Loading image...</p>
      ) : (
        <img src={img1post} alt="Dynamic" className="object-cover h-full w-full" />
      )}
      <br />
    </div>
  );
}
export function Imagegetter2(){
  const [img2post, setImage2post] = useRecoilState(image2post);
  const [loading, setLoading] = useState(true);
  const img2id = useRecoilValue(image2id);

const fetchImage = async () => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:3000/images/'+ img2id);
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImage2post(url);
    } else {
      console.error('Failed to fetch image');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchImage();
}, [img2id]);

return (
  <div className="flex items-center justify-center ">      
    {loading ? (
      <p>Loading image...</p>
    ) : (
      <img src={img2post} alt="Dynamic" className="object-cover h-full w-full"  />
    )}
    <br />
  </div>
);
}

export function Button1(){
  const setimgid2 = useSetRecoilState(image2id);
  const voteid1 = useRecoilValue(image1id);
  return( 
    <div>
      <button className = "bg-red-500 hover:bg-blue-500 font-mono hover:border-yellow-200 text-white font-bold py-2 px-4 rounded " onClick={()=>{
          setimgid2(getRandomNumber(54));
          Increasevotes(voteid1);
        }}>SMASH</button> 
    </div>  
 
  )
}

export function Button2(){
  const setimgid1 = useSetRecoilState(image1id);
  const voteid2 = useRecoilValue(image2id);

  return( 
    <div>
      <button className = "bg-red-500 hover:bg-blue-500 hover:border-red-200 font-mono text-white font-bold py-2 px-4 border-black rounded" onClick={()=>{
          setimgid1(getRandomNumber(54));
          Increasevotes(voteid2);
        }}>SMASH</button> 
    </div>  
 
  )
  
}
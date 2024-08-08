import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export function Leaderboard() {
  const [imageid, setimageid] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('http://localhost:3000/leaderboard');
        const json = await res.json();
        setimageid(json);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div> 
      <div>
        <div className='flex justify-center'>
          <Link to="/"><button className='bg-red-700 p-1 text-white font-bold font-mono rounded py-1 px-3 hover:bg-blue-500 m-1'>HomeButton</button></Link><br /><br />
        </div>
        <div className=''>
          {imageid.length > 0 ? (
            imageid.map((element) => (
              <Leaders key={element.id} votes={element.votes} id={element.id} />
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Leaders({ votes, id }) {
  const [imagepost, setImagepost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/images/' + id);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImagepost(url);
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
  }, [id]);

  return (
    <Cardwrapper>
        <div className='flex'>
          {loading ? (
            <p>Loading image...</p>
          ) : (
            <div className=''>
              <img src={imagepost} alt="Dynamic" style={{ width: '100px' }} />
            </div>
          )}
          <div className='align-content-center m-1 p-10 font-mono'>
            <div>Smashes : {votes} </div>
          </div>
        </div>
    </Cardwrapper>
    
  );
}

function Cardwrapper({ children }) {
  return (
    <div className='bg-gray-100'
      style={{
        border: '0px solid black',
        padding: 20,
        boxShadow: '0px 0px 0px #aeafb1, 1px -1px 5px #aeafb1',
        width: 900,
        margin: 'auto',
        textAlignLast: 'center',
      }}
    >
      {children}
    </div>
  );
}
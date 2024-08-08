import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button1, Button2, Imagegetter1, Imagegetter2 } from './components/Imagegetter';
import { RecoilRoot } from 'recoil';
import {Leaderboard} from './Leaderboard'

function App() {
  return (
    <div className='bg-white-200'>
      <div className="flex items-center justify-center m-5 bg-red-700 rounded">
        <div className="text-3xl font-bold bg-red-700 text-white m-1 rounded-full py-1 px-4">SmashCARS</div>
      </div>
      <div className='flex justify-center m-1 font-bold font-mono'>
        Chase the dreams !
      </div>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
      </Routes>
    </Router>
    </div>

  );
}

function Home() {
  return (
    <div>
      <div >
        <RecoilRoot>
          <Cardwrapper>
            <br /> <div className='font-mono'>(Choose the HOTTER! one)
              </div>
              <div className='flex '>
                <Cardwrapper2>
                  <Button1 /><br /><br />
                  <Imagegetter1 /><br />
                </Cardwrapper2>
                <Cardwrapper2>
                  <Button2 /><br /><br />
                  <Imagegetter2 />
                </Cardwrapper2>
              </div>
            <div className='flex justify-center'>
            <Link to="/leaderboards"><button className='bg-red-700 p-1 text-white font-bold font-mono rounded py-1 px-3 hover:bg-blue-500'>LEADERBOARDS</button></Link><br /><br />
            {/* <Link to="/uploads">Go to Uploads</Link> */}
          </div>
          </Cardwrapper>
         
        </RecoilRoot>
      </div>
     
    </div>
  );
}

function Cardwrapper({ children }) {
  return (
    <div className='bg-gray-100'
      style={{
        border: '0px solid black',
        padding: 20,
        boxShadow: '0px 0px 0px #aeafb1, 1px -1px 5px #aeafb1',
        height: 700,
        width: 900,
        margin: 'auto',
        textAlignLast: 'center',
      }}
    >
      {children}
    </div>
  );
}

function Cardwrapper2({ children }) {
  return (
    <div
      style={{
        border: '0px solid black',
        padding: 20,
        boxShadow: '0px 0px 0px #aeafb1, 1px -1px 5px #aeafb1',
        height: 450,
        width: 350,
        margin: 50,
        float: 'left',
        backgroundColor: 'white',
        borderRadius:20,
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default App;

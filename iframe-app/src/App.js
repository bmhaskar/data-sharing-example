import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [loadIframe, setLoadIframe] = useState(false);
  useEffect(()=> {
    setTimeout(function(){ setLoadIframe(true) }, 5000);
  },[]);
  
 

  return (
    <div className="App">


<p>An iframe with no borders:</p>
<iframe 
// src="http://localhost:8082/v1/dim?token=xa3g4XjxvH"
 src="http://localhost:5000/?master=true"
title="Spinwheel" width="100%" height="200" >
</iframe>
<br /> <br />

<p>2nd Iframe</p>
{loadIframe && <iframe 
// src="http://localhost:8082/v1/dim?token=xa3g4XjxvH"
 src="http://localhost:5000/"
title="Spinwheel" width="100%" height="200" >
</iframe> }
<button>
  Footer
</button>



    </div>
  );
}

export default App;

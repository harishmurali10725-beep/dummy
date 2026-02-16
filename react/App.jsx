import { useState } from 'react'

import Form from './Form.jsx'

// import MuiAlert from "@material-ui/lab/Alert";

function App() {
  const [count, setCount] = useState(0)
  const Alert = (props) => (<MuiAlert elevation={6} variant="filled" {...props} />);

  const Incrementor = () => {
  if (count>=5){
    // <Alert severity="error">Number is already 5,it wont go beyond</Alert>;
    alert("Number is already 5,it wont go beyond that")
    return
  }
  setCount((prev)=>prev+1);

};

  const Decrementor = () => {if(count>0) setCount(count-1)}
  const Resetter = () => {setCount(0)}
  return (
     <div>
      <button onClick={Incrementor}>+</button>
      <label>  {count}  </label>
      <button onClick={Decrementor}>-</button>
      <button onClick={Resetter}>Reset</button>
      <div>
        <Form />
     </div>
     </div>
     
  )
}

export default App

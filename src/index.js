import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BorderInput({ children, borderValue, setBorderValue}) {
  return(
    <div className="field">
    <span>{children}</span>
    <input value={borderValue}
      maxLength={3}
      autoComplete="false"
      onChange={(e) => setBorderValue(Number.parseInt(e.target.value))} />
    </div>
  )
}

export default function App() {  
  const [borderTopLeftRadius, setBorderTopLeftRadius] = useState(15)  
  const [borderTopRightRadius, setBoderTopRightRadius] = useState(15)  
  const [borderBottomRightRadius, setBorderBottomRightRadius] = useState(15)  
  const [borderBottomLeftRadius, setBorderBottomLeftRadius] = useState(15) 
  const [resultCss, setResultCss] = useState('') 
  const resultRef = useRef(null);
  
  useEffect(() => {    
    const result = `border-radius: ${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px;`
    setResultCss(result)
  }, [ borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius] );

  function copyToClipboard(e){
    resultRef.current.select()
    document.execCommand('copy');
    alert(`CSS Style { ${resultCss} } copied to clipboard`)
  }
  
  return (
    <div className="container">
      <h1>Border-Radius Previwer</h1>
      <div className="wrapper">
        <div className="previewer">
          <div className="box" style={{
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius
          }} />
        </div>      
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Border Corners</h3>
          <BorderInput borderValue={borderTopLeftRadius} setBorderValue={setBorderTopLeftRadius} >Top-Left: </BorderInput>
          <BorderInput borderValue={borderTopRightRadius} setBorderValue={setBoderTopRightRadius} >Top-Right: </BorderInput>
          <BorderInput borderValue={borderBottomRightRadius} setBorderValue={setBorderBottomRightRadius} >Bottom-Right: </BorderInput>
          <BorderInput borderValue={borderBottomLeftRadius} setBorderValue={setBorderBottomLeftRadius} >Bottom-Left: </BorderInput>
        </form>        
      </div>      
      <input ref={resultRef} value={resultCss} className="result-css"/>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

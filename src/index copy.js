import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function BorderInput({ borderValue, setBorderValue}) {
  return(
    <input value={borderValue}
      maxLength={3}
      autoComplete="false"
      onChange={(e) => setBorderValue(Number.parseInt(e.target.value))} />
  )
}

export default function App() {
  const [errorMessage, setErrorMessage] = useState('')  
  const [borderTopLeftRadius, setBorderTopLeftRadius] = useState(15)  
  const [borderTopRightRadius, setBopRightRadius] = useState(15)  
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
          <div className="field">
            <span>Top-Left: </span>
            <input value={borderTopLeftRadius}
              maxLength={3}
              autoComplete="false"
              onChange={(e) => setBorderTopLeftRadius(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="field">
            <span>Top-Right: </span>
            <input value={borderTopRightRadius}
              maxLength={3}
              autoComplete="false"
              onChange={(e) => setBopRightRadius(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="field">
            <span>Bottom-Right: </span>
            <input value={borderBottomRightRadius}
              maxLength={3}
              autoComplete="false"
              onChange={(e) => setBorderBottomRightRadius(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="field">
            <span>Bottom-Left: </span>
            <BorderInput borderValue={borderBottomLeftRadius} setBorderValue={setBorderBottomLeftRadius} />
            
          </div>          
        </form>        
      </div>
      {errorMessage &&  <div className="error">{ errorMessage }</div>}
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

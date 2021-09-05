const ATMDeposit = ({ onChange, isDeposit, validTransaction, handleModeSelect }) => {
    const choice = ['Deposit', 'Cash Back'];
    const isValid = validTransaction;
  
    return (
      <div>
        <div style={{marginLeft:'40px'}}>
            <h3> {choice[Number(!isDeposit)]} Amount</h3>
        </div>
        <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}>
            <div style={{width:'100%', marginLeft:'40px', minWidth:'100%', display:'flex',flexDirection:'row',flexWrap:'nowrap',justifyContent:'center'}}>
                <div style={{width:'30%',marginTop:'30px',flexGrow:'0'}}>$ <input style={{width:'90%',fontSize:'1.2em'}} id="number-input" type="number" width="200" onChange={onChange}></input></div>
            </div>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'nowrap'}}>
                <div className='btn-div-right' style={{flexGrow:1}}>
                <input className="btn-caution" type="submit" width="200" value="Cancel" onClick={handleModeSelect}></input>
                </div>
                <div className='btn-div-left' style={{flexGrow:1}}>
                <input className="btn-main-right" type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid ? true : false}></input>
                </div>
            </div>
        </div> 
      </div>
    );
  };
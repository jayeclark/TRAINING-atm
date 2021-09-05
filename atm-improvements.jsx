const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState(null);
  const [message, setMessage] = React.useState('Please select an option to continue');
  const [isMain, setIsMain] = React.useState(true);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  
  const handleChange = (event) => {
    if (Number(event.target.value) <= 0) {
      setValidTransaction(false); return;
    }
    if (atmMode == 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } 
    else {
      setValidTransaction(true);
      setDeposit(Number(event.target.value));
    }
  };

  const handleModeSelect = (event) => {
    if (event.target.value == 'Deposit') {
      setAtmMode('Deposit');
      setIsMain(false);
      setIsDeposit(true);
      setMessage('');
    }
    else if (event.target.value == 'Withdrawal') {
      setIsMain(false);
      setAtmMode('Withdrawal');
      setIsDeposit(false);
      setMessage('');
    }
    else if (event.target.value == 'Fast Cash Withdrawal') {
      setIsMain(false);
      setAtmMode('Fast Cash Withdrawal');
      setIsDeposit(false);
      setMessage('');
    }
    else if (event.target.value == 'Balance Inquiry') {
      setIsMain(false);
      setAtmMode('Balance Inquiry');
      setIsDeposit(false);
      setMessage('');
    }
    else {
      setAtmMode(null);
      setIsMain(false);
      setIsDeposit(false);
      setMessage('Please select an option to continue');
    }
  }

  const handleSubmit = (event) => {
    if (event.target.id.includes('fastcash') && atmMode == 'Fast Cash Withdrawal') {
      let inputID = event.target.id + "-input";
      let inputEl = document.getElementById(inputID);
      setDeposit(Number(inputEl.value));
      let newTotal = totalState - inputEl.value;
      setTotalState(newTotal);
      setMessage(atmMode + ' Successful')
      setAtmMode('Success');
      setDeposit(0);
      setTimeout(function () {setAtmMode(null); setMessage(''); setIsMain(true)},8000);
      console.log(newTotal,totalState);
    }
    else {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      if (newTotal !== totalState) {
        setTotalState(newTotal);
        if (atmMode == 'Deposit' || atmMode == 'Withdrawal') {
          setMessage(atmMode + ' Successful')
          setAtmMode('Success');
          setDeposit(0);
          setTimeout(function () {setAtmMode(null); setMessage('Please select an option to continue'); setIsMain(true)},8000);
        }
      }
    }
    setValidTransaction(false);
    event.preventDefault();
  };

  return (
    <div style={{margin:'0px',padding:'0px'}}>
      <div className="ribbon">{(atmMode == 'Success' || atmMode == null) ? message : atmMode}</div>
      <div className="app" style={{display:'flex',flexWrap:'wrap'}}>
        <div style={{backgroundColor:'white', width:'100%', display: (atmMode == 'Balance Inquiry' || atmMode == 'Success' ) ? '' : 'none',}}>
            <h2 id="total">{status}</h2>

          </div>
          <div style={{width:'100%', display: atmMode == 'Balance Inquiry' ? '' : 'none',}} className="btn-div-right"><button className="btn-caution" value="Cancel" onClick={handleModeSelect} type="reset">Return to Main Menu</button></div>
        <form style={{width:'100%'}} id="mode-select-form" onSubmit={handleSubmit}>
          <div style={{width:'100%', padding: '10px 0px', display: atmMode == null ? '' : 'none',}}>
            <div style={{display:"flex",flexDirection:'row',width:'100%'}}>
              <div style={{display:"flex",flexDirection:'column',flexGrow:1}}>
                <div className="btn-div-left"><button value="Deposit" className="btn-main-left" onClick={(e) => handleModeSelect(e)}>Deposit</button></div>
                <div className="btn-div-left"><button value="Balance Inquiry" className="btn-main-left" onClick={(e) => handleModeSelect(e)}>Balance Inquiry</button></div>
              </div>
              <div style={{display:"flex",flexDirection:'column',flexGrow:1}}>
                <div className="btn-div-right"><button value="Withdrawal" className="btn-main-right" onClick={(e) => handleModeSelect(e)}>Withdrawal</button></div>
                <div className="btn-div-right"><button value="Fast Cash Withdrawal" className="btn-main-right" onClick={(e) => handleModeSelect(e)}>Fast Cash</button></div>
              </div>
            </div> 
          </div>
          {(atmMode == 'Deposit' || atmMode == 'Cash Back') ? <ATMDeposit onChange={handleChange} isDeposit={isDeposit} handleModeSelect={handleModeSelect} validTransaction={validTransaction}></ATMDeposit> : null}
        </form>
          <div style={{width:'100%', padding: '10px 0px', display: atmMode == 'Fast Cash Withdrawal' ? '' : 'none',}}>
            <label>Please select an option to continue</label>
              <div style={{display:"flex",flexDirection:'row',width:'100%'}}>
                <div style={{display:"flex",flexDirection:'column',flexGrow:1}}>
                  <div className="btn-div-left">
                    <form id='fastcash-20' onSubmit={handleSubmit}>
                      <input id='fastcash-20-input' type="hidden" value="20" />
                      <button className="btn-main-left" type="submit" disabled={totalState < 20 ? true : false}>
                        $20
                      </button>
                    </form>
                  </div>
                  <div className="btn-div-left">
                    <form id='fastcash-50' onSubmit={handleSubmit}>
                    <input id='fastcash-50-input' type="hidden" value="50" />
                      <button className="btn-main-left" type="submit" disabled={totalState < 50 ? true : false}>
                        $50
                      </button>
                    </form>
                  </div>
                  <div className="btn-div-left">
                    <form id='fastcash-100' onSubmit={handleSubmit}>
                    <input id='fastcash-100-input' type="hidden" value="50" />
                      <button className="btn-main-left" type="submit" disabled={totalState < 100 ? true : false}>
                        $100
                      </button>
                    </form>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:'column',flexGrow:1}}>
                <div className="btn-div-left">
                    <form id='fastcash-150' onSubmit={handleSubmit}>
                    <input id='fastcash-150-input' type="hidden" value="150" />
                      <button className="btn-main-left" type="submit" disabled={totalState < 150 ? true : false}>
                        $150
                      </button>
                    </form>
                  </div>
                  <div className="btn-div-left">
                    <form id='fastcash-200' onSubmit={handleSubmit}>
                      <input id='fastcash-200-input' type="hidden" value="200" />
                      <button className="btn-main-left" type="submit" disabled={totalState < 200 ? true : false}>
                        $200
                      </button>
                    </form>
                  </div>
                  <div className="btn-div-right"><button className="btn-caution" value="Cancel" onClick={handleModeSelect} type="reset">Cancel</button></div>
                </div>
              </div> 
          </div>

      </div>

    </div>

  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));

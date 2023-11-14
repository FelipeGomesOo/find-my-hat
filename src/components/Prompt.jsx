export default function Prompt({startHandler}) {
    return (
      <div className="Prompt">          
          <button onClick={startHandler}>Start</button>
      </div>
    );
  }
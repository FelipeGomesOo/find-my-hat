 import svgField from '../../assets/tile.png';
export default function Field() {        
    return (
        <div className="Field gridCell" name='░'>
             <img className='FieldImg' src={svgField} alt="Field" />     
        </div> 
    );
}
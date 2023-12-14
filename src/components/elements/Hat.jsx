import hat from '../../assets/hat.png';
import svgField from '../../assets/tile.png';
export default function Hat() {        
    return (
        <div className="Hat gridCell" name='^'>
            <img  className='HatImg' src={hat} alt="Hat" />   
            <img  className='FieldImg' src={svgField} alt="Hat" />           
        </div> 
    );
}
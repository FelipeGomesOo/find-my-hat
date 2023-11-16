import svgMe from '../../assets/me.svg';
import svgField from '../../assets/field.svg';
export default function Me() {        
    return (
        <div className="Me gridCell" name='*'>
            <img className="MeImg"  src={svgMe} alt="Player" />
            <img className="FieldImg"  src={svgField} alt="Player" />            
        </div> 
    ); 
}
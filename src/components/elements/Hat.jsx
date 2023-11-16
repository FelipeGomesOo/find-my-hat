import svgHat from '../../assets/hat.svg';
export default function Hat() {        
    return (
        <div className="Hat gridCell" name='^'>
            <img  className='HatImg' src={svgHat} alt="Hat" />         
        </div> 
    );
}
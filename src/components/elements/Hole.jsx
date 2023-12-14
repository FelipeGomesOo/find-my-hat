 import svgHole from '../../assets/hole.png';
export default function Hole() {        
    return (
        <div className="Hole gridCell" name='O'>
            <img className="HoleImg" src={svgHole} alt="Hole" /> 
        </div> 
    );
}
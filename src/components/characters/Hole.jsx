import svgHole from '../../assets/hole.svg';
export default function Hole() {        
    return (
        <div className="Hole gridCell" name='O'>
            <img className="HoleImg" src={svgHole} alt="Hole" />         
        </div> 
    );
}
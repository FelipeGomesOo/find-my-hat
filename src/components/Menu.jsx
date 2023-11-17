import Button from './Button'; ;
export default function Menu({loadGame}) {
    return (
        <div className="Menu">
            <Button onClick={loadGame} type='accent' size="small">Restart</Button> 
        </div>
    );
}
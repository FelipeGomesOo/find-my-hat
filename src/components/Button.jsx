export default function Button( { onClick, children, type, size } ) {
    return (
        <button 
            className={`Button ${type} ${size} `} 
            onClick={onClick}
        >
            {children}
        </button> 
)}


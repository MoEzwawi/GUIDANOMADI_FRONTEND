import { useEffect, useState } from "react";

const HomeMadeSpinner = () => {
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveDot(activeDot => (activeDot + 1) % 3);
        }, 250)

        return () => clearInterval(intervalId)
    }, []);
    return (
        <div className="d-flex">
            <div className={`dot ${activeDot === 0 ? 'active' : activeDot === 1 ? 'semi-active' : 'inactive'}`}></div>
            <div className={`dot ${activeDot === 1 ? 'active' : activeDot === 2 ? 'semi-active' : 'inactive'}`}></div>
            <div className={`dot ${activeDot === 2 ? 'active' : activeDot === 0 ? 'semi-active' : 'inactive'}`}></div>
        </div>
    )
}

export default HomeMadeSpinner
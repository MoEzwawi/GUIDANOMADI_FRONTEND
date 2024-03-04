import React from 'react';
import { Spinner } from 'react-bootstrap';
import customSpinnerImage from '../assets/images/Gi.jpg'

const CustomSpinner = () => {
    return (
        <div style={{ position: 'relative', width: '70px', height: '70px', marginTop: '40px' }}>
            <Spinner animation="grow" role="status" variant="primary" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <img src={customSpinnerImage} alt="Custom Spinner" style={{ width: '100%', height: '100%' }} className='rounded-circle' />
            </Spinner>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default CustomSpinner;

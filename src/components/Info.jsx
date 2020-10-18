import React from 'react'

import at from "../img/at.png";
import phone from "../img/phone.png";


function Info({ userEmail, userPhone }) {
    return (
        <div className='info'>
<div className='info__email'>
<img className="info__at" src={at} alt="at image" />
<div>{userEmail}</div>
</div>
<div className='info__phone'>
<img className="info__phone__img" src={phone} alt="phone image" />
<div>{userPhone}</div>
</div>
        </div>
    )
}

export default Info

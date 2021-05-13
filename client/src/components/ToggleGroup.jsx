import React, { useState } from 'react'
import styled from 'styled-components'


const types = ['clicked', 'darkMode']

function ToggleGroup({ MyButton, theme }) {
    const [active, setActive] = useState(types[0])
    
    const ButtonToggle = styled(MyButton)`
opacity: 0.7;
${({active}) => active &&`
    opacity: 1;
`}
`

    return <div>
        {types.map(type => (
            <ButtonToggle
            active={active === type}
            onClick={() => setActive(type) } 
            >{type}
            </ButtonToggle>
        ))}
    </div>
}

export default ToggleGroup
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import '../styles/globalStyles.js'

export const Theme = () => {
 
    return (
        <ThemeProvider>
            <GlobalStyles/>
        </ThemeProvider>
    )
}


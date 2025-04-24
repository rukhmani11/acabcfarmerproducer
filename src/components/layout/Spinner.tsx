import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Backdrop } from '@mui/material';

const Spinner = (props: any) => {
    return props.show && (
        <>
            <Backdrop
                className='suja'
                sx={{ color: '#fff', zIndex: (theme : any) => theme.zIndex.drawer + 301 }}
                open={props.show}
            //onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Spinner
import React from 'react';
import { Stack } from '@mui/material';
import sadFace from '../../assets/images/sad-face.png'
import './nodata_found.css';
const NoDataFound = () => {
  return (
    <div className='no-data-container'>
      <Stack height="100%" alignItems="center" className='stack' justifyContent="center">
        <img src={sadFace} alt="No result" />
        <div className="no-result-text">
         No Result Found
        </div>
     </Stack>
      </div>
  )
}

export default NoDataFound
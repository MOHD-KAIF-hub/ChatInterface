import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './CropImage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Slider,
    Typography,
  } from '@mui/material';

const ImageCropper = ({ getBlob, inputImg,setInputImg,imageref,setImagePreview}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(
            inputImg,
            croppedAreaPixels
        )
        
     getBlob(croppedImage);
        }
    
    const handleSubmit=()=>{
    setInputImg(prev=>!prev);
    }

    const handleImageChange = (file) => {
      if (file) {
        if (file.size >= 1048576) {
          return alert("Max file size is 1mb");
        } else {
          setImagePreview(URL.createObjectURL(file));
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            setInputImg(reader.result);
          }, false);
    
          reader.readAsDataURL(file);
        }
      }
    };
    const ChangeImage = () => {
      // Triggering a click on the file input element
      imageref.current.click();
    };
    
    // Attaching an event listener to the file input element
    imageref.current.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleImageChange(file);
    });
    
  

    return (
    <>

<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position:'fixed',
        height:'100vh',
        width:'100%',
        top:0,
        left:0,
        background:'#333',
       zIndex:100
        
      }}
    >
<Box
  dividers="true" 
  sx={{
    width: '40%',
    height: 50,
    background: 'white',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px', 
  }}
>
  <Typography variant="h6" sx={{ color: 'black' }}>
    Crop your image
  </Typography>
  <Button onClick={(prev) =>setInputImg(!prev)} sx={{ color: 'black' }}>
  <FontAwesomeIcon key="1" className='icon cursor-pointer text-xl' icon={faXmark} />
  </Button>
</Box>



    <DialogContent
    dividers
    sx={{
      background: '#333',
      position: 'relative',
       width:'40%',
    }}
  >
  <Cropper
  image={inputImg}
  crop={crop}
  zoom={zoom}
  aspect={4/3}
  onZoomChange={setZoom}
  onCropChange={setCrop}
  onCropComplete={onCropComplete}
/>
  </DialogContent>
  <DialogActions sx={{ width:'40%',flexDirection: 'column', mx: 3,background:'white' }}>
    <Box sx={{ width: '50%', mb: 1 }}>
      <Box >
        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={zoomPercent}
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e, zoom) => setZoom(zoom)}
         
        />
      </Box>
    </Box>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Button
        variant="outlined"
        onClick={ChangeImage}
      >
        Change
      </Button>
      <Button
        variant="contained"
        onClick={handleSubmit}
      >
        Attach
      </Button>
    </Box>
  </DialogActions>
  </Box>


  </>
    )
}

export default ImageCropper
const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };
import { IKImage } from 'imagekitio-react'
import React from 'react'

const URL_ENDPOINT = import.meta.env.VITE_IK_URL_ENDPOINT

const Image = ({src, alt, className, w, h}) => {
  return (
    <IKImage
    urlEndpoint={URL_ENDPOINT}
    path={src}
    alt={alt}
    className={className}
    loading='lazy'
    lqip={{active:true, quality:20}}
    width={w}
    height={h}
    transformation={[
      {width:w, height:h,}
    ]}
    />
  )
}

export default Image

//This Image component is only for assets used from image kit. Not for local or any other sources.
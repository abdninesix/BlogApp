import { IKContext, IKUpload } from 'imagekitio-react'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'

const authenticator = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

const Upload = ({ children, type, setProgress, setData }) => {

    const ref = useRef(null)

    const onError = (error) => {
        console.log(error)
        toast.error("Upload failed")
    }

    const onSuccess = (res) => {
        console.log(res)
        setData(res)
        toast.success("Uploaded")
    }

    const onUploadProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100))
    }

    return (
        <div>
            <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} authenticator={authenticator}>
                <IKUpload
                    useUniqueFileName
                    folder="bw/posts"
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    className='hidden'
                    ref={ref}
                    accept={`${type}/*`}
                />
            </IKContext>
            <div className='w-fit cursor-pointer' onClick={()=>(ref.current.click())}>{children}</div>
        </div>
    )
}

export default Upload
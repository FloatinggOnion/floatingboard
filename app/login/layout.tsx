import React from 'react'

type Props = {
    children?: React.ReactNode;
}

const layout = (props: Props) => {
  return (
    <div className='flex h-screen'>
        <img src={"login-image.jpg"} alt="" />
        {props.children}
    </div>
  )
}

export default layout
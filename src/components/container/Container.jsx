import React from 'react'

function Container({children},{data}) {
  return (
    <div className='w-full  max-auto px-4 dark:{data}'>
        {children}
    </div>
  )
}
export default Container
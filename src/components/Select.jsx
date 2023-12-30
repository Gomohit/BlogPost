import React, { useId } from 'react'

function Select({
    options,
    label,
    className='',
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id}></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        >
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        Select</div>
  )
}
//forward ref is given because using this we can access this element any other component its reference
export default React.forwardRef(Select)
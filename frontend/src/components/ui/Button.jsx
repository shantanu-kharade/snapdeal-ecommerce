import React from 'react'

const Button = (name) => {
  return (
    <div className='px-4 py-2 text-sm bg-violet-600 font-medium text-violet-100 hover:bg-violet-900/50 rounded-md transition-colors absolute right-8'>{name}</div>
  )
}

export default Button
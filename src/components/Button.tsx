import React from 'react'

type ButtonProps = {
  title: string;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, onClick, ...otherProps }: ButtonProps) => {
  return (
    <button
      className='text-xl font-[400] px-4 py-2 bg-[#dcdedc] border border-black rounded-md hover:bg-[#9f9f9f] transition-colors cursor-pointer w-[200px]'
      onClick={onClick}
      {...otherProps}
    >
      {title}
    </button>
  )
}

export default Button

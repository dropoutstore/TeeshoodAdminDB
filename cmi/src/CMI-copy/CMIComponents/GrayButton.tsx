import React from 'react';


export default function GrayButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
    {...props}
      className={
        'rounded-md bg-gray-300 p-4 font-bold hover:shadow-md ' + props.className
      }
    >
      {props.children}
    </button>
  );
}

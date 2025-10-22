import * as React from 'react';
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className='', ...props }, ref) => (
  <input ref={ref} className={`w-full border rounded-xl px-3 py-2 ${className}`} {...props} />
));
Input.displayName='Input';
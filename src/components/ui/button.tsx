import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'outline'|'secondary'|'ghost', size?: 'sm'|'md' };
export function Button({ className='', variant='default', size='md', ...props }:Props){
  const v = variant==='outline' ? 'border bg-white' : variant==='secondary' ? 'bg-gray-100' : variant==='ghost' ? 'bg-transparent' : 'bg-black text-white';
  const s = size==='sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2';
  return <button className={`rounded-2xl ${v} ${s} ${className}`} {...props}/>
}
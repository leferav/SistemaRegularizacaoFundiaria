import * as React from 'react';
export function Badge({ children, variant='default' }:{children:React.ReactNode, variant?:'default'|'secondary'|'outline'}){
  const v = variant==='secondary' ? 'bg-gray-100' : variant==='outline' ? 'border' : 'bg-black text-white';
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-xl text-xs ${v}`}>{children}</span>
}
import * as React from 'react';
export function Select({ children }:{children:React.ReactNode}){ return <div>{children}</div>; }
export function SelectTrigger({ children }:{children:React.ReactNode}){ return <button className="w-full border rounded-xl px-3 py-2 text-left">{children}</button>; }
export function SelectValue({ placeholder }:{placeholder?:string}){ return <span className="text-gray-500">{placeholder}</span>; }
export function SelectContent({ children }:{children:React.ReactNode}){ return <div className="mt-2 border rounded-xl p-2">{children}</div>; }
export function SelectItem({ children, value }:{children:React.ReactNode, value:string}){ return <div className="px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">{children}</div>; }
import * as React from 'react';
export function Tabs({ children, className='', defaultValue }:{children:React.ReactNode, className?:string, defaultValue?:string}){
  return <div className={className}>{children}</div>;
}
export function TabsList({ children, className='' }:{children:React.ReactNode, className?:string}){
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}
export function TabsTrigger({ children, value }:{children:React.ReactNode, value:string}){
  return <button className="px-3 py-1.5 border rounded-xl">{children}</button>;
}
export function TabsContent({ children, className='', value }:{children:React.ReactNode, className?:string, value:string}){
  return <div className={className}>{children}</div>;
}
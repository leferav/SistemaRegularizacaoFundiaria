import * as React from 'react';
export function Card({ className='', children }:{className?:string, children:React.ReactNode}){
  return <div className={`bg-white border border-border ${className}`}>{children}</div>;
}
export function CardHeader({ children, className='' }:{children:React.ReactNode, className?:string}){
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}
export function CardTitle({ children, className='' }:{children:React.ReactNode, className?:string}){
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}
export function CardDescription({ children, className='' }:{children:React.ReactNode, className?:string}){
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}
export function CardContent({ children, className='' }:{children:React.ReactNode, className?:string}){
  return <div className={`p-4 ${className}`}>{children}</div>;
}
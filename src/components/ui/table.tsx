import * as React from 'react';
export function Table({ children }:{children:React.ReactNode}){ return <table className="w-full text-sm border rounded-xl overflow-hidden">{children}</table>; }
export function TableHeader({ children }:{children:React.ReactNode}){ return <thead className="bg-gray-50">{children}</thead>; }
export function TableBody({ children }:{children:React.ReactNode}){ return <tbody>{children}</tbody>; }
export function TableRow({ children }:{children:React.ReactNode}){ return <tr className="border-t">{children}</tr>; }
export function TableHead({ children }:{children:React.ReactNode}){ return <th className="text-left p-2 font-medium">{children}</th>; }
export function TableCell({ children, className='' }:{children:React.ReactNode, className?:string}){ return <td className={`p-2 ${className}`}>{children}</td>; }
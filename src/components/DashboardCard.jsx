import React from 'react'

const DashboardCard = ({title, value, unit}) => {
  return (
    <div className='bg-[#1820334b] text-white shadow shadow-[#293950] p-4 rounded-lg  w-full max-w-sm'>
      <h3 className='text-lg '>{title}</h3>
      <p className='text-2xl font-bold mt-6'>{value} {unit}</p>
    </div>
  )
}

export default DashboardCard
import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Container() {
    return (
        <>
            <div className='flex'>
                <Sidebar className='fixed top-0 left-0' />
                <div className='w-screen bg-white'>
                    <div className='m-10 '>
                        <Outlet />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Container
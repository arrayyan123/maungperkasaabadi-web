import React from 'react'

function Square() {
    return (
        <div
            className='w-screen h-screen p-10 flex flex-row'
        >
            <div className='border-2 border-black mx-auto h-52 w-52'>
                <h1 className='text-black text-[50px] text-center'>Square</h1>
            </div>
            <div className='border-2 border-black mx-auto h-52 w-52'>
                <h1 className='text-black text-[50px] text-center'>Square</h1>
            </div>
        </div>
    )
}

export default Square
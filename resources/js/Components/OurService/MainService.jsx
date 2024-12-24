import React, { useState, useEffect } from 'react'

function MainService() {
    const [services, setServices] = useState([]);

    const fetchService = async () => {
        try {
            const response = await fetch('/services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchService()
    }, [])

    return (
        <div className="container lg:p-6 p-2 mx-auto space-y-8">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">Service Kami</h2>
            </div>
            <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4'>
                {services.map((item) => (
                    <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
                        <img src={`/storage/${item.image}`} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                        <a href={item.link_web} target="_blank">
                            <div
                                className="relative my-4 text-black hover:font-bold cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                                <span className='text-[20px]'>{item.title}</span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainService
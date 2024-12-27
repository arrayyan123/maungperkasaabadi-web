import React from 'react'

function ProductSection01() {
    return (
        <div className="relative bg-gradient-to-tr from-gray-400 to-gray-800 mb-4 w-full h-56 px-6 py-6 rounded-xl">
            <div className="absolute inset-0">
                <img className="object-cover object-center w-full h-full rounded-xl opacity-50" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5c2NyYXBlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            </div>
            <div className="max-h-[calc(100vh-2rem)] overflow-y-auto h-full ">
                <div className="flex flex-col justify-center gap-3 text-white lg:h-full">
                    <h1 className="lg:text-3xl text-xl font-bold motion-preset-slide-right-sm">Our Products</h1>
                    <p className="text-sm motion-preset-slide-right-sm motion-delay-300">
                        Kami menghadirkan beragam produk IT dan non-IT yang dirancang untuk memenuhi kebutuhan Anda. Dengan fokus pada inovasi, kualitas, dan keandalan, produk kami mencakup solusi teknologi modern hingga kebutuhan sehari-hari di luar IT.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductSection01
import { useState } from 'react';
import { SketchPicker } from 'react-color'; 

export default function ColorCustomizer({ setSidebarColor, setTopBarColor }) {
    const [sidebarColor, setLocalSidebarColor] = useState('#1a202c');
    const [topBarColor, setLocalTopBarColor] = useState('#1a202c'); 

    const handleSidebarColorChange = (color) => {
        setLocalSidebarColor(color.hex);
        setSidebarColor(color.hex); 
    };

    const handleTopBarColorChange = (color) => {
        setLocalTopBarColor(color.hex);
        setTopBarColor(color.hex);
    };

    return (
        <div className="p-6 bg-gray-100 w-auto h-auto">
            <h1 className="text-2xl font-semibold mb-6">Kustomisasi Warna</h1>
            <div className="flex flex-row space-x-3">
                {/* Sidebar Color Picker */}
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-medium mb-2">Warna Sidebar</h2>
                    <SketchPicker 
                        color={sidebarColor} 
                        onChangeComplete={handleSidebarColorChange} 
                    />
                    <div
                        className="mt-4 p-4 rounded"
                        style={{ backgroundColor: sidebarColor, color: '#fff' }}
                    >
                        Preview Sidebar: {sidebarColor}
                    </div>
                </div>

                {/* Top Bar Color Picker */}
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-lg font-medium mb-2">Warna Top Bar</h2>
                    <SketchPicker 
                        color={topBarColor} 
                        onChangeComplete={handleTopBarColorChange} 
                    />
                    <div
                        className="mt-4 p-4 rounded"
                        style={{ backgroundColor: topBarColor, color: '#fff' }}
                    >
                        Preview Top Bar: {topBarColor}
                    </div>
                </div>
            </div>
        </div>
    );
}
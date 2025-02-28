import IonIcon from '@reacticons/ionicons';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const svgImages = import.meta.glob('/public/assets/Images/*.svg', { eager: true });
const pngImages = import.meta.glob('/public/assets/Images/*.png', { eager: true });

const images = { ...svgImages, ...pngImages };

const getImageByName = (name) => {
    const matchingImage = Object.keys(images).find((path) => path.includes(`${name}`));
    return matchingImage ? images[matchingImage].default || images[matchingImage] : null;
};

const logo = getImageByName('Logo_maung');

function WebsiteLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navbarBackground, setNavbarBackground] = useState('bg-transparent');
    const [navbarText, setNavbarText] = useState('text-white');
    const [navbarPosition, setNavbarPosition] = useState('absolute')
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [activeLink, setActiveLink] = useState('/');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
        window.location.href = `/produk-kami?product_id=${productId}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const response = await axios.post("/api/subscribe", {
                name,
                email,
            });

            alert("Thank you for subscribing! Please check your email for confirmation.");
            setName("");
            setEmail("");
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "Failed to subscribe");
            } else {
                alert("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResizeAndScroll = () => {
            if (window.innerWidth < 1024) {
                setNavbarBackground('bg-[#E9F0F5]');
                setNavbarText('text-black');
            } else {
                if (window.scrollY > 50) {
                    setNavbarBackground('bg-[#E9F0F5]');
                    setNavbarText('text-black');
                } else {
                    setNavbarBackground('bg-white');
                    setNavbarText('text-black');
                }
            }
        };

        // const handleScroll = () => {
        //     if (window.scrollY > 50) {
        //         setNavbarBackground('bg-white');
        //         setNavbarText('text-black');
        //     } else {
        //         setNavbarBackground('bg-transparent');
        //         setNavbarText('text-black');
        //     }
        // };

        window.addEventListener('resize', handleResizeAndScroll);
        window.addEventListener('scroll', handleResizeAndScroll);

        handleResizeAndScroll();

        return () => {
            window.removeEventListener('resize', handleResizeAndScroll);
            window.removeEventListener('scroll', handleResizeAndScroll);
        };
    }, []);
    return (
        <div className='bg-white'>
            {/* Navbar */}
            <nav className={`sticky top-0 z-50 lg:flex-row flex-col px-5 max-w-full py-6 w-screen flex justify-between items-center ${navbarBackground} transition-colors duration-300`}>
                <div className="flex flex-row items-center lg:justify-normal justify-between lg:w-auto w-full">
                    <a className="" href="/">
                        <img src={logo} className="md:w-48 w-32 h-auto" alt="Logo" />
                    </a>
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className={`navbar-burger flex items-center ${navbarText} p-3`}>
                            <svg className="block h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Mobile menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Navigation Links */}
                {/* <div className="flex lg:flex-row flex-col lg:justify-between md:mt-0 mt-8 space-x-10"> */}
                <ul className={`${isMenuOpen ? "max-h-screen lg:mt-0 mt-4 opacity-100" : "max-h-0 opacity-0"
                    } lg:opacity-100 lg:max-h-full flex lg:mx-auto lg:flex-row flex-col items-center lg:justify-end w-full lg:space-x-6 space-x-2 overflow-hidden transition-all duration-300 ease-in-out`}>
                    <div className='flex md:flex-row flex-col gap-3 md:w-auto w-full'>
                        <li><a className={`text-md ${navbarText} hover:text-gray-500 font-extrabold whitespace-nowrap flex-shrink-0`} href={`/`}>Home</a></li>
                        <li className="text-gray-300 md:block hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>
                        <li><a className={`text-md ${navbarText} hover:text-gray-500 font-extrabold whitespace-nowrap flex-shrink-0`} href={`/about-us`}>Tentang Kami</a></li>
                        <li className="text-gray-300 md:block hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>
                        <li>
                            <Dropdown
                                label="" dismissOnClick={false}
                                renderTrigger={() => 
                                <span className={`${navbarText} text-md flex flex-row items-center gap-1 font-extrabold`}>
                                    <h1>Produk</h1>
                                    <IonIcon name='chevron-down' />
                                </span>}
                                className="relative z-50"
                            >
                                {products.map((product) => (
                                    <Dropdown.Item key={product.id}>
                                        <span
                                            onClick={() => handleProductSelect(product.id)}
                                            className="cursor-pointer"
                                        >
                                            {product.type_product}
                                        </span>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </li>
                        <li className="text-gray-300 md:block hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>
                        <li><a className={`text-md ${navbarText} hover:text-gray-500 font-extrabold whitespace-nowrap flex-shrink-0`} href={`/blog-page`}>Blog</a></li>
                        <li className="text-gray-300 md:block hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </li>
                        <li><a className={`text-md ${navbarText} hover:text-gray-500 font-extrabold whitespace-nowrap flex-shrink-0`} href={`/contactus`}>Hubungi Kami</a></li>
                    </div>
                    <li
                        className="lg:mt-0 mt-4"
                    >
                        <a href={`/ourservice`}>
                            <button className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-6 rounded-[10px] text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg w-full lg:w-auto">
                                <p className="text-md whitespace-nowrap">
                                    Our services
                                </p>
                            </button>
                        </a>
                    </li>
                </ul>
                {/* </div> */}
            </nav>

            {/* content page */}
            <div className=''>
                {children}
            </div>

            <div className="w-full mb-4 p-5">
                <span className="flex flex-row items-center gap-3 text-black">
                    <IonIcon className="text-2xl" name="mail" />
                    <h1 className="text-2xl font-bold">Subscribe to our Newsletter</h1>
                </span>
                <p className="mb-4">
                    Tetap Up to date dengan perkembangan mengenai perusahaan kami.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex md:flex-row flex-col items-center gap-4 max-w-2xl">
                        <div className=" w-full">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className=" w-full">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`px-4 py-2 mt-6 text-white rounded-md ${isLoading ? "bg-gray-400" : "bg-blue-600"
                                }`}
                            disabled={isLoading}
                        >
                            <span className="flex flex-row gap-4 items-center">
                                <p>{isLoading ? "Subscribing..." : "Subscribe"}</p>
                                <IonIcon name="send" />
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            {/* footer */}
            <footer class="bg-gray-100 dark:bg-gray-900">
                <div className='flex md:flex-row flex-col items-center justify-between'>
                    <div class="max-w-xl flex flex-col md:items-start items-center px-4 py-2 sm:px-6 lg:px-9">
                        <div class="flex text-teal-600 dark:text-teal-300">
                            <img className='w-[150px] h-auto' src={logo} alt="logo maung" />
                        </div>
                        <div className='flex flex-col w-2/1 md:items-start items-center'>
                            <h1 className="mt-6 text-black text-[20px] max-w-md black leading-relaxed font-bold">
                                PT. Maung Perkasa Abadi
                            </h1>
                            <p className='text-black md:text-left text-center'>
                                Kualitas, Kepercayaan, dan Kepuasan Pelanggan.
                            </p>
                        </div>
                    </div>
                    <div className='flex lg:w-1/3 flex-col mt-6 gap-6 lg:items-end items-center px-4 sm:px-6 lg:px-9'>
                        <div className='w-full'>
                            <h1 className='text-black font-bold text-[34px]'>Contacts</h1>
                            <div className='border-b-4 border-black' />
                            <div className='flex flex-col mt-4'>
                                <span className='flex flex-row gap-3 '>
                                    <IonIcon name='call' className='text-black text-[18px]' />
                                    <p className='text-black'>(+62)882-1167-5711</p>
                                </span>
                                <span className='flex flex-row gap-3 '>
                                    <IonIcon name='mail' className='text-black text-[18px]' />
                                    <p className='text-black'>maungperkasaabadi@gmail.com</p>
                                </span>
                                <span className='flex flex-row gap-3 '>
                                    <IonIcon name='pin' className='text-black text-[18px]' />
                                    <p className='text-black w-full'>Taman Mutiara</p>
                                </span>
                            </div>
                        </div>
                        <ul class=" flex justify-center gap-6 md:gap-8">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                >
                                    <span class="sr-only">Facebook</span>
                                    <IonIcon className='text-[30px]' name='logo-facebook' />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                >
                                    <span class="sr-only">Instagram</span>
                                    <IonIcon className='text-[30px]' name='logo-instagram' />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    class="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                                >
                                    <span class="sr-only">WhatsApp</span>
                                    <IonIcon className='text-[30px]' name='logo-whatsapp' />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex p-4 gap-2 flex-col'>
                    <div className='border-b-2 border-gray-400'></div>
                    <h2>© copyright 2024 PT. Maung Perkasa Abadi. all rights reserved</h2>
                </div>
            </footer>
        </div>
    )
}

export default WebsiteLayout
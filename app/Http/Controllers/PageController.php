<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home(){
        return Inertia::render('Posts/Home');
    }
    public function aboutUs(){
        return Inertia::render('Posts/AboutUs');
    }
    public function blog(){
        return Inertia::render('Posts/Blog');
    }
    public function contactUs(){
        return Inertia::render('Posts/ContactUs');
    }
    public function ourService(){
        return Inertia::render('Posts/OurService');
    }
    public function productDetails(){
        return Inertia::render('Posts/ProductDetails');
    }
}

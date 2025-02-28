<?php

namespace App\Http\Controllers;

use App\Models\Blog;
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

    //untuk blog
    public function blog(){
        return Inertia::render('Posts/Blog');
    }
    public function blogDetail($id, Request $request)
    {
        $blog = Blog::with(['images', 'comments'])->findOrFail($id);
        $title = $request->query('title');
        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'title' => $title,
        ]);
    }

    //untuk admin melihat detail blog nya (sebenarnya untuk liat comment doang LMAO)
    public function adminBlogDetail($id, Request $request)
    {
        
    }

    //untuk lainnya, bodo ah.
    public function contactUs(){
        return Inertia::render('Posts/ContactUs');
    }
    public function ourService(){
        return Inertia::render('Posts/OurService');
    }
    public function productDetails(Request $request) {
        return Inertia::render('Posts/ProductDetails', [
            'product_id' => $request->query('product_id'),
        ]);
    }
}

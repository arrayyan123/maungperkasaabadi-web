<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Mail\MyTestMail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OurServiceController;
use App\Http\Controllers\ProductDetailController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\SubscriberController;

Route::post('/subscribe', [SubscriberController::class, 'store']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [PageController::class, 'home'])->name('home-page');
Route::get('/about-us', [PageController::class, 'aboutUs'])->name('about.page');
Route::get('/blog', [PageController::class, 'blog'])->name('blog.page');
Route::get('/contactus', [PageController::class, 'contactUs'])->name('contact.page');
Route::get('/ourservice', [PageController::class, 'ourService'])->name('service.page');
Route::get('/product-detail', [PageController::class, 'productDetails'])->name('productDetail.page');


Route::middleware(['auth'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::post('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::resource('aboutus', AboutUsController::class)->except(['show', 'create', 'edit']);
    Route::post('/aboutus/{aboutUsId}', [AboutUsController::class, 'update']);
    Route::resource('partnership', PartnerController::class)->except(['show', 'create', 'edit']);
    Route::post('/partnership/{partner}', [PartnerController::class, 'update']);
    Route::resource('teams', TeamsController::class)->except(['show', 'create', 'edit']);
    Route::post('/teams/{team}', [TeamsController::class, 'update']);
    Route::resource('blogs', BlogController::class)->except(['create', 'edit']);
    Route::post('/blogs/{blogId}', [BlogController::class, 'update']);
    Route::resource('services', OurServiceController::class)->except(['show', 'create', 'edit']);
    Route::post('/services/{serviceId}', [OurServiceController::class, 'update']);

    Route::get('/admin/contacts', [ContactController::class, 'index'])->name('contact.dashboard');
    Route::post('/admin/contacts/{contact}/reply', [ContactController::class, 'reply']);
    Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);
    Route::resource('product_details', ProductDetailController::class)->except(['create', 'edit']);
    Route::post('/product_details/{productDetailId}', [ProductDetailController::class, 'update']);
    Route::post('/admin/newsletter', [NewsletterController::class, 'store']);
    Route::get('/admin/newsletter', [NewsletterController::class, 'index']);
    Route::get('/admin/subscriber', [SubscriberController::class, 'index']);
    Route::delete('/admin/subscriber/{id}', [SubscriberController::class, 'destroy']);
    Route::delete('/admin/newsletter/{id}', [NewsletterController::class, 'destroy']);
});

Route::post('/contact-us', [ContactController::class, 'store']);

Route::get('/products', [ProductController::class, 'index']); 
Route::resource('aboutus', AboutUsController::class)->except(['show', 'create', 'edit', 'store', 'destroy', 'update']);
Route::resource('partnership', PartnerController::class)->except(['show', 'create', 'edit', 'store', 'destroy', 'update']);
Route::resource('teams', TeamsController::class)->except(['show', 'create', 'edit', 'store', 'destroy', 'update']);
Route::resource('blogs', BlogController::class)->except(['create', 'edit', 'store', 'destroy', 'update']);
Route::resource('services', OurServiceController::class)->except(['create', 'edit', 'store', 'destroy', 'update']);
Route::resource('product_details', ProductDetailController::class)->except(['create', 'edit', 'store', 'destroy', 'update']);


Route::get('/email-test', function(){
    $name = "Arrayyan";
    $from = "Testing Email";

    Mail::to("arrayyan.aprilyanto@gmail.com")->send(new MyTestMail(compact("name", "from")));
    dd("Email send successfully");
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/homemanage', function() {
    return Inertia::render('DashboardPage/HomeManage');
})->middleware(['auth', 'verified'])->name('homemanage.dashboard');
Route::get('/aboutusmanage', function() {
    return Inertia::render('DashboardPage/AboutUsManage');
})->middleware(['auth', 'verified'])->name('AboutUsManage.dashboard');
Route::get('/blogmanage', function() {
    return Inertia::render('DashboardPage/BlogManage');
})->middleware(['auth', 'verified'])->name('BlogManage.dashboard');
Route::get('/ourservicemanage', function() {
    return Inertia::render('DashboardPage/OurServiceManage');
})->middleware(['auth', 'verified'])->name('servicesManage.dashboard');
Route::get('/productdetailmanage', function() {
    return Inertia::render('DashboardPage/ProductDetailManage');
})->middleware(['auth', 'verified'])->name('productDetailManage.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

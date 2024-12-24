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

    Route::get('/admin/contacts', [ContactController::class, 'index'])->name('contact.dashboard');
    Route::post('/admin/contacts/{contact}/reply', [ContactController::class, 'reply']);
    Route::delete('/admin/contacts/{contact}', [ContactController::class, 'destroy']);
    
});

Route::post('/contact-us', [ContactController::class, 'store']);

Route::get('/products', [ProductController::class, 'index']); 
Route::resource('aboutus', AboutUsController::class)->except(['show', 'create', 'edit', 'store', 'destroy', 'update']);
Route::resource('partnership', PartnerController::class)->except(['show', 'create', 'edit', 'store', 'destroy', 'update']);
Route::resource('teams', TeamsController::class)->except(['show', 'create', 'edit', 'store', 'destroy', 'update']);
Route::resource('blogs', BlogController::class)->except(['create', 'edit', 'store', 'destroy', 'update']);

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

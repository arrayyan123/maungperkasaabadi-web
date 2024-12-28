<?php

namespace App\Http\Controllers;

use App\Models\ProductDetail;
use App\Models\ProductDetailImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productDetail = ProductDetail::with('images')->orderBy('created_at', 'desc')->get();
        return response()->json($productDetail);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_description' => 'required|string',
            'type_product' => 'required|in:nonitproduct,itproduct',
            'images.*' => 'nullable|image',
        ]);

        $productDetail = ProductDetail::create([
            'product_name' => $validated['product_name'],
            'product_description' => $validated['product_description'],
            'type_product' => $validated['type_product'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_details', 'public');
                ProductDetailImage::create(['product_detail_id' => $productDetail->id, 'path' => $path]);
            }
        }

        return redirect()->back()->with('success', 'Product detail created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $productDetail = ProductDetail::findOrFail($id);

        if (!$productDetail) {
            return redirect()->json(['message' => 'Product Detail tidak ditemukan'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $productDetail = ProductDetail::findOrFail($id);

        $validated = $request->validate([
            'product_name' => 'sometimes|required|string|max:255',
            'product_description' => 'nullable|string',
            'type_product' => 'sometimes|required|in:nonitproduct,itproduct',
            'images.*' => 'nullable|image',
            'delete_images' => 'nullable|array', 
            'delete_images.*' => 'integer',
        ]);

        $productDetail->update([
            'product_name' => $validated['product_name'] ?? $productDetail->product_name,
            'product_description' => $validated['product_description'] ?? $productDetail->product_description,
            'type_product' => $validated['type_product'] ?? $productDetail->type_product,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_details', 'public');
                ProductDetailImage::create(['product_detail_id' => $productDetail->id, 'path' => $path]);
            }
        }
    
        if ($request->filled('delete_images')) {
            $deleteImages = $request->input('delete_images');
            if (is_countable($deleteImages)) {
                ProductDetailImage::whereIn('id', $deleteImages)->each(function ($image) {
                    Storage::disk('public')->delete($image->path);
                    $image->delete();
                });
            }
        }
        
        return response()->json(['message' => 'Product Detail berhasil diupdate', 'productDetail' => $productDetail]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productDetail = ProductDetail::findOrFail($id);

        foreach ($productDetail->images as $image) {
            Storage::disk('public')->delete($image->path); 
        }

        $productDetail->delete();

        return response()->json(['message' => 'Product Detail deleted successfully']);
    }
}

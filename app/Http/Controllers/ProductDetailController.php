<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductDetailImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductDetailController extends Controller
{
    /**
     * Display a listing of the product details.
     */
    public function index()
    {
        $productDetails = ProductDetail::with('images', 'product')->get();
        return response()->json($productDetails);
    }

    // public function show(ProductDetail $productDetail)
    // {

    //     if (!$productDetail) {
    //         return redirect()->json(['message' => 'Product Detail tidak ditemukan'], 404);
    //     }
    //     return response()->json($productDetail);
    // }

    /**
     * Show the form for creating a new product detail.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created product detail in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'product_detail_name' => 'required|string|max:255',
            'product_detail_description' => 'required|string',
            'product_detail_type' => 'required|string|max:255',
            'images.*' => 'nullable|image',
        ]);

        $productDetail = ProductDetail::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_details', 'public');
                ProductDetailImage::create([
                    'product_detail_id' => $productDetail->id,
                    'path' => $path,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Product detail created successfully!');
    }

    /**
     * Show the form for editing the specified product detail.
     */
    public function edit(ProductDetail $productDetail)
    {
        //
    }

    /**
     * Update the specified product detail in storage.
     */
    public function update(Request $request, $id)
    {
        $productDetail = ProductDetail::findOrFail($id);

        $validated = $request->validate([
            'product_id' => 'required|uuid|exists:products,id',
            'product_detail_name' => 'sometimes|string|max:255',
            'product_detail_description' => 'sometimes|string',
            'product_detail_type' => 'sometimes|string|max:255',
            'images.*' => 'nullable|image',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'uuid|exists:product_detail_images,id',
        ]);

        $productDetail->update([
            'product_detail_name' => $validated['product_detail_name'],
            'product_detail_description' => $validated['product_detail_description'],
            'product_detail_type' => $validated['product_detail_type'],
        ]);

        // Delete images specified in the request
        if ($request->filled('delete_images')) {
            $deleteImages = $request->input('delete_images');
            $imagesToDelete = ProductDetailImage::whereIn('id', $deleteImages)->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        }

        // Store new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('product_details', 'public');
                ProductDetailImage::create(['product_detail_id' => $productDetail->id, 'path' => $path]);
            }
        }

        return redirect()->back()->with('success', 'Product detail updated successfully.');
    }

    /**
     * Remove the specified product detail from storage.
     */
    public function destroy(ProductDetail $productDetail)
    {
        foreach ($productDetail->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $productDetail->delete();

        return redirect()->back()->with('success', 'Product detail deleted successfully.');
    }
}
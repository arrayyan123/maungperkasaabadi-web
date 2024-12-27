<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Fetch all products or filter by type
    public function index(Request $request)
    {
        $type = $request->query('type'); // Filter by type (itproduct/nonitproduct)
        $products = $type
            ? Product::where('type', $type)->get()
            : Product::all();

        return response()->json($products);
    }

    // Store a new product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:nonitproduct,itproduct',
            'image' => 'nullable|image|max:2048', // Max 2MB
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public'); // Simpan di storage/public/products
        }

        Product::create($validated);

        return redirect()->back()->with('success', 'About Us created successfully!');
    }

    // Update a product
    public function update(Request $request, Product $product)
    {
        Log::info('Update Product Request:', $request->all());    
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|required|in:nonitproduct,itproduct',
            'image' => 'nullable|image|max:200000',
        ]);
    
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image); 
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        } else {
            $validated['image'] = $product->image;
        }

        $updated = $product->update($validated);

        Log::info('Product updated:', $updated ? $product->toArray() : ['update_failed' => true]);
        return response()->json([
            'message' => $updated ? 'Product updated successfully' : 'Failed to update product',
            'product' => $product,
        ]);
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image); 
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
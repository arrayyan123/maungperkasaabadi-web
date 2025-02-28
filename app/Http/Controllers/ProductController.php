<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('details.images')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_product' => 'required|string|max:255',
            'description_product' => 'required|string',
            'image' => 'nullable|image',
        ]);
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('productImage', 'public');
        }
        Product::create($validated);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $validated = $request->validate([
            'type_product' => 'sometimes|string|max:255',
            'description_product' => 'sometimes|string',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image){
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('productImage', 'public');
        } else {
            $validated['image'] = $product->image;
        }

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        if($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
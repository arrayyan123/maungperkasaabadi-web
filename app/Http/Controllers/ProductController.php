<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

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
        ]);

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
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'type_product' => 'sometimes|string|max:255',
            'description_product' => 'sometimes|string',
        ]);

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
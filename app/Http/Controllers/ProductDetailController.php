<?php

namespace App\Http\Controllers;

use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productDetail = ProductDetail::orderBy('created_at', 'desc')->get();
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
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('product_details', 'public');
        }

        ProductDetail::Create($validated);
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
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            if ($productDetail->image) {
                Storage::disk('public')->delete($productDetail->image); 
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        } else {
            $validated['image'] = $productDetail->image;
        }

        $updated = $productDetail->update($validated);
        
        return response()->json([
            'message' => $updated ? 'Product updated successfully' : 'Failed to update product',
            'product' => $productDetail,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $productDetail = ProductDetail::findOrFail($id);

        if ($productDetail->image) {
            Storage::disk('public')->delete($productDetail->image); 
        }

        $productDetail->delete();

        return response()->json(['message' => 'Product Detail deleted successfully']);
    }
}

<?php
namespace App\Http\Controllers;

use App\Models\CompanyStat;
use Illuminate\Http\Request;

class CompanyStatController extends Controller
{
    public function index()
    {
        return CompanyStat::orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);
        return CompanyStat::create($data);
    }

    public function update(Request $request, CompanyStat $companystat)
    {
        $data = $request->validate([
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);
        $companystat->update($data);
        return $companystat;
    }

    public function destroy(CompanyStat $companystat)
    {
        $companystat->delete();
        return response()->json(['success' => true]);
    }
}

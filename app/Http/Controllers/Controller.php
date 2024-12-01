<?php

namespace App\Http\Controllers;

abstract class Controller
{
    Public function index()
    {
        return view('back.dashboard.index');
    }
}

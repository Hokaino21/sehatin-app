<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $role = auth()->user()->role;
        
        return match ($role) {
            'admin'   => redirect()->route('admin.dashboard'),
            'doctor'  => redirect()->route('doctor.jadwal'),
            'patient' => redirect()->route('patient.kunjungan'),
            default   => redirect('/'),
        };
    })->name('dashboard');

    Route::get('admin-dashboard', function () {
        return Inertia::render('admin/dashboard/pages/dashboard');
    })->name('admin.dashboard');

    Route::get('jadwal', function () {
        return Inertia::render('doctor/jadwal/pages/jadwal');
    })->name('doctor.jadwal');

    Route::get('kunjungan', function () {
        return Inertia::render('patients/kunjungan/pages/kunjungan');
    })->name('patient.kunjungan');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\MedicalRecord;
use App\Models\Patient;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $allPatients = Patient::all();
        $doctors = Doctor::all();

        foreach ($allPatients as $patient) {
            // Past appointments (completed)
            $completedAppointments = Appointment::factory(2)->create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'poli_id' => function (array $attributes) {
                    return Doctor::find($attributes['doctor_id'])->poli_id;
                },
                'appointment_date' => fake()->dateTimeBetween('-1 month', '-1 day')->format('Y-m-d'),
                'status' => 'completed',
            ]);

            foreach ($completedAppointments as $appointment) {
                MedicalRecord::factory()->create([
                    'appointment_id' => $appointment->id,
                    'doctor_id' => $appointment->doctor_id,
                    'patient_id' => $appointment->patient_id,
                ]);
            }

            Appointment::factory(1)->create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'poli_id' => function (array $attributes) {
                    return Doctor::find($attributes['doctor_id'])->poli_id;
                },
                'appointment_date' => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
                'status' => 'booked',
            ]);

            // Cancelled appointments
            Appointment::factory(1)->create([
                'patient_id' => $patient->id,
                'doctor_id' => $doctors->random()->id,
                'poli_id' => function (array $attributes) {
                    return Doctor::find($attributes['doctor_id'])->poli_id;
                },
                'appointment_date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
                'status' => 'cancelled',
                'cancel_reason' => 'Pasien ada keperluan mendadak',
                'cancelled_by' => 'patient',
            ]);
        }
    }
}

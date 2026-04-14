import { PageHeader } from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            
            <PageHeader 
                title="Dashboard Utama"
                subtitle="Ringkasan operasional klinik hari ini. Pantau aktivitas poli, dokter, dan pasien."
            />

            <div className="py-12 text-center text-on-surface-variant font-medium border-2 border-dashed border-outline-variant/30 rounded-3xl">
                Content Placeholder
            </div>
        </AppLayout>
    );
}

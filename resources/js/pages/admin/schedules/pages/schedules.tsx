import { PageHeader } from '@/components/page-header';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CalendarOff } from 'lucide-react';
import {
    ScheduleSessionCard,
    type ScheduleSession,
} from '../components/schedule-session-card';

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'] as const;

const DUMMY_SCHEDULES: ScheduleSession[] = [
    {
        id: 1,
        doctor_id: 1,
        day_of_week: 'Senin',
        start_time: '09:00:00',
        end_time: '12:00:00',
        slot_duration: 30,
        is_active: true,
        doctors: [
            { id: 1, name: 'Dr. Andi Pratama', avatar_url: undefined },
            { id: 2, name: 'Dr. Siti Rahma', avatar_url: undefined },
            { id: 3, name: 'Dr. Budi Santoso', avatar_url: undefined },
            { id: 4, name: 'Dr. Dewi Lestari', avatar_url: undefined },
        ],
    },
    {
        id: 2,
        doctor_id: 2,
        day_of_week: 'Senin',
        start_time: '14:00:00',
        end_time: '17:00:00',
        slot_duration: 15,
        is_active: true,
        doctors: [
            { id: 1, name: 'Dr. Andi Pratama', avatar_url: undefined },
        ],
    },
    {
        id: 3,
        doctor_id: 3,
        day_of_week: 'Senin',
        start_time: '18:00:00',
        end_time: '20:00:00',
        slot_duration: 30,
        is_active: true,
        doctors: [
            { id: 2, name: 'Dr. Siti Rahma', avatar_url: undefined },
            { id: 5, name: 'Dr. Fajar Nugroho', avatar_url: undefined },
        ],
    },
    {
        id: 4,
        doctor_id: 1,
        day_of_week: 'Selasa',
        start_time: '08:00:00',
        end_time: '12:00:00',
        slot_duration: 20,
        is_active: true,
        doctors: [
            { id: 1, name: 'Dr. Andi Pratama', avatar_url: undefined },
        ],
    },
    {
        id: 5,
        doctor_id: 2,
        day_of_week: 'Rabu',
        start_time: '10:00:00',
        end_time: '14:00:00',
        slot_duration: 30,
        is_active: true,
        doctors: [
            { id: 3, name: 'Dr. Budi Santoso', avatar_url: undefined },
            { id: 4, name: 'Dr. Dewi Lestari', avatar_url: undefined },
        ],
    },
    {
        id: 6,
        doctor_id: 3,
        day_of_week: 'Kamis',
        start_time: '09:00:00',
        end_time: '11:00:00',
        slot_duration: 15,
        is_active: true,
        doctors: [
            { id: 5, name: 'Dr. Fajar Nugroho', avatar_url: undefined },
        ],
    },
    {
        id: 7,
        doctor_id: 1,
        day_of_week: 'Kamis',
        start_time: '13:00:00',
        end_time: '16:00:00',
        slot_duration: 30,
        is_active: false,
        doctors: [
            { id: 1, name: 'Dr. Andi Pratama', avatar_url: undefined },
            { id: 2, name: 'Dr. Siti Rahma', avatar_url: undefined },
        ],
    },
    {
        id: 8,
        doctor_id: 2,
        day_of_week: 'Jumat',
        start_time: '08:00:00',
        end_time: '12:00:00',
        slot_duration: 20,
        is_active: true,
        doctors: [
            { id: 3, name: 'Dr. Budi Santoso', avatar_url: undefined },
        ],
    },
];

function groupByDay(schedules: ScheduleSession[]) {
    const grouped: Record<string, ScheduleSession[]> = {};
    for (const day of DAYS) {
        grouped[day] = schedules.filter((s) => s.day_of_week === day);
    }
    return grouped;
}

export default function Schedules() {
    const grouped = groupByDay(DUMMY_SCHEDULES);

    return (
        <AppLayout>
            <Head title="Manajemen Jadwal Dr." />

            <PageHeader
                title="Manajemen Jadwal Dr."
                subtitle="Kelola jadwal praktik dokter. Atur ketersediaan dan jam layanan untuk memastikan pasien mendapatkan perawatan tepat waktu."
                button={{
                    label: 'Tambah Jadwal',
                    onClick: () => {},
                    show: true,
                }}
            />

            <Accordion
                type="multiple"
                defaultValue={['Senin']}
                className="space-y-4"
            >
                {DAYS.map((day) => {
                    const sessions = grouped[day];
                    const activeCount = sessions.filter((s) => s.is_active).length;

                    return (
                        <AccordionItem key={day} value={day}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <span>{day}</span>
                                    {activeCount > 0 && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                                            <span className="size-1.5 rounded-full bg-primary" />
                                            {activeCount} Sesi Aktif
                                        </span>
                                    )}
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                {sessions.length > 0 ? (
                                    <div className="space-y-3">
                                        {sessions.map((session) => (
                                            <ScheduleSessionCard
                                                key={session.id}
                                                session={session}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-on-surface-variant">
                                        <CalendarOff className="size-8 mb-2 opacity-40" />
                                        <p className="text-sm font-medium">
                                            Belum ada jadwal untuk hari {day}
                                        </p>
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </AppLayout>
    );
}

import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    themes: {
        primary_color: string;
        secondary_color: string;
        brand_logo: string | null;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
<<<<<<< HEAD
    role: string;
=======
>>>>>>> 385c1b6596241d1b1a6bcb5f76b9d61f89ade07e
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

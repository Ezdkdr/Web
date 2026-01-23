import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex-1 flex max-w-7xl w-full mx-auto md:pt-16">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="flex-1 w-full min-w-0 bg-white border-l border-r border-gray-200 shadow-sm min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}

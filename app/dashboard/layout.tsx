import { ReactNode } from 'react';
import DashboardLayout from '@/components/dashboard/dashboard-layout';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayout>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="h-full rounded-[0.5rem] border bg-background shadow">{children}</div>
      </main>
    </DashboardLayout>
  );
}

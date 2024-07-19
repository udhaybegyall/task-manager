'use client';

import ActiveRemindersPopover from '@/components/task/active-reminders-popover';
import { Suspense } from 'react';

export default function ActiveRemindersWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActiveRemindersPopover />
        </Suspense>
    );
}

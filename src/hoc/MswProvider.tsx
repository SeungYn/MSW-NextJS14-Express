'use client';

import { handlers } from '@/mocks/handlers';
import { PropsWithChildren, use } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request) {
            if (request.url.includes('_next')) {
              return;
            }
            // print.warning();
          },
        });
        worker.use(...handlers);
      })
    : Promise.resolve();

export default function MswProvider({ children }: PropsWithChildren) {
  return <MswProviderWrapper>{children}</MswProviderWrapper>;
}

function MswProviderWrapper({ children }: PropsWithChildren) {
  use(mockingEnabledPromise);
  return children;
}

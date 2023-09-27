'use client';

import { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { serverIntlPropsType } from './serverIntlProvider.type';

const ServerIntlProvider: FC<serverIntlPropsType> = ({
  messages,
  locale,
  children,
}) => {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
};

export default ServerIntlProvider;
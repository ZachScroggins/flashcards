import React from 'react';
import Link from 'next/link';
import { PropsOf } from '@headlessui/react/dist/types';

const NextLink = ({ href, children, ...rest }: PropsOf<'a'>) => {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default NextLink;

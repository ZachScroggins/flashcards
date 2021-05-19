import type { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  console.log('NEXT_PUBLIC_VERCEL_ENV: ', +process.env.NEXT_PUBLIC_VERCEL_ENV);
  console.log('NEXT_PUBLIC_VERCEL_URL: ', +process.env.NEXT_PUBLIC_VERCEL_URL);

  console.log('Database URL: ', +process.env.DATABASE_URL);

  console.log('NEXTAUTH_URL: ', +process.env.NEXTAUTH_URL);
  console.log('NEXT_AUTH_SECRET: ', +process.env.NEXT_AUTH_SECRET);
  console.log('NEXT_AUTH_JWT_SECRET: ', +process.env.NEXT_AUTH_JWT_SECRET);
  console.log(
    'JWT_SIGNING_PRIVATE_KEY: ',
    +process.env.JWT_SIGNING_PRIVATE_KEY
  );
  console.log('GITHUB_CLIENT_ID: ', +process.env.GITHUB_CLIENT_ID);
  console.log('GITHUB_CLIENT_SECRET: ', +process.env.GITHUB_CLIENT_SECRET);

  console.log(
    'NEXT_PUBLIC_GRAPHQL_API: ',
    +process.env.NEXT_PUBLIC_GRAPHQL_API
  );

  switch (method) {
    case 'GET': {
      res.status(200).json({ message: 'Howdy 👋' });
      break;
    }
    default:
      res.setHeader('Allow', 'GET');
      res
        .status(405)
        .json({ message: `Error 405: Method ${method} Not Allowed` });
  }
};

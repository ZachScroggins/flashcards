import type { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  console.log(process.env.DATABASE_URL);

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

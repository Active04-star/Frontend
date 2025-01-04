import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const to = cookies.to;

  if (to) {
    res.status(200).json({ to: to });
  } else {
    res.status(404).json({ message: 'Cookie not found' });
  }
}
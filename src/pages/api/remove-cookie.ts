import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { cookie } = req.query;
    if (typeof cookie !== 'string') {
        return res.status(400).json({ error: 'El nombre de la cookie es requerido' });
    }

    res.setHeader('Set-Cookie', serialize(cookie, '', {
        maxAge: -1,
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NEXT_PUBLIC_API_URL !== 'http://localhost:4000',
    }));

    res.status(200).json({ message: 'Cookie eliminada' });
}
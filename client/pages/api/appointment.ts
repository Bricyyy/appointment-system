import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = 'http://localhost:5000/api/appointments';

  if (req.method === 'GET') {
    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching appointments' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'POST') {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(200).json(data);
  }
}

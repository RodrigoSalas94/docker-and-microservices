import { ErrorRequestHandler } from 'express';

export class ErrorHTTP extends Error {
  constructor(
    public status: number,
    message: string | { message: string }
  ) {
    const msg = typeof message === 'string' ? message : message.message;
    super(msg);
  }
}
export const errorHandler: ErrorRequestHandler = (error, req, res) => {
  if (error.status === 401) {
    res.status(401).json({ error: 'Credenciales inválidas' });
  } else if (error.status === 404) {
    res.status(404).json({ message: 'Película no encontrada' });
  } else {
    res.status(error.status || 500).json({ error: error.message || 'Server unanvailable' });
  }
};

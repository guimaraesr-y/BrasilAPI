import app from '@/app';
import BaseError from '@/errors/BaseError';
import InternalError from '@/errors/InternalError';
import getHolidays from '@/services/holidays';

const action = async (request, response) => {
  try {
    const { ano, estado, tipo } = request.query;
    const holidays = await getHolidays(ano, estado ? estado[0] : null, tipo);

    response.status(200).json(holidays);
  } catch (error) {
    if (error instanceof BaseError) {
      throw error;
    }

    throw new InternalError({
      message: 'Erro ao calcular feriados.',
      type: 'feriados_error',
    });
  }
};

export default app().get(action);

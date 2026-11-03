import type { BirthInfo } from './ziwei/types';
import {
  calculateTrueSolarTime,
  isValidGregorianDate,
  resolveZiweiDayOffset,
  shiftGregorianDate,
} from './ziwei/true-solar-time';

/** Data e hora locais, como informadas no relógio do local de nascimento. */
export interface BirthInput {
  date: string;
  time: string;
  gender: 'male' | 'female';
}

/**
 * Adaptador da demonstração: calendário gregoriano, sem correção de longitude,
 * fuso ou horário de verão. Preserva a convenção upstream de mudança de dia
 * às 23h e mantém os dados originais para que a interface explique a diferença.
 */
export function toBirthInfo(input: BirthInput): BirthInfo {
  if (!input || typeof input.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    throw new RangeError('Informe uma data de nascimento válida.');
  }
  const [year, month, day] = input.date.split('-').map(Number);
  if (year < 1900 || year > 2100) {
    throw new RangeError('O ano de nascimento deve estar entre 1900 e 2100.');
  }
  if (!isValidGregorianDate(year, month, day)) {
    throw new RangeError('Essa data não existe no calendário gregoriano.');
  }
  if (typeof input.time !== 'string' || !/^\d{2}:\d{2}$/.test(input.time)) {
    throw new RangeError('Informe uma hora válida no formato de 24 horas.');
  }
  const [clockHour, clockMinute] = input.time.split(':').map(Number);
  if (clockHour > 23 || clockMinute > 59) {
    throw new RangeError('A hora deve estar entre 00:00 e 23:59.');
  }
  if (input.gender !== 'male' && input.gender !== 'female') {
    throw new RangeError('Selecione o sexo usado no cálculo tradicional.');
  }

  // Sem longitude, o helper conserva exatamente os minutos do relógio local.
  const solar = calculateTrueSolarTime({ year, month, day, clockHour, clockMinute });
  const chartDate = shiftGregorianDate({ year, month, day }, resolveZiweiDayOffset(solar, 'next-day'));
  return {
    ...chartDate,
    hour: solar.branch,
    gender: input.gender,
    origInput: { year, month, day, clockHour, clockMinute },
  };
}

import assert from 'node:assert/strict';
import { toBirthInfo, type BirthInput } from '../../lib/birth-input';
import { branchLabels, elementLabels, translateTerm } from '../../lib/i18n/chart-pt-BR';
import { generateChart } from '../../lib/ziwei/algorithm';

const base: BirthInput = { date: '2000-01-31', time: '12:30', gender: 'female' };
const pick = (input: BirthInput) => {
  const { year, month, day, hour } = toBirthInfo(input);
  return { year, month, day, hour };
};

for (const date of ['', '2000-1-31', '2000-01-31T12:00:00Z', '1899-12-31', '2101-01-01',
  '1900-02-29', '2100-02-29', '2001-02-29', '2000-02-30', '2000-04-31', '2000-00-01', '2000-13-01', '2000-01-00']) {
  assert.throws(() => toBirthInfo({ ...base, date }), RangeError, `Deve rejeitar a data ${date}`);
}
for (const time of ['', '9:00', '09:0', '24:00', '23:60', '-1:30', '09:00:00', ' 09:00']) {
  assert.throws(() => toBirthInfo({ ...base, time }), RangeError, `Deve rejeitar a hora ${time}`);
}
for (const gender of ['', 'm', 'Female', null, undefined, 0] as never[]) {
  assert.throws(() => toBirthInfo({ ...base, gender }), RangeError, 'Deve rejeitar sexo fora do contrato');
}

// Fronteiras de todos os intervalos de duas horas, sem depender do fuso do host.
for (let hour = 0; hour < 24; hour++) {
  const time = `${String(hour).padStart(2, '0')}:00`;
  const expectedBranch = hour === 23 || hour === 0 ? 0 : Math.ceil(hour / 2);
  assert.equal(toBirthInfo({ ...base, time }).hour, expectedBranch, `Intervalo de ${time}`);
}
assert.deepEqual(pick({ ...base, time: '22:59' }), { year: 2000, month: 1, day: 31, hour: 11 });
assert.deepEqual(pick({ ...base, time: '23:00' }), { year: 2000, month: 2, day: 1, hour: 0 });
assert.deepEqual(pick({ ...base, time: '00:59' }), { year: 2000, month: 1, day: 31, hour: 0 });
assert.deepEqual(pick({ ...base, date: '2000-02-28', time: '23:59' }), { year: 2000, month: 2, day: 29, hour: 0 });
assert.deepEqual(pick({ ...base, date: '2001-02-28', time: '23:30' }), { year: 2001, month: 3, day: 1, hour: 0 });
assert.deepEqual(pick({ ...base, date: '2000-12-31', time: '23:30' }), { year: 2001, month: 1, day: 1, hour: 0 });
assert.deepEqual(pick({ ...base, date: '2100-12-31', time: '23:30' }), { year: 2101, month: 1, day: 1, hour: 0 });
for (const date of ['1900-01-01', '2000-02-29', '2100-12-31']) {
  const birth = toBirthInfo({ ...base, date, time: '23:30' });
  assert.equal(birth.origInput?.year, Number(date.slice(0, 4)));
  assert.equal(birth.origInput?.clockHour, 23);
  assert.equal(birth.origInput?.clockMinute, 30);
  assert.equal(birth.longitude, undefined);
  assert.equal(birth.city, undefined);
  assert.equal(generateChart(birth).palaces.length, 12);
}

assert.equal(translateTerm('não existe'), 'Termo não catalogado');
assert.equal(translateTerm('未知'), 'Termo não catalogado');
assert.equal(translateTerm('__proto__'), 'Termo não catalogado');
assert.equal(branchLabels.length, 12);
assert.deepEqual(Object.keys(elementLabels), ['2', '3', '4', '5', '6']);

// Cobre anos, meses, intervalos e sexos; testa o vocabulário no resultado real
// do motor, em vez de usar apenas uma lista que repete o dicionário.
const seenTerms = new Set<string>();
let charts = 0;
for (const year of [1900, 1925, 1950, 1978, 1988, 1999, 2000, 2025, 2050, 2100]) {
  for (let month = 1; month <= 12; month++) {
    // A hora varia com o mês para cobrir os 12 intervalos sem repetir mapas.
    for (const hour of [(year + month) % 12]) {
      for (const gender of ['male', 'female'] as const) {
        const chart = generateChart({ year, month, day: 15, hour, gender });
        charts++;
        for (const palace of chart.palaces) {
          seenTerms.add(palace.name);
          if (palace.borrowedFromName) seenTerms.add(palace.borrowedFromName);
          for (const star of palace.stars) {
            seenTerms.add(star.name);
            seenTerms.add(star.type);
            if (star.brightnessRaw) seenTerms.add(star.brightnessRaw);
            if (star.brightness) seenTerms.add(star.brightness);
            if (star.siHua) seenTerms.add(star.siHua);
          }
        }
        seenTerms.add(chart.wuxingJuName);
        if (chart.mingZhu) seenTerms.add(chart.mingZhu);
        if (chart.shenZhu) seenTerms.add(chart.shenZhu);
        if (chart.yinYangGender) seenTerms.add(chart.yinYangGender);
        assert.ok(elementLabels[chart.wuxingJu]);
      }
    }
  }
}
for (const term of seenTerms) {
  const label = translateTerm(term);
  assert.notEqual(label, 'Termo não catalogado', `Falta tradução para ${term}`);
  assert.doesNotMatch(label, /\p{Script=Han}/u, `O rótulo deve usar o vocabulário PT-BR: ${term}`);
}
console.log(`PT-BR: entradas, mudança de dia e vocabulário aprovados (${charts} mapas; ${seenTerms.size} termos).`);

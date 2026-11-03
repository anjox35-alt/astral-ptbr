'use client';

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { Palace, Star, ZiweiChart } from '@/lib/ziwei/types';
import { toBirthInfo, type BirthInput } from '@/lib/birth-input';
import { branchLabels, elementLabels, translateTerm } from '@/lib/i18n/chart-pt-BR';
import { ui } from '@/lib/i18n/ui';
import styles from './LocalChart.module.css';

const palacePositions: Record<number, [number, number]> = {
  5: [1, 1], 6: [1, 2], 7: [1, 3], 8: [1, 4],
  4: [2, 1], 9: [2, 4],
  3: [3, 1], 10: [3, 4],
  2: [4, 1], 1: [4, 2], 0: [4, 3], 11: [4, 4],
};

interface GeneratedResult {
  chart: ZiweiChart;
  input: BirthInput;
}

function displayDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function chartDate(chart: ZiweiChart): string {
  const { year, month, day } = chart.birthInfo;
  return [year, String(month).padStart(2, '0'), String(day).padStart(2, '0')].join('-');
}

function StarList({ stars, title, variant }: { stars: Star[]; title: string; variant: string }) {
  if (stars.length === 0) return null;
  return (
    <div className={styles.starGroup}>
      <h4>{title}</h4>
      <ul className={styles.starList}>
        {stars.map((star) => (
          <li key={star.name} className={variant}>
            <span>{translateTerm(star.name)}</span>
            {star.siHua && (
              <span className={styles.transformation} title={`${ui.result.transformation}: ${translateTerm(star.siHua)}`}>
                {translateTerm(star.siHua)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PalaceCard({ palace }: { palace: Palace }) {
  const [row, column] = palacePositions[palace.branch];
  const majorStars = palace.stars.filter((star) => star.type === 'major');
  const favorableStars = palace.stars.filter((star) => star.type === 'lucky');
  const challengingStars = palace.stars.filter((star) => star.type === 'sha');
  const position = { '--palace-row': row, '--palace-column': column } as CSSProperties;

  return (
    <article
      className={`${styles.palace} ${palace.isMingGong ? styles.identityPalace : ''}`}
      style={position}
      data-palace={palace.branch}
    >
      <div className={styles.palaceHeader}>
        <span className={styles.branch}>{branchLabels[palace.branch]}</span>
        <div className={styles.markers}>
          {palace.isMingGong && <span>{ui.result.identity}</span>}
          {palace.isShenGong && <span>{ui.result.body}</span>}
        </div>
      </div>
      <h3>{translateTerm(palace.name)}</h3>
      {majorStars.length === 0 && <p className={styles.emptyPalace}>{ui.result.empty}</p>}
      <StarList stars={majorStars} title={ui.result.major} variant={styles.majorStar} />
      <StarList stars={favorableStars} title={ui.result.lucky} variant={styles.favorableStar} />
      <StarList stars={challengingStars} title={ui.result.sha} variant={styles.challengingStar} />
    </article>
  );
}

export default function LocalChart() {
  const [input, setInput] = useState<BirthInput>({ date: '', time: '', gender: 'male' });
  const [error, setError] = useState('');
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!result || !resultHeading.current) return;
    resultHeading.current.focus({ preventScroll: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultHeading.current.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }, [result]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || input.date < '1900-01-01' || input.date > '2100-12-31') {
      setError(ui.form.dateRequired);
      return;
    }
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time)) {
      setError(ui.form.timeRequired);
      return;
    }
    try {
      const chart = generateChart(toBirthInfo(input));
      setResult({ chart, input: { ...input } });
    } catch {
      setError(ui.form.calculationError);
    }
  }

  const chart = result?.chart;

  return (
    <div className={styles.localChart}>
      <section className={styles.formSection} aria-labelledby="dados-nascimento">
        <div className={styles.formIntro}>
          <p className={styles.eyebrow}>{ui.form.eyebrow}</p>
          <h2 id="dados-nascimento">{ui.form.title}</h2>
          <p>{ui.form.description}</p>
          <div className={styles.convention}>
            <h3>{ui.form.conventionTitle}</h3>
            <p>{ui.form.convention}</p>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.dateTimeFields}>
            <div className={styles.field}>
              <label htmlFor="birth-date">{ui.form.date}</label>
              <input
                id="birth-date" name="birth-date" type="date" required min="1900-01-01" max="2100-12-31"
                value={input.date} onChange={(event) => setInput({ ...input, date: event.target.value })}
                aria-describedby="date-hint" autoComplete="off"
              />
              <p id="date-hint" className={styles.hint}>{ui.form.dateHint}</p>
            </div>
            <div className={styles.field}>
              <label htmlFor="birth-time">{ui.form.time}</label>
              <input
                id="birth-time" name="birth-time" type="time" required step="60"
                value={input.time} onChange={(event) => setInput({ ...input, time: event.target.value })}
                aria-describedby="time-hint" autoComplete="off"
              />
              <p id="time-hint" className={styles.hint}>{ui.form.timeHint}</p>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="birth-gender">{ui.form.gender}</label>
            <select
              id="birth-gender" name="birth-gender" value={input.gender}
              onChange={(event) => setInput({ ...input, gender: event.target.value as BirthInput['gender'] })}
              aria-describedby="gender-hint"
            >
              <option value="male">{ui.form.male}</option>
              <option value="female">{ui.form.female}</option>
            </select>
            <p id="gender-hint" className={styles.hint}>{ui.form.genderHint}</p>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submit} type="submit">{ui.form.submit}<span aria-hidden="true">↗</span></button>
          <p className={styles.privacy}>{ui.form.privacy}</p>
        </form>
      </section>

      {result && chart && (
        <section className={styles.result} aria-labelledby="mapa">
          <div className={styles.resultHeader}>
            <div>
              <p className={styles.eyebrow}>{ui.result.eyebrow}</p>
              <h2 id="mapa" ref={resultHeading} tabIndex={-1}>{ui.result.title}</h2>
            </div>
            <a className={styles.editLink} href="#dados-nascimento">{ui.result.edit} ↑</a>
          </div>
          <p className={styles.success} role="status">{ui.result.generated}</p>
          <dl className={styles.summary}>
            <div><dt>{ui.result.originalDate}</dt><dd>{displayDate(result.input.date)} · {result.input.time}</dd></div>
            <div><dt>{ui.result.calculationDate}</dt><dd>{displayDate(chartDate(chart))}</dd></div>
            <div><dt>{ui.result.hourBranch}</dt><dd>{branchLabels[chart.birthInfo.hour]}</dd></div>
            <div><dt>{ui.result.element}</dt><dd>{elementLabels[chart.wuxingJu]}</dd></div>
            <div><dt>{ui.result.lunarDate}</dt><dd>{chart.lunarInfo.lunarDay}/{Math.abs(chart.lunarInfo.lunarMonth)}/{chart.lunarInfo.lunarYear}{chart.lunarInfo.isLeapMonth ? ` (${ui.result.lunarLeap})` : ''}</dd></div>
            <div><dt>{ui.form.gender}</dt><dd>{result.input.gender === 'male' ? ui.form.male : ui.form.female}</dd></div>
          </dl>
          {chartDate(chart) !== result.input.date && <p className={styles.rollover}>{ui.result.rollover}</p>}
          <div className={styles.mapIntro}>
            <h3>{ui.result.mapTitle}</h3>
            <p>{ui.result.mapDescription}</p>
          </div>
          <div className={styles.palaceGrid}>
            {chart.palaces.map((palace) => <PalaceCard key={palace.branch} palace={palace} />)}
            <aside className={styles.mapCenter}>
              <span className={styles.centerSymbol} aria-hidden="true">✦</span>
              <p className={styles.centerTitle}>{ui.result.centerTitle}</p>
              <p>{ui.result.centerSubtitle}</p>
              <dl>
                <div><dt>{ui.result.identityBranch}</dt><dd>{branchLabels[chart.mingGongBranch]}</dd></div>
                <div><dt>{ui.result.bodyBranch}</dt><dd>{branchLabels[chart.shenGongBranch]}</dd></div>
              </dl>
            </aside>
          </div>
          <div className={styles.mapNotes}>
            <p>{ui.result.smallerStars}</p>
            <p>{ui.result.legend}</p>
          </div>
          <p className={styles.disclaimer}>{ui.result.disclaimer}</p>
        </section>
      )}
    </div>
  );
}

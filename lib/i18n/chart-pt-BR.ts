/**
 * Vocabulário de apresentação da demonstração em português do Brasil.
 * As chaves são identificadores do motor upstream e não devem ser traduzidas.
 * Nomes próprios de estrelas usam romanização; os demais rótulos são PT-BR.
 */
const terms: Record<string, string> = {
  // As 14 estrelas principais.
  紫微: 'Zi Wei — Estrela Púrpura',
  天机: 'Tian Ji — Mecanismo Celeste',
  太阳: 'Tai Yang — Sol',
  武曲: 'Wu Qu — Estrela Marcial',
  天同: 'Tian Tong — Harmonia Celeste',
  廉贞: 'Lian Zhen — Integridade',
  天府: 'Tian Fu — Tesouro Celeste',
  太阴: 'Tai Yin — Lua',
  贪狼: 'Tan Lang — Lobo Ávido',
  巨门: 'Ju Men — Grande Portal',
  天相: 'Tian Xiang — Ministro Celeste',
  天梁: 'Tian Liang — Pilar Celeste',
  七杀: 'Qi Sha',
  破军: 'Po Jun — Rompedor de Exércitos',
  // Estrelas auxiliares e menores do mapa natal.
  左辅: 'Zuo Fu', 右弼: 'You Bi', 文昌: 'Wen Chang', 文曲: 'Wen Qu',
  禄存: 'Lu Cun', 天马: 'Tian Ma', 擎羊: 'Qing Yang', 陀罗: 'Tuo Luo',
  火星: 'Huo Xing', 铃星: 'Ling Xing', 天魁: 'Tian Kui', 天钺: 'Tian Yue',
  地空: 'Di Kong', 地劫: 'Di Jie', 劫杀: 'Jie Sha', 劫煞: 'Jie Sha',
  天空: 'Tian Kong', 天刑: 'Tian Xing', 天姚: 'Tian Yao', 解神: 'Jie Shen',
  阴煞: 'Yin Sha', 天喜: 'Tian Xi', 天官: 'Tian Guan', 天福: 'Tian Fu (auxiliar)',
  天哭: 'Tian Ku', 天虚: 'Tian Xu', 龙池: 'Long Chi', 凤阁: 'Feng Ge',
  红鸾: 'Hong Luan', 孤辰: 'Gu Chen', 寡宿: 'Gua Su', 蜚廉: 'Fei Lian',
  破碎: 'Po Sui', 台辅: 'Tai Fu', 封诰: 'Feng Gao', 天巫: 'Tian Wu',
  天月: 'Tian Yue (auxiliar)', 三台: 'San Tai', 八座: 'Ba Zuo', 恩光: 'En Guang',
  天贵: 'Tian Gui', 天才: 'Tian Cai', 天寿: 'Tian Shou', 截空: 'Jie Kong',
  旬中: 'Xun Zhong', 旬空: 'Xun Kong', 空亡: 'Kong Wang', 截路: 'Jie Lu',
  月德: 'Yue De', 天伤: 'Tian Shang', 天使: 'Tian Shi', 天厨: 'Tian Chu',
  年解: 'Nian Jie', 华盖: 'Hua Gai', 咸池: 'Xian Chi', 龙德: 'Long De',
  天德: 'Tian De', 大耗: 'Da Hao', 副旬: 'Fu Xun', 副截: 'Fu Jie',
  // Palácios, incluindo as variantes das tabelas locais.
  命宫: 'Vida', 兄弟: 'Irmãos', 兄弟宫: 'Irmãos', 夫妻: 'Relacionamentos',
  夫妻宫: 'Relacionamentos', 子女: 'Filhos', 子女宫: 'Filhos', 财帛: 'Recursos',
  财帛宫: 'Recursos', 疾厄: 'Vitalidade', 疾厄宫: 'Vitalidade', 迁移: 'Deslocamentos',
  迁移宫: 'Deslocamentos', 仆役: 'Amizades', 交友: 'Amizades', 交友宫: 'Amizades',
  官禄: 'Carreira', 官禄宫: 'Carreira', 田宅: 'Moradia', 田宅宫: 'Moradia',
  福德: 'Bem-estar', 福德宫: 'Bem-estar', 父母: 'Pais', 父母宫: 'Pais', 身宫: 'Corpo',
  // Brilho tradicional (as categorias não são medidas astronômicas).
  庙: 'Exaltado', 旺: 'Forte', 得: 'Favorável', 利: 'Benéfico', 平: 'Neutro',
  不: 'Fraco', 闲: 'Inativo', 陷: 'Em queda', 地: 'Estável',
  bright: 'Forte', normal: 'Neutro', dim: 'Fraco',
  // Quatro transformações natais.
  禄: 'Prosperidade', 权: 'Autoridade', 科: 'Reconhecimento', 忌: 'Desafio',
  化禄: 'Prosperidade', 化权: 'Autoridade', 化科: 'Reconhecimento', 化忌: 'Desafio',
  // Rótulos complementares que o motor pode produzir.
  水二局: 'Água — ciclo 2', 木三局: 'Madeira — ciclo 3', 金四局: 'Metal — ciclo 4',
  土五局: 'Terra — ciclo 5', 火六局: 'Fogo — ciclo 6',
  阳男: 'Masculino yang', 阴男: 'Masculino yin', 阳女: 'Feminino yang', 阴女: 'Feminino yin',
  major: 'Principal', minor: 'Menor', lucky: 'Auxiliar favorável', sha: 'Auxiliar desafiadora',
};

export const branchLabels: string[] = [
  'Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente',
  'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco',
];

export const elementLabels: Record<number, string> = {
  2: 'Água — ciclo 2',
  3: 'Madeira — ciclo 3',
  4: 'Metal — ciclo 4',
  5: 'Terra — ciclo 5',
  6: 'Fogo — ciclo 6',
};

/** Nunca revela uma chave chinesa ou inglesa como fallback na interface. */
export function translateTerm(value: string): string {
  return Object.hasOwn(terms, value) ? terms[value] : 'Termo não catalogado';
}

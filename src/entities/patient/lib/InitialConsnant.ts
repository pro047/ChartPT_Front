const CHOSUNG = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;
const CHOSUNG_INTERVAL = 588;

export const getInitialConsnant = (name: string): string => {
  if (!name) return '';

  const firstChar = name.charAt(0);
  const charCode = firstChar.charCodeAt(0);
  console.log('초성 18번째 : ', CHOSUNG[18]);

  if (charCode >= HANGUL_START && charCode <= HANGUL_END) {
    const index = Math.floor((charCode - HANGUL_START) / CHOSUNG_INTERVAL);
    return CHOSUNG[index] ?? firstChar;
  }
  return firstChar;
};

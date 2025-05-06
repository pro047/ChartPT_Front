export const getInitialConsnant = (name: string) => {
  const firstChar = name.charAt(0);
  const charCode = firstChar.charCodeAt(0) - 44032;

  if (charCode >= 0 && charCode <= 11171) {
    const initialCons = [
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
      'ㅍ',
      'ㅎ',
    ];
    return initialCons[Math.floor(charCode / 588)];
  }
  return firstChar;
};

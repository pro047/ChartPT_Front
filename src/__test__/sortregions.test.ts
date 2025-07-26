type Targets = { region: string; movement: string; rom: number; vas: number };

const getRenderRegions = (targets: Targets[]): string[] => {
  let lastRegion = '';
  const renderedRegions: string[] = [];

  for (const target of targets) {
    if (target.region !== lastRegion) {
      lastRegion = target.region;
      renderedRegions.push(target.region);
    }
  }

  return renderedRegions;
};

describe('region header rendering logic', () => {
  const unsortedTargets: Targets[] = [
    { region: '어깨', movement: '굽힘', rom: 150, vas: 5 },
    { region: '허리', movement: '신전', rom: 130, vas: 3 },
    { region: '어깨', movement: '신전', rom: 120, vas: 7 },
    { region: '허리', movement: '굽힘', rom: 100, vas: 6 },
  ];

  test('reduce target group', () => {
    const result = unsortedTargets.reduce(
      (acc, curr, index) => {
        console.log(`----[Step ${index}]-----`);
        console.log('현재 curr :', curr);
        console.log('이전 acc :', JSON.parse(JSON.stringify(acc)));

        const adjusted = {
          ...curr,
          region: curr.region === '어깨' ? '발목' : curr.region,
        };

        if (!acc[adjusted.region]) {
          acc[adjusted.region] = [];
        }

        acc[adjusted.region].push(adjusted);

        console.log('얕은복사 acc:', acc);
        console.log('깊은복사 acc:', JSON.parse(JSON.stringify(acc)));
        return acc;
      },
      {} as Record<string, Targets[]>
    );
    console.log('최종 결과 :', result);
  });
});

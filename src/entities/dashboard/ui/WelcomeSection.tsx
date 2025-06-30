import { Divider, Header, useUserStore } from '@/shared';

export const WelcomeSection = () => {
  const name = useUserStore((state) => state.name);

  return (
    <>
      <Header>{name} 치료사님 안녕하세요!</Header>
      <Divider />
      <div className='text-m font-semibold text-muted-foreground my-5'>
        오늘도 좋은 하루 되세요!
      </div>
    </>
  );
};

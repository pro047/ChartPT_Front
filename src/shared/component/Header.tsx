interface Prop {
  children: React.ReactNode;
}

export const Header = ({ children }: Prop) => {
  return (
    <h1 className='mb-5 ml-3 py-5 text-3xl font-semibold tracking-tight'>
      {children}
    </h1>
  );
};

import CardPublication from "@/components/publications/CardPublication";

const HomePublication = () => {
  return (
    <>
      <h1>Home Publication</h1>
      <div className="container p-3.5 flex gap-3">
        <CardPublication />
        <CardPublication />
        <CardPublication />
        <CardPublication />
      </div>
    </>
  );
};

export default HomePublication;

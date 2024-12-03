const HomeMain = () => {
  return (
    <div className="flex items-center justify-center bg-background p-4">
      <div className="space-y-6 rounded-lg border bg-card p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-primary">Welcome!</h1>
        <p className="text-muted-foreground">
          If you can see this styled properly, Tailwind CSS is working!
        </p>
        <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          Test Button
        </button>
      </div>
    </div>

    
  );
};

export default HomeMain;

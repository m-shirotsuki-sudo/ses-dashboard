interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-[22px] font-bold tracking-tight text-foreground">{title}</h1>
      {description && (
        <p className="text-[13px] text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  className,
}: PageHeaderProps) => {
  return (
    <div className={`${className || ""}`}>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="my-3 w-16 lg:w-20 h-1 bg-gradient-to-r from-[#449CFB] to-[#E85DF9] rounded-full shadow-sm"></div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export const InputWithIcon = ({ Icon, label, className = "", ...props }: any) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-base font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-12 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-colors shadow-sm"
        {...props}
      />
    </div>
  </div>
);

export const AccountTypeButton = ({ type, currentType, icon, title, description, onClick }: any) => {
    const isActive = currentType === type;
    return (
        <div
            className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                isActive
                    ? "bg-purple-50 border-purple-600 shadow-md text-purple-800"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
            onClick={() => onClick(type)}
        >
            <div className="flex flex-col items-center text-center space-y-1">
                <div className={`text-3xl mb-1 ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                    {icon}
                </div>
                <p className="font-semibold text-base">{title}</p>
                <small className="text-xs text-gray-500">{description}</small>
            </div>
        </div>
    );
};
interface AccountTypeButtonProps {
  type: string;
  currentType: string;
  icon: string;
  title: string;
  description: string;
  onClick: (type: string) => void;
}

export default function AccountTypeButton({type, currentType, icon, title, description, onClick}: AccountTypeButtonProps) {
  const isActive = currentType === type;
  const baseClass = "flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
  const activeClass = "bg-purple-50 border-purple-600 shadow-md text-purple-800"
  const inactiveClass = "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
  return (
    <div className={`${baseClass} ${isActive ? activeClass : inactiveClass}`} onClick={() => onClick(type)}>
      <div className="flex flex-col items-center text-center space-y-1">
        <div className={`text-3xl mb-1 ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
          {icon}
        </div>
        <p className="font-semibold text-base">{title}</p>
        <small className="text-xs text-gray-500">{description}</small>
      </div>
    </div>
  );
}
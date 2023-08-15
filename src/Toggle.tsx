type ToggleCheckedValue = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const Toggle = ({ checked, setChecked }: ToggleCheckedValue) => {
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center gap-1">
      <label
        htmlFor="toggle"
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="toggle"
          className="sr-only peer"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-gray-800 to-black"></div>
      </label>
      <p>정렬</p>
    </div>
  );
};

export default Toggle;

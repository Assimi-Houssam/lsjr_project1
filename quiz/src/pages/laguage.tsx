function LanguageSelector({
  onLanguageSelection,
}: {
  onLanguageSelection: (language: string) => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="grid max-w-xl grid-cols-1 gap-8 md:grid-cols-2 ">
        <button
          type="button"
          className="w-3xs rounded-4xl bg-orange-500/80 text-white py-3 text-lg hover:bg-blue-700"
          onClick={() => onLanguageSelection("ar")}
        >
          العربية
        </button>
        <button
          type="button"
          className="w-3xs rounded-4xl bg-gray-200 text-gray-800 py-3 text-lg hover:bg-gray-300"
          onClick={() => onLanguageSelection("fr")}
        >
          Français
        </button>
      </div>
    </div>
  );
}

export default LanguageSelector;

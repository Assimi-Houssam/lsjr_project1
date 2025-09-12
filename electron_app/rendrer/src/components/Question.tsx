
interface Props {
  title: string;
  imageUrl?: string;
  questionNumber: number;
}

export default function Question({ title, imageUrl, questionNumber }: Props) {
  // Detect if text contains Arabic characters
  const isArabic = /[\u0600-\u06FF]/.test(title);

  return (
    <div
      className={`mb-4 p-3 border border-gray-300 rounded-lg ${
        isArabic ? "text-right" : "text-left"
      }`}
      style={{ direction: isArabic ? "rtl" : "ltr" }}
    >
      {/* Question Title */}
        <span className="font-bold mb-3 border-b-2">Q{questionNumber}: </span>
      <div className="text-base font-medium leading-relaxed">
        {title}
      </div>
      {/* Question Image */}
      {imageUrl && (
        <div className="mb-3 text-center">
          <img
            src={imageUrl}
            alt={`Question ${questionNumber}`}
            className="max-w-full max-h-48 object-contain rounded mx-auto"
          />
        </div>
      )}
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
      <div
        className={`h-full bg-blue-500 transition-all duration-300`}
        style={{ width: `${progress}%` }}
        data-id="progress-bar"
      ></div>
      <style>{`
        #progress-bar, [data-id='progress-bar'] {
          transition: width 0.3s;
        }
      `}</style>
    </div>
  );
}

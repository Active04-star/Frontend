const LoadingCircle: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute w-full h-full">
                <div className="absolute inset-0 border-8 border-gray-300 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingCircle;
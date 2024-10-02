import { ArrowLeft } from "lucide-react";

// SkeletonLoader component to show placeholders while data is loading
export default function RegisterFormSkeletonLoader() {
    return (
        <div className="max-w-2xl mx-auto md:pt-5 pt-10">
            <div className="fixed top-0 left-0 border-white/10 bg-background z-50 w-full p-5 py-7 border-b">
                <div className="max-w-7xl mx-auto md:px-5 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-[#b4ff39]">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Loading...</span>
                    </div>
                </div>
            </div>

            <form className="space-y-6 p-5">
                <div className="animate-pulse">
                    <div className="h-40 w-full bg-gray-700 rounded-2xl mb-4"></div>
                    <div className="space-y-2 md:py-5 py-5 text-center">
                        <div className="h-8 w-1/2 bg-gray-700 rounded-md mx-auto mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-700 rounded-md mx-auto"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-8 w-1/3 bg-gray-700 rounded-md"></div>
                    <div className="h-10 bg-gray-700 rounded-md"></div>
                </div>

                <div className="space-y-4 pb-10">
                    <div className="space-y-2">
                        <div className="h-8 w-1/3 bg-gray-700 rounded-md"></div>
                        <div className="h-10 bg-gray-700 rounded-md"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-8 w-1/3 bg-gray-700 rounded-md"></div>
                        <div className="h-10 bg-gray-700 rounded-md"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-8 w-1/3 bg-gray-700 rounded-md"></div>
                        <div className="h-10 bg-gray-700 rounded-md"></div>
                    </div>
                    <div className="h-12 bg-gray-700 rounded-md"></div>
                </div>
            </form>
        </div>
    );
}

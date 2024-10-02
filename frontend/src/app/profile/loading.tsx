import { ArrowLeft } from "lucide-react";

export default function SkeletonLoader() {
    return (
        <div className="min-h-screen bg-[#1E1E1E] text-white">
            <header className="bg-[#2A2A2A] shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-[#b4ff39]">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Loading...</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-[#2A2A2A] shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="animate-pulse">
                            <div className="h-8 w-1/2 bg-gray-700 rounded-md mb-4"></div>
                            <div className="flex space-x-6 items-center">
                                <div className="h-24 w-24 bg-gray-700 rounded-full"></div>
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
                            <div className="h-12 bg-gray-700 rounded-md"></div>
                            <div className="h-12 bg-gray-700 rounded-md"></div>
                            <div className="h-12 bg-gray-700 rounded-md"></div>
                            <div className="h-12 bg-gray-700 rounded-md"></div>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2 animate-pulse">
                            <div className="h-40 bg-gray-700 rounded-md"></div>
                            <div className="h-40 bg-gray-700 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
